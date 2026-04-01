const mongoose = require('mongoose');

const courseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Course title is required'],
        trim: true,
    },
    description: {
        type: String,
        required: [true, 'Description is required'],
    },
    category: {
        type: String,
        required: [true, 'Category is required'],
        enum: ['Web Development', 'Mobile Development', 'Data Science', 'UI/UX Design', 'Cloud Computing', 'Cybersecurity', 'Other'],
    },
    duration: {
        type: String,
        required: [true, 'Duration is required'],
    },
    price: {
        type: Number,
        required: [true, 'Price is required'],
    },
    instructor: {
        type: String,
        default: 'SkillNest Instructor',
    },
    imageUrl: {
        type: String,
        default: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    },
}, {
    timestamps: true,
});

module.exports = mongoose.model('Course', courseSchema);
