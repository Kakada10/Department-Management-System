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

// Student submit assignment
exports.submitted = async function submitted(req, res) {
  const day = req.body.day;
  const month = req.body.month;
  const year = req.body.year;
  const date = req.body.date;
  const hour = req.body.hour;
  const minute = req.body.minute;
  const time = req.body.time;
  const token = req.cookies.access_token;
  console.log(day, month, year, hour, minute, date, time);
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  connection.query(
    "SELECT * FROM assignments a WHERE a._id = ?",
    [req.body.assignment_id],
    async (error, results) => {
      const endDate = results[0]._endDate.split("-");
      const dueDate = results[0]._dueDate.split("-");
      const endTime = results[0]._endTime.split(":");
      const dueTime = results[0]._dueTime.split(":");
      if (Number(endDate[1]) > month) {
        console.log("l1");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Turned In", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (Number(endDate[0]) > day && Number(endDate[1]) == month) {
        console.log("l2");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Turned In", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (
        Number(endDate[0]) == day &&
        Number(endTime[0]) > hour &&
        Number(endDate[1]) == month
      ) {
        console.log("l3");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Turned In", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (
        Number(endDate[0]) == day &&
        Number(endTime[0]) == hour &&
        Number(endTime[1]) > minute &&
        Number(endDate[1]) >= month
      ) {
        console.log("l4");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Turned In", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (Number(dueDate[1]) > month) {
        console.log("l5");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Lated", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (Number(dueDate[0]) > day && Number(dueDate[1]) == month) {
        console.log("l5");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Lated", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (
        Number(dueDate[0]) == day &&
        Number(dueDate[1]) == month &&
        Number(dueTime[0]) > hour
      ) {
        console.log("fffdzvdgsdff");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Lated", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else if (
        Number(dueDate[0]) == day &&
        Number(dueDate[1]) == month &&
        Number(dueTime[0]) == hour &&
        Number(dueTime[1]) > minute
      ) {
        console.log("ggdfsdfaer313");
        connection.query(
          "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
          [date, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
          [time, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
          [req.body.file, verified.id, req.body.assignment_id]
        );
        connection.query(
          "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
          ["Lated", verified.id, req.body.assignment_id],
          async (error, results) => {
            if (error) throw error;
            else {
              res.status(200);
            }
          }
        );
      } else {
        console.log("f999999fff");
        connection.query(
          "SELECT * FROM delayassignment WHERE student_id = ? AND assignment_id = ?",
          [verified.id, req.body.assignment_id],
          async (error, results) => {
            // const ArrayData = results.map(result => Object.values(result));
            // console.log(results)
            if (results.length !== 0) {
              console.log(results.length);
              const newDueDate = results[0].new_due_date.split("-");
              const newDueTime = results[0].new_due_time.split(":");
              if (Number(newDueDate[1]) > month) {
                console.log("l6");
                connection.query(
                  "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
                  [date, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
                  [time, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
                  [req.body.file, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
                  ["Delayed", verified.id, req.body.assignment_id],
                  async (error, results) => {
                    if (error) throw error;
                    else {
                      res.status(200);
                    }
                  }
                );
              } else if (
                Number(newDueDate[0]) > day &&
                Number(newDueDate[1]) == month
              ) {
                console.log("l7");
                connection.query(
                  "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
                  [date, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
                  [time, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
                  [req.body.file, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
                  ["Delayed", verified.id, req.body.assignment_id],
                  async (error, results) => {
                    if (error) throw error;
                    else {
                      res.status(200);
                    }
                  }
                );
              } else if (
                Number(newDueDate[0]) == day &&
                Number(newDueDate[1]) == month &&
                Number(newDueTime[0]) > hour
              ) {
                console.log("l8");
                connection.query(
                  "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
                  [date, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
                  [time, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
                  [req.body.file, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
                  ["Delayed", verified.id, req.body.assignment_id],
                  async (error, results) => {
                    if (error) throw error;
                    else {
                      res.status(200);
                    }
                  }
                );
              } else if (
                Number(newDueDate[0]) == day &&
                Number(newDueDate[1]) == month &&
                Number(newDueTime[0]) == hour &&
                Number(newDueTime[1]) > minute
              ) {
                console.log("l9");
                connection.query(
                  "UPDATE submission SET _submitDate = ? WHERE student_id = ? AND assignment_id = ?",
                  [date, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitTime = ? WHERE student_id = ? AND assignment_id = ?",
                  [time, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET _submitFile = ? WHERE student_id = ? AND assignment_id = ?",
                  [req.body.file, verified.id, req.body.assignment_id]
                );
                connection.query(
                  "UPDATE submission SET  _status = ? WHERE student_id = ? AND assignment_id = ?",
                  ["Delayed", verified.id, req.body.assignment_id],
                  async (error, results) => {
                    if (error) throw error;
                    else {
                      res.status(200);
                    }
                  }
                );
              }
            } else {
              res.json({ results: "no" });
            }
          }
        );
      }
    }
  );
};
// Student view all assignments
exports.viewAll = async function viewAll(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  connection.query(
    "SELECT * FROM submission s JOIN assignments a ON s.assignment_id = a._id WHERE s.student_id = ?",
    [verified.id],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200).json({
          result: results,
        });
      }
    }
  );
};

// Student view all assignments that haven't done
exports.view = async function view(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  connection.query(
    "SELECT * FROM submission s JOIN assignments a ON s.assignment_id = a._id WHERE s.student_id = ? AND s._status = ?",
    [verified.id, "Not Turn in"],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200).json({
          result: results,
        });
      }
    }
  );
};

exports.detail = async function detail(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  connection.query(
    "SELECT *, s._score as S1 , a._score as S2 FROM submission s JOIN assignments a ON s.assignment_id = a._id WHERE assignment_id = ? AND student_id = ?",
    [req.body.assignment_id, verified.id],
    (error, results) => {
      console.log(results);
      if (error) throw error;
      else {
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};

exports.views = async function views(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  // console.log("ffff")
  connection.query(
    "SELECT s.id as student_id, s.name, s.gender, s.email, year, group_name  FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE s.id=?",
    [verified.id],
    async (error, results) => {
      connection.query(
        "SELECT * FROM assignments WHERE _course_id = ? AND _group=? OR _group=?",
        [req.body.course_id, results[0].group_name, "all"],
        (error, results) => {
          // console.log(results)
          res.status(200).json({
            results: results,
          });
        }
      );
    }
  );
};
