import { useRoutes } from 'react-router-dom';
import Authentication from 'src/pages/Authentication';
import Dashboard from 'src/pages/Dashboard/Dashboard';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from 'src/pages/NotFoundPage';

const AppRoutes = () => {
    return useRoutes([
        {
            path: '/',
            element: (
                <ProtectedRoute>
                    <Dashboard />
                </ProtectedRoute>
            ),
        },
        {
            path: '/dashboard',
            element: (
                <ProtectedRoute>
                    <Dashboard />
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
