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

exports.studentsInACourse = async function studentsInACourse(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  // console.log(verified.id)
  // console.log(req.body.course_id)
  connection.query(
    "SELECT s.id, s.name, s.gender, s.email, year.year,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id JOIN year ON year.year_id = y.year_id WHERE c.course_id = ?",
    [req.body.course_id],
    (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res
          .json({
            message: "There is none student in this course yet!!!",
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

exports.groupStudentsInACourse = async function groupStudentsInACourse(
  req,
  res
) {
  // console.log(verified.id)
  // console.log(req.body.course_id)
  connection.query(
    "SELECT s.id, s.name,s.gender,s.email, year.year,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id JOIN year ON year.year_id = y.year_id WHERE c.course_id = ? AND group_name = ?",
    [req.body.course_id, req.body.group],
    (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res
          .json({
            message: "There is none student in this course yet!!!",
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

exports.UploadMaterial = async function UploadMaterial(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  const values = [
    [
      req.body.course_id,
      req.body.title,
      req.body.time,
      req.body.date,
      req.body.group,
      req.body.file,
      verified.id,
      req.body.desc,
    ],
  ];
  connection.query(
    "INSERT INTO material" +
      "(course_id, title, time, date, _group, _file," +
      "upload_by, _desc) VALUES ?",
    [values],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200);
      }
    }
  );
};

exports.UpdateMaterial = async function UpdateMaterial(req, res) {
  var group = [];
  connection.query("UPDATE material SET title = ? WHERE id = ?", [
    req.body.title,
    req.body.id,
  ]);
  connection.query("UPDATE material SET _file = ? WHERE id = ?", [
    req.body.file,
    req.body.id,
  ]);
  connection.query("UPDATE material SET _desc = ? WHERE id = ?", [
    req.body.desc,
    req.body.id,
  ]);
  connection.query(
    "UPDATE material SET _group = ? WHERE id = ?",
    [req.body.group, req.body.id],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200);
      }
    }
  );
};

exports.ListMaterial = async function ListMaterial(req, res) {
  connection.query(
    "SELECT * FROM material WHERE course_id = ? ",
    [req.params.course_id],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200).json({ results: results });
      }
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

exports.deleteMaterial = async function deleteMaterial(req, res) {
  // console.log("kj"+req.body.id)
  connection.query(
    "DELETE FROM material WHERE id = ?",
    [req.body.id],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200);
      }
    }
  );
};

exports.searchStudentsInACourse = async function searchStudentsInACourse(
  req,
  res
) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  // console.log(req.body.course_id)
  connection.query(
    "SELECT s.id, s.name,s.gender,s.email, year.year,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id JOIN year ON year.year_id = y.year_id WHERE c.course_id = ? AND id LIKE ? ",
    [req.body.course_id, req.body.search + "%"],
    (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        connection.query(
          "SELECT s.id, s.name, s.gender, s.email, year.year,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id JOIN year ON year.year_id = y.year_id WHERE c.course_id = ? AND name LIKE ? ",
          [req.body.course_id, req.body.search + "%"],
          (error, results) => {
            if (results.length == 0) {
              connection.query(
                "SELECT s.id, s.name, s.gender, s.email, year.year,c.year_id ,group_name FROM student_yg yg JOIN yg y ON yg.yg_id = y.yg_id JOIN course c ON c.year_id = y.year_id JOIN student s ON s.id = yg.student_id JOIN year ON year.year_id = y.year_id WHERE c.course_id = ? AND gender LIKE ? ",
                [req.body.course_id, req.body.search + "%"],
                (error, results) => {
                  if (results.length == 0) {
                    res
                      .json({
                        message: "There is none student in this course yet!!!",
                      })
                      .status(400);
                  } else {
                    // console.log(results)
                    res
                      .json({
                        results: results,
                      })
                      .status(200);
                  }
                }
              );
            } else {
              // console.log(results)
              res
                .json({
                  results: results,
                })
                .status(200);
            }
          }
        );
      } else {
        // console.log(results)
        res
          .json({
            results: results,
          })
          .status(200);
      }
    }
  );
};

