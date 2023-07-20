import 'package:client_app/components/info_textfield.dart';
import 'package:client_app/pages/home_page.dart';
import 'package:client_app/pages/login_page.dart';
import 'package:client_app/pages/qr_code_page.dart';
import 'package:client_app/utils/app_preference.dart';
import 'package:flutter/material.dart';

import 'package:client_app/model/login_model.dart';
import 'package:http/http.dart' as http;
import 'dart:convert';
const id = '';

class ProfilePage extends StatelessWidget {
  const ProfilePage({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      debugShowCheckedModeBanner: false,
      title: 'School Management',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: const EditProfileUI(),
    );
  }
}

class EditProfileUI extends StatefulWidget {
  const EditProfileUI({Key? key}) : super(key: key);
  @override
  State<EditProfileUI> createState() => _EditProfileUIState();
}

//Dark & Light Theme

const MaterialColor whiteSwatch = MaterialColor(
  0xFFFFFFFF,
  <int, Color>{
    50: Colors.white,
    100: Colors.white,
    200: Colors.white,
    300: Colors.white,
    400: Colors.white,
    500: Colors.white,
    600: Colors.white,
    700: Colors.white,
    800: Colors.white,
    900: Colors.white,
  },
);

bool _iconBool = false;

IconData _iconLight = Icons.wb_sunny;
IconData _iconDark = Icons.nights_stay;

ThemeData _lightTheme = ThemeData(
  primarySwatch: whiteSwatch,
  brightness: Brightness.light,
);

ThemeData _darkTheme = ThemeData(
  brightness: Brightness.dark,
);

class _EditProfileUIState extends State<EditProfileUI> {
  UserData? userData;
  bool isObscurePassword = true;

  @override
  void initState() {
    // TODO: implement initState
    userData = AppPreference.getUserInfo();
  }
  @override
  Widget build(BuildContext context) {
    print(userData?.name);
    return MaterialApp(

      theme: _iconBool ? _darkTheme : _lightTheme,
      home: Scaffold(
        appBar: AppBar(
          elevation: 0,
          leading: IconButton(
            icon: Icon(
              Icons.arrow_back,
              color: _iconBool ? Colors.white : Colors.black,
            ),
            onPressed: () {
              Navigator.push(context,
                  MaterialPageRoute(builder: (context) => const HomePage()));
            },
          ),
          actions: [
            IconButton(
              onPressed: () {
                setState(() {
                  _iconBool = !_iconBool;
                });
              },
              icon: Icon(_iconBool ? _iconDark : _iconLight),
            )
          ],
        ),
        body: Container(
          padding: const EdgeInsets.only(left: 15, top: 20, right: 15),
          child: GestureDetector(
            onTap: () {
              FocusScope.of(context).unfocus();
            },
            child: ListView(
              children: [
                Center(
                  child: Stack(
                    children: [
                      Container(
                        width: 130,
                        height: 130,
                        decoration: BoxDecoration(
                            border: Border.all(width: 4, color: Colors.white),
                            boxShadow: [
                              BoxShadow(
                                spreadRadius: 2,
                                blurRadius: 10,
                                color: Colors.black.withOpacity(0.1),
                              )
                            ],
                            shape: BoxShape.circle,
                            image: const DecorationImage(
                                fit: BoxFit.cover,
                                image: AssetImage('lib/assets/profile.png'))),
                      ),
                      Positioned(
                          bottom: 0,
                          right: 0,
                          child: Container(
                            height: 40,
                            width: 40,
                            decoration: BoxDecoration(
                                shape: BoxShape.circle,
                                border: Border.all(
                                  width: 4,
                                  color: Colors.white,
                                ),
                                color: Colors.blue),
                            child: const Icon(
                              Icons.edit,
                              color: Colors.white,
                            ),
                          )),
                    ],
                  ),
                ),
                const SizedBox(
                  height: 30,
                ),
                TextFieldWidget(
                    label: 'Full Name', text: userData?.name ?? '', onChanged: (name) {}),
                const SizedBox(height: 24),
                TextFieldWidget(label: 'ID', text: userData?.id ?? '', onChanged: (id) {}),
                const SizedBox(height: 24),
                TextFieldWidget(
                    label: 'Email',
                    text: userData?.email ?? '',
                    onChanged: (email) {}),
                const SizedBox(height: 24),
                TextFieldWidget(
                    label: 'Phone Number', text: userData?.phone ?? '', onChanged: (phone) {}),
                // const SizedBox(
                //   height: 30,
                // ),
                // RawMaterialButton(
                //   onPressed: () {
                //     Navigator.push(
                //         context,
                //         MaterialPageRoute(
                //             builder: (context) => const SessionPage()));
                //   },
                //   fillColor: _iconBool ? Colors.white : Colors.blueAccent[100],
                //   shape: const StadiumBorder(),
                //   padding:
                //       const EdgeInsets.symmetric(horizontal: 36, vertical: 16),
                //   child: Text(
                //     'Attend Class',
                //     style: TextStyle(
                //         color: _iconBool ? Colors.black : Colors.white),
                //   ),
                // )
              ],
            ),
          ),
        ),
      ),
    );
  }
}
