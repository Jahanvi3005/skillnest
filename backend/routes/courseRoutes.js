const express = require('express');
const router = express.Router();
const {
    getCourses,
    getCourseById,
    createCourse,
    updateCourse,
    deleteCourse,
    enrollCourse,
    getUserEnrolledCourses,
} = require('../controllers/courseController');
const { protect, admin } = require('../middleware/authMiddleware');

router.route('/')
    .get(getCourses)
    .post(protect, admin, createCourse);

router.route('/user/enrolled')
    .get(protect, getUserEnrolledCourses);

router.route('/:id')
    .get(getCourseById)
    .put(protect, admin, updateCourse)
    .delete(protect, admin, deleteCourse);

router.post('/enroll/:id', protect, enrollCourse);

module.exports = router;
