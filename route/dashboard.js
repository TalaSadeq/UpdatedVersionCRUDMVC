const express = require('express');
const dashboardRouter = express.Router();
const app = express();
const bodyParser = require('body-parser');
/* ------------- controllers ------------------- */

const bannerController = require('../controllers/dashboard/bannerController');
const contactformController = require('../controllers/dashboard/contactformController');

/* -------------- parse of form ------------------- */
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));

// Parse URL-encoded bodies (usually from form submissions)
app.use(bodyParser.urlencoded({ extended: false }));

// Parse JSON bodies
app.use(bodyParser.json());

const multer = require("multer");

const path = require("path");

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/uploades/");
    },
    filename: (req, file, cb) => {
        if(file){
            cb(null, Date.now() + path.extname(file.originalname))
        }
    }
});

const upload = multer({
    storage: storage
});


/* ---------------------------------------------------- */
/* -------------- route roles ------------------------ */
/* ------------------------------------------------------ */
const authController = require("../controllers/dashboard/authController");

/* -------------- not auth pages ------------------- */
dashboardRouter.get('/signup', (req, res) => {
    authController.signup(req, res);
});

dashboardRouter.post('/storeUser', (req, res) => {
    authController.storeUser(req, res);
});

dashboardRouter.get('/signin', (req, res) => {
    authController.signin(req, res);
});

dashboardRouter.post('/verifySignin', (req, res) => {
    authController.verifySignin(req, res);
});

dashboardRouter.get('/logout', (req, res) => {
    authController.logout(req, res);
});

/* ------- auth --------- */
dashboardRouter.use(authController.isAthu);

/* ********** dashboard ************* */
dashboardRouter.get('/dashboard', (req, res) => {
    res.render("../views/dashboard/pages/index.ejs");
});

dashboardRouter.get('/dashboard/banner', (req, res) => {
    bannerController.index(req, res);
});
dashboardRouter.get('/dashboard/banner/show/:id', (req, res) => {
    bannerController.show(req, res);
});
dashboardRouter.get('/dashboard/banner/createForm', (req, res) => {
    bannerController.createForm(req, res);
});

dashboardRouter.get('/dashboard/banner/destroy/:id',(req, res) => {
    bannerController.destroy(req, res);
});

dashboardRouter.post('/dashboard/banner/stores',(req, res) => {
    bannerController.stores(req,res);
 });

dashboardRouter.get('/dashboard/banner/updateForm/:id', (req, res) => {
    bannerController.updateForm(req, res);
});

dashboardRouter.post('/dashboard/banner/update',(req, res) => {
    bannerController.update(req,res);
 });


/* ------------------------------- */

dashboardRouter.get('/dashboard/contactform', (req, res) => {
    contactformController.index(req, res);
});
dashboardRouter.get('/dashboard/contactform/show/:id', (req, res) => {
    contactformController.show(req, res);
});
dashboardRouter.get('/dashboard/contactform/destroy/:id', (req, res) => {
    contactformController.destroy(req, res);
});


module.exports = dashboardRouter;