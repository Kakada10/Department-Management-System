// To parse this JSON data, do
//
//     final courseModel = courseModelFromJson(jsonString);

import 'dart:convert';

CourseModel courseModelFromJson(String str) => CourseModel.fromJson(json.decode(str));

String courseModelToJson(CourseModel data) => json.encode(data.toJson());

class CourseModel {
    List<Course>? results;

    CourseModel({
        this.results,
    });

    factory CourseModel.fromJson(Map<String, dynamic> json) => CourseModel(
        results: json["results"] == null ? [] : List<Course>.from(json["results"]!.map((x) => Course.fromJson(x))),
    );

    Map<String, dynamic> toJson() => {
        "results": results == null ? [] : List<dynamic>.from(results!.map((x) => x.toJson())),
    };
}

class Course {
    String? courseId;
    String? teacherId;
    String? courseName;
    int? semester;
    String? yearId;
    String? courseDesc;
    String? type;
    int? id;
    String? name;
    String? address;
    String? email;
    String? phone;
    String? password;
    String? gender;
    int? year;
    String? fromYear;
    String? toYear;

    Course({
        this.courseId,
        this.teacherId,
        this.courseName,
        this.semester,
        this.yearId,
        this.courseDesc,
        this.type,
        this.id,
        this.name,
        this.address,
        this.email,
        this.phone,
        this.password,
        this.gender,
        this.year,
        this.fromYear,
        this.toYear,
    });

    factory Course.fromJson(Map<String, dynamic> json) => Course(
        courseId: json["course_id"],
        teacherId: json["teacher_id"],
        courseName: json["course_name"],
        semester: json["semester"],
        yearId: json["year_id"],
        courseDesc: json["course_desc"],
        type: json["type"],
        id: json["id"],
        name: json["name"],
        address: json["address"],
        email: json["email"],
        phone: json["phone"],
        password: json["password"],
        gender: json["gender"],
        year: json["year"],
        fromYear: json["FromYear"],
        toYear: json["ToYear"],
    );

    Map<String, dynamic> toJson() => {
        "course_id": courseId,
        "teacher_id": teacherId,
        "course_name": courseName,
        "semester": semester,
        "year_id": yearId,
        "course_desc": courseDesc,
        "type": type,
        "id": id,
        "name": name,
        "address": address,
        "email": email,
        "phone": phone,
        "password": password,
        "gender": gender,
        "year": year,
        "FromYear": fromYear,
        "ToYear": toYear,
    };
}
