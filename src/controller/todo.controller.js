const mongoose = require("mongoose");
const Todo = require("../model/todo.model");
const logger = require('../logger/logger')

const create = async (req, res) => {
  try {
    const createTodo = await Todo.create(req.body);
    return res.status(201).json(createTodo);
  } catch (error) {
    logger.error(error, "Error while creating todo");
    return res.status(500).json(error);
  }
};

const getAllByEmail = async (req, res) => {
  const { owner_id } = req.params;

  try {    
    const getAllForUser = await Todo.find({
      owner_id: new mongoose.Types.ObjectId(owner_id),
    }).sort({ createdAt: -1 }); 
    return res.status(200).json(getAllForUser);
    // }
  } catch (error) {
    logger.error(error, "Error while find todo");
    return res.status(500).json(error);
  }
};
const getAll = async (req, res) => {
  try {
    logger.error(req.user, "user");
    const getUser = await Todo.find({});
    return res.status(200).json(getUser);
  } catch (error) {
    logger.error("user not found", error);
    return res.status(500).json(error);
  }
};

 const getTodoSummaryByUser = async (req, res) => {
  const { owner_id } = req.params;

  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const result = await Todo.aggregate([
      {
        $match: {
          owner_id: new mongoose.Types.ObjectId(owner_id),
        },
      },
      {
        $facet: {
          total: [{ $count: "count" }],

          completed: [
            { $match: { status: "completed" } },
            { $count: "count" },
          ],

          active: [
            {
              $match: {
                status: "pending",
                $or: [
                  { due_at: { $gte: today } },
                  { due_at: { $exists: false } },
                ],
              },
            },
            { $count: "count" },
          ],

          overdue: [
            {
              $match: {
                status: "pending",
                due_at: { $lt: today },
              },
            },
            { $count: "count" },
          ],
        },
      },
    ]);

    const summary = {
      total: result[0].total[0]?.count || 0,
      active: result[0].active[0]?.count || 0,
      completed: result[0].completed[0]?.count || 0,
      overdue: result[0].overdue[0]?.count || 0,
    };

    return res.status(200).json(summary);
  } catch (error) {
    console.error("Error while fetching todo summary", error);
    return res.status(500).json({ message: "Server error" });
  }
};





const findAndUpdate = async (req, res) => {
  const { id } = req.params;
  const updates = req.body;
  try {
    const findTodo = await Todo.findByIdAndUpdate(id, updates);
    logger.error(findTodo);
    return res.status(200).json(findTodo);
  } catch (error) {
    logger.error(error, "Error while find todo");
    return res.status(500).json(error);
  }
};

const deleteTodo = async (req, res) => {
  const { id } = req.params;
  try {
    const todoData = await Todo.findByIdAndDelete(id);
    if (!todoData) {
      return res.status(404).json({ message: "Todo not found" });
    }

    return res.status(200).json({
      message: "Todo deleted successfully",
      data: todoData,
    });
  } catch (error) {
    return res.status(500).json(error);
  }
};

module.exports = { create, getAllByEmail, getAll, findAndUpdate, deleteTodo,getTodoSummaryByUser };
