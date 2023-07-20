const mysql = require("mysql");
const bcrypt = require("bcrypt");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "db",
});
const config = require("../routes/config");
const jwt = require("jsonwebtoken");

exports.detail = async function detail(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  // console.log(verified.id)
  connection.query(
    "SELECT *, t.photo as teacherPhoto, c.photo as coursePhoto FROM course c JOIN year y ON c.year_id = y.year_id JOIN teacher t ON t.id = c.teacher_id WHERE course_id = ? ",
    [req.body.course_id],
    (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res
          .json({
            message: "error!!!",
          })
          .status(400);
      } else {
        res
          .json({
            results: results,
          })
          .status(200);
      }
    }
  );
};

exports.ListMaterial = async function ListMaterial(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  connection.query(
    "SELECT * FROM student s JOIN student_yg syg ON s.id = syg.student_id JOIN yg ON syg.yg_id = yg.yg_id WHERE s.id = ?",
    [verified.id],
    (error, results) => {
      let group = results[0].group_name;
      connection.query(
        "SELECT * FROM material WHERE course_id = ? AND _group = ? OR _group = ?",
        [req.params.course_id, group, "all"],
        async (error, results) => {
          console.log(results);
          if (error) throw error;
          else {
            res.status(200).json({ results: results });
          }
        }
      );
    }
  );
};

exports.ListOneMaterial = async function ListOneMaterial(req, res) {
  console.log(req.body.id);
  console.log(req.body.course_id);
  connection.query(
    "SELECT * FROM material WHERE id = ? AND course_id = ?",
    [req.body.id, req.body.course_id],
    async (error, results) => {
      if (error) throw error;
      else {
        console.log(results);
        res.status(200).json({ results: results });
      }
    }
  );
};
