const bannerModel = require("../../models/dashboard/bannerModel");
const path = require("path");
const {unlink} = require("fs");

const index = (req, res) => {
    bannerModel.index()
        .then(slides => {
            res.render("dashboard/pages/banner/index", { slides });
        });
}

const show = (req, res) => {
    const id = req.params['id'];
    bannerModel.show(id)
        .then(oneSlide => {
            res.render("dashboard/pages/banner/show", { oneSlide });
        });
}

const createForm = (req, res) => {
    res.render("dashboard/pages/banner/createForm");
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
    bannerModel.stores(req.body)
        .then(result => {
            // Handle success if needed
            console.log("Inserted successfully:", result);
            res.redirect("/dashboard/banner"); // Redirect to the index page for banners
        })
        .catch(error => {
            // Handle error
            console.error("Error inserting into database:", error);
            res.status(500).send("Internal Server Error"); // Send appropriate error response
        });
}


const updateForm = (req, res) => {
    const id = req.params['id'];
    bannerModel.updateForm(id)
        .then(oneProduct => {
            res.render("dashboard/pages/banner/updateForm", { oneProduct });
       })
      
}

const update = (req, res) => {
    // validation

    const id = req.body.id;
    bannerModel.updateForm(id)
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
                    bannerModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/banner");                    
                }
                else {
                    req.body.photo = "";
                    bannerModel.update(req.body)
                        .then(error => {
                            //
                        });
                    res.redirect("/banner");
                }
            }
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    bannerModel.destroy(id)
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
                bannerModel.destroy(id)
                    .then(() => {
                        res.redirect("/dashboard");
                    })
                    
            }else{
                res.redirect("/dashboard");
            }
        })
        
}


module.exports = {
    index,
    show,
    createForm,
    stores,
    updateForm,
    update,
    destroy 
}