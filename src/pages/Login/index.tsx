import Flex from "../../components/Flex/flex";
import styled, {css} from 'styled-components'
import Input from "../../components/Input/input";
import Button from "../../components/Button/button";

const StyledHeader = styled(Flex)``

const StyledFooter = styled(Flex)(()=>{
    return css`
        hr{
            appearance: none;
            border:0;
            outline: none;
            width: 30%;
            height: 0.05rem;
            background: white;
        }
    `
});


const StyledButton = styled(Button)`
    width: min-content;
`



const Login = ()=>{
    return (
    <Flex direction='column' justifyContent='center'>
        <Flex>Header</Flex>
        <Flex style={{height: '300px', border: '1px solid white'}} direction="column" rowGap="30px">
             <Input placeholder="username or email"/>
             <Input type="password" placeholder="password"/>
             <StyledButton>Login</StyledButton>
        </Flex>
        <StyledFooter alignItems="center" justifyContent="space-around">
             <hr/><span> <b>OR</b> </span> <hr/>
        </StyledFooter>
    </Flex>)
};

export default Login;