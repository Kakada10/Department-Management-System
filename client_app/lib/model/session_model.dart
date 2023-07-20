// To parse this JSON data, do
//
//     final sessionModel = sessionModelFromJson(jsonString);

import 'dart:convert';

SessionModel sessionModelFromJson(String str) => SessionModel.fromJson(json.decode(str));

String sessionModelToJson(SessionModel data) => json.encode(data.toJson());

class SessionModel {
  List<SessionData>? results;

  SessionModel({
    this.results,
  });

  factory SessionModel.fromJson(Map<String, dynamic> json) => SessionModel(
    results: json["results"] == null ? [] : List<SessionData>.from(json["results"]!.map((x) => SessionData.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "results": results == null ? [] : List<dynamic>.from(results!.map((x) => x.toJson())),
  };
}

class SessionData {
  int? id;
  String? name;
  String? start;
  String? end;
  String? date;
  String? group;
  String? courseId;
  String? description;
  String? teacherId;
  String? courseName;
  int? semester;
  String? yearId;
  String? courseDesc;
  String? type;
  String? teacherName;
  String? address;
  String? email;
  String? phone;
  String? password;
  String? gender;

  SessionData({
    this.id,
    this.name,
    this.start,
    this.end,
    this.date,
    this.group,
    this.courseId,
    this.description,
    this.teacherId,
    this.courseName,
    this.semester,
    this.yearId,
    this.courseDesc,
    this.type,
    this.teacherName,
    this.address,
    this.email,
    this.phone,
    this.password,
    this.gender,
  });

  factory SessionData.fromJson(Map<String, dynamic> json) => SessionData(
    id: json["id"],
    name: json["_name"],
    start: json["_start"],
    end: json["_end"],
    date: json["_date"],
    group: json["_group"],
    courseId: json["course_id"],
    description: json["description"],
    teacherId: json["teacher_id"],
    courseName: json["course_name"],
    semester: json["semester"],
    yearId: json["year_id"],
    courseDesc: json["course_desc"],
    type: json["type"],
    teacherName: json["name"],
    address: json["address"],
    email: json["email"],
    phone: json["phone"],
    password: json["password"],
    gender: json["gender"],
  );

  Map<String, dynamic> toJson() => {
    "id": id,
    "_name": name,
    "_start": start,
    "_end": end,
    "_date": date,
    "_group": group,
    "course_id": courseId,
    "description": description,
    "teacher_id": teacherId,
    "course_name": courseName,
    "semester": semester,
    "year_id": yearId,
    "course_desc": courseDesc,
    "type": type,
    "name": teacherName,
    "address": address,
    "email": email,
    "phone": phone,
    "password": password,
    "gender": gender,
  };
}
