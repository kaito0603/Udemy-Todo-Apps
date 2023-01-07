const { Model } = require("mongoose")
const Task = require("../models/Task")

const getAllTasks = async (req,res) => {
    try{
        const allTask =  await Task.find({});
        res.status(200).json(allTask);
    }catch(err){
        res.status(500).json(err);
    }
   // res.send("タスクを全て取得しました。")

}

const getCreateTask = async (req,res) => {
    try{
        const createTask =  await Task.create(req.body);
      
        res.status(200).json(createTask);
    }catch(err){
        res.status(500).json(err);
    }
    //res.send("タスクを新規作成しました。");
};
const getSingleTask = async (req,res) => {
    try{
        const getSingleTask =  await Task.findOne({ _id: req.params.id });
        if(!getSingleTask){
            return res.status(404).json(`_id:${req.params.id}は存在しません。`)
        }
        res.status(200).json(getSingleTask);
    }catch(err){
        res.status(500).json(err);
    }
    //最後にこちらに切り替えるres.send(`タスク(id=${id})を取得しました。`)
    //res.send(`ある特定のタスクを更新しました。`)
}

const updateTask = async(req,res) => {
    try{
        const updateTask =  await Task.findOneAndUpdate({ _id: req.params.id }, req.body,
            {
                new: true
            });
        if(!updateTask){
            return res.status(404).json(`_id:${req.params.id}は存在しません。`)
        }
        res.status(200).json(updateTask);
    }catch(err){
        res.status(500).json(err);
    }
    //最後にこちらに切り替えるres.send(`タスク(id=${id})を取得しました。`)
    //res.send(`ある特定のタスクを更新しました。`)

}

const deleteTask =  async(req,res) => {
    try{
        const deleteTask =  await Task.findOneAndDelete({ _id: req.params.id });
        if(!deleteTask){
            return res.status(404).json(`_id:${req.params.id}は存在しません。`)
        }
        res.status(200).json(updateTask);
    }catch(err){
        res.status(500).json(err);
    }
    //最後にこちらに切り替えるres.send(`タスク(id=${id})を削除しました。`)
    //res.send(`ある特定のタスクを削除しました。`)
}

module.exports = {
    getAllTasks,
    getCreateTask,
    getSingleTask,
    updateTask,
    deleteTask,
}