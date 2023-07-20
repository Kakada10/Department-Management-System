const user = require("./authentication");
const express = require('express');
const route = express.Router();
const student = require("./studentController");
const teacher = require("./teacherController");
const year = require("./year");
const course = require("./course");
const assignment = require("./assignment");


route.post('/login', user.login);
route.get('/logout',user.logout);
route.post('/admin/signUp/student', user.authenticate,user.isAdmin, student.signUp);
route.post('/admin/update/student',user.authenticate, user.isAdmin,student.update);
route.get('/admin/get/data',user.authenticate,user.isAdmin,year.getData)
route.post('/admin/updateClass/student',user.authenticate,user.isAdmin, student.updateClass);
route.post('/admin/updateClass/display/student',user.authenticate,user.isAdmin, student.display);
route.get('/admin/displayAll/student',user.authenticate, user.isAdmin,student.displayAll);
route.get('/admin/searchByYearGroup/student',user.authenticate,user.isAdmin, student.searchByYearGroup);
route.get('/admin/searchOneStudent/student/:search',user.authenticate,user.isAdmin, student.searchOneStudent);
route.put('/admin/delete/student/:id',user.authenticate,user.isAdmin, student._delete);
route.post('/admin/signUp/teacher',user.authenticate,user.isAdmin, teacher.signUp);
route.post('/admin/update/teacher',user.authenticate,user.isAdmin, teacher.update);
route.get('/admin/searchOne/teacher/:search',user.authenticate,user.isAdmin, teacher.searchOne);
route.delete('/admin/resign/teacher/:id',user.authenticate,user.isAdmin, teacher.resign);
route.get('/admin/seeDetail/teacher/:id',user.authenticate,user.isAdmin, teacher.seeDetail);
route.get('/admin/displayAll/teacher',user.authenticate,user.isAdmin, teacher.displayAll);
route.get('/admin/displayOne/student/:id',user.authenticate,user.isAdmin, student.displayOne);
route.get('/admin/displayOne/year/:id',user.authenticate,user.isAdmin, year.displayOne);
route.get('/year/schedule', year.getYear);
route.post('/admin/create/course',user.authenticate,user.isAdmin, course.create);
route.post('/admin/create/course/schedule',user.authenticate,user.isAdmin, course.createSchedule);
route.get('/admin/displayOne/course/:id',user.authenticate,user.isAdmin, course.displayOne);
route.get('/admin/displayOne/teacher/:id',user.authenticate,user.isAdmin, teacher.displayOne);
route.get('/admin/displayOne/course/:id',user.authenticate,user.isAdmin, course.displayOne);
route.get('/admin/displayOne/course/schedule/:id',user.authenticate,user.isAdmin, course.displayCourseSchedule);
route.post('/admin/update/course',user.authenticate,user.isAdmin, course.update);
route.post('/admin/update/material',user.authenticate,user.isAdmin, course.UpdateMaterial);
route.post('/admin/upload/material',user.authenticate,user.isAdmin, course.UploadMaterial);
route.get('/admin/displayAll/material/:course_id',user.authenticate,user.isAdmin, course.ListMaterial);
route.post('/admin/displayOne/material',user.authenticate,user.isAdmin, course.ListOneMaterial);
route.post('/admin/verify/course/schedule', course.verifyDuplicateCourseSchedule);
route.post('/admin/update/course/schedule', course.UpdateCourseSchedule);
route.get('/admin/displayAll/course',user.authenticate,user.isAdmin, course.displayAll);
route.delete('/admin/deleteByID/course/:id',user.authenticate,user.isAdmin, course.deleteByID);
route.get('/admin/search/course/:search',user.authenticate,user.isAdmin, course.search);
route.delete('/admin/deleteByID/year/:id',user.authenticate,user.isAdmin, year.deleteByID);
route.post('/admin/create/year',user.authenticate,user.isAdmin, year.create);
route.get('/admin/displayAll/year',user.authenticate,user.isAdmin, year.displayAll);
route.get('/admin/view/assignment/:id',user.authenticate,user.isAdmin,assignment.display);
route.post('/getSchedule',course.getSchedule)
route.get('/admin/get/room',user.authenticate,course.ListRoom);
route.post('/admin/get/roomTable',course.roomTable)
module.exports = route;