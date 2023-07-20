const mysql = require("mysql");
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "db",
});
exports.create = async function create(req, res) {
  const year_id =
    "Y_" +
    req.body.year +
    req.body.FromYear.slice(-2) +
    req.body.ToYear.slice(-2);
  const yg_id =
    "Y_" +
    req.body.year +
    req.body.FromYear.slice(-2) +
    req.body.ToYear.slice(-2) +
    req.body.group;
  const value2 = [[yg_id, year_id, req.body.group]];
  connection.query(
    "SELECT * FROM year WHERE year_id = ?",
    year_id,
    async (error, results) => {
      if (error) throw error;
      const ArrayData = results.map((result) => Object.values(result));
      if (ArrayData[0] == null) {
        const value1 = [
          [year_id, req.body.year, req.body.FromYear, req.body.ToYear],
        ];
        connection.query(
          "SELECT yg_id FROM yg WHERE yg_id = ?",
          yg_id,
          async (error, results) => {
            if (results[0] == null) {
              connection.query(
                "INSERT INTO year (year_id,year,FromYear,ToYear) VALUES ?",
                [value1]
              );
              connection.query(
                "INSERT INTO yg (yg_id,year_id,group_name) VALUES ?",
                [value2]
              );
              res.send("Year and Group create successfully!");
            } else {
              res.send("Group ID already exist!");
            }
          }
        );
      } else {
        connection.query(
          "SELECT yg_id FROM yg WHERE yg_id = ?",
          yg_id,
          async (error, results) => {
            if (results[0] == null) {
              connection.query(
                "INSERT INTO yg (yg_id,year_id,group_name) VALUES ?",
                [value2]
              );
              res.send("Year and Group creates successfully!");
            }
          }
        );
      }
    }
  );
};

exports.displayAll = async function displayAll(req, res) {
  connection.query("SELECT * FROM year", async (error, results) => {
    // console.log(results)
    if (error) throw error;
    else {
      res.status(200).json({ results: results });
    }
  });
};

exports.deleteByID = async function deleteByID(req, res) {
  connection.query(
    "SELECT * FROM year WHERE year_id = ?",
    [req.params.id],
    (error, results) => {
      if (error) throw error;
      if (results.length == 0) {
        res.status(404).json({
          message: "Can't Find the year!!!",
        });
      } else {
        connection.query(
          "SELECT yg_id FROM yg WHERE year_id = ?",
          [req.params.id],
          (error, results1) => {
            connection.query("DELETE FROM yg WHERE year_id = ?", [
              req.params.id,
            ]);
            for (var i = 0; i < results1.length; i++) {
              connection.query(
                "SELECT student_id FROM student_yg WHERE yg_id = ?",
                [results1[i].yg_id],
                (error, results2) => {
                  for (var i = 0; i < results2.length; i++) {
                    connection.query("DELETE FROM student WHERE id = ?", [
                      results2[i].student_id,
                    ]);
                    connection.query(
                      "DELETE FROM submission WHERE student_id = ? ",
                      [results2[i].student_id]
                    );
                    connection.query(
                      "DELETE FROM delayassignment WHERE student_id = ? ",
                      [results2[i].student_id]
                    );
                    connection.query(
                      "DELETE FROM attendance WHERE student_id = ? ",
                      [results2[i].student_id]
                    );
                  }
                }
              );
              connection.query("DELETE FROM student_yg WHERE yg_id = ?", [
                results1[i].yg_id,
              ]);
            }
            connection.query(
              "SELECT teacher_id, course_id FROM course WHERE year_id = ?",
              [req.parmas.id],
              (error, results3) => {
                for (var i = 0; i < results3.length; i++) {
                  connection.query("DELETE FROM teacher WHERE id = ?", [
                    results3[i].teacher_id,
                  ]);
                  connection.query(
                    "DELETE FROM _sessions WHERE course_id = ?",
                    [results3[i].course_id]
                  );
                  connection.query(
                    "DELETE FROM assignments WHERE _course_id = ?",
                    [results3[i].course_id]
                  );
                  connection.query("DELETE FROM schedule WHERE course_id = ?", [
                    results3[i].course_id,
                  ]);
                  connection.query("DELETE FROM material WHERE course_id = ?", [
                    results3[i].course_id,
                  ]);
                }
              }
            );
          }
        );
        connection.query("DELETE FROM year WHERE year_id = ?", [req.params.id]);
        res.status(200).json({
          message: "Year Delete successfully 😊 👌",
        });
      }
    }
  );
};

exports.displayOne = async function displayOne(req, res) {
  var group = [];
  // console.log(req.params.id)
  connection.query(
    "SELECT * FROM year y JOIN yg ON y.year_id = yg.year_id WHERE y.year_id = ?",
    [req.params.id],
    async (error, results) => {
      if (error) throw error;
      else {
        for (var i = 0; i < results.length; i++) {
          group[i] = results[i].group_name;
        }
        const data = [
          {
            year_id: results[0].year_id,
            year: results[0].year,
            FromYear: results[0].FromYear,
            ToYear: results[0].ToYear,
            group: group,
          },
        ];
        console.log(data);
        res.status(200).json({ results: data });
      }
    }
  );
};

exports.update = async function update(req, res) {
  connection.query("Update ");
};

exports.getData = async function getData(req, res) {
  let data = [];
  connection.query(
    "SELECT id FROM student WHERE gender = ?",
    "F",
    async (error, results) => {
      data.push(results.length);
    }
  );
  connection.query(
    "SELECT id FROM student WHERE gender = ?",
    "M",
    async (error, results) => {
      data.push(results.length);
    }
  );
  connection.query("SELECT id FROM student", async (error, results) => {
    data.push(results.length);
  });
  connection.query("SELECT id FROM teacher", async (error, results) => {
    data.push(results.length);
  });
  connection.query("SELECT course_id FROM course", async (error, results) => {
    data.push(results.length);
    res.status(200).json({ result: data });
  });
};

exports.sort = async function sort(req, res) {
  connection.query(
    "SELECT * FROM year WHERE FromYear = ? OR ToYear = ? OR year = ?",
    [req.body.fromYear, req.body.toYear, req.body.Year],
    async (error, results) => {
      console.log(results);
      res.status(200).json({ results: results });
    }
  );
};

exports.search = async function search(req, res) {
  connection.query(
    "SELECT * FROM year WHERE FromYear = ? OR ToYear = ? OR year = ?",
    [req.body.search, req.body.search, req.body.search],
    async (error, results) => {
      console.log(results);
      res.status(200).json({ results: results });
    }
  );
};

exports.getYear = async function getYear(req, res) {
  connection.query(
    "SELECT DISTINCT FromYear , ToYear FROM year ",
    async (error, results) => {
      console.log(results);
      res.status(200).json({ result: results });
    }
  );
};
