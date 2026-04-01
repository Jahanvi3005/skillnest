import { motion } from 'framer-motion';
import { Clock, User, Star, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CourseCard = ({ course }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            whileHover={{ y: -12 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="card-premium group flex flex-col h-full bg-white relative"
        >
            {/* Image section with glass badge */}
            <div className="relative h-56 overflow-hidden rounded-[1.8rem] m-2">
                <img
                    src={course.imageUrl}
                    alt={course.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-4 left-4">
                    <span className="px-4 py-1.5 text-[10px] font-black uppercase tracking-widest bg-white/90 backdrop-blur-md text-primary rounded-xl shadow-lg border border-white/20">
                        {course.category}
                    </span>
                </div>
                <div className="absolute bottom-4 right-4 translate-y-10 group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-500">
                    <Link
                        to={`/courses/${course._id}`}
                        className="p-3 bg-primary text-white rounded-2xl shadow-glow"
                    >
                        <ArrowRight className="h-5 w-5" />
                    </Link>
                </div>
            </div>

            <div className="p-7 flex flex-col flex-grow">
                <div className="flex items-center space-x-1.5 text-amber-400 mb-3">
                    <Star className="h-4 w-4 fill-current" />
                    <span className="text-sm font-black text-slate-900">4.9</span>
                    <span className="text-xs text-slate-400 font-bold">(1.2k)</span>
                </div>

                <h3 className="text-xl font-black text-slate-900 group-hover:text-primary transition-colors leading-tight mb-3 font-display">
                    {course.title}
                </h3>
                
                <p className="text-slate-500 text-sm font-medium line-clamp-2 leading-relaxed mb-6 flex-grow">
                    {course.description}
                </p>

                <div className="flex items-center justify-between pt-6 border-t border-slate-50">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-1.5 text-slate-400">
                            <Clock className="h-4 w-4" />
                            <span className="text-xs font-bold">{course.duration}</span>
                        </div>
                        <div className="flex items-center space-x-1.5 text-slate-400">
                            <User className="h-4 w-4" />
                            <span className="text-xs font-bold">{course.instructor || 'Academy'}</span>
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest">Price</span>
                        <span className="text-2xl font-black text-slate-950">${course.price}</span>
                    </div>
                    <Link
                        to={`/courses/${course._id}`}
                        className="btn btn-primary h-12 px-6 text-sm group"
                    >
                        <span>Full Details</span>
                    </Link>
                </div>
            </div>
        </motion.div>
    );
};

export default CourseCard;
