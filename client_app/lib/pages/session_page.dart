import 'package:client_app/api/api_service.dart';
import 'package:client_app/pages/qr_code_page.dart';
import 'package:flutter/material.dart';

import '../model/session_model.dart';

class SessionPage extends StatefulWidget {
  final String courseId;

  const SessionPage({
    Key? key,
    required this.courseId,
  }) : super(key: key);

  @override
  State<SessionPage> createState() => _SessionPageState();
}

class _SessionPageState extends State<SessionPage> {
  List<SessionData> sessionList = [];

  @override
  void initState() {
    // TODO: implement initState
    super.initState();
    getSessions();
  }

  getSessions() async {
    final sessionModel =
        await APIService().getSessionByCourseId(widget.courseId);
    setState(() {
      sessionList = sessionModel.results ?? [];
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('List of Sessions'),
      ),
      body: ListView.builder(
          itemCount: sessionList.length,
          itemBuilder: (context, index) {
            final model = sessionList[index];
            return Padding(
              padding: const EdgeInsets.all(10.0),
              child: GestureDetector(
                onTap: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (context) => QRCodePage(
                        sessionId: model.id.toString(),
                      ),
                    ),
                  );
                },
                child: Container(
                  padding: const EdgeInsets.symmetric(vertical: 15),
                  decoration: BoxDecoration(
                    color: Colors.orange[300],
                    borderRadius: BorderRadius.circular(10),
                  ),
                  child: Column(
                    children: [
                      Row(
                        children: [
                          const Padding(
                              padding: EdgeInsets.only(left: 4.0),
                            child: Icon(
                              Icons.note_alt_outlined,
                              color: Colors.white,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 4.0),
                            child: Center(
                              child: Text(
                                "Title : ${model.name ?? ''}",
                                style: const TextStyle(color: Colors.white)
                                ,
                              ),
                            ),
                          ),
                        ],
                      ),

                      Row(
                        children: [
                          const Padding(padding: EdgeInsets.only(left: 4.0),
                            child: Icon(
                              Icons.access_alarm,
                              color: Colors.white,
                            ),
                          ),
                          Padding(
                            padding: const EdgeInsets.only(left: 4.0, top: 4.0, bottom: 4.0),
                            child: Center(
                              child: Text(
                                "Time: ${model.start ?? ''} - ${model.end ?? ''}",
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                        ],
                      ),

                      Row(
                        children: [
                          const Padding(padding: EdgeInsets.only(left: 4.0),
                            child: Icon(
                              Icons.my_library_books_outlined,
                              color: Colors.white,
                            ),
                          ),
                          // Padding(
                          //   padding: const EdgeInsets.only(left: 4.0),
                          //   child: Center(
                          //     child: Text(
                          //       "Description: ${model.description ?? ''}",
                          //       style: const TextStyle(color: Colors.white),
                          //     ),
                          //   ),
                          // ),
                          Padding(
                            padding: const EdgeInsets.only(left: 4.0),
                            child: Center(
                              child: Text(
                                "course_id: ${model.courseId ?? ''}",
                                style: const TextStyle(color: Colors.white),
                              ),
                            ),
                          ),
                        ],
                      )
                    ],
                  ),

                ),
              ),
            );
          }),
    );
  }
}
