const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "db",
});

exports.create = async function create(req, res) {
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
            if (results[0] == null) {
              res.status(400).json({
                message:
                  "You can create course in only the years that existed !",
              });
            } else {
              const value = [
                [
                  req.body.course_id,
                  req.body.teacher_id,
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
                (error) => {
                  res.status(200).json({
                    message: "course create successfully 😊 👌",
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
exports.createSchedule = async function createSchedule(req, res) {
  const value = [
    [
      req.body.course_id,
      req.body.room,
      req.body.startTime,
      req.body.endTime,
      req.body.date,
      req.body.group,
    ],
  ];
  connection.query(
    "INSERT INTO schedule" +
      "(course_id,room,startTime,endTime,date,_group)" +
      "VALUES ?",
    [value],
    async (error, results) => {
      if (error) throw error;
      res.status(200).json({
        message: "course schedule create successfully 😊 👌",
      });
    }
  );
};

exports.deleteByID = async function deleteByID(req, res) {
  connection.query(
    "SELECT * FROM course WHERE course_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res.status(404).json({
          message: "Can't Find the course!!!",
        });
      } else {
        connection.query("DELETE FROM course WHERE course_id = ?", [
          req.params.id,
        ]);
        connection.query("DELETE FROM _sessions WHERE course_id = ?", [
          req.params.id,
        ]);
        connection.query("DELETE FROM assignments WHERE _course_id = ?", [
          req.params.id,
        ]);
        connection.query("DELETE FROM schedule WHERE course_id = ?", [
          req.params.id,
        ]);
        connection.query("DELETE FROM material WHERE course_id = ?", [
          req.params.id,
        ]);
        res.status(200).json({
          message: "Course Delete successfully 😊 👌",
        });
      }
    }
  );
};

exports.search = async function search(req, res) {
  connection.query(
    "SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE y.FromYear = ? OR y.ToYear = ? OR y.year = ? OR c.course_id = ? OR t.id = ? OR c.type = ?",
    [
      req.body.search,
      req.body.search,
      req.body.search,
      req.body.search,
      req.body.search,
      req.body.search,
    ],
    async (error, results) => {
      if (error) throw error;
      else {
        // console.log(results)
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};

exports.sort = async function sort(req, res) {
  // console.log(req.body.fromYear,req.body.toYear)
  connection.query(
    "SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE y.FromYear = ? OR y.ToYear = ? OR y.year = ?",
    [req.body.fromYear, req.body.toYear, req.body.Year],
    async (error, results) => {
      if (error) throw error;
      else {
        // console.log(results)
        res.status(200).json({
          results: results,
        });
      }
    }
  );
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
          "UPDATE course SET course_id = ? WHERE course_id = ?",
          [req.body.new_id, req.body.old_id],
          async (error, results) => {
            if (error) {
              throw error;
            } else {
              connection.query(
                "UPDATE course SET teacher_id = ? WHERE course_id = ?",
                [req.body.teacher_id, req.body.new_id]
              );
              connection.query(
                "UPDATE course SET course_name = ? WHERE course_id = ?",
                [req.body.course_name, req.body.new_id]
              );
              connection.query(
                "UPDATE course SET year_id = ? WHERE course_id = ?",
                [year_id, req.body.new_id]
              );
              connection.query(
                "UPDATE course SET semester = ? WHERE course_id = ?",
                [req.body.semester, req.body.new_id]
              );
              connection.query(
                "UPDATE course SET course_desc = ? WHERE course_id = ?",
                [req.body.course_desc, req.body.new_id]
              );
              connection.query(
                "UPDATE course SET photo = ? WHERE course_id = ?",
                [req.body.photo, req.body.new_id]
              );
              connection.query(
                "UPDATE course SET type = ? WHERE course_id = ?",
                [req.body.type, req.body.new_id]
              );
              res.status(200).json({
                message: "course update successfully 😊 👌",
              });
            }
          }
        );
      }
    }
  );
};

exports.displayAll = async function displayAll(req, res) {
  connection.query(
    "SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id",
    async (error, results) => {
      if (error) throw error;
      else {
        // console.log(results)
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};

exports.displayOne = async function displayOne(req, res) {
  connection.query(
    "SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE c.course_id = ?",
    [req.params.id],
    async (error, results) => {
      // console.log(results)
      if (error) throw error;
      else {
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};

exports.getSchedule = async function getSchedule(req, res) {
  connection.query(
    "SELECT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id JOIN schedule s ON s.course_id = c.course_id WHERE y.year = ? AND y.FromYear = ? AND y.ToYear = ? AND c.semester = ? AND s._group =?",
    [
      req.body.year,
      req.body.from,
      req.body.to,
      req.body.semester,
      req.body.group,
    ],
    async (error, results) => {
      if (error) throw error;
      else {
        console.log(results);
        res.status(200).json({
          results: results,
        });
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

exports.verifyDuplicateCourseSchedule =
  async function verifyDuplicateCourseSchedule(req, res) {
    connection.query(
      "SELECT * FROM schedule WHERE room = ? AND date = ? AND startTime = ? AND endTime = ?",
      [req.body.room, req.body.date, req.body.startTime, req.body.endTime],
      async (error, results) => {
        if (results.length == 0) {
          res.json({ results: "yes" });
        } else {
          if (results[0].course_id == req.body.course_id) {
            if (results[0]._group == req.body.group) {
              res.json({ results: "no" });
            } else {
              res.json({ results: "yes" });
            }
          } else {
            res.json({ results: "no" });
          }
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

exports.UploadMaterial = async function UploadMaterial(req, res) {
  const values = [
    [
      req.body.course_id,
      req.body.title,
      req.body.time,
      req.body.date,
      req.body.group,
      req.body.file,
      "admin",
      req.body.desc,
    ],
  ];
  connection.query(
    "INSERT INTO material (course_id, title, time, date, _group, _file, upload_by,_desc) VALUES ?",
    [values],
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
    "SELECT * FROM material WHERE course_id = ?",
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

exports.UpdateMaterial = async function UpdateMaterial(req, res) {
  connection.query("UPDATE material SET title = ? WHERE id = ?", [
    req.body.title,
    req.body.id,
  ]);
  connection.query("UPDATE material SET _file = ? WHERE id = ?", [
    req.body.file,
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

exports.ListRoom = async function ListRoom(req, res) {
  connection.query(
    "SELECT room FROM schedule GROUP BY room",
    async (error, results) => {
      if (error) throw error;
      else {
        res.status(200).json({ results: results });
      }
    }
  );
};

// exports.roomTable = async function roomTable (req,res) {
//     connection.query('SELECT * FROM schedule WHERE room = ? AND startTime = ? AND date = ?',[req.body.room,req.body.startTime,req.body.date],async (error,results)=>{
//         console.log(results)
//         if(error) throw error;
//         else {
//             res.status(200).json({results: results});
//         }
//     })
// }

exports.roomTable = async function roomTable(req, res) {
  let data = [];
  let data1 = [];
  var data2 = [];
  let test = [];
  const day = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Semedi"];
  const time2 = ["7:00", "9:00", "11:00", "13:00", "15:00", "17:00"];
  connection.query(
    "SELECT room FROM schedule GROUP BY room",
    async (error, results) => {
      let room = results;
      for (var i = 0; i < results.length - 1; i++) {
        for (var k = 0; k < time2.length - 1; k++) {
          connection.query(
            "SELECT * FROM schedule WHERE room = ? AND startTime = ? AND date = ?",
            [room[i].room, time2[k], "Lundi"],
            async (error, results) => {
              test = await results;
              res.status(200).json({ results: results });
            }
          );
        }
      }
    }
  );
};
