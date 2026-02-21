import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getHistory } from '../utils/analysisEngine';
import { ChevronRight, Calendar, Building2, UserCircle } from 'lucide-react';

const History = () => {
    const [history, setHistory] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setHistory(getHistory());
    }, []);

    const formatDate = (isoStr) => {
        return new Date(isoStr).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight text-slate-900">Analysis History</h2>
            </div>

            {history.length === 0 ? (
                <div className="bg-white border border-dashed border-slate-300 rounded-2xl p-12 text-center">
                    <p className="text-slate-500 mb-6">No analyses found yet. Start by analyzing a job description.</p>
                    <button
                        onClick={() => navigate('/dashboard')}
                        className="text-primary font-bold hover:underline"
                    >
                        Go to Dashboard &rarr;
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4">
                    {history.map((entry) => {
                        // 5) History robustness: validate entry structure
                        const isCorrupted = !entry || !entry.id || !entry.baseScore;

                        if (isCorrupted) {
                            return (
                                <div key={Math.random()} className="bg-slate-50 border border-slate-200 p-6 rounded-xl text-slate-400 italic text-sm">
                                    One saved entry couldn't be loaded. Create a new analysis.
                                </div>
                            );
                        }

                        return (
                            <div
                                key={entry.id}
                                onClick={() => navigate('/dashboard/results', { state: { entry } })}
                                className="bg-white border border-slate-200 p-6 rounded-xl hover:border-primary/50 hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-14 h-14 rounded-full flex items-center justify-center font-bold text-lg ${(entry.finalScore ?? entry.baseScore) > 70 ? 'bg-green-50 text-green-600' : 'bg-amber-50 text-amber-600'
                                            }`}>
                                            {entry.finalScore ?? entry.baseScore}
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                                                <Building2 className="w-4 h-4 text-slate-400" /> {entry.company || 'Unknown Company'}
                                            </h3>
                                            <p className="text-slate-500 flex items-center gap-2 text-sm mt-1">
                                                <UserCircle className="w-4 h-4 text-slate-400" /> {entry.role || 'Job Role'}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-8">
                                        <div className="text-right hidden sm:block">
                                            <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">Last Analysis</p>
                                            <p className="text-sm font-medium text-slate-500 flex items-center gap-2">
                                                <Calendar className="w-4 h-4" /> {formatDate(entry.createdAt)}
                                            </p>
                                        </div>
                                        <ChevronRight className="text-slate-300 group-hover:text-primary group-hover:translate-x-1 transition-all" />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
};

export default History;
