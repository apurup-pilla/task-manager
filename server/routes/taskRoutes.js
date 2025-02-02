const express = require("express");
const Task = require("../modals/Task");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authMiddleware, async (req, res) => {
    const { title, description, status } = req.body;
    const task = await Task.create({ userId: req.userId, title, description, status });
    res.json(task);
});







router.get("/", authMiddleware, async (req, res) => {
    const tasks = await Task.find({ userId: req.userId });
    res.json(tasks);
});
router.put("/:id", authMiddleware, async (req, res) => {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(task);
});


router.delete("/:id", authMiddleware, async (req, res) => {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
});

module.exports = router;
