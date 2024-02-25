const express = require('express');
const categoryRouter = express.Router();
const app = express();
const bodyParser = require('body-parser');

app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));


const categoryController = require("../controllers/dashboard/categoryController");
const projectController = require("../controllers/dashboard/projectController");
const workcatController = require("../controllers/dashboard/workcatController");

categoryRouter.get('/dashboard/OurWork', (req, res) => {
    workcatController.index(req, res);
});

categoryRouter.get('/dashboard/projects', (req, res) => {
    projectController.index(req, res);
});

categoryRouter.get('/dashboard/category', (req, res) => {
    categoryController.index(req, res);
});

categoryRouter.post('/dashboard/addProjectToCategory', (req, res) => {
    categoryController.addProjectToCategory(req, res);
});


categoryRouter.get('/dashboard/category/destroy/:id',(req, res) => {
    categoryController.destroy(req, res);
});
categoryRouter.get('/dashboard/category/updateForm/:id', (req, res) => {
    projectController.updateForm(req, res);
});
categoryRouter.post('/dashboard/category/update', (req, res) => {
    projectController.update(req, res);
});

categoryRouter.get('/dashboard/project/updateForm/:id', (req, res) => {
    projectController.updateForm(req, res);
});

categoryRouter.post('/dashboard/project/update', (req, res) => {
    projectController.update(req, res);
});

categoryRouter.post('/dashboard/banner/category/create',(req, res)=> {
   categoryController.createCategory(req, res);
});

categoryRouter.get('/dashboard/project/show/:id', (req, res) => {
    projectController.show(req, res);
});

categoryRouter.get('/dashboard/project/destroy/:id',(req, res) => {
    projectController.destroy(req, res);
});

categoryRouter.get('/dashboard/project/create',(req, res)=> {
    projectController.createForm(req, res);
 });

 categoryRouter.post('/dashboard/project/store',(req, res)=> {
    projectController.stores(req, res);
 });



module.exports = categoryRouter ;