import Configuration from './components/Configuration/Configuration';
import Flex from './components/Flex/flex';
import AuthProvider from './contexts/AuthContext/AuthContext';
import UserProvider from './contexts/UserContext/UserContext';
import styled, { css } from 'styled-components';
import { BrowserRouter as Router } from 'react-router-dom';
import AppRoutes from './routing/AppRoutes';

const StyledBody = styled(Flex)(() => {
    return css`
        height: 100vh;
        width: 100%;
    `;
});

function App() {
    return (
        <Router>
            <Configuration>
                <AuthProvider>
                    <UserProvider>
                        <StyledBody
                            justifyContent="center"
                            alignItems="flex-start"
                        >
                            <AppRoutes />
                        </StyledBody>
                    </UserProvider>
                </AuthProvider>
            </Configuration>
        </Router>
    );
}

export default App;
