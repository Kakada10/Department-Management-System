import 'dart:ffi';

import 'package:client_app/model/login_model.dart';
import 'package:client_app/pages/home_page.dart';
import 'package:client_app/pages/session_page.dart';
import 'package:client_app/utils/app_preference.dart';
import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:qr_flutter/qr_flutter.dart';
import 'package:random_string/random_string.dart';
import 'dart:convert';


class QRCodePage extends StatefulWidget {
  final String sessionId;


  const QRCodePage({Key? key, required this.sessionId}) : super(key: key);

  @override
  State<QRCodePage> createState() => _QRCodePageState();
}

class _QRCodePageState extends State<QRCodePage> {
  UserData? userData;
  String code = randomAlphaNumeric(6);

  @override
  void initState() {
    super.initState();
    userData = AppPreference.getUserInfo();
  }

  @override
  Widget build(BuildContext context) {
    Map<String, dynamic> jsonData = {
      "session_id": widget.sessionId,
      "id": userData?.id,
      "time": DateFormat("HH:mm").format(DateTime.now()),
      "code": code,
    };

    String jsonString = json.encode(jsonData);

    return Scaffold(
      appBar: AppBar(
        backgroundColor: Colors.white,
        elevation: 0,
        leading: IconButton(
          icon: const Icon(
            Icons.arrow_back,
            color: Colors.black,
          ),
          onPressed: () {
            Navigator.push(
              context,
              MaterialPageRoute(builder: (context) => const HomePage()),
            );
          },
        ),
        actions: const [],
      ),
      body: Container(
        color: Colors.white,
        child: SafeArea(
          child: Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                // const Text(
                //   'Attendance Management System',
                //   style: TextStyle(
                //     fontSize: 25,
                //     fontWeight: FontWeight.bold,
                //     color: Colors.blueAccent,
                //   ),
                // ),
                // const SizedBox(
                //   height: 20,
                // ),
                Center(
                  child: QrImageView(
                    data: jsonString,
                    backgroundColor: Colors.white,
                    size: 250,
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                MaterialButton(
                  color: Colors.blueAccent,
                  onPressed: () {
                    setState(() {
                      code = randomAlphaNumeric(6);
                    });
                  },
                  child: Container(
                    width: 200,
                    child: const Center(
                      child:  Text(
                        'Generate',
                        style: TextStyle(
                            color: Colors.white,
                        ),
                      ),
                    ),
                  ),
                )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
