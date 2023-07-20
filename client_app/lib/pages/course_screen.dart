import 'package:client_app/api/api_service.dart';
import 'package:client_app/model/login_model.dart';
import 'package:client_app/pages/home_page.dart';
import 'package:client_app/pages/scanner_page.dart';
import 'package:client_app/pages/qr_code_page.dart';
import 'package:client_app/pages/session_page.dart';
import 'package:client_app/utils/app_preference.dart';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';

import '../model/course_model.dart';

class SessionScreen extends StatefulWidget {
  const SessionScreen({Key? key}) : super(key: key);

  @override
  _SessionScreenState createState() => _SessionScreenState();
}

class _SessionScreenState extends State<SessionScreen> {
  List<Course> courseList = [];
  UserData? currentUser;

  @override
  void initState() {
    super.initState();
    getCourseList();
  }

  getCourseList() async {
    currentUser = AppPreference.getUserInfo();
    final response = await APIService().getAllCourseByStudentId();
    setState(() {
      courseList = response?.results ?? [];
    });
  }

  @override
  Widget build(BuildContext context) {
    return AnnotatedRegion<SystemUiOverlayStyle>(
      value: SystemUiOverlayStyle.dark,
      child: Scaffold(
        // appBar: AppBar(
        //   leading: IconButton(
        //     icon: const Icon(Icons.arrow_back),
        //     onPressed: () {
        //       Navigator.push(context,
        //           MaterialPageRoute(builder: (context) => const HomePage()));
        //     },
        //   ),
        // ),
        body: SafeArea(
          bottom: false,
          child: Padding(
            padding: const EdgeInsets.symmetric(horizontal: 20.0, vertical: 10),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                IntrinsicHeight(
                  child: Stack(
                    children: [
                      const Align(
                        child: Text(
                          'List of Courses',
                          style: TextStyle(
                              fontWeight: FontWeight.bold, fontSize: 18),
                        ),
                      ),
                      GestureDetector(
                        onTap: () {
                          Navigator.pop(context);
                        },
                        child: const Icon(Icons.arrow_back),
                      ),
                    ],
                  ),
                ),
                const SizedBox(
                  height: 15,
                ),
                Expanded(
                  child: ListView.separated(
                    padding: const EdgeInsets.symmetric(vertical: 20),
                    separatorBuilder: (_, __) {
                      return const SizedBox(
                        height: 10,
                      );
                    },
                    shrinkWrap: true,
                    itemBuilder: (_, int index) {
                      return CourseContainer(
                        course: courseList[index],
                      );
                    },
                    itemCount: courseList.length,
                  ),
                ),
              ],
            ),
          ),
        ),
      ),
    );
  }
}

class CourseContainer extends StatelessWidget {
  final Course course;

  const CourseContainer({
    Key? key,
    required this.course,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return GestureDetector(
      onTap: () {
        Navigator.push(
            context, MaterialPageRoute(builder: (context) => SessionPage(courseId: course.courseId??'',)));
      },
      child: Container(
        decoration: BoxDecoration(
          borderRadius: BorderRadius.circular(10),
          color: Colors.white,
        ),
        padding: const EdgeInsets.all(10),
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            ClipRRect(
              borderRadius: BorderRadius.circular(10),
              child: Image.asset(
                'lib/assets/note.png',
                height: 60,
              ),
            ),
            const SizedBox(
              width: 10,
            ),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text("Name : ${course.courseName}"  ?? ''),
                  Text(
                    "Lectured by ${course.name}",
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  const SizedBox(
                    height: 5,
                  ),
                  Text(
                    "Semester : ${course.semester}",
                    style: Theme.of(context).textTheme.bodyMedium,
                  ),
                  // GestureDetector(
                  //   onTap: () => Navigator.push(
                  //       context,
                  //       MaterialPageRoute(
                  //           builder: (context) => const ScannerPage())),
                  //   child: const Icon(
                  //     Icons.camera_enhance,
                  //     size: 26,
                  //   ),
                  // ),
                  const SizedBox(
                    height: 5,
                  ),
                  const LinearProgressIndicator(
                    value: 0,
                    backgroundColor: Colors.purple,
                    color: Colors.pink,
                  )
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}
