import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
    CheckCircle2, CalendarDays, ListFilter,
    HelpCircle, ChevronLeft, Download, Copy,
    Check, Info, Sparkles, Wand2, Building2
} from 'lucide-react';
import { updateHistoryEntry } from '../utils/analysisEngine';

const Results = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [entry, setEntry] = useState(location.state?.entry);
    const [copyStatus, setCopyStatus] = useState('');

    // Local state for skill confidence to ensure fast UI updates
    const [confidence, setConfidence] = useState(entry?.skillConfidenceMap || {});

    useEffect(() => {
        if (!entry) return;

        // 4) Score stability rules: finalScore changes only based on skillConfidenceMap
        let scoreOffset = 0;
        Object.values(confidence).forEach(val => {
            if (val === 'know') scoreOffset += 2;
            if (val === 'practice') scoreOffset -= 2;
        });

        const newScore = Math.min(Math.max(entry.baseScore + scoreOffset, 0), 100);

        // Persist changes
        updateHistoryEntry(entry.id, {
            skillConfidenceMap: confidence,
            finalScore: newScore,
            updatedAt: new Date().toISOString()
        });
    }, [confidence, entry]);

    if (!entry) {
        return (
            <div className="text-center py-20">
                <p className="text-slate-500 mb-4">No analysis data found.</p>
                <button onClick={() => navigate('/dashboard')} className="text-primary font-bold">Back to Dashboard</button>
            </div>
        );
    }

    const skillOffset = Object.values(confidence).reduce((acc, val) => acc + (val === 'know' ? 2 : (val === 'practice' ? -2 : 0)), 0);
    const currentScore = Math.min(Math.max(entry.baseScore + skillOffset, 0), 100);

    const toggleSkill = (skill) => {
        setConfidence(prev => ({
            ...prev,
            [skill]: prev[skill] === 'know' ? 'practice' : 'know'
        }));
    };

    const handleCopy = (text, label) => {
        navigator.clipboard.writeText(text);
        setCopyStatus(label);
        setTimeout(() => setCopyStatus(''), 2000);
    };

    const downloadTxt = () => {
        const content = `
PLACEMENT PREP REPORT: ${entry.company} - ${entry.role}
Base Score: ${entry.baseScore}/100
Final readiness Score: ${currentScore}/100
Date: ${new Date(entry.createdAt).toLocaleDateString()}

SKILLS:
${Object.entries(entry.extractedSkills).map(([cat, skills]) => skills.length > 0 ? `${cat}: ${skills.join(', ')}` : '').filter(v => v).join('\n')}

7-DAY PLAN:
${entry.plan7Days.map(d => `${d.day} (${d.focus}): ${d.tasks.join(', ')}`).join('\n')}

INTERVIEW ROADMAP:
${entry.roundMapping.map((r, i) => `Round ${i + 1}: ${r.roundTitle} (${r.focusAreas.join(', ')})`).join('\n')}

TOP 10 INTERVIEW QUESTIONS:
${entry.questions.map((q, i) => `${i + 1}. ${q}`).join('\n')}
    `;
        const blob = new Blob([content], { type: 'text/plain' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `PlacementPrep_${entry.company}_${entry.role}.txt`;
        link.click();
    };

    const CAT_LABELS = {
        coreCS: 'Core CS',
        languages: 'Languages',
        web: 'Web',
        data: 'Data',
        cloud: 'Cloud/DevOps',
        testing: 'Testing',
        other: 'General Skills'
    };

    const weakSkills = Object.values(entry.extractedSkills)
        .flat()
        .filter(skill => confidence[skill] === 'practice' || !confidence[skill])
        .slice(0, 3);

    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-24 animate-in slide-in-from-bottom-4 duration-700">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-10">
                <div>
                    <button
                        onClick={() => navigate(-1)}
                        className="flex items-center gap-2 text-sm font-bold text-slate-400 mb-4 hover:text-primary transition-colors"
                    >
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <div className="flex items-center gap-3 mb-2">
                        <h2 className="text-4xl font-black text-slate-900 tracking-tight">
                            Roadmap Analysis
                        </h2>
                        <Sparkles className="w-6 h-6 text-amber-400" />
                    </div>
                    <p className="text-slate-500 text-lg">
                        Personalized strategy for <span className="text-primary font-bold">{entry.role}</span> at <span className="font-bold text-slate-700">{entry.company}</span>
                    </p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-center bg-primary/5 px-8 py-4 rounded-3xl border border-primary/20 shadow-sm relative group">
                        <div className="text-4xl font-black text-primary transition-all duration-500 transform group-hover:scale-110">{currentScore}</div>
                        <div className="text-[10px] uppercase tracking-widest font-black text-primary/60 mt-1">Live Readiness</div>
                        {currentScore !== entry.readinessScore && (
                            <div className="absolute -top-2 -right-2 bg-primary text-white text-[8px] px-1.5 py-0.5 rounded-full font-bold animate-bounce">
                                ADAPTED
                            </div>
                        )}
                    </div>
                    <button
                        onClick={downloadTxt}
                        title="Download full report"
                        className="bg-slate-900 text-white p-4 rounded-2xl hover:bg-slate-800 transition-all shadow-lg hover:shadow-xl active:scale-95"
                    >
                        <Download className="w-6 h-6" />
                    </button>
                </div>
            </div>

            {/* Main Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column: Skills & Company Intel */}
                <div className="lg:col-span-4 space-y-10">
                    {/* Company Intel Card */}
                    {entry.companyIntel && (
                        <section className="bg-primary/5 border border-primary/20 rounded-3xl p-8 shadow-sm relative overflow-hidden group">
                            <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
                                <Building2 className="w-16 h-16 text-primary" />
                            </div>
                            <h3 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-2">
                                <Building2 className="text-primary w-5 h-5" /> Company Intel
                            </h3>
                            <div className="space-y-4 relative z-10">
                                <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Industry</span>
                                    <span className="text-sm font-bold text-slate-700">{entry.companyIntel.industry}</span>
                                </div>
                                <div className="flex justify-between items-center border-b border-primary/10 pb-3">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Size</span>
                                    <span className="text-sm font-bold text-slate-700">{entry.companyIntel.size}</span>
                                </div>
                                <div className="pt-2">
                                    <span className="text-xs font-black text-slate-400 uppercase tracking-widest block mb-2">Hiring Focus</span>
                                    <div className="bg-white/80 p-3 rounded-xl border border-primary/5 text-xs font-bold text-primary leading-relaxed uppercase tracking-tight">
                                        {entry.companyIntel.hiringFocus}
                                    </div>
                                </div>
                            </div>
                            <p className="mt-6 text-[9px] font-black text-slate-400 flex items-center gap-1 uppercase tracking-tighter">
                                <Info className="w-3 h-3" /> Demo Mode: Company intel generated heuristically.
                            </p>
                        </section>
                    )}

                    <section className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                                <ListFilter className="text-primary w-5 h-5" /> Skill Assessment
                            </h3>
                            <Info className="w-4 h-4 text-slate-300" />
                        </div>
                        <div className="space-y-8">
                            {Object.entries(entry.extractedSkills).map(([catKey, skills]) => {
                                if (skills.length === 0) return null;
                                return (
                                    <div key={catKey}>
                                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{CAT_LABELS[catKey]}</h4>
                                        <div className="flex flex-wrap gap-3">
                                            {skills.map(skill => {
                                                const isKnown = confidence[skill] === 'know';
                                                return (
                                                    <button
                                                        key={skill}
                                                        onClick={() => toggleSkill(skill)}
                                                        className={`group relative flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold transition-all border ${isKnown
                                                            ? 'bg-primary border-primary text-white shadow-md shadow-primary/20'
                                                            : 'bg-white border-slate-200 text-slate-600 hover:border-primary/50 hover:text-primary'
                                                            }`}
                                                    >
                                                        {isKnown ? <Check className="w-3.5 h-3.5" /> : <div className="w-3.5 h-3.5 rounded-full border-2 border-slate-100 group-hover:border-primary/30" />}
                                                        {skill}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                        <p className="mt-8 text-[11px] text-slate-400 font-medium leading-relaxed italic bg-slate-50 p-3 rounded-lg">
                            * Toggling "I know this" increases your readiness by 2%. "Need practice" decreases it.
                        </p>
                    </section>

                    <section className="bg-slate-900 rounded-[2.5rem] p-10 text-white shadow-2xl overflow-hidden relative">
                        <div className="absolute -top-10 -right-10 w-40 h-40 bg-primary/10 rounded-full blur-3xl" />
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-bold flex items-center gap-3">
                                <HelpCircle className="w-6 h-6 text-primary" /> Top Questions
                            </h3>
                            <button
                                onClick={() => handleCopy(entry.questions.map((q, i) => `${i + 1}. ${q}`).join('\n'), 'questions')}
                                className="text-primary hover:text-primary/80"
                            >
                                {copyStatus === 'questions' ? <Check className="w-5 h-5" /> : <Copy className="w-5 h-5" />}
                            </button>
                        </div>
                        <div className="space-y-6">
                            {entry.questions.map((q, i) => (
                                <div key={i} className="flex gap-4 group">
                                    <span className="text-primary font-black opacity-30 text-lg group-hover:opacity-100 transition-opacity">{i + 1}</span>
                                    <p className="text-sm font-medium leading-relaxed text-slate-400 group-hover:text-slate-200 transition-colors uppercase tracking-tight">{q}</p>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Plan Column */}
                <div className="lg:col-span-8 space-y-10">
                    <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="flex items-center justify-between mb-10">
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <CalendarDays className="text-primary w-7 h-7" /> 7-Day Strategy
                            </h3>
                            <button
                                onClick={() => handleCopy(entry.plan7Days.map(d => `${d.day}: ${d.focus}`).join('\n'), 'plan')}
                                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
                            >
                                {copyStatus === 'plan' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy Plan
                            </button>
                        </div>
                        <div className="space-y-0 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
                            {entry.plan7Days.map((day, i) => (
                                <div key={i} className="relative pl-14 pb-10 last:pb-0">
                                    <div className="absolute left-0 top-1.5 w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm">
                                        <span className="text-xs font-black text-primary">{i + 1}</span>
                                    </div>
                                    <div className="flex flex-col sm:flex-row sm:items-baseline gap-2 sm:gap-4 mb-3">
                                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{day.day}</span>
                                        <h4 className="text-xl font-bold text-slate-900">{day.focus}</h4>
                                    </div>
                                    <div className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100">
                                        <div className="flex flex-wrap gap-2">
                                            {day.tasks.map(item => (
                                                <span key={item} className="text-[11px] font-bold text-slate-600 bg-white px-3 py-1.5 rounded-lg shadow-sm border border-slate-200/50">
                                                    {item}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section>
                        <div className="flex items-center justify-between mb-8">
                            <h3 className="text-2xl font-black text-slate-900 flex items-center gap-3">
                                <CheckCircle2 className="text-primary w-7 h-7" /> Interview Roadmap
                            </h3>
                            <button
                                onClick={() => handleCopy(entry.roundMapping.map((r, i) => `Round ${i + 1}: ${r.roundTitle} (${r.focusAreas.join(', ')})`).join('\n'), 'rounds')}
                                className="flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-primary transition-colors"
                            >
                                {copyStatus === 'rounds' ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />} Copy Roadmap
                            </button>
                        </div>
                        <div className="space-y-6 relative before:absolute before:left-[19px] before:top-4 before:bottom-4 before:w-[2px] before:bg-slate-100">
                            {entry.roundMapping.map((round, i) => (
                                <div key={i} className="relative pl-14 pb-8 last:pb-0 group">
                                    <div className="absolute left-0 top-1.5 w-10 h-10 rounded-2xl bg-white border-2 border-slate-100 flex items-center justify-center z-10 shadow-sm group-hover:border-primary/30 transition-colors">
                                        <span className="text-xs font-black text-primary">{i + 1}</span>
                                    </div>
                                    <div className="bg-white border border-slate-200 rounded-2xl p-6 hover:shadow-md transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-bold text-slate-900">{round.roundTitle}</h4>
                                            <span className="text-[10px] font-black bg-primary/5 text-primary px-2 py-1 rounded uppercase tracking-widest">{round.focusAreas.join(', ')}</span>
                                        </div>
                                        <p className="text-sm text-slate-500 font-medium leading-relaxed">
                                            {round.whyItMatters}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* Action Next Box */}
                    <div className="bg-primary/5 border-2 border-primary/10 rounded-[2.5rem] p-10 flex flex-col md:flex-row items-center gap-10">
                        <div className="w-20 h-20 rounded-3xl bg-primary flex items-center justify-center shrink-0 shadow-xl shadow-primary/30">
                            <Sparkles className="w-10 h-10 text-white" />
                        </div>
                        <div className="flex-1 text-center md:text-left">
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Ready to take the next step?</h3>
                            {weakSkills.length > 0 ? (
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                    Focus on mastering <span className="text-primary font-bold">{weakSkills.join(', ')}</span>.
                                </p>
                            ) : (
                                <p className="text-slate-500 font-medium text-lg leading-relaxed">
                                    You've mastered all extracted skills!
                                </p>
                            )}
                        </div>
                        <button
                            onClick={() => handleCopy(entry.plan7Days[0].tasks.join(', '), 'next')}
                            className="bg-primary text-white px-8 py-4 rounded-2xl font-bold text-lg hover:shadow-xl hover:shadow-primary/20 transition-all active:scale-95 shrink-0"
                        >
                            Start Day 1 Plan
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Results;
