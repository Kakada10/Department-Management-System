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

exports.signUp = async function signUp(req, res) {
  const salt = await bcrypt.genSalt(10);
  const password = req.body.password;
  password2 = await bcrypt.hash(password, salt);
  const value1 = [
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
    "SELECT * FROM student WHERE id = ?",
    req.body.id,
    async (error, results) => {
      if (error) throw error;
      const ArrayData = results.map((result) => Object.values(result));
      connection.query(
        "SELECT * FROM student WHERE email = ?",
        req.body.email,
        async (error, results) => {
          if (error) throw error;
          const checkEmail = results.map((result) => Object.values(result));
          if (ArrayData[0] == null) {
            if (checkEmail[0] == null) {
              connection.query(
                "INSERT INTO student (id,name,gender,address,email,phone,password,photo) VALUES ?",
                [value1]
              );
              connection.query(
                "SELECT year_id FROM year WHERE year = ? AND FromYear = ? AND ToYear = ?",
                [req.body.Year, req.body.FromYear, req.body.ToYear],
                async (error, results) => {
                  const yg_id = results[0].year_id + req.body.group;
                  const value2 = [[req.body.id, yg_id]];
                  connection.query(
                    "INSERT INTO student_yg (student_id,yg_id) VALUES ?",
                    [value2]
                  );
                  res.send("Add successfully!");
                }
              );
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
    "SELECT * FROM student WHERE id = ?",
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
        connection.query("UPDATE student SET id = ? WHERE id = ?", [
          req.body.new_id,
          req.body.old_id,
        ]);
        connection.query("UPDATE student SET name = ? WHERE id = ?", [
          req.body.name,
          req.body.new_id,
        ]);
        connection.query("UPDATE student SET gender = ? WHERE id = ?", [
          req.body.gender,
          req.body.new_id,
        ]);
        connection.query("UPDATE student SET address = ? WHERE id = ? ", [
          req.body.address,
          req.body.new_id,
        ]);
        connection.query("UPDATE student SET email = ? WHERE id = ?", [
          req.body.email,
          req.body.new_id,
        ]);
        connection.query("UPDATE student SET phone = ? WHERE id = ?", [
          req.body.phone,
          req.body.new_id,
        ]);
        connection.query("UPDATE student SET photo = ? WHERE id = ?", [
          req.body.photo,
          req.body.new_id,
        ]);
        connection.query(
          "SELECT year_id FROM year WHERE year = ? AND FromYear = ? AND ToYear = ?",
          [req.body.year, req.body.FromYear, req.body.ToYear],
          async (error, results) => {
            const yg_id = results[0].year_id + req.body.group;
            connection.query(
              "UPDATE student_yg SET student_id = ? WHERE student_id = ?",
              [req.body.new_id, req.body.old_id]
            );
            connection.query(
              "UPDATE student_yg SET yg_id = ? WHERE student_id = ? ",
              [yg_id, req.body.new_id]
            );
          }
        );
        if (req.body.password !== "old") {
          connection.query("UPDATE student SET password = ? WHERE id = ?", [
            password2,
            req.body.new_id,
          ]);
        }
        res.status(200).json({
          message: "course create successfully 😊 👌",
        });
      }
    }
  );
};

exports.updateClass = async function updateClass(req, res) {
  var now = new Date();
  var date =
    now.getDate() + "-" + (now.getMonth() + 1) + "-" + now.getFullYear();
  var time = now.getHours() + ":" + now.getMinutes();
  connection.query(
    "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE s.id = ?",
    [req.body.student_id],
    async (error, results) => {
      const from = results[0].FromYear.slice(-2);
      const to = results[0].ToYear.slice(-2);
      const new_year_id =
        "Y_" +
        (Math.floor(results[0].year) + 1) +
        Math.floor(from) +
        Math.floor(to);
      const value = [[req.body.student_id, results[0].yg_id, date, time]];
      connection.query(
        "UPDATE student_yg SET yg_id = ? WHERE student_id = ? ",
        [new_year_id + results[0].group_name, req.body.student_id]
      );
      connection.query(
        "INSERT INTO record (student_id,yg_id,promoteDate,promoteTime) VALUES ?",
        [value],
        async (error, results) => {
          if (error) throw error;
          else {
            res.status(200).json({
              results: results,
            });
          }
        }
      );
    }
  );
};

exports.display = async function display(req, res) {
  console.log(
    req.body.fromYear,
    req.body.toYear,
    req.body.year,
    req.body.group
  );
  if (req.body.group == "all") {
    connection.query(
      "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE y.FromYear =? AND y.ToYear = ? AND y.year = ?",
      [req.body.fromYear, req.body.toYear, req.body.year],
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        res.status(200).json({
          results: results,
        });
      }
    );
  } else {
    connection.query(
      "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE y.FromYear =? AND y.ToYear = ? AND y.year = ? AND g.group_name =?",
      [req.body.fromYear, req.body.toYear, req.body.year, req.body.group],
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        res.status(200).json({
          results: results,
        });
      }
    );
  }
};

exports.sort = async function sort(req, res) {
  connection.query(
    "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE y.FromYear =? OR y.ToYear = ? OR y.year = ? OR g.group_name = ?",
    [req.body.fromYear, req.body.toYear, req.body.Year, req.body.group],
    async (error, results) => {
      console.log(results);
      if (error) throw error;
      res.status(200).json({
        results: results,
      });
    }
  );
};

exports.searchOne = async function searchOne(req, res) {
  connection.query(
    "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE s.name =? OR s.id = ? OR s.gender = ? OR g.group_name = ?",
    [req.body.search, req.body.search, req.body.search, req.body.search],
    async (error, results) => {
      console.log(results);
      if (error) throw error;
      res.status(200).json({
        results: results,
      });
    }
  );
};

exports.search = async function search(req, res) {
  if (req.body.group == "all") {
    connection.query(
      "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE y.FromYear =? OR y.ToYear = ? OR y.year = ?",
      [req.body.fromYear, req.body.toYear, req.body.year],
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        res.status(200).json({
          results: results,
        });
      }
    );
  } else {
    connection.query(
      "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE y.FromYear =? OR y.ToYear = ? OR y.year = ? OR g.group_name =?",
      [req.body.fromYear, req.body.toYear, req.body.year, req.body.group],
      async (error, results) => {
        console.log(results);
        if (error) throw error;
        res.status(200).json({
          results: results,
        });
      }
    );
  }
};

