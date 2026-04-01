const asyncHandler = require('express-async-handler');
const Course = require('../models/Course');
const User = require('../models/User');

// @desc    Get all courses
// @route   GET /api/courses
// @access  Public
const getCourses = asyncHandler(async (req, res) => {
    const { keyword, category } = req.query;

    const query = {};

    if (keyword) {
        query.title = { $regex: keyword, $options: 'i' };
    }

    if (category && category !== 'All') {
        query.category = category;
    }

    const courses = await Course.find(query);
    res.status(200).json(courses);
});

// @desc    Get single course
// @route   GET /api/courses/:id
// @access  Public
const getCourseById = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        res.status(200).json(course);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Create a course
// @route   POST /api/courses
// @access  Private/Admin
const createCourse = asyncHandler(async (req, res) => {
    const { title, description, category, duration, price, imageUrl } = req.body;

    const course = await Course.create({
        title,
        description,
        category,
        duration,
        price,
        imageUrl,
    });

    res.status(201).json(course);
});

// @desc    Update a course
// @route   PUT /api/courses/:id
// @access  Private/Admin
const updateCourse = asyncHandler(async (req, res) => {
    const { title, description, category, duration, price, imageUrl } = req.body;

    const course = await Course.findById(req.params.id);

    if (course) {
        course.title = title || course.title;
        course.description = description || course.description;
        course.category = category || course.category;
        course.duration = duration || course.duration;
        course.price = price || course.price;
        course.imageUrl = imageUrl || course.imageUrl;

        const updatedCourse = await course.save();
        res.status(200).json(updatedCourse);
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Delete a course
// @route   DELETE /api/courses/:id
// @access  Private/Admin
const deleteCourse = asyncHandler(async (req, res) => {
    const course = await Course.findById(req.params.id);

    if (course) {
        await course.deleteOne();
        res.status(200).json({ message: 'Course removed' });
    } else {
        res.status(404);
        throw new Error('Course not found');
    }
});

// @desc    Enroll in a course
// @route   POST /api/courses/enroll/:id
// @access  Private
const enrollCourse = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id);
    const course = await Course.findById(req.params.id);

    if (!course) {
        res.status(404);
        throw new Error('Course not found');
    }

    if (user.enrolledCourses.includes(course._id)) {
        res.status(400);
        throw new Error('Already enrolled in this course');
    }

    user.enrolledCourses.push(course._id);
    await user.save();

    res.status(200).json({ message: 'Enrolled successfully' });
});

// @desc    Get user enrolled courses
// @route   GET /api/courses/user/enrolled
// @access  Private
const getUserEnrolledCourses = asyncHandler(async (req, res) => {
    const user = await User.findById(req.user._id).populate('enrolledCourses');
    res.status(200).json(user.enrolledCourses);
});

module.exports = {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    getUserEnrolledCourses,
};
