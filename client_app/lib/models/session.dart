class Session {
  String name;
  double completedPercentage;
  String author;
  String thumbnail;
  String time;

  Session({
    required this.author,
    required this.completedPercentage,
    required this.name,
    required this.thumbnail,
    required this.time,
  });
}

List<Session> courses = [
  Session(
    author: "DevWheels",
    time: "1-3",
    completedPercentage: .75,
    name: "Introduction to NLP",
    thumbnail: "lib/assets/flutter.jpg",
  ),
  Session(
    author: "DevWheels",
    time: "3-5",
    completedPercentage: .60,
    name: "Learn React JS",
    thumbnail: "lib/assets/react.jpg",
  ),
  Session(
    author: "DevWheels",
    time: "10-12",
    completedPercentage: .75,
    name: "Node - The complete guide",
    thumbnail: "lib/assets/node.png",
  ),
  Session(
    author: "DevWheels",
    time: "1-3",
    completedPercentage: .75,
    name: "Learn Flutter",
    thumbnail: "lib/assets/flutter.jpg",
  ),
  Session(
    author: "DevWheels",
    time: "9-11",
    completedPercentage: .60,
    name: "TP1",
    thumbnail: "lib/assets/react.jpg",
  ),
  Session(
    author: "DevWheels",
    time: "3-5",
    completedPercentage: .75,
    name: "Practice TD",
    thumbnail: "lib/assets/node.png",
  ),
];