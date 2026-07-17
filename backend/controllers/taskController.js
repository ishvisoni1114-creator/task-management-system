const Task = require('../models/Task');
const User = require('../models/User');

const getAllTasks = async (req, res) => {
    try {
        const filters = {};
        
        if (req.query.status) filters.status = req.query.status;
        if (req.query.priority) filters.priority = req.query.priority;
        
        // Regular users only see their tasks
        if (req.user.role === 'user') {
            filters.assigned_to = req.user.id;
        } else if (req.query.assigned_to) {
            filters.assigned_to = req.query.assigned_to;
        }

        // Search in title or description
        let searchFilter = {};
        if (req.query.search) {
            searchFilter = {
                $or: [
                    { title: { $regex: req.query.search, $options: 'i' } },
                    { description: { $regex: req.query.search, $options: 'i' } }
                ]
            };
        }

        const tasks = await Task.find({ ...filters, ...searchFilter })
            .populate('assigned_to', 'username first_name last_name email')
            .populate('created_by', 'username first_name last_name email')
            .sort({ created_at: -1 });

        res.json({ tasks, count: tasks.length });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTaskById = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id)
            .populate('assigned_to', 'username first_name last_name email')
            .populate('created_by', 'username first_name last_name email');
        
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check permissions
        if (req.user.role === 'user' && task.assigned_to?._id?.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        res.json(task);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const createTask = async (req, res) => {
    try {
        const { title, description, status, priority, assigned_to, due_date } = req.body;
        
        // Validate assigned user
        if (assigned_to) {
            const user = await User.findById(assigned_to);
            if (!user) {
                return res.status(400).json({ message: 'Assigned user not found' });
            }
        }

        const task = await Task.create({
            title,
            description,
            status,
            priority,
            assigned_to: assigned_to || req.user.id,
            created_by: req.user.id,
            due_date
        });

        const populatedTask = await Task.findById(task._id)
            .populate('assigned_to', 'username first_name last_name email')
            .populate('created_by', 'username first_name last_name email');

        res.status(201).json({ message: 'Task created successfully', task: populatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const updateTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check permissions
        if (req.user.role === 'user' && task.assigned_to?.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        const { title, description, status, priority, assigned_to, due_date } = req.body;

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            { title, description, status, priority, assigned_to, due_date },
            { new: true, runValidators: true }
        )
        .populate('assigned_to', 'username first_name last_name email')
        .populate('created_by', 'username first_name last_name email');

        res.json({ message: 'Task updated successfully', task: updatedTask });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const task = await Task.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        // Check permissions
        if (req.user.role === 'user' && task.created_by?.toString() !== req.user.id) {
            return res.status(403).json({ message: 'Access denied' });
        }

        await Task.findByIdAndDelete(req.params.id);
        res.json({ message: 'Task deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

const getTaskStats = async (req, res) => {
    try {
        const stats = await Task.aggregate([
            {
                $group: {
                    _id: null,
                    total: { $sum: 1 },
                    pending: { $sum: { $cond: [{ $eq: ['$status', 'pending'] }, 1, 0] } },
                    in_progress: { $sum: { $cond: [{ $eq: ['$status', 'in_progress'] }, 1, 0] } },
                    completed: { $sum: { $cond: [{ $eq: ['$status', 'completed'] }, 1, 0] } },
                    cancelled: { $sum: { $cond: [{ $eq: ['$status', 'cancelled'] }, 1, 0] } }
                }
            }
        ]);

        res.json(stats[0] || { total: 0, pending: 0, in_progress: 0, completed: 0, cancelled: 0 });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server error' });
    }
};

module.exports = {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
    getTaskStats
};