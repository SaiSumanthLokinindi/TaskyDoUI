import { useRoutes } from 'react-router-dom';
import Authentication from 'src/pages/Authentication';
import MyDay from 'src/pages/MyDay/MyDay';
import ProtectedRoute from './ProtectedRoute';
import NotFoundPage from 'src/pages/NotFoundPage';
import AppContainer from 'src/pages/AppContainer/AppContainer';

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
                    path: 'myday',
                    element: <MyDay />,
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
