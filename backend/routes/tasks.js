const express = require('express');
const router = express.Router();
const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
} = require('../controllers/taskController');
const { authenticate, authorize } = require('../middleware/auth');
const { validate, userValidations } = require('../middleware/validation');

router.use(authenticate);

router.get('/', getAllTasks);
router.get('/stats', getTaskStats);
router.get('/:id', getTaskById);
router.post('/', validate(userValidations.task), createTask);
router.put('/:id', validate(userValidations.task), updateTask);
router.delete('/:id', deleteTask);

router.get('/admin/all', authorize('admin'), getAllTasks);

module.exports = router;