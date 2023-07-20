// To parse this JSON data, do
//
//     final loginResponseModel = loginResponseModelFromJson(jsonString);

import 'dart:convert';

LoginResponseModel loginResponseModelFromJson(String str) =>
    LoginResponseModel.fromJson(json.decode(str));

String loginResponseModelToJson(LoginResponseModel data) =>
    json.encode(data.toJson());

class LoginResponseModel {
  bool? success;
  String? message;
  String? role;
  List<UserData>? data;
  String? accessToken;

  LoginResponseModel({
    this.success,
    this.message,
    this.role,
    this.data,
    this.accessToken,
  });

  factory LoginResponseModel.fromJson(Map<String, dynamic> json) =>
      LoginResponseModel(
        success: json["success"],
        message: json["message"],
        role: json["role"],
        data: json["data"] == null
            ? []
            : List<UserData>.from(
                json["data"]!.map((x) => UserData.fromJson(x))),
        accessToken: json['access_token'],
      );

  Map<String, dynamic> toJson() => {
        "success": success,
        "message": message,
        "role": role,
        "data": data == null
            ? []
            : List<dynamic>.from(data!.map((x) => x.toJson())),
        "access_token": accessToken,
      };
}

class UserData {
  String? id;
  String? name;
  String? gender;
  String? address;
  String? email;
  String? phone;
  String? password;

  UserData({
    this.id,
    this.name,
    this.gender,
    this.address,
    this.email,
    this.phone,
    this.password,
  });

  factory UserData.fromJson(Map<String, dynamic> json) => UserData(
        id: json["id"],
        name: json["name"],
        gender: json["gender"],
        address: json["address"],
        email: json["email"],
        phone: json["phone"],
        password: json["password"],
      );

  Map<String, dynamic> toJson() => {
        "id": id,
        "name": name,
        "gender": gender,
        "address": address,
        "email": email,
        "phone": phone,
        "password": password,
      };
}

class LoginRequestModel {
  String email;
  String password;

  LoginRequestModel({
    required this.email,
    required this.password,
  });

  Map<String, dynamic> toJson() {
    Map<String, dynamic> map = {
      'email': email,
      'password': password,
    };
    return map;
  }
}
