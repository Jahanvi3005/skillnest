import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Rocket, Target, Zap, Shield, Award, ArrowRight, PlayCircle, Star, CheckCircle, Sparkles } from 'lucide-react';

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen bg-mesh pt-32">
            <section className="relative pb-32 overflow-hidden">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <span className="inline-flex items-center px-4 py-2 rounded-2xl text-xs font-black bg-primary/10 text-primary border border-primary/20 mb-8 uppercase tracking-widest">
                                <Sparkles className="h-4 w-4 mr-2" />
                                Future-Proof Your Career
                            </span>
                            <h1 className="text-6xl md:text-8xl font-black text-slate-900 leading-[0.95] tracking-tighter mb-8 font-display">
                                Master every <span className="text-primary italic relative">
                                    Skill
                                    <motion.div 
                                        initial={{ width: 0 }}
                                        animate={{ width: '100%' }}
                                        transition={{ delay: 0.5, duration: 0.8 }}
                                        className="absolute -bottom-2 left-0 h-3 bg-secondary/20 -z-10 rounded-full" 
                                    />
                                </span> <br /> 
                                Inside <span className="text-slate-400">the Nest.</span>
                            </h1>
                            <p className="max-w-xl text-xl text-slate-500 font-medium leading-relaxed mb-10">
                                Skip the theory. Build real products with the world's best mentors. 
                                Join 50k+ students hacking their way to the top.
                            </p>
                            <div className="flex flex-col sm:flex-row items-center gap-6">
                                <Link to="/courses" className="btn btn-primary px-10 py-5 text-lg font-black shadow-primary/30 group">
                                    <span>Explore Catalog</span>
                                    <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                                </Link>
                                <Link to="/register" className="flex items-center gap-3 text-slate-900 font-bold hover:text-primary transition-all text-lg group">
                                    <div className="p-3 rounded-2xl bg-white shadow-premium group-hover:shadow-glow transition-all">
                                        <PlayCircle className="h-6 w-6 text-primary" />
                                    </div>
                                    <span>Watch Manifesto</span>
                                </Link>
                            </div>
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1, ease: "easeOut" }}
                            className="relative hidden lg:block"
                        >
                            <div className="relative w-full aspect-square">
                                <motion.div 
                                    animate={{ y: [0, -20, 0] }}
                                    transition={{ duration: 4, repeat: Infinity }}
                                    className="absolute top-10 left-10 w-64 h-80 bg-white shadow-premium rounded-[3rem] p-8 glass border border-white/40"
                                >
                                    <div className="w-12 h-12 bg-primary rounded-2xl mb-6 shadow-glow" />
                                    <div className="h-4 w-3/4 bg-slate-100 rounded-full mb-4" />
                                    <div className="h-4 w-1/2 bg-slate-100 rounded-full mb-8" />
                                    <div className="flex -space-x-4">
                                        {[1,2,3].map(i => (
                                            <div key={i} className="w-10 h-10 rounded-full border-4 border-white bg-slate-200" />
                                        ))}
                                    </div>
                                </motion.div>

                                <motion.div 
                                    animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
                                    transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                                    className="absolute bottom-10 right-0 w-72 h-48 bg-slate-950 shadow-2xl rounded-[35px] p-8"
                                >
                                    <div className="flex gap-2 mb-6">
                                        <div className="w-3 h-3 bg-red-500 rounded-full" />
                                        <div className="w-3 h-3 bg-yellow-500 rounded-full" />
                                        <div className="w-3 h-3 bg-green-500 rounded-full" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="h-2 w-full bg-slate-800 rounded-full" />
                                        <div className="h-2 w-2/3 bg-slate-800 rounded-full" />
                                        <div className="h-2 w-5/6 bg-primary/40 rounded-full" />
                                    </div>
                                </motion.div>

                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-primary/5 rounded-full blur-[120px] -z-10 animate-pulse" />
                            </div>
                        </motion.div>
                    </div>

                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1 }}
                        className="mt-32 text-center"
                    >
                        <p className="text-xs font-black text-slate-400 uppercase tracking-[0.2em] mb-12">Hiring partners across the globe</p>
                        <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-30">
                            {['STRIPE', 'FIGMA', 'AIRBNB', 'LINEAR', 'VERCEL'].map(brand => (
                                <span key={brand} className="text-3xl font-black font-display tracking-tighter">{brand}</span>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </section>

            <section className="py-40 bg-white rounded-[5rem] shadow-[-20px_-20px_60px_rgba(0,0,0,0.02)] relative z-20">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl md:text-6xl font-black text-slate-950 tracking-tight mb-6 font-display">
                            Build <span className="text-primary italic">Better.</span> <br /> 
                            Learn Faster.
                        </h2>
                        <p className="text-slate-500 text-xl max-w-2xl mx-auto font-medium">The ecosystem designed for high-performance learners.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            { 
                                title: 'Direct Mentorship', 
                                desc: '1-on-1 sessions with senior engineers from top tier tech companies.',
                                icon: Target,
                                color: 'text-blue-600',
                                bg: 'bg-blue-50'
                            },
                            { 
                                title: 'Project First', 
                                desc: 'No passive learning. You build robust portfolios that get you hired.',
                                icon: Award,
                                color: 'text-indigo-600',
                                bg: 'bg-indigo-50'
                            },
                            { 
                                title: 'Global Network', 
                                desc: 'Join an elite community of founders, builders, and creators.',
                                icon: Shield,
                                color: 'text-emerald-600',
                                bg: 'bg-emerald-50'
                            }
                        ].map((feature, i) => (
                            <motion.div 
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="card-premium group"
                            >
                                <div className="p-10">
                                    <div className={`${feature.bg} ${feature.color} w-20 h-20 rounded-[2rem] flex items-center justify-center mb-10 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500`}>
                                        <feature.icon className="h-10 w-10" />
                                    </div>
                                    <h3 className="text-2xl font-black text-slate-900 mb-4">{feature.title}</h3>
                                    <p className="text-slate-500 leading-relaxed font-semibold text-lg">{feature.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="py-32 relative overflow-hidden">
                <div className="max-w-6xl mx-auto px-4 text-center">
                   <div className="bg-slate-950 rounded-[4rem] p-16 md:p-32 text-white relative shadow-2xl">
                        <div className="relative z-10">
                            <h2 className="text-5xl md:text-7xl font-black mb-8 font-display">Start your <br /> <span className="text-primary italic">ascension.</span></h2>
                            <p className="text-slate-400 text-xl mb-12 max-w-xl mx-auto font-medium">Ready to join the world's most aggressive learning community?</p>
                            <Link to="/register" className="btn btn-primary inline-flex px-12 py-6 text-xl mx-auto group">
                                <span>Join the Nest</span>
                                <Rocket className="h-6 w-6 group-hover:-translate-y-1 transition-transform" />
                            </Link>
                        </div>
                        <div className="absolute top-0 right-0 w-80 h-80 bg-primary/20 blur-[120px] rounded-full" />
                        <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary/10 blur-[100px] rounded-full" />
                   </div>
                </div>
            </section>

            <footer className="py-32 bg-slate-50 border-t border-slate-100">
                <div className="max-w-7xl mx-auto px-6 text-center">
                    <div className="flex flex-col items-center gap-12">
                        <div className="flex items-center gap-4">
                            <img src="/favicon.svg" alt="SkillNest Logo" className="h-10 w-10" />
                            <span className="text-3xl font-black text-slate-900 font-display">SkillNest</span>
                        </div>
                        <nav className="flex flex-wrap justify-center gap-6 text-slate-400">
                            <a href="https://x.com/JahanviGupta18" target="_blank" rel="noopener noreferrer" className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl hover:text-primary hover:shadow-glow transition-all duration-300">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M18.901 1.153h3.68l-8.04 9.19 9.457 12.5H16.59l-5.79-7.57-6.63 7.57h-3.682l8.602-9.834L0 1.154h7.59l5.215 6.894 6.097-6.894Zm-1.292 19.494h2.039L6.486 3.24h-2.19l13.313 17.407Z" />
                                </svg>
                            </a>
                            <a href="https://www.linkedin.com/in/jahanvi-gupta-0a1957268" target="_blank" rel="noopener noreferrer" className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl hover:text-primary hover:shadow-glow transition-all duration-300">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                                </svg>
                            </a>
                            <a href="#" className="p-3 bg-white shadow-sm border border-slate-100 rounded-2xl hover:text-primary hover:shadow-glow transition-all duration-300">
                                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                                    <path fillRule="evenodd" d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" clipRule="evenodd" />
                                </svg>
                            </a>
                        </nav>
                        <p className="text-slate-400 font-medium">
                            © 2026 SkillNest Inc. Built for the dreamers and the doers.
                        </p>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Home;
