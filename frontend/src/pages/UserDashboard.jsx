import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import CourseCard from '../components/CourseCard';
import { BookOpen, Calendar, GraduationCap, Award, Loader2, ArrowRight, Sparkles, Zap, Target } from 'lucide-react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { user } = useAuth();
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnrolledCourses = async () => {
            try {
                const res = await api.get('/courses/user/enrolled');
                setEnrolledCourses(res.data);
            } catch (error) {
                console.error('Error fetching enrolled courses', error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnrolledCourses();
    }, []);

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen bg-mesh">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
            {/* Premium Greeting Card */}
            <div className="mb-16">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative overflow-hidden bg-slate-950 rounded-[3rem] p-10 md:p-14 text-white shadow-2xl"
                >
                    <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                        <div>
                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-primary/20 rounded-lg text-primary text-[10px] font-black uppercase tracking-widest mb-6">
                                <Sparkles className="h-3 w-3" />
                                <span>Active Learner</span>
                            </div>
                            <h1 className="text-4xl md:text-6xl font-black mb-4 tracking-tighter font-display">
                                Rise & Grind, <br /> 
                                <span className="text-primary italic">{user?.name.split(' ')[0]}!</span>
                            </h1>
                            <p className="text-slate-400 font-medium text-lg max-w-md">
                                You've mastered 12 concepts this week. You're in the top 5% of builders.
                            </p>
                        </div>

                        <div className="grid grid-cols-3 gap-4">
                            {[
                                { label: 'Courses', value: enrolledCourses.length, icon: BookOpen, color: 'text-primary' },
                                { label: 'Streaks', value: '4 Days', icon: Zap, color: 'text-amber-400' },
                                { label: 'XP Points', value: enrolledCourses.length * 150, icon: Target, color: 'text-secondary' },
                            ].map((stat, i) => (
                                <div key={i} className="bg-white/5 backdrop-blur-md border border-white/10 p-6 rounded-[2rem] text-center">
                                    <div className={`mb-3 flex justify-center ${stat.color}`}>
                                        <stat.icon className="h-6 w-6" />
                                    </div>
                                    <p className="text-[10px] font-black uppercase tracking-widest text-slate-500 mb-1">{stat.label}</p>
                                    <p className="text-xl font-black">{stat.value}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    
                    {/* Background decorations */}
                    <div className="absolute top-0 right-0 w-96 h-96 bg-primary/20 blur-[120px] rounded-full -mr-48 -mt-48" />
                    <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full -ml-32 -mb-32" />
                </motion.div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
                {/* Main Content: Courses */}
                <div className="lg:col-span-2">
                    <div className="flex items-center justify-between mb-10">
                        <div>
                            <h2 className="text-3xl font-black text-slate-900 tracking-tight font-display mb-1">
                                Continue Building
                            </h2>
                            <p className="text-slate-400 text-sm font-bold uppercase tracking-widest">Your Portfolio Path</p>
                        </div>
                        <Link to="/courses" className="h-12 px-6 flex items-center gap-2 text-primary font-black text-sm bg-primary/5 rounded-2xl hover:bg-primary/10 transition-all">
                            <span>Browse All</span>
                            <ArrowRight className="h-4 w-4" />
                        </Link>
                    </div>

                    {enrolledCourses.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {enrolledCourses.map((course, index) => (
                                <CourseCard key={course._id} course={course} />
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-32 bg-white rounded-[3rem] border border-slate-100 shadow-sm">
                            <div className="w-24 h-24 bg-slate-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8">
                                <GraduationCap className="h-12 w-12 text-slate-300" />
                            </div>
                            <h3 className="text-2xl font-black text-slate-900 mb-2">Initialize your path</h3>
                            <p className="text-slate-400 font-medium max-w-sm mx-auto mb-10">
                                You haven't chosen any modules yet. The future waits for no one.
                            </p>
                            <Link
                                to="/courses"
                                className="btn btn-primary px-12 py-5 shadow-glow"
                            >
                                <span>Get Started</span>
                            </Link>
                        </div>
                    )}
                </div>

                {/* Sidebar: Activity/Upcoming */}
                <div className="space-y-10">
                    <div className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm relative overflow-hidden">
                        <div className="relative z-10">
                            <h3 className="text-xl font-black text-slate-900 mb-8 flex items-center gap-3">
                                <Calendar className="h-6 w-6 text-primary" />
                                <span>Upcoming Quests</span>
                            </h3>
                            <div className="space-y-6">
                                {[
                                    { name: 'Architecture Quiz', time: 'Today, 2PM', tag: 'High XP' },
                                    { name: 'Portfolio Review', time: 'Tomorrow', tag: 'Expert' },
                                    { name: 'Community Hackathon', time: 'In 3 Days', tag: 'Global' }
                                ].map((item, i) => (
                                    <div key={i} className="flex gap-4 group cursor-pointer">
                                        <div className="w-1 h-12 bg-slate-100 rounded-full group-hover:bg-primary transition-colors duration-500" />
                                        <div className="flex-1">
                                            <div className="flex items-center justify-between mb-1">
                                                <span className="font-black text-slate-900 leading-none">{item.name}</span>
                                                <span className="text-[9px] font-black text-primary uppercase tracking-widest px-2 py-0.5 bg-primary/10 rounded-md">{item.tag}</span>
                                            </div>
                                            <span className="text-xs text-slate-400 font-bold">{item.time}</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="p-1 text-white bg-slate-950 rounded-[3rem] relative overflow-hidden group shadow-2xl">
                        <div className="p-10 relative z-10">
                            <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center mb-10 group-hover:bg-primary transition-colors duration-700">
                                <Award className="h-6 w-6 text-primary group-hover:text-white" />
                            </div>
                            <h3 className="text-2xl font-black mb-3">Foundry Access</h3>
                            <p className="text-slate-400 text-sm font-medium mb-10 leading-relaxed">Unlock dedicated 1-on-1 servers and architecture reviews.</p>
                            <button className="w-full py-4 bg-white text-slate-950 font-black rounded-2xl hover:scale-[1.02] active:scale-95 transition-all shadow-xl">
                                Upgrade Account
                            </button>
                        </div>
                        <div className="absolute -right-4 -bottom-4 w-32 h-32 bg-primary/20 blur-3xl rounded-full" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserDashboard;
