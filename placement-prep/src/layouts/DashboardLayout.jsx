import React from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { LayoutDashboard, BookOpen, ClipboardCheck, Library, History as HistoryIcon, CircleUser, User } from 'lucide-react';

const DashboardLayout = () => {
    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, end: true },
        { name: 'History', path: '/dashboard/history', icon: <HistoryIcon className="w-5 h-5" /> },
        { name: 'Practice', path: '/dashboard/practice', icon: <BookOpen className="w-5 h-5" /> },
        { name: 'Assessments', path: '/dashboard/assessments', icon: <ClipboardCheck className="w-5 h-5" /> },
        { name: 'Resources', path: '/dashboard/resources', icon: <Library className="w-5 h-5" /> },
        { name: 'Profile', path: '/dashboard/profile', icon: <CircleUser className="w-5 h-5" /> },
    ];

    return (
        <div className="flex min-h-screen bg-slate-50 font-sans">
            {/* Sidebar */}
            <aside className="w-64 bg-white border-r border-slate-200 flex flex-col fixed inset-y-0">
                <div className="p-6 border-b border-slate-100">
                    <h2 className="text-xl font-bold text-primary">Placement Prep</h2>
                </div>
                <nav className="flex-1 p-4 space-y-2">
                    {navItems.map((item) => (
                        <NavLink
                            key={item.name}
                            to={item.path}
                            end={item.end}
                            className={({ isActive }) =>
                                `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-colors ${isActive
                                    ? 'bg-primary text-white shadow-sm'
                                    : 'text-slate-600 hover:bg-slate-50 hover:text-primary'
                                }`
                            }
                        >
                            {item.icon}
                            {item.name}
                        </NavLink>
                    ))}
                </nav>
            </aside>

            {/* Main Content Area */}
            <div className="flex-1 ml-64 flex flex-col">
                {/* Header */}
                <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <h1 className="text-lg font-semibold text-slate-800">Workspace</h1>
                    <div className="flex items-center gap-4">
                        <span className="text-sm text-slate-500 font-medium">John Doe</span>
                        <div className="w-9 h-9 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center">
                            <User className="w-5 h-5 text-slate-400" />
                        </div>
                    </div>
                </header>

                {/* Content Outlet */}
                <main className="p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
