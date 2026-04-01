import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { useAuth } from '../context/AuthContext';
import { CheckCircle2, Clock, Calendar, Users, Star, Award, ShieldCheck, Loader2, ArrowLeft } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { motion } from 'framer-motion';

const CourseDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [course, setCourse] = useState(null);
    const [loading, setLoading] = useState(true);
    const [enrolling, setEnrolling] = useState(false);

    useEffect(() => {
        fetchCourse();
    }, [id]);

    const fetchCourse = async () => {
        try {
            const res = await api.get(`/courses/${id}`);
            setCourse(res.data);
        } catch (error) {
            toast.error('Course not found');
            navigate('/courses');
        } finally {
            setLoading(false);
        }
    };

    const handleEnroll = async () => {
        if (!user) {
            toast.error('Please login to enroll');
            navigate('/login');
            return;
        }

        setEnrolling(true);
        try {
            await api.post(`/courses/enroll/${id}`);
            toast.success('Successfully enrolled!');
            navigate('/dashboard');
        } catch (error) {
            toast.error(error.response?.data?.message || 'Enrollment failed');
        } finally {
            setEnrolling(false);
        }
    };

    if (loading) return (
        <div className="flex items-center justify-center min-h-screen">
            <Loader2 className="h-12 w-12 text-primary animate-spin" />
        </div>
    );

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <button
                onClick={() => navigate(-1)}
                className="flex items-center text-gray-500 hover:text-primary transition-colors mb-8 group"
            >
                <ArrowLeft className="h-5 w-5 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Courses
            </button>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                {/* Left Column: Details */}
                <div className="lg:col-span-2 space-y-12">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <span className="px-3 py-1 text-sm font-bold bg-primary/10 text-primary rounded-full uppercase tracking-wider">
                            {course.category}
                        </span>
                        <h1 className="text-4xl font-black text-gray-900 mt-4 leading-tight">
                            {course.title}
                        </h1>
                        <div className="flex items-center mt-6 space-x-6 text-sm text-gray-500">
                            <div className="flex items-center">
                                <Users className="h-5 w-5 mr-2 text-primary" />
                                <span className="font-medium text-gray-700">1.2k+ Enrolled</span>
                            </div>
                            <div className="flex items-center">
                                <Star className="h-5 w-5 mr-2 text-yellow-400 fill-current" />
                                <span className="font-medium text-gray-700">4.8 (256 reviews)</span>
                            </div>
                            <div className="flex items-center">
                                <ShieldCheck className="h-5 w-5 mr-2 text-secondary" />
                                <span className="font-medium text-gray-700">Certified Course</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                            Description
                        </h2>
                        <div className="prose prose-indigo max-w-none text-gray-600 leading-relaxed">
                            <p>{course.description}</p>
                            <p className="mt-4">
                                This comprehensive {course.category} program is designed for students of all levels. 
                                By the end of this course, you will have built several real-world projects and 
                                gained hands-on experience that industry leaders value.
                            </p>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">What you'll learn</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Comprehensive understanding of core concepts",
                                "Hands-on projects with real-world applications",
                                "Industry-standard best practices and patterns",
                                "Exclusive community access and peer support",
                                "Lifetime access to all future updates",
                                "Verifiable certificate upon completion"
                            ].map((item, i) => (
                                <div key={i} className="flex items-start">
                                    <CheckCircle2 className="h-5 w-5 text-secondary mr-3 mt-0.5" />
                                    <span className="text-gray-600">{item}</span>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>

                {/* Right Column: Sidebar */}
                <div className="lg:col-span-1">
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="bg-white rounded-3xl shadow-2xl border border-gray-100 overflow-hidden sticky top-32"
                    >
                        <div className="relative h-56">
                            <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            <div className="absolute bottom-4 left-6 text-white">
                                <span className="text-xs uppercase font-bold tracking-widest opacity-80 decoration-primary underline underline-offset-4">Premium Program</span>
                            </div>
                        </div>
                        
                        <div className="p-8">
                            <div className="flex items-baseline mb-8">
                                <span className="text-4xl font-black text-gray-900">${course.price}</span>
                                <span className="ml-2 text-gray-400 line-through text-lg font-medium">$199.99</span>
                                <span className="ml-auto text-secondary font-bold text-sm bg-secondary/10 px-2 py-1 rounded-lg">80% OFF</span>
                            </div>

                            <div className="space-y-6 mb-8">
                                <div className="flex items-center text-gray-600">
                                    <Clock className="h-5 w-5 mr-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Duration</span>
                                        <span className="font-semibold text-gray-900">{course.duration}</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Calendar className="h-5 w-5 mr-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Structure</span>
                                        <span className="font-semibold text-gray-900">Self-Paced Learning</span>
                                    </div>
                                </div>
                                <div className="flex items-center text-gray-600">
                                    <Award className="h-5 w-5 mr-4 text-primary" />
                                    <div className="flex flex-col">
                                        <span className="text-xs text-gray-400">Level</span>
                                        <span className="font-semibold text-gray-900">Beginner to Advanced</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleEnroll}
                                disabled={enrolling}
                                className="btn btn-primary w-full py-4 text-lg font-black shadow-primary/30 uppercase tracking-wide flex items-center justify-center space-x-2"
                            >
                                {enrolling ? (
                                    <>
                                        <Loader2 className="h-6 w-6 animate-spin mr-2" />
                                        <span>Processing...</span>
                                    </>
                                ) : (
                                    <>
                                        <span>Enroll Now</span>
                                        <CheckCircle2 className="h-5 w-5 ml-1" />
                                    </>
                                )}
                            </button>

                            <p className="mt-6 text-center text-xs text-gray-400">
                                30-Day Money-Back Guarantee
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default CourseDetail;