exports._delete = async function _delete(req, res) {
  console.log(req.params.id);
  connection.query(
    "SELECT * FROM student WHERE id = ?",
    [req.params.id],
    async (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res.status(404).json({
          message: "Can't Find the student!!!",
        });
      } else {
        connection.query("DELETE FROM student_yg WHERE student_id = ?", [
          req.params.id,
        ]);
        connection.query("DELETE FROM submission WHERE student_id = ? ", [
          req.params.id,
        ]);
        connection.query("DELETE FROM delayassignment WHERE student_id = ? ", [
          req.params.id,
        ]);
        connection.query("DELETE FROM attendance WHERE student_id = ? ", [
          req.params.id,
        ]);
        connection.query("DELETE FROM student WHERE id = ? ", [req.params.id]);
        res.json({
          message: "Student Delete Successfully!!!",
        });
      }
    }
  );
};

exports.searchOneStudent = async function searchOneStudent(req, res) {
  connection.query(
    "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id" +
      " WHERE id = ? OR name = ? OR group_name = ? OR year = ? OR FromYear = ? OR ToYear = ?",
    [
      req.params.search,
      req.params.search,
      req.params.search,
      req.params.search,
      req.params.search,
      req.params.search,
      req.params.search,
    ],
    async (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res.send("Do not have any data related to what you're searching !!!");
      } else {
        res.send(results);
      }
    }
  );
};

exports.displayAll = async function displayAll(req, res) {
  // console.log("hello")
  connection.query(
    "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id",
    async (error, results) => {
      console.log(results);
      if (error) throw error;
      res.status(200).json({
        results: results,
      });
    }
  );
};

exports.displayOne = async function displayOne(req, res) {
  connection.query(
    "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id WHERE s.id = ?",
    [req.params.id],
    async (error, results) => {
      console.log(results);
      if (error) throw error;
      res.status(200).json({
        results: results,
      });
    }
  );
};
//search student by year and group
exports.searchByYearGroup = async function searchByYearGroup(req, res) {
  if (req.body.group_name == "All") {
    connection.query(
      "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id" +
        " WHERE year = ? AND FromYear = ? AND ToYear = ?",
      [req.body.year, req.body.FromYear, req.body.ToYear],
      async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
          res.send("Do not have any data related to what you're searching !!!");
        } else {
          res.send(results);
        }
      }
    );
  } else {
    connection.query(
      "SELECT * FROM student s JOIN student_yg yg ON s.id = yg.student_id JOIN yg g ON yg.yg_id = g.yg_id JOIN year y ON g.year_id = y.year_id" +
        " WHERE group_name = ? AND year = ? AND FromYear = ? AND ToYear = ?",
      [req.body.group, req.body.year, req.body.FromYear, req.body.ToYear],
      async (error, results) => {
        if (error) throw error;
        if (results.length == 0) {
          res.send("Do not have any data related to what you're searching !!!");
        } else {
          res.send(results);
        }
      }
    );
  }
};
