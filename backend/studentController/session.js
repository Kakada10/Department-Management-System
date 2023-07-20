const mysql = require('mysql');
const bcrypt = require('bcrypt');
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '123456789',
  database: 'db'
});
const config = require('../routes/config')
const jwt = require('jsonwebtoken')

exports.displayAll = async function displayAll (req,res) {
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    connection.query('SELECT * FROM student s JOIN student_yg syg ON s.id = syg.student_id JOIN yg ON syg.yg_id = yg.yg_id WHERE s.id = ?',[verified.id],(error,results) => {
        let group = results.group_name
        connection.query('SELECT *,s.id FROM _sessions s JOIN course c ON s.course_id = c.course_id JOIN teacher t ON c.teacher_id = t.id WHERE c.course_id = ? AND s._group = ? OR s._group = ?',[req.body.course_id,group,'all'],(error,results) => {
            console.log(results)
            res 
                .status(200)
                .json({
                    results: results
                })
        })
    })
}

exports.detail = async function detail (req,res){
    const token = req.cookies.access_token
    const verified = jwt.verify(token,config.authentication.jwtSecret);
    connection.query('SELECT * FROM attendance a JOIN _sessions s ON a.session_id = s.id WHERE a.student_id = ? AND a.session_id = ?',[verified.id,req.body.session_id],(error,results) => {
        res
            .status(200)
            .json({
                results: results
            })
    })
}