import Flex from '../../components/Flex/flex';
import Input from '../../components/Input/input';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import TaskyDoLogo from '../../assets/TaskyDoLogo.svg';
import Card from '../../components/Card/card';
import { FormEvent, useRef, useState } from 'react';
import {
    StyledHeader,
    StyledError,
    StyledSeparator,
    StyledFooter,
} from './login.styles';

const Login = () => {
    const [userNameOrEmailRef, passwordRef] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [error, setError] = useState('');

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userNameOrEmail = userNameOrEmailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!userNameOrEmail || !password) {
            setError('incorrect username or password');
        }
    };

    return (
        <Card>
            <StyledHeader justifyContent="center" alignItems="center">
                <img src={TaskyDoLogo} />
            </StyledHeader>
            <form onSubmit={handleLogin}>
                <StyledError>{error}</StyledError>
                <Flex direction="column" rowGap="16px" alignItems="center">
                    <Input
                        ref={userNameOrEmailRef}
                        placeholder="username or email"
                        onChange={() => {
                            setError('');
                        }}
                    />
                    <Input
                        ref={passwordRef}
                        type="password"
                        placeholder="password"
                        onChange={() => {
                            setError('');
                        }}
                    />
                    <Button type="submit">Login</Button>
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
