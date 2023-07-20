import 'package:client_app/model/login_model.dart';
import 'package:client_app/utils/app_preference.dart';
import 'package:flutter/cupertino.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';

import '../model/course_model.dart';
import '../model/session_model.dart';

class APIService {
  static const String apiUrl = "http://192.168.3.7:3000/";
  final client = http.Client();

  // * Login
  Future<LoginResponseModel> login(LoginRequestModel requestModel) async {
    final url = Uri.parse('${apiUrl}login');
    final response = await client.post(
      url,
      body: requestModel.toJson(),
    );

    try {
      final model = LoginResponseModel.fromJson(json.decode(response.body));
      await AppPreference.saveUserInfo(jsonEncode(model.data?[0]));
      await AppPreference.saveAccessToken(model.accessToken ?? '');
      print(AppPreference.getAccessToken());
      return model;
    } catch (e) {
      throw Exception(e);
    }
  }

// * Get All Course By Student ID
  Future<CourseModel?> getAllCourseByStudentId() async {
    final url = Uri.parse('${apiUrl}student/logined');

    try {
      final response = await client.get(
        url,
        headers: {
          "Cookie": "access_token=${AppPreference.getAccessToken()}",
          "Content-Type": 'application/json',
          "Accept": "*/*",
        },
      );
      final model = CourseModel.fromJson(json.decode(response.body));
      return model;
    } on FormatException catch (e) {
      throw Exception(e);
    } catch (e) {
      throw Exception(e);
    }
  }

  Future<SessionModel> getSessionByCourseId(String courseId)async{
    final url = Uri.parse('${apiUrl}student/viewAll/session');
    try{
      final response = await client.post(
          url,
          headers: {
            "Cookie": "access_token=${AppPreference.getAccessToken()}",
          },
          body: {
            "course_id" : courseId,
          }
      );
      return SessionModel.fromJson(json.decode(response.body));
    }catch(e){
      print(e);
      throw Exception(e);
    }
  }
}
