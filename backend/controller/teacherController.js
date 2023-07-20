const mysql = require("mysql");
const bcrypt = require("bcrypt");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "db",
});
exports.signUp = async function signUp(req, res) {
  const salt = await bcrypt.genSalt(10);
  const password = req.body.password;
  password2 = await bcrypt.hash(password, salt);
  const value = [
    [
      req.body.id,
      req.body.name,
      req.body.gender,
      req.body.address,
      req.body.email,
      req.body.phone,
      password2,
      req.body.photo,
    ],
  ];
  connection.query(
    "SELECT * FROM teacher WHERE id = ?",
    req.body.id,
    async (error, results) => {
      if (error) throw error;
      const ArrayData = results.map((result) => Object.values(result));
      connection.query(
        "SELECT * FROM teacher WHERE email = ?",
        req.body.email,
        async (error, results) => {
          if (error) throw error;
          let checkEmail = results.map((result) => Object.values(result));
          if (ArrayData[0] == null) {
            if (checkEmail[0] == null) {
              connection.query(
                "INSERT INTO teacher (id,name,gender,address,email,phone,password,photo) VALUES ?",
                [value]
              );
              res.send("Add successfully!");
            } else {
              res.send("Email already exist!");
            }
          } else {
            res.send("ID already exist!");
          }
        }
      );
    }
  );
};

exports.update = async function update(req, res) {
  const salt = await bcrypt.genSalt(10);
  const password = req.body.password;
  password2 = await bcrypt.hash(password, salt);
  connection.query(
    "SELECT * FROM teacher WHERE id = ?",
    [req.body.new_id],
    async (error, results) => {
      if (error) throw error;
      // console.log(results[0])
      if (results[0] == !"undefined") {
        res
          .json({
            message: "The Id already exist! Please input new ID!",
          })
          .status(400);
      } else {
        connection.query("UPDATE teacher SET id = ? WHERE id = ?", [
          req.body.new_id,
          req.body.old_id,
        ]);
        connection.query("UPDATE teacher SET name = ? WHERE id = ?", [
          req.body.name,
          req.body.new_id,
        ]);
        connection.query("UPDATE teacher SET address = ? WHERE id = ?", [
          req.body.address,
          req.body.new_id,
        ]);
        connection.query("UPDATE teacher SET email = ? WHERE id = ?", [
          req.body.email,
          req.body.new_id,
        ]);
        connection.query("UPDATE teacher SET phone = ? WHERE id = ?", [
          req.body.phone,
          req.body.new_id,
        ]);
        connection.query("UPDATE teacher SET photo = ? WHERE id = ?", [
          req.body.photo,
          req.body.new_id,
        ]);
        if (req.body.password !== "old") {
          connection.query("UPDATE teacher SET password = ? WHERE id = ?", [
            password2,
            req.body.new_id,
          ]);
        }
        connection.query(
          "UPDATE course SET teacher_id = ? WHERE teacher_id = ?",
          [req.body.new_id, req.body.old_id],
          (error, results) => {
            res
              .json({
                message: "Teacher Update Successfully!",
              })
              .status(200);
          }
        );
      }
    }
  );
};

exports.sort = async function sort(req, res) {
  connection.query(
    "SELECT DISTINCT * FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE y.FromYear = ? OR y.ToYear = ? OR y.year = ?",
    [req.body.fromYear, req.body.toYear, req.body.Year],
    (error, results) => {
      if (error) throw error;
      else {
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};

exports.resign = async function resign(req, res) {
  connection.query(
    "SELECT * FROM teacher WHERE id = ?",
    [req.params.id],
    async (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res.status(404).json({
          message: "Can't Find the teacher!!!",
        });
      } else {
        connection.query(
          "UPDATE course set teacher_id = ? WHERE teacher_id = ? ",
          ["", req.params.id]
        );
        connection.query("DELETE FROM teacher WHERE id = ? ", [req.params.id]);
        res.json({
          message: "Student Delete Successfully!!!",
        });
      }
    }
  );
};

exports.displayOne = async function displayOne(req, res) {
  // console.log(req.params.id)
  connection.query(
    "SELECT * FROM teacher WHERE id = ?",
    req.params.id,
    (error, results) => {
      if (error) throw error;
      else {
        console.log(results[0]);
        res.status(200).json({
          results: results,
        });
      }
    }
  );
};

exports.displayAll = async function displayAll(req, res) {
  connection.query("SELECT * FROM teacher", (error, results) => {
    if (error) throw error;
    else {
      res.status(200).json({
        results: results,
      });
    }
  });
};

exports.seeDetail = async function seeDetail(req, res) {
  connection.query(
    "SELECT *, t.photo as photo_T FROM teacher t JOIN course c ON t.id = c.teacher_id JOIN year y ON c.year_id = y.year_id WHERE t.id = ?",
    [req.params.id],
    (error, results) => {
      if (error) throw error;
      let teacher = {
        teacher_id: results[0].teacher_id,
        name: results[0].name,
        address: results[0].address,
        email: results[0].email,
        phone: results[0].phone,
        gender: results[0].gender,
        photo: results[0].photo_T,
        course: new Array(results.length),
        ToYear: new Array(results.length),
        FromYear: new Array(results.length),
        year: new Array(results.length),
      };
      for (i = 0; i < results.length; i++) {
        teacher.course[i] = results[i].course_name;
        teacher.ToYear[i] = results[i].ToYear;
        teacher.FromYear[i] = results[i].FromYear;
        teacher.year[i] = results[i].year;
      }
      console.log(teacher);
      res.status(200).json({
        results: teacher,
      });
    }
  );
};

exports.searchOne = async function searchOne(req, res) {
  console.log(req.body.search);
  connection.query(
    "SELECT * FROM teacher WHERE id = ? OR name = ? OR address = ? OR phone = ? OR email = ?",
    [
      req.body.search,
      req.body.search,
      req.body.search,
      req.body.search,
      req.body.search,
    ],
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

exports.getTeacher = async function getTeacher(req, res) {
  connection.query("SELECT id FROM teacher", async (error, results) => {
    // console.log(results)
    if (error) throw error;
    else {
      res.status(200).json({
        result: results,
      });
    }
  });
};
