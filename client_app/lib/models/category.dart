class Category {
  String thumbnail;
  String name;
  int noOfCourses;

  Category({
    required this.name,
    required this.noOfCourses,
    required this.thumbnail,
  });
}

List<Category> categoryList = [
  Category(
    name: 'Session',
    noOfCourses: 55,
    thumbnail: 'lib/assets/laptop.jpg',
  ),
  Category(
    name: 'Assignment',
    noOfCourses: 20,
    thumbnail: 'lib/assets/accounting.jpg',
  ),
  Category(
    name: 'Course',
    noOfCourses: 16,
    thumbnail: 'lib/assets/photography.jpg',
  ),
  Category(
    name: 'Student',
    noOfCourses: 25,
    thumbnail: 'lib/assets/design.jpg',
  ),
];
