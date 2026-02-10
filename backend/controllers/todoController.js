const TodoModel = require('../models/todo');


exports.getAlltoods = async (req, res) => {
    
    const todos = await TodoModel.find();

    if (!todos) {
        return res.status(200).json({
            msg: `There is no any todo in list` 
        })
    }

    return res.status(200).json({
        // msg: 'All todos',
        todo: todos
    })
} 

exports.getSingleTodoById = async (req, res) => {
    const _id = req.params.id;

    const todo = await TodoModel.findById(_id);
    console.log(todo); 

    if(!todo) {
        return res.status(404).json({
            msg:`There is no todo`
        })
    }

    return res.status(200).json({
        msg: `Is one is that todo`,
        todo: todo
    })
} 
 
exports.addNewTodo = async (req, res) => {

    const { name, status } = req.body;

    let missingBodyPart = [];

    if (!name) {
        missingBodyPart.push("name");
    } else if (status === undefined) {
        missingBodyPart.push("status");
    }

    if (missingBodyPart.length > 0) {
        return res.status(404).json({
            error: `Please fill all mindatery fileds properly with all data`,
            missing: missingBodyPart
        })
    }


    try {
        const todo = await TodoModel.create({ name, status });
        console.log(name);
        console.log(status);
        return res.status(200).json({
            todo: todo,
            msg: `Success`
        })
    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }
}

exports.deleteById = async (req, res) => {
    const _id = req.params.id;

    const todo = await TodoModel.findById(_id);

    if (!todo) {
        return res.status(404).json({
            msg: `There are not any todo wtih this id : ${_id}`
        })
    }

    try {
        await TodoModel.findByIdAndDelete(_id);
        return res.status(200).json({
            msg: `Todo Deleted successfully`
        })
    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }
}

exports.updateTodoById = async (req, res) => {
    const _id = req.params.id;
    // console.log(_id);
 
    const todo = await TodoModel.findById(_id);

    if (!todo) {
        return res.status(404).json({
            msg: `There are no any todo with id : ${_id}`
        })
    }

    // console.log(todo); 
    // console.log(req.body);
    try { 
        const updatedTodo = await TodoModel.findByIdAndUpdate(
            _id,
            { $set: req.body },
            {
                new: true,
                runValidators: true
            }
        )
        return res.status(200).json({
        msg: `Todo updated successfully`,
        updated_todo: updatedTodo
    }) 
    } catch (error) {
        return res.status(404).json({
            error: error.message
        })
    }

    
} 