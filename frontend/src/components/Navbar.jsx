import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { LogOut, LayoutDashboard, Menu, X, ArrowRight } from 'lucide-react';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const navLinks = [
        { name: 'Courses', path: '/courses' },
        ...(user ? [{ name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }] : []),
        ...(isAdmin() ? [{ name: 'Admin', path: '/admin' }] : []),
    ];

    return (
        <nav className={`nav-glass ${scrolled ? 'py-2 w-[95%] border-white/60 bg-white/80' : 'py-4'}`}>
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link to="/" className="flex items-center gap-3 transition-opacity hover:opacity-80">
                    <img src="/favicon.svg" alt="SkillNest Logo" className="h-9 w-9" />
                </Link>

                <div className="hidden md:flex items-center space-x-1">
                    {navLinks.map((link) => (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`px-5 py-2 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-2 relative group ${
                                location.pathname === link.path 
                                ? 'text-primary' 
                                : 'text-slate-500 hover:text-slate-900'
                            }`}
                        >
                            {link.icon && <link.icon className="h-4 w-4" />}
                            <span>{link.name}</span>
                            {location.pathname === link.path && (
                                <motion.div 
                                    layoutId="nav-pill"
                                    className="absolute inset-0 bg-primary/5 rounded-xl z-[-1]"
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-2/3" />
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center space-x-4 ml-6 pl-6 border-l border-slate-100">
                            <div className="flex flex-col text-right">
                                <p className="text-xs font-black text-slate-900 leading-none">{user.name}</p>
                                <p className="text-[10px] text-primary font-bold uppercase tracking-widest mt-1 opacity-70">
                                    {user.role}
                                </p>
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="p-2.5 bg-slate-50 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all duration-300"
                            >
                                <LogOut className="h-5 w-5" />
                            </button>
                        </div>
                    ) : (
                        <div className="flex items-center space-x-2 ml-6">
                            <Link to="/login" className="px-5 py-2 text-sm font-bold text-slate-600 hover:text-slate-900">
                                Login
                            </Link>
                            <Link to="/register" className="btn btn-primary h-11 text-sm shadow-primary/20 group">
                                <span>Get Started</span>
                                <ArrowRight className="h-4 w-4 transform group-hover:translate-x-1 transition-transform" />
                            </Link>
                        </div>
                    )}
                </div>

                <div className="md:hidden flex items-center">
                    <button
                        onClick={() => setIsOpen(!isOpen)}
                        className="p-2 rounded-2xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                        {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>
            </div>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: -20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        className="md:hidden mt-4 pt-4 border-t border-slate-100 space-y-2"
                    >
                        {navLinks.map((link) => (
                            <Link 
                                key={link.path}
                                to={link.path} 
                                onClick={() => setIsOpen(false)} 
                                className="flex items-center space-x-3 px-4 py-3 rounded-2xl font-bold text-slate-600 hover:bg-primary/5 hover:text-primary transition-all"
                            >
                                {link.icon && <link.icon className="h-5 w-5" />}
                                <span>{link.name}</span>
                            </Link>
                        ))}
                        {!user && (
                            <Link 
                                to="/register" 
                                onClick={() => setIsOpen(false)} 
                                className="flex items-center justify-center space-x-3 px-4 py-4 rounded-2xl font-black bg-primary text-white shadow-xl"
                            >
                                <span>Join Now</span>
                                <ArrowRight className="h-5 w-5" />
                            </Link>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
