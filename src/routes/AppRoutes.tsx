import { useRoutes } from 'react-router-dom';
import Authentication from 'src/pages/Authentication/Authentication';
import MyDay from 'src/pages/MyDay/MyDayTasks';
import NotFoundPage from 'src/pages/NotFoundPage';
import AppContainer from 'src/pages/AppContainer/AppContainer';
import ProtectedRoute from './ProtectedRoute';
import Home from 'src/pages/Home/Home';
import UpcomingTasks from 'src/pages/UpcomingTasks/UpcomingTasks';
import OverdueTasks from 'src/pages/Overdue Tasks/OverdueTasks';
import RecentlyCompletedTasks from 'src/pages/Rencetly Completed Tasks/RecentlyCompletedTasks';

const AppRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <AppContainer />
                </ProtectedRoute>
            ),
            children: [
                {
                    path: '',
                    element: <Home />,
                },
                {
                    path: 'myday',
                    element: <MyDay />,
                },
                {
                    path: 'upcoming',
                    element: <UpcomingTasks />,
                },
                {
                    path: 'overdue',
                    element: <OverdueTasks />,
                },
                {
                    path: 'recents',
                    element: <RecentlyCompletedTasks />,
                },
            ],
        },
        {
            path: '/login',
            element: <Authentication type="login" />,
        },
        {
            path: '/signup',
            element: <Authentication type="signup" />,
        },
        {
            path: '*',
            element: <NotFoundPage />,
        },
    ]);
};

export default AppRoutes;
