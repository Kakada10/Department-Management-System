const bcrypt = require("bcrypt");
let mysql = require("mysql");
let con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "123456789",
});
con.connect();
con.query("use `db`");

const config = require("../routes/config");
const jwt = require("jsonwebtoken");

exports.logout = async function logout(req, res) {
  var now = new Date();
  console.log(now);
  res
    .status(200)
    .cookie("access_token", "", {
      expire: now,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
    })
    .json({
      message: "Admin login successfully!",
    });
};

exports.login = async function login(req, res) {
  const email = req.body.email;
  const password = req.body.password;
  const admin = {
    email: "admin@123",
    password: "admin",
  };
  if (!req.body.email) {
    res.status(404).error("You need to input your email");
  } else if (!req.body.password) {
    res.status(404).error("You need to input your password");
  }
  if (req.body.email === admin.email && req.body.password === admin.password) {
    const token = jwt.sign(admin, config.authentication.jwtSecret);
    res
      .status(200)
      .cookie("access_token", token, {
        maxAge: 90000000,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
      })
      .json({
        message: "Admin login successfully!",
      });
  } else if (
    req.body.email === admin.email &&
    req.body.password !== admin.password
  ) {
    res.status(401).json({ message: "Incorrect Password" });
  } else if (
    req.body.email !== admin.email &&
    req.body.password === admin.password
  ) {
    res.status(401).json({ message: "Incorrect Email" });
  } else {
    con.query(
      "SELECT * FROM student WHERE email = ?",
      email,
      async (error, results) => {
        if (error) throw error;
        const ArrayData = results.map((result) => Object.values(result));
        if (ArrayData[0] == null) {
          con.query(
            "SELECT * FROM teacher WHERE email = ?",
            email,
            async (error, results) => {
              if (error) throw error;
              const ArrayData2 = results.map((result) => Object.values(result));
              if (ArrayData2[0] == null) {
                res.json({
                  message: "Incorrect Gmail or Password!!!",
                });
              } else {
                // console.log(ArrayData2)
                const isValidPassword = await bcrypt.compare(
                  password,
                  ArrayData2[0][5]
                );
                if (isValidPassword) {
                  const user = {
                    id: null,
                    email: null,
                    password: null,
                    role: "teacher",
                  };
                  user.id = ArrayData2[0][0];
                  user.email = ArrayData2[0][3];
                  user.password = ArrayData2[0][5];
                  const token = jwt.sign(user, config.authentication.jwtSecret);
                  // console.log(token)
                  res
                    .cookie("access_token", token, {
                      maxAge: 90000000,
                      httpOnly: true,
                      secure: process.env.NODE_ENV === "production",
                    })
                    .status(200)
                    .json({
                      message: "login successfully 😊 👌",
                      role: "teacher",
                    });
                }
              }
            }
          );
        } else {
          const isValidPassword = await bcrypt.compare(
            password,
            ArrayData[0][6]
          );
          if (isValidPassword) {
            const user = {
              id: null,
              email: null,
              password: null,
              role: "student",
            };
            user.id = ArrayData[0][0];
            user.email = ArrayData[0][3];
            user.password = ArrayData[0][5];
            const token = jwt.sign(user, config.authentication.jwtSecret);
            console.log(ArrayData[0]);
            res
              .cookie("access_token", token, {
                maxAge: 90000000,
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
              })
              .status(200)
              .json({
                success: true,
                message: "login successfully 😊 👌",
                role: "student",
                data: results,
                access_token: token,
              });
          } else {
            res.status(404).json({
              message: "Incorrect Gmail or Password hhhhhh!!!",
            });
          }
        }
      }
    );
  }
};

exports.authenticate = async function authenticate(req, res, next) {
  const token = req.cookies.access_token;
  if (!token) {
    return res
      .sendStatus(401)
      .json({ message: "you  cannot get user information." });
  } else {
    next();
  }
};

exports.isAdmin = async function isAdmin(req, res, next) {
  const admin = {
    email: "admin@123",
    password: "admin",
  };
  const token = req.cookies.access_token;
  const verified = jwt.verify(token, config.authentication.jwtSecret);
  if (verified.email === admin.email && verified.password === admin.password) {
    next();
  } else {
    return res.sendStatus(401).json({ message: "Can't Access!!!" });
  }
};

// exports.login = async function login(req, res) {
//     const email = req.body.email;
//     const password = req.body.password;
//     const admin = {
//       email: "admin@123",
//       password: "admin",
//     };
//     if (!req.body.email) {
//       res.status(404);
//       res.error("You need to input your email");
//     } else if (!req.body.password) {
//       res.status(404);
//       res.error("You need to input your password");
//     }
//     if (req.body.email === admin.email && req.body.password === admin.password) {
//       const token = jwt.sign(admin, config.authentication.jwtSecret);
//       res
//         .status(200)
//         .cookie("access_token", token, {
//           maxAge: 90000000,
//           httpOnly: true,
//           secure: process.env.NODE_ENV === "production",
//         })
//         .json({
//           message: "Admin login successfully!",
//         });
//     } else {
//       con.query(
//         "SELECT * FROM student WHERE email = ?",
//         email,
//         async (error, results) => {
//           if (error) throw error;
//           const ArrayData = results.map((result) => Object.values(result));
//           if (ArrayData[0] == null) {
//             con.query(
//               "SELECT * FROM teacher WHERE email = ?",
//               email,
//               async (error, results) => {
//                 if (error) throw error;
//                 const ArrayData2 = results.map((result) => Object.values(result));
//                 if (ArrayData2[0] == null) {
//                   res.json({
//                     message: "Incorrect Gmail or Password!!!",
//                   });
//                 } else {
//                   // console.log(ArrayData2)
//                   const isValidPassword = await bcrypt.compare(
//                     password,
//                     ArrayData2[0][5]
//                   );
//                   if (isValidPassword) {
//                     const user = {
//                       id: null,
//                       email: null,
//                       password: null,
//                       role: "teacher",
//                     };
//                     user.id = ArrayData2[0][0];
//                     user.email = ArrayData2[0][3];
//                     user.password = ArrayData2[0][5];
//                     const token = jwt.sign(user, config.authentication.jwtSecret);
//                     console.log(token);
//                     res
//                       .cookie("access_token", token, {
//                         maxAge: 90000000,
//                         httpOnly: true,
//                         secure: process.env.NODE_ENV === "production",
//                       })
//                       .status(200)
//                       .json({
//                         message: "login successfully 😊 👌",
//                         role: "teacher",
//                       });
//                   }
//                 }
//               }
//             );
//           } else {
//             const isValidPassword = await bcrypt.compare(
//               password,
//               ArrayData[0][5]
//             );
//             if (isValidPassword) {
//               const user = {
//                 id: null,
//                 email: null,
//                 password: null,
//                 role: "student",
//               };
//               user.id = ArrayData[0][0];
//               user.email = ArrayData[0][3];
//               user.password = ArrayData[0][5];
//               const token = jwt.sign(user, config.authentication.jwtSecret);
//               console.log(ArrayData[0]);
//               res
//                 .cookie("access_token", token, {
//                   maxAge: 90000000,
//                   httpOnly: true,
//                   secure: process.env.NODE_ENV === "production",
//                 })
//                 .status(200)
//                 .json({
//                   message: "login successfully 😊 👌",
//                   role: "student",
//                 });
//             } else {
//               res.json({
//                 message: "Incorrect Gmail or Password!!!",
//               });
//             }
//           }
//         }
//       );
//     }
//   };
