const express = require('express');
const route = express.Router();
const assignment = require("./assignment");
const attendance = require("./attendance");
const student = require("./student");
const session =require("./session")
const controller = require("../controller/authentication");
const course = require("./course");

route.get('/student/logined',controller.authenticate,student.logined)
route.post('/student/submit/assignment',controller.authenticate,assignment.submitted);
route.get('/student/viewAll/assignment/:id',controller.authenticate,assignment.viewAll);
route.get('/student/view/assignment/:id',controller.authenticate,assignment.view);
route.post('/student/viewDetail/assignment',controller.authenticate,assignment.detail)
route.post('/student/attend/course',controller.authenticate,attendance.attended);
route.post('/student/viewAll/session',controller.authenticate,session.displayAll);
route.get('/student/detail/session',controller.authenticate,session.detail);
route.post('/student/view/course',controller.authenticate,course.detail);
route.get('/student/displayAll/material/:course_id',controller.authenticate, course.ListMaterial);
route.post('/student/displayOne/material',controller.authenticate, course.ListOneMaterial);
route.post('/student/viewAll/assignments',controller.authenticate,assignment.views);
module.exports = route;  