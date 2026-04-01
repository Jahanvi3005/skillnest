import { useState, useEffect } from 'react';
import api from '../api/axios';
import CourseCard from '../components/CourseCard';
import { Search, Filter, SlidersHorizontal, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

const CourseListing = () => {
    const [courses, setCourses] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [category, setCategory] = useState('All');

    const categories = ['All', 'Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cybersecurity'];

    useEffect(() => {
        fetchCourses();
    }, [searchTerm, category]);

    const fetchCourses = async () => {
        setLoading(true);
        try {
            const res = await api.get(`/courses`, {
                params: {
                    keyword: searchTerm,
                    category: category === 'All' ? undefined : category
                }
            });
            setCourses(res.data);
        } catch (error) {
            console.error('Error fetching courses', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
            {/* Header section */}
            <div className="mb-12 text-center md:text-left">
                <h1 className="text-4xl font-extrabold text-gray-900 tracking-tight sm:text-5xl">
                    Master any <span className="text-primary italic">Skill</span>
                </h1>
                <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                    Explore high-quality courses from expert instructors and start your learning journey today.
                </p>
                
                {/* Search and Filters */}
                <div className="mt-8 flex flex-col md:flex-row gap-4">
                    <div className="relative flex-grow">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
                        <input
                            type="text"
                            placeholder="Search for courses (e.g. React, Node...)"
                            className="input pl-10 h-12 text-base shadow-sm"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                        <div className="relative min-w-[160px]">
                            <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                            <select
                                className="input pl-9 h-12 appearance-none shadow-sm cursor-pointer"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {categories.map(c => (
                                    <option key={c} value={c}>{c}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Course Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-24">
                    <Loader2 className="h-12 w-12 text-primary animate-spin mb-4" />
                    <p className="text-gray-500 font-medium animate-pulse">Finding the best courses for you...</p>
                </div>
            ) : courses.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8">
                    {courses.map((course, index) => (
                        <motion.div
                            key={course._id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <CourseCard course={course} />
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-2xl border-2 border-dashed border-gray-200">
                    <SlidersHorizontal className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-gray-900">No courses found</h3>
                    <p className="mt-2 text-gray-500 max-w-sm mx-auto">
                        We couldn't find any courses matching your search. Try adjusting your filters or keywords.
                    </p>
                    <button
                        onClick={() => { setSearchTerm(''); setCategory('All'); }}
                        className="mt-6 text-primary font-bold hover:underline"
                    >
                        Clear All Filters
                    </button>
                </div>
            )}
        </div>
    );
};

export default CourseListing;
