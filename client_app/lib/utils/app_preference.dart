import 'dart:convert';

import 'package:shared_preferences/shared_preferences.dart';

import '../model/login_model.dart';

class AppPreference {
  static SharedPreferences _preference =
      SharedPreferences.getInstance() as SharedPreferences;

  static Future init() async =>
      _preference = await SharedPreferences.getInstance();

  static const String userInfoKey = "userInfoKey";
  static const String accessTokenKey = "accessTokenKey";

  // * Setter
  static Future saveUserInfo(String userInfo) async {
    await _preference.setString(userInfoKey, userInfo);
  }

  static Future saveAccessToken(String token) async {
    await _preference.setString(accessTokenKey, token);
  }

  // * Getter
  static UserData getUserInfo() {
    final json = jsonDecode(_preference.getString(userInfoKey) ?? '');
    return UserData.fromJson(json);
  }

  static String? getAccessToken() {
    return _preference.getString(accessTokenKey);
  }
}
