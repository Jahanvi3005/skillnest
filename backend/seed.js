const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Course = require('./models/Course');

dotenv.config();

const courses = [
    {
        title: 'Fullstack AI Development',
        description: 'Learn to build and deploy intelligent web applications using modern AI stacks (OpenAI, LangChain, Vercel).',
        category: 'Web Development',
        duration: '24 Hours',
        price: 199,
        instructor: 'Dr. Sarah Chen',
        imageUrl: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Advanced UI Typography',
        description: 'Master the art of high-end digital styling, mesh gradients, and sophisticated typographic hierarchy.',
        category: 'UI/UX Design',
        duration: '12 Hours',
        price: 149,
        instructor: 'Julian Moretti',
        imageUrl: 'https://images.unsplash.com/photo-1558655146-d09347e92766?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Ethical Hacking Lab',
        description: 'Intensive deep-dive into digital security, penetration testing, and protecting distributed networks.',
        category: 'Cybersecurity',
        duration: '36 Hours',
        price: 299,
        instructor: 'Markus Vane',
        imageUrl: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Cloud Architecture Masterclass',
        description: 'Strategize and deploy scalable architectures on AWS, GCP, and Azure with serverless protocols.',
        category: 'Cloud Computing',
        duration: '40 Hours',
        price: 399,
        instructor: 'Elena Zhang',
        imageUrl: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Neural Networks for Builders',
        description: 'Build your first deep learning models from scratch. Practical mathematics for the modern engineer.',
        category: 'Data Science',
        duration: '30 Hours',
        price: 249,
        instructor: 'Prof. Liam O\'Brien',
        imageUrl: 'https://images.unsplash.com/photo-1507146426996-ef05306b995a?auto=format&fit=crop&w=1200&q=80'
    },
    {
        title: 'Native iOS with Swift',
        description: 'Develop premium mobile experiences for the Apple ecosystem using SwiftUI and Combine.',
        category: 'Mobile Development',
        duration: '28 Hours',
        price: 179,
        instructor: 'Hiroshi Tanaka',
        imageUrl: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=1200&q=80'
    }
];

const seedDB = async () => {
    try {
        console.log('Connecting to database...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to Database');

        console.log('Clearing existing courses...');
        await Course.deleteMany({});
        console.log('Database cleared');

        console.log('Seeding initial catalogs...');
        await Course.insertMany(courses);
        console.log('Database seeded successfully');

        process.exit();
    } catch (error) {
        console.error('Seeding encountered an error:', error);
        process.exit(1);
    }
};

seedDB();
