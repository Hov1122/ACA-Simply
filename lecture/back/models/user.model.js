'use strict';
var dbConn = require('./../config/config');
//Employee object create
class User {
    constructor(user){
        this.first_name     = user.first_name;
        this.last_name      = user.last_name;
        this.email          = user.email;
        this.created_at     = new Date();
        this.updated_at     = new Date();
    };

    static create (newUser, result) {
        dbConn.query("INSERT INTO users set ?", newUser, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                console.log(res.insertId);
                result(null, res.insertId);
            }
        });
    }

    static findById (id, result) {
        dbConn.query("Select * from employees where id = ? ", id, function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(err, null);
            }
            else{
                result(null, res);
            }
        });
    }

    static findAll (result) {
        dbConn.query("Select * from employees", function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                console.log('employees : ', res);
                result(null, res);
            }
        });
    }

    static update (id, employee, result) {
        dbConn.query("UPDATE employees SET first_name=?,last_name=?,email=?,phone=?,organization=?,designation=?,salary=? WHERE id = ?", [employee.first_name,employee.last_name,employee.email,employee.phone,employee.organization,employee.designation,employee.salary, id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }else{
                result(null, res);
            }
        });
    }

    static delete (id, result) {
        dbConn.query("DELETE FROM employees WHERE id = ?", [id], function (err, res) {
            if(err) {
                console.log("error: ", err);
                result(null, err);
            }
            else{
                result(null, res);
            }
        });
    }
}


module.exports= User;