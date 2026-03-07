import Task from "../models/Task.js";

// Create a new task
export const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;

    // Create task with authenticated user as owner
    const task = new Task({
      title,
      description,
      owner: req.user._id
    });

    await task.save();

    res.status(201).json(task);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all tasks for authenticated user
export const getTasks = async (req, res) => {
  try {
    // Find only tasks belonging to authenticated user
    const tasks = await Task.find({ owner: req.user._id });

    res.status(200).json(tasks);

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a task
export const deleteTask = async (req, res) => {
  try {
    // Find task by ID
    const task = await Task.findById(req.params.id);

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    // Check if user owns this task
    if (task.owner.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Not authorized to delete this task" });
    }

    // Delete the task
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Task deleted successfully" });

  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
