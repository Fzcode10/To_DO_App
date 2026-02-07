const express = require('express');

const router = express.Router();
const {getAlltoods, deleteById, addNewTodo, updateTodoById, getSingleTodoById } = require('../controllers/todoController');

// router.get('', (req, res) => {
//     res.status(200).json({
//         msg: `A`
//     })
// }) ; 
 
router.get('', getAlltoods) ;
 

router.get('/:id', getSingleTodoById);
// router.delete('/:id', (req, res) => {
//     res.status(200).json({
//         mmsg: 'Delete'
//     })
// })

router.delete('/:id', deleteById); 


router.post('/addnew', addNewTodo); 


router.patch('/:id', updateTodoById);




module.exports = router;