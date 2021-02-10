const express = require('express'),
    router = express.Router(),
    todoModel = require('../models/todoModel');

    router.get('/', async (req, res) => {
        const todoData = await todoModel.getAll();
        console.log(todoData);
        res.render('template', {
            locals: {
                title: "Home Page",
                todoData
            },
            partials: {
                body: "partials/home"
            }
        })
    })

router.post('/addtask', async (req, res) => {
    const { task, user_id } = req.body;
    const response = await todoModel.addEntry(task, user_id);
    if (response.rowCount >= 1) {
        res.redirect('back');
    }else{
        res.sendStatus(500);
    }
})

module.exports = router;