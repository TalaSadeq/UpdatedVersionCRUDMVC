const mysql = require("mysql2");

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

const create = async (catName) => {
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO workCat (catName) VALUES (?)', [catName], (error, result) => {
            if (error) {
                reject(error); // Reject with the error object
            } else {
                resolve(result); // Resolve with the result
            }
        });
    });
};

const addProjectToCategory = async (catId,projId) => {
    //const catId = insertIntoForm.catId
    //const projId = insertIntoForm.projId
    return new Promise((resolve, reject) => {
        connection.query('INSERT INTO workcatproj (catId,projId) VALUES (?,?)', [catId,projId], (error, result) => {
            if (error) {
                reject(error); // Reject with the error object
            } else {
                resolve(result); // Resolve with the result
            }
        });
    });
};





async function updateForm(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM workcat WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}

async function update(updateFormData) {
    const catName = updateFormData.catName;
    const id = updateFormData.id;

    console.log("This s the Model" +catName +id);
    return new Promise((resolve, reject) => {
        connection.query("UPDATE workcat SET catName=? WHERE id=?", [catName,id], (error, result) => {
            if(error) {
                reject(error); // Reject with the error object
            } else {
                resolve(result); // Resolve with the result
            }
        })
    });
}

async function destroy(id) {
    return new Promise((resolve, reject) => {
        connection.query("DELETE FROM workcat WHERE id=?", [id], (error, result) => {
            if(error) {
                reject(error); // Reject with the error object
            } else {
                resolve(result); // Resolve with the result
            }
        })
    });
}

async function show(id) {
    return new Promise((resolve, reject) => {
        connection.query("SELECT * FROM banner WHERE id=?", [id], (error, result) => {
            if(!error) {
                resolve(result);
            }
        })
    });
}


module.exports = { index , create , destroy , update ,updateForm , show, addProjectToCategory}