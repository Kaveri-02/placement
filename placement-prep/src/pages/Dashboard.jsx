import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Radar, RadarChart, PolarGrid, PolarAngleAxis,
    PolarRadiusAxis, ResponsiveContainer
} from 'recharts';
import { Calendar, ChevronRight, PlayCircle, Search, Sparkles, Info } from 'lucide-react';
import { analyzeJD, saveAnalysis, getLatestAnalysis } from '../utils/analysisEngine';

// --- UI Components ---

const Card = ({ children, className = "" }) => (
    <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden ${className}`}>
        {children}
    </div>
);

const CardHeader = ({ title, subtitle }) => (
    <div className="px-8 py-6 border-b border-slate-100">
        <h3 className="text-xl font-bold text-slate-900">{title}</h3>
        {subtitle && <p className="text-sm text-slate-500 mt-1 font-medium">{subtitle}</p>}
    </div>
);

const CardContent = ({ children, className = "" }) => (
    <div className={`p-8 ${className}`}>
        {children}
    </div>
);

// --- Main Page ---

const Dashboard = () => {
    const navigate = useNavigate();
    const [latest, setLatest] = useState(null);
    const [formData, setFormData] = useState({ company: '', role: '', jd: '' });
    const [warning, setWarning] = useState('');

    useEffect(() => {
        setLatest(getLatestAnalysis() || { finalScore: 35, baseScore: 35 });
    }, []);

    const handleAnalyze = (e) => {
        e.preventDefault();
        setWarning(''); // Reset warning on fresh attempt

        if (!formData.jd || formData.jd.length < 50) {
            setWarning('Please provide a more detailed job description.');
            return;
        }

        if (formData.jd.length < 200) {
            setWarning('This JD is too short to analyze deeply. Paste full JD for better output.');
        }

        const analysis = analyzeJD(formData.company, formData.role, formData.jd);
        saveAnalysis(analysis);
        setLatest(analysis);
        navigate('results', { state: { entry: analysis } });
    };

    const skillData = [
        { subject: 'Core CS', A: latest?.extractedSkills?.coreCS?.length > 0 ? 80 : 40 },
        { subject: 'Languages', A: latest?.extractedSkills?.languages?.length > 0 ? 90 : 30 },
        { subject: 'Web', A: latest?.extractedSkills?.web?.length > 0 ? 70 : 50 },
        { subject: 'Data', A: latest?.extractedSkills?.data?.length > 0 ? 60 : 45 },
        { subject: 'Cloud', A: latest?.extractedSkills?.cloud?.length > 0 ? 85 : 20 },
    ];

    const readinessValue = latest?.finalScore ?? latest?.baseScore ?? 35;
    const radius = 70;
    const circumference = 2 * Math.PI * radius;
    const offset = circumference - (readinessValue / 100) * circumference;

    return (
        <div className="space-y-10 animate-in fade-in duration-500 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-black tracking-tight text-slate-900">Dashboard</h2>
                    <p className="text-slate-500 font-medium mt-1">Track your progress and analyze new job opportunities.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span className="text-xs font-black uppercase tracking-widest text-primary">Premium Active</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">

                {/* Left Column: Analysis Form (Large) */}
                <div className="lg:col-span-7 space-y-10">
                    <Card className="border-primary/20 shadow-xl shadow-primary/5">
                        <CardHeader
                            title="New Analysis"
                            subtitle="Paste a job description to generate your custom prep roadmap."
                        />
                        <CardContent>
                            <form onSubmit={handleAnalyze} className="space-y-6">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Company Name</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Google, Amazon"
                                            value={formData.company}
                                            onChange={e => setFormData({ ...formData, company: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Target Role</label>
                                        <input
                                            type="text"
                                            placeholder="e.g. Software Engineer"
                                            value={formData.role}
                                            onChange={e => setFormData({ ...formData, role: e.target.value })}
                                            className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <label className="text-xs font-black uppercase tracking-widest text-slate-400 pl-1">Job Description</label>
                                    {warning && (
                                        <div className="bg-amber-50 border border-amber-100 p-3 rounded-lg flex items-center gap-2 mb-2">
                                            <Info className="w-4 h-4 text-amber-500" />
                                            <p className="text-xs font-bold text-amber-700">{warning}</p>
                                        </div>
                                    )}
                                    <textarea
                                        rows="6"
                                        placeholder="Paste the full job requirements here..."
                                        value={formData.jd}
                                        onChange={e => setFormData({ ...formData, jd: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all font-medium resize-none"
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    className="w-full bg-primary text-white py-5 rounded-xl font-bold text-lg flex items-center justify-center gap-3 hover:translate-y-[-2px] hover:shadow-lg transition-all active:scale-[0.98]"
                                >
                                    <Search className="w-5 h-5" /> Get Started: Analyze JD
                                </button>
                            </form>
                        </CardContent>
                    </Card>

                    {/* Continue Practice Card */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <Card className="flex flex-col">
                            <CardHeader title="Continue Practice" />
                            <CardContent className="flex-1">
                                <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 mb-6">
                                    <div className="flex items-center gap-3 mb-4">
                                        <PlayCircle className="w-8 h-8 text-primary" />
                                        <div>
                                            <h4 className="font-bold text-slate-900">Dynamic Programming</h4>
                                            <p className="text-[10px] text-slate-400 uppercase tracking-widest font-bold">In Progress</p>
                                        </div>
                                    </div>
                                    <div className="w-full bg-white h-2 rounded-full overflow-hidden border border-slate-200">
                                        <div className="bg-primary h-full w-[30%]" />
                                    </div>
                                </div>
                                <button className="w-full border-2 border-slate-100 py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-all">
                                    Resume Learning
                                </button>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardHeader title="Weekly Progress" />
                            <CardContent>
                                <div className="text-center mb-4">
                                    <span className="text-3xl font-black text-slate-900">12/20</span>
                                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Solved this week</p>
                                </div>
                                <div className="flex justify-between mt-6">
                                    {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((day, i) => (
                                        <div key={i} className={`w-8 h-8 rounded-full border-2 flex items-center justify-center text-[10px] font-black transition-all ${i < 4 ? 'bg-primary border-primary text-white scale-110 shadow-lg' : 'bg-white border-slate-100 text-slate-300'
                                            }`}>
                                            {day}
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Visualization Metrics (Sticky) */}
                <div className="lg:col-span-5 space-y-10">
                    <section className="sticky top-24 space-y-10">
                        {/* Readiness Circle */}
                        <Card className="bg-slate-900 border-none text-white relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-8 opacity-10">
                                <Sparkles className="w-32 h-32" />
                            </div>
                            <CardContent className="flex flex-col items-center py-12">
                                <div className="relative flex items-center justify-center mb-6">
                                    <svg className="w-56 h-56 transform -rotate-90">
                                        <circle cx="112" cy="112" r={radius} stroke="rgba(255,255,255,0.05)" strokeWidth="16" fill="transparent" />
                                        <circle
                                            cx="112"
                                            cy="112"
                                            r={radius}
                                            stroke="currentColor"
                                            strokeWidth="16"
                                            fill="transparent"
                                            strokeDasharray={circumference}
                                            strokeDashoffset={offset}
                                            strokeLinecap="round"
                                            className="text-primary transition-all duration-1000 ease-out"
                                        />
                                    </svg>
                                    <div className="absolute text-center">
                                        <span className="text-5xl font-black block leading-none">{readinessValue}</span>
                                        <span className="text-[10px] font-black uppercase tracking-widest opacity-40">Ready %</span>
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold mb-1">Overall Readiness</h3>
                                <p className="text-sm opacity-50 font-medium">Based on 12 key parameters</p>
                            </CardContent>
                        </Card>

                        {/* Radar Skill Charts */}
                        <Card>
                            <CardHeader title="Skill Comparison" subtitle="Your profile vs Latest JD" />
                            <CardContent className="h-[320px]">
                                <ResponsiveContainer width="100%" height="100%">
                                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={skillData}>
                                        <PolarGrid stroke="#f1f5f9" />
                                        <PolarAngleAxis dataKey="subject" tick={{ fill: '#94a3b8', fontSize: 11, fontWeight: 700 }} />
                                        <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                                        <Radar
                                            name="Skills"
                                            dataKey="A"
                                            stroke="hsl(245, 58%, 51%)"
                                            fill="hsl(245, 58%, 51%)"
                                            fillOpacity={0.6}
                                        />
                                    </RadarChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </section>
                </div>

            </div>
        </div >
    );
};

export default Dashboard;
