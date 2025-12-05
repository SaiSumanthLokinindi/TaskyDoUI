import Configuration from './components/Configuration/Configuration';
import Flex from './components/Flex/flex';
import AuthProvider from './contexts/AuthContext/AuthContext';
import UserProvider from './contexts/UserContext/UserContext';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routing/AppRoutes';
import { Provider } from 'react-redux';
import store from './store/index';

const StyledBody = styled(Flex)(() => {
    return css`
        height: 100%;
        width: 100%;
    `;
});

function App() {
    return (
        <Provider store={store}>
            <Router>
                <Configuration>
                    <UserProvider>
                        <AuthProvider>
                            <StyledBody
                                justifyContent="center"
                                alignItems="flex-start"
                            >
                                <AppRoutes />
                            </StyledBody>
                        </AuthProvider>
                    </UserProvider>
                </Configuration>
            </Router>
        </Provider>
    );
}

export default App;
