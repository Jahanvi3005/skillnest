import { useState, useEffect } from 'react';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { 
    Plus, Edit, Trash2, LayoutDashboard, BookOpen, Users, BarChart3, 
    Settings, Search, Loader2, X, Save, ArrowRight, TrendingUp
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';

const AdminDashboard = () => {
    const { user } = useAuth();
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);
    const [activeTab, setActiveTab] = useState('courses');

    // Form states
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: 'Web Development',
        duration: '',
        price: '',
        imageUrl: ''
    });

    const categories = ['Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cybersecurity', 'Other'];

    useEffect(() => {
        fetchCourses();
    }, []);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await api.get('/courses');
            setCourses(res.data);
        } catch (error) {
            toast.error('Error loading courses');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const resetForm = () => {
        setFormData({
            title: '',
            description: '',
            category: 'Web Development',
            duration: '',
            price: '',
            imageUrl: ''
        });
        setEditingCourse(null);
    };

    const handleEdit = (course) => {
        setEditingCourse(course);
        setFormData({
            title: course.title,
            description: course.description,
            category: course.category,
            duration: course.duration,
            price: course.price,
            imageUrl: course.imageUrl
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this course?')) {
            try {
                await api.delete(`/courses/${id}`);
                setCourses(courses.filter(c => c._id !== id));
                toast.success('Course deleted successfully');
            } catch (error) {
                toast.error('Failed to delete course');
            }
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingCourse) {
                const res = await api.put(`/courses/${editingCourse._id}`, formData);
                setCourses(courses.map(c => c._id === editingCourse._id ? res.data : c));
                toast.success('Course updated');
            } else {
                const res = await api.post('/courses', formData);
                setCourses([...courses, res.data]);
                toast.success('Course created');
            }
            setIsModalOpen(false);
            resetForm();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    return (
        <div className="flex min-h-screen bg-[#f8fafc] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto w-full flex gap-8">
                {/* Sidebar */}
                <aside className="w-72 hidden lg:flex flex-col gap-6">
                    <div className="glass p-6 rounded-[2.5rem] border-white/40 shadow-premium">
                        <div className="mb-10 flex items-center gap-3 px-2">
                             <div className="h-10 w-10 rounded-2xl bg-primary/10 flex items-center justify-center text-primary font-black">
                                <LayoutDashboard className="h-5 w-5" />
                            </div>
                            <h2 className="text-lg font-black text-slate-900 font-display">Console</h2>
                        </div>

                        <nav className="space-y-2">
                            {[
                                { id: 'dashboard', name: 'Overview', icon: BarChart3 },
                                { id: 'courses', name: 'Content Catalog', icon: BookOpen },
                                { id: 'users', name: 'Elite Students', icon: Users },
                                { id: 'settings', name: 'Systems', icon: Settings },
                            ].map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => setActiveTab(item.id)}
                                    className={`w-full flex items-center space-x-3 px-5 py-4 rounded-2xl font-bold transition-all duration-300 relative group ${
                                        activeTab === item.id 
                                        ? 'text-primary' 
                                        : 'text-slate-500 hover:text-slate-900 hover:bg-white/50'
                                    }`}
                                >
                                    <item.icon className="h-5 w-5" />
                                    <span>{item.name}</span>
                                    {activeTab === item.id && (
                                        <motion.div 
                                            layoutId="active-pill"
                                            className="absolute inset-0 bg-primary/5 rounded-2xl z-[-1]"
                                        />
                                    )}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-12 p-6 bg-slate-950 rounded-[2rem] text-white overflow-hidden relative group">
                            <div className="relative z-10">
                                <p className="text-[10px] font-black uppercase tracking-widest text-primary mb-2">Pro Access</p>
                                <p className="text-xs font-bold text-slate-400 mb-4 leading-relaxed">You are running the Master Console v2.0</p>
                                <button className="text-xs font-black flex items-center gap-2 text-white group-hover:gap-3 transition-all">
                                    <span>View Logs</span>
                                    <ArrowRight className="h-3 w-3" />
                                </button>
                            </div>
                            <div className="absolute -right-4 -bottom-4 w-20 h-20 bg-primary/20 blur-2xl rounded-full" />
                        </div>
                    </div>
                </aside>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    <header className="flex flex-col md:flex-row md:items-center justify-between mb-10">
                        <div>
                            <div className="flex items-center gap-2 text-xs font-black text-slate-400 uppercase tracking-widest mb-2">
                                <span>Platform</span>
                                <span className="h-1 w-1 rounded-full bg-slate-300" />
                                <span className="text-primary">{activeTab}</span>
                            </div>
                            <h1 className="text-4xl font-black text-slate-900 tracking-tight font-display">
                                {activeTab === 'courses' ? 'Master Catalog' : 'Platform Analytics'}
                            </h1>
                        </div>
                        <div className="flex items-center gap-4 mt-6 md:mt-0">
                            <div className="relative group hidden sm:block">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400 group-focus-within:text-primary transition-colors" />
                                <input 
                                    type="text" 
                                    placeholder="Jump to..." 
                                    className="input-premium pl-12 w-48 focus:w-64 h-12"
                                />
                            </div>
                            <button 
                                onClick={() => { resetForm(); setIsModalOpen(true); }}
                                className="btn btn-primary h-12 px-6 shadow-glow whitespace-nowrap"
                            >
                                <Plus className="h-5 w-5" />
                                <span>New Course</span>
                            </button>
                        </div>
                    </header>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                        {[
                            { label: 'Revenue', value: '$24,500', trend: '+12%', icon: BarChart3, color: 'text-primary', bg: 'bg-primary/10' },
                            { label: 'Live Courses', value: courses.length, trend: 'Stable', icon: BookOpen, color: 'text-secondary', bg: 'bg-secondary/10' },
                            { label: 'Students', value: '1,248', trend: '+8.4%', icon: Users, color: 'text-indigo-600', bg: 'bg-indigo-50' },
                            { label: 'Uptime', value: '99.9%', trend: 'Peak', icon: TrendingUp, color: 'text-rose-600', bg: 'bg-rose-50' },
                        ].map((stat, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-4">
                                    <div className={`p-3 rounded-2xl ${stat.bg} ${stat.color}`}>
                                        <stat.icon className="h-5 w-5" />
                                    </div>
                                    <span className="text-[10px] font-black px-2 py-1 bg-slate-50 text-slate-400 rounded-lg">{stat.trend}</span>
                                </div>
                                <p className="text-xs font-black text-slate-400 uppercase tracking-widest leading-none mb-1">{stat.label}</p>
                                <h3 className="text-2xl font-black text-slate-900">{stat.value}</h3>
                            </motion.div>
                        ))}
                    </div>

                    {/* Table Area */}
                    <section className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden p-2">
                        {loading ? (
                            <div className="flex flex-col items-center justify-center py-32">
                                <Loader2 className="h-10 w-10 text-primary animate-spin mb-4" />
                                <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Syncing Cloud...</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-slate-50">
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Identification</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Category</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Value</th>
                                            <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">Operations</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-50">
                                        {courses.map((course) => (
                                            <tr key={course._id} className="group hover:bg-slate-50/50 transition-all duration-300">
                                                <td className="px-8 py-6">
                                                    <div className="flex items-center gap-4">
                                                        <div className="h-14 w-14 rounded-2xl overflow-hidden shadow-sm">
                                                            <img src={course.imageUrl} className="h-full w-full object-cover group-hover:scale-110 transition-transform duration-500" alt="" />
                                                        </div>
                                                        <div>
                                                            <p className="font-black text-slate-950 text-sm leading-tight mb-1">{course.title}</p>
                                                            <p className="text-xs text-slate-400 font-bold">{course.duration} • Published</p>
                                                        </div>
                                                    </div>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="px-3 py-1.5 rounded-xl text-[10px] font-black bg-slate-50 text-slate-500 uppercase tracking-wider group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                                                        {course.category}
                                                    </span>
                                                </td>
                                                <td className="px-8 py-6">
                                                    <span className="font-black text-slate-950">${course.price}</span>
                                                </td>
                                                <td className="px-8 py-6 text-right">
                                                    <div className="flex items-center justify-end gap-2">
                                                        <button 
                                                            onClick={() => handleEdit(course)} 
                                                            className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-primary hover:bg-primary/10 rounded-xl transition-all"
                                                        >
                                                            <Edit className="h-5 w-5" />
                                                        </button>
                                                        <button 
                                                            onClick={() => handleDelete(course._id)} 
                                                            className="h-10 w-10 flex items-center justify-center text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-xl transition-all"
                                                        >
                                                            <Trash2 className="h-5 w-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </section>
                </div>
            </div>

            {/* Modal Overlay */}
            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsModalOpen(false)}
                            className="absolute inset-0 bg-slate-950/40 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.9, y: 40 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 40 }}
                            className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl relative z-10 overflow-hidden"
                        >
                            <div className="p-10 border-b border-slate-50 flex items-center justify-between">
                                <div>
                                    <h2 className="text-3xl font-black text-slate-950 font-display">
                                        {editingCourse ? 'Editor' : 'Protocol'}
                                    </h2>
                                    <p className="text-slate-400 text-sm font-bold uppercase tracking-widest mt-1">Course Configuration</p>
                                </div>
                                <button onClick={() => setIsModalOpen(false)} className="h-12 w-12 flex items-center justify-center hover:bg-slate-50 rounded-2xl transition-colors">
                                    <X className="h-6 w-6 text-slate-400" />
                                </button>
                            </div>

                            <form onSubmit={handleSubmit} className="p-10 space-y-8">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="col-span-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Canonical Title</label>
                                        <input 
                                            name="title" 
                                            value={formData.title} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="input-premium h-14" 
                                            placeholder="Deep Dive into Architecture" 
                                        />
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">System Category</label>
                                        <select 
                                            name="category" 
                                            value={formData.category} 
                                            onChange={handleInputChange} 
                                            className="input-premium h-14 appearance-none"
                                        >
                                            {categories.map(c => <option key={c} value={c}>{c}</option>)}
                                        </select>
                                    </div>
                                    <div>
                                        <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">Price ($)</label>
                                        <input 
                                            type="number" 
                                            name="price" 
                                            value={formData.price} 
                                            onChange={handleInputChange} 
                                            required 
                                            className="input-premium h-14" 
                                            placeholder="499" 
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-end gap-4 pt-6 border-t border-slate-50">
                                    <button 
                                        type="button" 
                                        onClick={() => setIsModalOpen(false)} 
                                        className="px-8 py-3 text-sm font-black text-slate-400 hover:text-slate-600 transition-colors"
                                    >
                                        Cancel
                                    </button>
                                    <button 
                                        type="submit" 
                                        className="btn btn-primary px-12 py-4 shadow-glow"
                                    >
                                        <Save className="h-5 w-5" />
                                        <span>{editingCourse ? 'Commit Changes' : 'Initialize Unit'}</span>
                                    </button>
                                </div>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdminDashboard;
