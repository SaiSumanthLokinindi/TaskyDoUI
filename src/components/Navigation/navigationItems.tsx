import { IoHomeOutline } from 'react-icons/io5';
import { FiAlertCircle } from 'react-icons/fi';
import { GoCalendar } from 'react-icons/go';
import { LuHistory, LuListTodo } from 'react-icons/lu';

export const navigationItems = [
    {
        to: '/',
        label: 'Home',
        icon: <IoHomeOutline />,
    },
    {
        to: '/myday',
        label: 'My Day',
        icon: <LuListTodo />,
    },
    {
        to: '/upcoming',
        label: 'Upcoming Tasks',
        icon: <GoCalendar />,
    },
    {
        to: '/overdue',
        label: 'Overdue Tasks',
        icon: <FiAlertCircle />,
    },
    {
        to: '/recents',
        label: 'Recently Closed Tasks',
        icon: <LuHistory />,
    },
];

export type NavigationItem = (typeof navigationItems)[number];
