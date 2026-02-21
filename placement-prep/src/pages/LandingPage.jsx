import { Link, useNavigate } from 'react-router-dom';
import { Code, Video, BarChart3, Rocket } from 'lucide-react';
import React from 'react';

const LandingPage = () => {
    const navigate = useNavigate();

    const features = [
        {
            title: 'Practice Problems',
            description: 'Solve curated coding problems across topics to sharpen your technical skills.',
            icon: <Code className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Mock Interviews',
            description: 'Simulate real interview scenarios with AI-driven or peer-to-peer sessions.',
            icon: <Video className="w-8 h-8 text-primary" />,
        },
        {
            title: 'Track Progress',
            description: 'Monitor your performance trends and identify areas for improvement.',
            icon: <BarChart3 className="w-8 h-8 text-primary" />,
        },
    ];

    return (
        <div className="min-h-screen flex flex-col font-sans">
            {/* Hero Section */}
            <section className="bg-slate-50 py-20 px-6 sm:px-12 lg:px-24 flex flex-col items-center text-center">
                <h1 className="text-5xl sm:text-6xl font-bold tracking-tight text-slate-900 mb-6">
                    Ace Your Placement
                </h1>
                <p className="text-xl text-slate-600 mb-10 max-w-2xl">
                    Practice, assess, and prepare for your dream job with our comprehensive placement readiness platform.
                </p>
                <Link
                    to="/dashboard"
                    className="bg-primary text-white px-8 py-3 rounded-xl font-bold text-lg hover:translate-y-[-2px] hover:shadow-xl transition-all flex items-center gap-2 group shadow-lg"
                >
                    Get Started <Rocket className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Link>
            </section>

            {/* Features Grid */}
            <section className="py-20 px-6 sm:px-12 lg:px-24">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-7xl mx-auto">
                    {features.map((feature, index) => (
                        <div key={index} className="bg-white p-8 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                            <div className="mb-6">{feature.icon}</div>
                            <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                            <p className="text-slate-600 leading-relaxed">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* Footer */}
            <footer className="mt-auto py-10 border-t border-slate-100 text-center text-slate-500">
                <p className="text-sm">
                    &copy; {new Date().getFullYear()} Placement Prep. All rights reserved.
                </p>
            </footer>
        </div>
    );
};

export default LandingPage;
