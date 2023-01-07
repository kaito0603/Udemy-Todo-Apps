const express = require("express");
const router =express.Router();
const {
    getAllTasks,
    getCreateTask,
    getSingleTask,
    updateTask,
    deleteTask,} = require("../contorollers/tasks");

    
router.get("/", getAllTasks);
router.post("/", getCreateTask);
router.get("/:id", getSingleTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
