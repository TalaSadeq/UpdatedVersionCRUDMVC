const { rejects } = require("assert");
const { error } = require("console");
const mysql = require("mysql2");
const { resolve } = require("path");

const connection = mysql.createPool({
    host:process.env.DATABASE_HOST,
    user:process.env.DATABASE_USER,
    password:process.env.DATABASE_PASSWORD,
    database:process.env.DATABASE_NAME
});

async function index() {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcat ORDER BY id DESC", [], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function workcat(workcatid){
    return new Promise((resolve,reject)=>{
        connection.query("SELECT workproj * FROM workproj JOIN workcatproj ON workproj.id = workcatproj.workproj_idJOIN workcat ON workcatproj.workcat_id = workcat.id WHERE workcat.id = ?;",[],(error,result)=>{
            if(!error) {
                resolve(result);
            }
        })
    })
}

module.exports = { index , workcat }