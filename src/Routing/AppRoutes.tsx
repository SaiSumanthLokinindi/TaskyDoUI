import { useRoutes } from 'react-router-dom';
import Authentication from 'src/pages/Authentication';
import MyDay from 'src/pages/MyDay/MyDay';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from 'src/pages/NotFoundPage';

const AppRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <MyDay />
                </ProtectedRoute>
            ),
        },
        {
            path: '/myday',
            element: (
                <ProtectedRoute>
                    <MyDay />
                </ProtectedRoute>
            ),
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
