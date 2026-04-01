import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { motion } from 'framer-motion';
import { User, Mail, Lock, UserPlus } from 'lucide-react';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [loading, setLoading] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await register(name, email, password, role);
            if (role === 'admin') {
                navigate('/admin');
            } else {
                navigate('/dashboard');
            }
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4 py-12 sm:px-6 lg:px-8">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100"
            >
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900 tracking-tight">
                        Create your Account
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Join SkillNest and start learning today.
                    </p>
                </div>
                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Full Name</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <User className="h-5 w-5" />
                                </span>
                                <input
                                    type="text"
                                    required
                                    className="input pl-10"
                                    placeholder="John Doe"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Email Address</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Mail className="h-5 w-5" />
                                </span>
                                <input
                                    type="email"
                                    required
                                    className="input pl-10"
                                    placeholder="john@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
                            <div className="relative">
                                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-gray-400">
                                    <Lock className="h-5 w-5" />
                                </span>
                                <input
                                    type="password"
                                    required
                                    className="input pl-10"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>
                        
                        <div>
                            <label className="text-sm font-medium text-gray-700 mb-2 block">I am joining as a:</label>
                            <div className="flex space-x-4">
                                <button
                                    type="button"
                                    onClick={() => setRole('user')}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${role === 'user' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'}`}
                                >
                                    Student
                                </button>
                                <button
                                    type="button"
                                    onClick={() => setRole('admin')}
                                    className={`flex-1 py-3 px-4 rounded-xl border-2 transition-all ${role === 'admin' ? 'border-primary bg-primary/5 text-primary' : 'border-gray-100 text-gray-500'}`}
                                >
                                    Instructor
                                </button>
                            </div>
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative w-full flex justify-center py-3.5 px-4 border border-transparent text-sm font-bold rounded-xl text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all disabled:opacity-50"
                    >
                        <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                            <UserPlus className="h-5 w-5 text-indigo-300 group-hover:text-indigo-100 transition-colors" />
                        </span>
                        {loading ? 'Creating Account...' : 'Get Started'}
                    </button>

                    <div className="text-center text-sm text-gray-600 mt-4">
                        Already have an account?{' '}
                        <Link to="/login" className="font-medium text-primary hover:text-primary-dark transition-colors">
                            Sign in instead
                        </Link>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default Register;
