import Flex from '../../components/Flex/flex';
import styled, { css } from 'styled-components';
import Input from '../../components/Input/input';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import TaskyDoLogo from '../../assets/TaskyDoLogo.svg';
import Card from '../../components/Card/card';

const StyledHeader = styled(Flex)(() => {
    return css`
        height: 120px;
    `;
});

const StyledSeparator = styled(Flex)(({ theme }) => {
    return css`
        margin-block: calc(3 * ${theme.spacing});
        hr {
            appearance: none;
            border: 0;
            outline: none;
            width: 30%;
            height: 0.05rem;
            background: white;
        }
    `;
});

const StyledFooter = styled(Flex)(({ theme }) => {
    return css`
        p {
            font-size: 0.85rem;
            margin-block: 0 ${theme.spacing};
        }
    `;
});

const StyledButton = styled(Button)`
    width: min-content;
`;

const Login = () => {
    const handleLogin = () => {};

    return (
        <Card>
            <StyledHeader justifyContent="center" alignItems="center">
                <img src={TaskyDoLogo} />
            </StyledHeader>
            <form onSubmit={handleLogin}>
                <Flex direction="column" rowGap="16px" alignItems="center">
                    <Input placeholder="username or email" />
                    <Input type="password" placeholder="password" />
                    <StyledButton type="submit">Login</StyledButton>
                </Flex>
            </form>
            <StyledSeparator alignItems="center" justifyContent="space-around">
                <hr />
                <span>
                    <b>OR</b>
                </span>
                <hr />
            </StyledSeparator>
            <StyledFooter direction="column" alignItems="center">
                <p>Don't have an account?</p>
                <Link href="">SingUp</Link>
            </StyledFooter>
        </Card>
    );
};

export default Login;
