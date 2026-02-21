import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Rocket, Lock, ChevronLeft, CheckCircle2, Sparkles } from 'lucide-react';

const Ship = () => {
    const navigate = useNavigate();
    const testStatus = JSON.parse(localStorage.getItem('prp_test_status') || '[]');
    const isLocked = testStatus.length < 10;

    if (isLocked) {
        return (
            <div className="max-w-4xl mx-auto py-20 animate-in fade-in duration-700">
                <div className="bg-white border border-slate-200 rounded-[3rem] p-16 text-center shadow-xl shadow-slate-200/50 flex flex-col items-center">
                    <div className="w-24 h-24 rounded-3xl bg-amber-50 border border-amber-100 flex items-center justify-center mb-8">
                        <Lock className="w-10 h-10 text-amber-500" />
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight mb-4">Shipping Locked</h2>
                    <p className="text-slate-500 text-lg font-medium max-w-md mb-10 leading-relaxed">
                        Validation incomplete. You must pass all <span className="text-primary font-bold">10 internal tests</span> before the platform can be released.
                    </p>
                    <button
                        onClick={() => navigate('/prp/07-test')}
                        className="bg-primary text-white px-10 py-4 rounded-2xl font-black text-lg hover:shadow-2xl hover:shadow-primary/30 transition-all active:scale-95 flex items-center gap-3"
                    >
                        Return to Test Checklist
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto py-20 animate-in slide-in-from-bottom-8 duration-1000">
            <div className="bg-slate-900 rounded-[3rem] p-20 text-center relative overflow-hidden shadow-2xl">
                {/* Decorative gradients */}
                <div className="absolute -top-40 -left-40 w-96 h-96 bg-primary/20 rounded-full blur-[100px]" />
                <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-indigo-500/20 rounded-full blur-[100px]" />

                <div className="relative z-10">
                    <div className="w-24 h-24 rounded-3xl bg-primary flex items-center justify-center mx-auto mb-10 shadow-2xl shadow-primary/40 animate-bounce">
                        <Rocket className="w-12 h-12 text-white" />
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-6">
                        <Sparkles className="w-5 h-5 text-amber-400" />
                        <span className="text-xs font-black uppercase tracking-[0.3em] text-primary">All Tests Passed</span>
                        <Sparkles className="w-5 h-5 text-amber-400" />
                    </div>

                    <h2 className="text-6xl font-black text-white tracking-tighter mb-8 italic">
                        READY FOR TAKE OFF
                    </h2>

                    <p className="text-slate-400 text-xl font-medium max-w-lg mx-auto mb-12 leading-relaxed">
                        The Placement Readiness Platform has been fully validated against all hardening rules and edge cases.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-6 py-3 rounded-2xl">
                            <CheckCircle2 className="w-5 h-5 text-green-400" />
                            <span className="text-sm font-bold text-white">Version 1.2.0 Stable</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate('/dashboard')}
                        className="mt-12 text-slate-500 font-bold hover:text-white transition-colors flex items-center gap-2 mx-auto"
                    >
                        <ChevronLeft className="w-4 h-4" /> Final Return to Dashboard
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Ship;
