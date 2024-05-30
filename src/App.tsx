import Configuration from './components/Configuration';
import Flex from './components/Flex/flex';
import AuthProvider from './contexts/AuthContext/AuthContext';
import UserProvider from './contexts/UserContext/UserContext';
import Authentication from './pages/Authentication';
import styled, { css } from 'styled-components';

const StyledBody = styled(Flex)(() => {
    return css`
        height: 100vh;
        width: 100%;
    `;
});

function App() {
    return (
        <AuthProvider>
            <UserProvider>
                <Configuration>
                    <StyledBody justifyContent="center" alignItems="flex-start">
                        <Authentication type="signup" />
                    </StyledBody>
                </Configuration>
            </UserProvider>
        </AuthProvider>
    );
}

export default App;
