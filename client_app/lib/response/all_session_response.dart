// To parse this JSON data, do
//
//     final allSessionResponse = allSessionResponseFromJson(jsonString);

import 'dart:convert';

AllSessionResponse allSessionResponseFromJson(String str) => AllSessionResponse.fromJson(json.decode(str));

String allSessionResponseToJson(AllSessionResponse data) => json.encode(data.toJson());

class AllSessionResponse {
  List<Session>? results;

  AllSessionResponse({
    this.results,
  });

  factory AllSessionResponse.fromJson(Map<String, dynamic> json) => AllSessionResponse(
    results: json["results"] == null ? [] : List<Session>.from(json["results"]!.map((x) => Session.fromJson(x))),
  );

  Map<String, dynamic> toJson() => {
    "results": results == null ? [] : List<dynamic>.from(results!.map((x) => x.toJson())),
  };
}

class Session {
  int? id;
  String? name;
  String? start;
  String? end;
  String? date;
  String? group;
  String? courseId;
  String? description;

  Session({
    this.id,
    this.name,
    this.start,
    this.end,
    this.date,
    this.group,
    this.courseId,
    this.description,
  });

  factory Session.fromJson(Map<String, dynamic> json) => Session(
    id: json["id"],
    name: json["_name"],
    start: json["_start"],
    end: json["_end"],
    date: json["_date"],
    group: json["_group"],
    courseId: json["course_id"],
    description: json["description"],
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
  };
}
