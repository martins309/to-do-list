const express = require('express'),
    router = express.Router(),
    bycrypt = require('bcryptjs'),
    UserModel = require('../models/users');

router.get('/login', (req, res) => {
    res.render('template', {
        locals: {
            title: "Login Page",
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: "partials/login"
        }
    });
});

router.get('/logout', (req, res) => {
    req.sessions.destroy();
    res.redirect('/');
})

router.post('/login', async (req, res) => {
    const { email, password  } = req.body;
    const user = new UserModel(email, password, null, null, null,);
    const response = await user.login();
    res.redirect('/');
});


router.get('/signup', (req, res) => {
    res.render('template', {
        locals: {
            title: "Sign up Page",
            is_logged_in: req.session.is_logged_in,
        },
        partials: {
            body: "partials/signup"
        }
    })
});



router.post('/signup', async (req, res) => {
    const { email, password, first_name, last_name  } = req.body;
    console.log('email and password', email, password);
  
    const salt = bycrypt.genSaltSync(10);
    const hash = bycrypt.hashSync(password, salt);
    const response = await UserModel.addUser (
        email,
        hash,
        first_name,
        last_name
    );
    console.log("REGISTRATION RESPONSE", response);
    if(response.id) {
        res.redirect('/users/login');
    }else {
        res.send("Error: please try again").status(500);
    }
    if(!!response.isValid) {
        //do stuff if a user is loggen in
        req.session.is_logged_in = response.isValid;
        req.session.user_id = response.user_id;
        req.session.first_name = response.first_name;
        req.session.last_name = response.last_name;
        res.redirect('/');
    }else {
        res.sendStatus(403);
    }
});


module.exports = router;