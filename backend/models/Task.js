const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        maxlength: [200, 'Title cannot exceed 200 characters']
    },
    description: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['pending', 'in_progress', 'completed', 'cancelled'],
        default: 'pending'
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high', 'urgent'],
        default: 'medium'
    },
    assigned_to: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    due_date: {
        type: Date,
        default: null
    },
    completed_at: {
        type: Date,
        default: null
    }
}, {
    timestamps: {
        createdAt: 'created_at',
        updatedAt: 'updated_at'
    }
});

// Indexes for faster queries
TaskSchema.index({ status: 1 });
TaskSchema.index({ priority: 1 });
TaskSchema.index({ assigned_to: 1 });
TaskSchema.index({ due_date: 1 });

// Virtual field for overdue status
TaskSchema.virtual('is_overdue').get(function() {
    if (this.status === 'completed' || this.status === 'cancelled') {
        return false;
    }
    if (!this.due_date) {
        return false;
    }
    return this.due_date < new Date();
});

// Pre-save middleware to set completed_at
TaskSchema.pre('save', function(next) {
    if (this.status === 'completed' && !this.completed_at) {
        this.completed_at = new Date();
    }
    if (this.status !== 'completed') {
        this.completed_at = null;
    }
    next();
});

const Task = mongoose.model('Task', TaskSchema);

module.exports = Task;