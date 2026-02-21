import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle2, Circle, AlertCircle, RefreshCw, ChevronLeft } from 'lucide-react';

const TEST_ITEMS = [
    { id: 1, label: 'JD required validation works', hint: 'Try analyzing with an empty JD.' },
    { id: 2, label: 'Short JD warning shows for <200 chars', hint: 'Paste a very short JD and check for the amber warning.' },
    { id: 3, label: 'Skills extraction groups correctly', hint: 'Check if Java appears in Languages and React in Web.' },
    { id: 4, label: 'Round mapping changes based on company + skills', hint: 'Test "Amazon" (Enterprise) vs a generic name (Startup).' },
    { id: 5, label: 'Score calculation is deterministic', hint: 'Same JD should result in the same Base Score.' },
    { id: 6, label: 'Skill toggles update score live', hint: 'Click "I know this" in results and watch the score adapt.' },
    { id: 7, label: 'Changes persist after refresh', hint: 'Assess skills, refresh, and check if toggles stayed.' },
    { id: 8, label: 'History saves and loads correctly', hint: 'Check the History page after an analysis.' },
    { id: 9, label: 'Export buttons copy the correct content', hint: 'Click "Copy Plan" and paste it in a notepad.' },
    { id: 10, label: 'No console errors on core pages', hint: 'Open F12 and check for red errors during use.' }
];

const InternalTest = () => {
    const navigate = useNavigate();
    const [checkedItems, setCheckedItems] = useState(() => {
        const saved = localStorage.getItem('prp_test_status');
        return saved ? JSON.parse(saved) : [];
    });

    useEffect(() => {
        localStorage.setItem('prp_test_status', JSON.stringify(checkedItems));
    }, [checkedItems]);

    const toggleItem = (id) => {
        setCheckedItems(prev =>
            prev.includes(id) ? prev.filter(i => i !== id) : [...prev, id]
        );
    };

    const resetChecklist = () => {
        if (window.confirm('Reset all test progress?')) {
            setCheckedItems([]);
        }
    };

    const passCount = checkedItems.length;
    const isReady = passCount === 10;

    return (
        <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500 pb-20">
            <div className="flex items-center justify-between">
                <div>
                    <button onClick={() => navigate('/dashboard')} className="flex items-center gap-1 text-slate-400 font-bold text-sm mb-2 hover:text-primary transition-colors">
                        <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <h2 className="text-3xl font-black text-slate-900 tracking-tight">Internal Verification</h2>
                </div>
                <button
                    onClick={resetChecklist}
                    className="flex items-center gap-2 px-4 py-2 text-slate-400 hover:text-red-500 font-bold transition-colors border border-slate-200 rounded-xl hover:bg-red-50"
                >
                    <RefreshCw className="w-4 h-4" /> Reset Checklist
                </button>
            </div>

            {/* Summary Card */}
            <div className={`p-8 rounded-3xl border-2 transition-all ${isReady ? 'bg-green-50 border-green-200' : 'bg-amber-50 border-amber-200'}`}>
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-6">
                        <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-2xl font-black ${isReady ? 'bg-green-500 text-white' : 'bg-amber-500 text-white'}`}>
                            {passCount}/10
                        </div>
                        <div>
                            <h3 className="text-xl font-black text-slate-900">Tests Passed</h3>
                            <p className={`font-bold mt-1 ${isReady ? 'text-green-600' : 'text-amber-600'}`}>
                                {isReady ? 'All systems verified. Ready to ship.' : 'Fix remaining issues before shipping.'}
                            </p>
                        </div>
                    </div>
                    {isReady && (
                        <button
                            onClick={() => navigate('/prp/08-ship')}
                            className="bg-green-600 text-white px-8 py-3 rounded-xl font-black hover:shadow-lg hover:shadow-green-200 transition-all active:scale-95"
                        >
                            Proceed to Ship
                        </button>
                    )}
                </div>
            </div>

            {/* Checklist */}
            <div className="bg-white border border-slate-200 rounded-[2rem] overflow-hidden shadow-sm">
                <div className="divide-y divide-slate-100">
                    {TEST_ITEMS.map((item) => {
                        const isChecked = checkedItems.includes(item.id);
                        return (
                            <div
                                key={item.id}
                                onClick={() => toggleItem(item.id)}
                                className={`p-6 flex items-start gap-4 cursor-pointer transition-colors group ${isChecked ? 'bg-slate-50/50' : 'hover:bg-slate-50'}`}
                            >
                                <div className="mt-0.5">
                                    {isChecked ? (
                                        <CheckCircle2 className="w-6 h-6 text-green-500" />
                                    ) : (
                                        <Circle className="w-6 h-6 text-slate-200 group-hover:text-primary/30" />
                                    )}
                                </div>
                                <div>
                                    <h4 className={`font-bold transition-colors ${isChecked ? 'text-slate-400 line-through' : 'text-slate-900 group-hover:text-primary'}`}>
                                        {item.label}
                                    </h4>
                                    {item.hint && (
                                        <div className="flex items-center gap-1.5 mt-1.5 opacity-60">
                                            <AlertCircle className="w-3 h-3" />
                                            <p className="text-xs font-medium">{item.hint}</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default InternalTest;
