import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';

import Home from './authentication/Home'

// Teacher file 
import SingleCourse from './Teacher/courses/SingleCourse';
import HomeTeacher from './Teacher/home/Home';
import SessionList from './Teacher/sessions/SessionList';
import StudentList from './Teacher/students/StudentList';
import ListAssignment from './Teacher/Assignment/AssignmentList';
import AddAssignment from './Teacher/Assignment/AddAssignment';
import AddSession from './Teacher/sessions/AddSession';
import Register from './authentication/register/Register';
import Signin from './authentication/signin/Signin';
import UserProfile from './Teacher/userprofile/UserProfile';
import EditUserProfile from './Teacher/userprofile/EditUserProfile';
import ViewAssignment from './Teacher/Assignment/ViewAssignment';
import AttendanceList from './Teacher/sessions/AttendanceList';
import ViewDetailForm from './Teacher/Assignment/ViewDetail';
import {DelayAssignment} from './Teacher/Assignment/DelayAssignment'
import { ReturnSubmit } from './Teacher/Assignment/ReturnSubmit';
import {ToGrade} from './Teacher/Assignment/ToGrade';
import {Graded} from './Teacher/Assignment/Graded';
import QrScanner from './Teacher/sessions/QrScanner'
import EditAssignment from './Teacher/Assignment/EditAssignment'
import AddDelay from './Teacher/Assignment/AddDelay'
import CourseMaterial from './Teacher/courses/CourseMaterial';
import { ViewMaterial } from './Teacher/courses/ViewMaterial';
import AddMaterial from './Teacher/courses/AddMaterial';
import EditMaterial from './Teacher/courses/EditMaterial'
import Schedule from './Teacher/Schedule';
import CreateCourse from './Teacher/CreateCourse'

// student file
import SingleCourseStudent from './Student/courses/SingleCourse';
import HomeStudent from './Student/home/Home';
import SessionListStudent from './Student/sessions/SessionList';
import ListAssignmentStudent from './Student/Assignment/AssignmentList';
import UserProfileStudent from './Student/userprofile/UserProfile';
import EditUserProfileStudent from './Student/userprofile/EditUserProfile';
import ViewAssignmentStudent from './Student/Assignment/ViewAssignment';
import AttendanceListStudent from './Student/sessions/AttendanceList';
import CourseMaterialStudent from './Student/courses/CourseMaterial';
import  {ViewMaterialStudent}  from './Student/courses/ViewMaterialStudent';



function App() {
  return (
    <BrowserRouter>
      <Routes>

	     <Route path="/" element={<Home />} />
        {/* Teacher Route View */}

        <Route path="/teacher" element={<HomeTeacher />} />
        <Route path="/teacher/course/:id" element={<SingleCourse />} />
        <Route
          path="/teacher/timetable"
          element={<Schedule />}
        />
        <Route
          path="/teacher/create/course"
          element={<CreateCourse />}
        />
        <Route
          path="/teacher/course/material/:id"
          element={<CourseMaterial />}
        />
        <Route
          path="/teacher/course/view_material/:id"
          element={<ViewMaterial />}
        />
        <Route
          path="/teacher/course/add_material/:id"
          element={<AddMaterial />}
        />
        <Route
          path="/teacher/course/edit_material/:id"
          element={<EditMaterial />}
        />
        <Route
          path="/teacher/course/student_list/:id"
          element={<StudentList />}
        />

        <Route
          path="/teacher/course/add_session/:id"
          element={<AddSession />}
        />
        <Route
          path="/teacher/course/session_list/:id"
          element={<SessionList />}
        />
        <Route
          path="/teacher/course/add_session/:id"
          element={<AddSession />}
        />

        <Route
          path="/teacher/course/attendance_list/:id"
          element={<AttendanceList />}
        />

        <Route
          path="/teacher/course/assignment_list/:id"
          element={<ListAssignment />}
        />
        <Route
          path="/teacher/course/add_assignment/:id"
          element={<AddAssignment />}
        />
        <Route
          path="/teacher/course/view_assignment/:id"
          element={<ViewAssignment />}
        />
        <Route
          path="/teacher/course/view_assignmentdetail/:id"
          element={<ViewDetailForm />}
        />
        <Route
          path="/teacher/course/edit_assignment/:id"
          element={<EditAssignment />}
        />
         <Route
          path="/teacher/course/delay/:id"
          element={<DelayAssignment />}
        />
        <Route
          path="/teacher/course/delay_add/:id"
          element={<AddDelay />}
        />
        <Route
          path="/teacher/course/return_submit/:id"
          element={<ReturnSubmit />}
        />
        <Route 
          path="/teacher/course/tograde/:id" 
          element={<ToGrade />} 
        />
        <Route 
          path="/teacher/course/graded/:id" 
          element={<Graded />} 
        />

        <Route 
          path="/teacher/course/session/:id" 
          element={<QrScanner />} 
        />

        <Route path="/register" element={<Register />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/teacher/profile" element={<UserProfile />} />
        <Route path="/teacher/profile/edit/" element={<EditUserProfile />} />

        {/* Student Route View */}

        <Route path="/student" element={<HomeStudent />} />
        <Route path="/student/course/:id" element={<SingleCourseStudent />} />
		
        <Route
          path="/student/course/add_session/:id"
          element={<AddSession />}
        />
        <Route
          path="/student/course/session_list/:id"
          element={<SessionListStudent />}
        />

        <Route
          path="/student/course/attendance_list/:id"
          element={<AttendanceListStudent />}
        />

        <Route
          path="/student/course/assignment_list/:id"
          element={<ListAssignmentStudent />}
        />
        <Route
          path="/student/course/view_assignment/:id"
          element={<ViewAssignmentStudent />}
        />
        
        <Route path="/student/profile" element={<UserProfileStudent />} />
        <Route
          path="/student/profile/edit/"
          element={<EditUserProfileStudent />}
        />
        <Route
          path="/student/course/material/:id"
          element={<CourseMaterialStudent />}
        />
        <Route
          path="/student/course/view_material/:id"
          element={<ViewMaterialStudent />}
        />
       
      </Routes>
    </BrowserRouter>
  );
}

export default App;
