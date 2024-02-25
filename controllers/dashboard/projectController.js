const projectModel = require("../../models/dashboard/projectModel");

const index = (req, res) => {
    projectModel.index()
        .then(projects => {
            res.render("dashboard/pages/category/projects", { projects });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    projectModel.show(id)
        .then(Oneproject => {
            res.render("dashboard/pages/category/projectsShow", { Oneproject });
        });
}

const createForm = (req, res) => {
    res.render("dashboard/pages/category/projectCreate");
}

const stores = (req, res) => {
    // Validation if needed
    
    // Assign photo if present
    if (req.file !== undefined) {
        req.body.photo = req.file.filename;
    } else {
        req.body.photo = "";
    }

    // Insert data into database
    projectModel.stores(req.body)
        .then(result => {
            // Handle success if needed
            console.log("Inserted successfully:", result);
            res.redirect("/dashboard/projects"); // Redirect to the index page for banners
        })
        .catch(error => {
            // Handle error
            console.error("Error inserting into database:", error);
            res.status(500).send("Internal Server Error"); // Send appropriate error response
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    projectModel.destroy(id)
        .then(oneProduct => {
            if(oneProduct.length !== 0) {
                if (oneProduct[0].photo !== "") {
                    const publicPath = path.resolve("./", "public/img/uploades");
                    unlink(path.join(publicPath, oneProduct[0].photo), (err) => {
                        if (err) {
                            throw err;
                        }
                    });
                }
                projectModel.destroy(id)
                    .then(() => {
                        res.redirect("/dashboard/projects");
                    })
                    
            }else{
                res.redirect("/dashboard/projects");
            }
        })
        
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    projectModel.updateForm(id)
        .then(oneProduct => {
            res.render("dashboard/pages/category/projectsUpdate", { oneProduct });
       })
      
}

const update = (req, res) => {
    // validation

    const id = req.body.id;
    projectModel.updateForm(id)
        .then(oneProduct => {
            if(oneProduct.length != 0){
                if(req.file != undefined){
                    if(oneProduct[0].photo != "") {
                        const publicPath = path.resolve("./", "public/img/uploades");
                        unlink(path.join(publicPath, oneProduct[0].photo), (err) => {
                            if(err) {
                                throw err;
                            }
                        });
                    }
                    req.body.photo = req.file.filename;
                    projectModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/dashboard/projects");                    
                }
                else {
                    req.body.photo = "";
                    projectModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/dashboard/projects");
                }
            }
        });
}

module.exports = {index , show , destroy , update, updateForm,stores ,createForm}