import { BiBook, BiCalendar, BiChild, BiMale, BiMedal, BiListCheck, BiDoorOpen } from 'react-icons/bi';
export const MenuConstants = [
  {
    // name: 'LIST',
    item: [
      {
        id: 'dashboard',
        name: 'Dashboard',
        path: '/dashboard',
        icon: <BiMedal />,
      },
      {
        id: 'years',
        name: 'Year',
        path: '/year',
        icon: <BiCalendar />,
      },
      {
        id: 'courses',
        name: 'Courses',
        path: '/course/list',
        icon: <BiBook />,
      },
      {
        id: 'schedules',
        name: 'Timetable',
        path: '/timetable/list',
        icon: <BiListCheck />,
      },
      {
        id: 'rooms',
        name: 'Room',
        path: '/room/list',
        icon: <BiDoorOpen />,
      },
    ],
  },
  {
    name: 'SETTING',
    item: [
      {
        id: 'teachers',
        name: 'Teacher',
        path: '/teacher',
        icon: <BiMale />,
      },
      {
        id: 'students',
        name: 'Student',
        path: '/student',
        icon: <BiChild />,
      },
      {
        id: 'academic',
        name: 'Academic',
        path: '/academic',
        icon: <BiMedal />,
      },
      // {
      //   id: 'system-roles',
      //   name: 'System Roles',
      //   path: '/system-role',
      //   icon: <HiOutlineAdjustments />,
      // },
      // {
      //   id: 'users',
      //   name: 'Users',
      //   path: '/user',
      //   icon: <BiGroup />,
      // },
    ],
  },
];
