import Card from './components/Card/card';
import Configuration from './components/Configuration';
import Flex from './components/Flex/flex';
import Input from './components/Input/input';
import Login from './pages/Login';
import styled, { css } from 'styled-components';

const StyledBody = styled(Flex)(() => {
    return css`
        height: 100vh;
        width: 100%;
    `;
});

function App() {
    return (
        <Configuration>
            {/* <Card><div style={{height: '300px', width: '500px'}}>
      <Input placeholder='username or email'/>
      <Input disabled placeholder='password'/>
      </div></Card> */}
            <StyledBody justifyContent="center" alignItems="center">
                <Login />
            </StyledBody>
        </Configuration>
    );
}

export default App;
