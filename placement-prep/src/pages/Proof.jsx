import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    CheckCircle2,
    Circle,
    Link as LinkIcon,
    Github,
    Globe,
    ExternalLink,
    Copy,
    Check,
    Trophy,
    ShieldCheck,
    AlertTriangle,
    ChevronLeft
} from 'lucide-react';

const STEPS = [
    '01. Concept & Problem Definition',
    '02. AI Prompt Engineering & Logic',
    '03. Dashboard & Analysis Engine',
    '04. Interactive Results & Roadmaps',
    '05. History & Local Persistence',
    '06. Hardening & Data Validation',
    '07. Internal Test Checklist',
    '08. Final Ship & Submission'
];

const Proof = () => {
    const navigate = useNavigate();
    const [links, setLinks] = useState(() => {
        const saved = localStorage.getItem('prp_final_submission');
        return saved ? JSON.parse(saved) : { lovable: '', github: '', deploy: '' };
    });

    const [copyStatus, setCopyStatus] = useState(false);
    const [errors, setErrors] = useState({});

    // Get current statuses from localStorage
    const testStatus = JSON.parse(localStorage.getItem('prp_test_status') || '[]');
    const isTestPassed = testStatus.length === 10;

    // Derived statuses
    const stepCompletion = {
        '01. Concept & Problem Definition': true,
        '02. AI Prompt Engineering & Logic': true,
        '03. Dashboard & Analysis Engine': true,
        '04. Interactive Results & Roadmaps': true,
        '05. History & Local Persistence': true,
        '06. Hardening & Data Validation': true,
        '07. Internal Test Checklist': isTestPassed,
        '08. Final Ship & Submission': isTestPassed && links.lovable && links.github && links.deploy && Object.keys(errors).length === 0
    };

    const validateUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch {
            return false;
        }
    };

    const handleLinkChange = (key, value) => {
        const newLinks = { ...links, [key]: value };
        setLinks(newLinks);
        localStorage.setItem('prp_final_submission', JSON.stringify(newLinks));

        // Real-time validation
        if (value && !validateUrl(value)) {
            setErrors(prev => ({ ...prev, [key]: 'Invalid URL format' }));
        } else {
            const newErrors = { ...errors };
            delete newErrors[key];
            setErrors(newErrors);
        }
    };

    const isShipped = isTestPassed &&
        links.lovable && validateUrl(links.lovable) &&
        links.github && validateUrl(links.github) &&
        links.deploy && validateUrl(links.deploy);

    const handleCopySubmission = () => {
        const text = `------------------------------------------
Placement Readiness Platform — Final Submission

Lovable Project: ${links.lovable}
GitHub Repository: ${links.github}
Live Deployment: ${links.deploy}

Core Capabilities:
- JD skill extraction (deterministic)
- Round mapping engine
- 7-day prep plan
- Interactive readiness scoring
- History persistence
------------------------------------------`;

        navigator.clipboard.writeText(text);
        setCopyStatus(true);
        setTimeout(() => setCopyStatus(false), 2000);
    };

    return (
        <div className="max-w-5xl mx-auto space-y-12 animate-in fade-in duration-700 pb-32">
            <header className="flex items-center justify-between">
                <div>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-slate-400 font-bold text-sm mb-2 hover:text-primary transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Back to Dashboard
                    </button>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight flex items-center gap-4">
                        Project Proof <ShieldCheck className="w-8 h-8 text-primary" />
                    </h2>
                </div>
                <div className={`px-6 py-2 rounded-2xl font-black text-sm uppercase tracking-widest border-2 transition-all ${isShipped ? 'bg-green-50 text-green-600 border-green-200' : 'bg-slate-50 text-slate-400 border-slate-200'}`}>
                    Status: {isShipped ? 'Shipped' : 'In Progress'}
                </div>
            </header>

            <div className="grid grid-cols-1 lg:col-span-12 lg:grid-cols-12 gap-10">
                {/* Left Column: Step Completion */}
                <div className="lg:col-span-5 space-y-8">
                    <section className="bg-white border border-slate-200 rounded-[2.5rem] p-8 shadow-sm">
                        <h3 className="text-xl font-bold mb-6 flex items-center gap-2 text-slate-900">
                            Build steps
                        </h3>
                        <div className="space-y-4">
                            {STEPS.map(step => (
                                <div key={step} className="flex items-center justify-between group">
                                    <span className={`text-sm font-bold transition-colors ${stepCompletion[step] ? 'text-slate-400' : 'text-slate-600'}`}>
                                        {step}
                                    </span>
                                    {stepCompletion[step] ? (
                                        <CheckCircle2 className="w-5 h-5 text-green-500" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-slate-200" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    {isShipped && (
                        <div className="bg-primary/5 border border-primary/20 rounded-[2rem] p-8 animate-in zoom-in duration-500">
                            <Trophy className="w-10 h-10 text-primary mb-4" />
                            <h4 className="text-xl font-black text-slate-900 mb-3">Proof of Work Verified</h4>
                            <p className="text-sm font-medium text-slate-600 leading-relaxed">
                                "You built a real product. Not a tutorial. Not a clone. A structured tool that solves a real problem.<br /><br />
                                <span className="font-black text-primary italic">This is your proof of work.</span>"
                            </p>
                        </div>
                    )}
                </div>

                {/* Right Column: Artifact Inputs */}
                <div className="lg:col-span-7 space-y-8">
                    <section className="bg-white border border-slate-200 rounded-[2.5rem] p-10 shadow-sm relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-10 opacity-[0.03] pointer-events-none">
                            <ExternalLink className="w-40 h-40" />
                        </div>

                        <h3 className="text-2xl font-black text-slate-900 mb-8">Artifact Inputs</h3>

                        <div className="space-y-8">
                            <div>
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <LinkIcon className="w-3.5 h-3.5" /> Lovable Project Link
                                </label>
                                <input
                                    type="text"
                                    value={links.lovable}
                                    onChange={(e) => handleLinkChange('lovable', e.target.value)}
                                    placeholder="https://lovable.dev/projects/..."
                                    className={`w-full bg-slate-50 border-2 rounded-2xl p-4 font-bold text-slate-900 transition-all focus:ring-4 focus:ring-primary/10 outline-none ${errors.lovable ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-primary'}`}
                                />
                                {errors.lovable && <p className="text-red-500 text-[10px] font-black mt-2 uppercase flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.lovable}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <Github className="w-3.5 h-3.5" /> GitHub Repository Link
                                </label>
                                <input
                                    type="text"
                                    value={links.github}
                                    onChange={(e) => handleLinkChange('github', e.target.value)}
                                    placeholder="https://github.com/your-username/..."
                                    className={`w-full bg-slate-50 border-2 rounded-2xl p-4 font-bold text-slate-900 transition-all focus:ring-4 focus:ring-primary/10 outline-none ${errors.github ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-primary'}`}
                                />
                                {errors.github && <p className="text-red-500 text-[10px] font-black mt-2 uppercase flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.github}</p>}
                            </div>

                            <div>
                                <label className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-3">
                                    <Globe className="w-3.5 h-3.5" /> Deployed URL
                                </label>
                                <input
                                    type="text"
                                    value={links.deploy}
                                    onChange={(e) => handleLinkChange('deploy', e.target.value)}
                                    placeholder="https://your-app.vercel.app"
                                    className={`w-full bg-slate-50 border-2 rounded-2xl p-4 font-bold text-slate-900 transition-all focus:ring-4 focus:ring-primary/10 outline-none ${errors.deploy ? 'border-red-200 focus:border-red-400' : 'border-slate-100 focus:border-primary'}`}
                                />
                                {errors.deploy && <p className="text-red-500 text-[10px] font-black mt-2 uppercase flex items-center gap-1"><AlertTriangle className="w-3 h-3" /> {errors.deploy}</p>}
                            </div>
                        </div>

                        <div className="mt-12 pt-10 border-t border-slate-100">
                            <button
                                onClick={handleCopySubmission}
                                disabled={!isShipped}
                                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl font-black text-lg transition-all active:scale-[0.98] ${isShipped ? 'bg-slate-900 text-white hover:bg-black shadow-xl shadow-slate-200' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`}
                            >
                                {copyStatus ? (
                                    <><Check className="w-6 h-6" /> Copied</>
                                ) : (
                                    <><Copy className="w-6 h-6" /> Copy Final Submission</>
                                )}
                            </button>
                            {!isShipped && (
                                <p className="text-center text-[10px] font-black text-slate-400 uppercase mt-4 tracking-widest">
                                    {!isTestPassed ? 'Internal tests must be 10/10' : 'Provide all valid URLs to unlock submission'}
                                </p>
                            )}
                        </div>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default Proof;
