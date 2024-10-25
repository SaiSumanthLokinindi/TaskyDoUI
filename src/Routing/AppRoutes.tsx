import { useRoutes } from 'react-router-dom';
import Authentication from 'src/pages/Authentication/Authentication';
import MyDay from 'src/pages/MyDay/MyDay';
import NotFoundPage from 'src/pages/NotFoundPage';
import AppContainer from 'src/pages/AppContainer/AppContainer';
import ProtectedRoute from './ProtectedRoute';
import Search from 'src/pages/Search/Search';
import Calendar from 'src/pages/Calendar/Calendar';
import Home from 'src/pages/Home/Home';

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
                    path: 'search',
                    element: <Search />,
                },
                {
                    path: 'calendar',
                    element: <Calendar />,
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
