const categoryModel = require("../../models/dashboard/categoryModel");

const index = (req, res) => {
    categoryModel.index()
        .then(categories => {
            res.render("dashboard/pages/category/index", { categories });
        });
}

const addProjectToCategory = (req , res) => {
      const catId = req.body.catId
      const projId = req.body.projId
      categoryModel.addProjectToCategory(catId,projId)
      .then(error =>{
        console.log("Error")
      });
      res.redirect("/dashboard/category");
}

const updateForm = (req, res) => {
    const id = req.params['id'];
    categoryModel.updateForm(id)
        .then(oneProduct => {
            res.render("dashboard/pages/category/updateForm", { oneProduct });
       })
      
}

const update = (req, res) => {
    // validation
    const id = req.body.id;
    categoryModel.updateForm(id)
        .then(oneCategory => {
            if (oneCategory) {
                const newCatName = req.body.catName;
                console.log("This is the controller" + newCatName);
                if (newCatName.trim() !== "") {
                    // Update the category name
                    categoryModel.update(req.body)
                        .then(() => {
                            res.redirect("/dashboard/category");
                        })
                        .catch(error => {
                            console.error("Error updating category name:", error);
                            // Handle the error appropriately
                            res.status(500).send("Internal Server Error");
                        });
                } else {
                    // Handle the case where the new category name is empty
                    res.status(400).send("Category name cannot be empty");
                }
            } else {
                // Handle the case where the category with the given ID doesn't exist
                res.status(404).send("Category not found");
            }
        })
        .catch(error => {
            console.error("Error fetching category:", error);
            // Handle the error appropriately
            res.status(500).send("Internal Server Error");
        });
};


const createCategory = async (req, res) => {
    const catName = req.body.catName;
    console.log("This is catname" +catName)
    try {
        await categoryModel.create(catName);
        res.redirect('/dashboard/category'); 
    } catch (error) {
        console.error('Error creating category:', error);
        res.status(500)
    }
};

const createCategoryForm = (req, res) => {
    res.render('dashboard/pages/categories/createForm');
};

const show = (req, res) => {
    const id = req.params['id'];
    categoryModel.show(id)
        .then(Oneproject => {
            res.render("dashboard/pages/category/projectsShow", { Oneproject });
        });
}

const destroy = (req, res) => {
    const id = req.params['id'];
    categoryModel.destroy(id)
        .then(oneProduct => {
            if(oneProduct.length !== 0) {
                categoryModel.destroy(id)
                    .then(() => {
                        res.redirect("/dashboard/category");
                    })
                    
            }else{
                res.redirect("/dashboard/category");
            }
        })
        
}
module.exports = { index , createCategory , createCategoryForm , show , updateForm , update , destroy, addProjectToCategory}