exports.detail = async function detail(req, res) {
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  // console.log(verified.id)
  connection.query(
    "SELECT *, c.photo as photoC FROM course c JOIN year y ON c.year_id = y.year_id JOIN teacher t ON t.id = c.teacher_id WHERE course_id = ? AND " +
      "teacher_id = ?",
    [req.body.course_id, verified.id],
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

exports.create = async function create(req, res) {
  console.log(
    req.body.course_id,
    req.body.course_name,
    req.body.course_desc,
    req.body.semester,
    req.body.type
  );
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  let id = verified.id;
  // console.log(verified.id)
  connection.query(
    "SELECT * FROM course WHERE course_id = ?",
    req.body.course_id,
    async (error, results) => {
      if (error) throw error;
      const ArrayData = results.map((result) => Object.values(result));
      if (ArrayData[0] == null) {
        const year_id =
          "Y_" +
          req.body.year +
          req.body.FromYear.slice(-2) +
          req.body.ToYear.slice(-2);
        connection.query(
          "SELECT * FROM year WHERE year_id = ?",
          year_id,
          async (error, results) => {
            if (results.length == 0) {
              res.status(400).json({
                message:
                  "You can create course in only the years that existed !",
              });
            } else {
              console.log(year_id);
              const value = [
                [
                  req.body.course_id,
                  id,
                  req.body.course_name,
                  year_id,
                  req.body.course_desc,
                  req.body.semester,
                  req.body.type,
                  req.body.photo,
                ],
              ];
              connection.query(
                "INSERT INTO course (course_id" +
                  ",teacher_id,course_name,year_id,course_desc," +
                  "semester,type,photo) VALUES ?",
                [value],
                (error, result) => {
                  res.status(200).json({
                    result: "course create successfully 😊 👌",
                  });
                }
              );
            }
          }
        );
      }
    }
  );
};
exports.displayCourseSchedule = async function displayCourseSchedule(req, res) {
  connection.query(
    "SELECT * FROM schedule s JOIN course c ON s.course_id = c.course_id WHERE c.course_id = ?",
    [req.params.id],
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};
exports.UpdateCourseSchedule = async function UpdateCourseSchedule(req, res) {
  connection.query("UPDATE schedule SET room = ? WHERE schedule_id = ?", [
    req.body.room,
    req.body.id,
  ]);
  connection.query("UPDATE schedule SET _group = ? WHERE schedule_id = ?", [
    req.body.group,
    req.body.id,
  ]);
  connection.query("UPDATE schedule SET date = ? WHERE schedule_id = ?", [
    req.body.date,
    req.body.id,
  ]);
  connection.query("UPDATE schedule SET startTime = ? WHERE schedule_id = ?", [
    req.body.startTime,
    req.body.id,
  ]);
  connection.query("UPDATE schedule SET endTime = ? WHERE schedule_id = ?", [
    req.body.endTime,
    req.body.id,
  ]);
  res.status(200).json({
    message: "course update successfully 😊 👌",
  });
};
exports.update = async function update(req, res) {
  const year_id =
    "Y_" +
    req.body.year +
    req.body.FromYear.slice(-2) +
    req.body.ToYear.slice(-2);
  connection.query(
    "SELECT * FROM year WHERE year_id = ?",
    year_id,
    async (error, results) => {
      if (results[0] == null) {
        res.status(400).json({
          message: "You can create course in only the years that existed !",
        });
      } else {
        connection.query(
          "UPDATE course SET course_name = ? WHERE course_id = ?",
          [req.body.course_name, req.body.course_id]
        );
        connection.query("UPDATE course SET year_id = ? WHERE course_id = ?", [
          year_id,
          req.body.course_id,
        ]);
        connection.query("UPDATE course SET semester = ? WHERE course_id = ?", [
          req.body.semester,
          req.body.course_id,
        ]);
        connection.query(
          "UPDATE course SET course_desc = ? WHERE course_id = ?",
          [req.body.course_desc, req.body.course_id]
        );
        connection.query("UPDATE course SET photo = ? WHERE course_id = ?", [
          req.body.photo,
          req.body.course_id,
        ]);
        connection.query("UPDATE course SET type = ? WHERE course_id = ?", [
          req.body.type,
          req.body.course_id,
        ]);
        res.status(200).json({
          message: "course update successfully 😊 👌",
        });
      }
    }
  );
};

exports.verifyDuplicateCourseSchedule =
  async function verifyDuplicateCourseSchedule(req, res) {
    connection.query(
      "SELECT * FROM schedule WHERE room = ?" +
        " AND date = ? AND startTime = ? AND endTime = ? AND _group = ?",
      [
        req.body.room,
        req.body.date,
        req.body.startTime,
        req.body.endTime,
        req.body.group,
      ],
      async (error, results) => {
        console.log(
          req.body.room,
          req.body.date,
          req.body.startTime,
          req.body.endTime,
          req.body.group
        );
        if (results.length == 0) {
          res.json({ results: "yes" });
        } else {
          res.json({ results: "no" });
        }
      }
    );
  };
exports.displayOne = async function displayOne(req, res) {
  console.log("Hello");
  connection.query(
    "SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE c.course_id = ?",
    [req.params.id],
    async (error, results) => {
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
