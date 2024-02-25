const OurWorkModel = require("../../models/dashboard/workcat/workcatModel");
const ProjCatModel = require("../../models/dashboard/workcat/projCatModel");
const index = (req, res) => {
    OurWorkModel.index()
        .then(categories => {
            ProjCatModel.index()
            .then(proj => {
                res.render("dashboard/pages/OurWork/index", { categories , proj});
            })
       });
}

const workcat = (req, res) => { 
    OurWorkModel.workcat()
       .then(workcat => {
          res.render("dashboard/pages/OurWork/index",{workcat})
       });

}

module.exports = { index , workcat}
