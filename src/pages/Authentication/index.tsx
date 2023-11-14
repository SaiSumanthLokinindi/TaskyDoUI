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
    StyledAuthWrapper,
} from './authentication.styles';

const Login = ({ type = 'login' }: { type: 'login' | 'signup' }) => {
    const [authType, setAuthType] = useState(type);

    const [userNameOrEmailRef, passwordRef] = [
        useRef<HTMLInputElement>(null),
        useRef<HTMLInputElement>(null),
    ];

    const [authError, setAuthError] = useState('');

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const userNameOrEmail = userNameOrEmailRef.current?.value;
        const password = passwordRef.current?.value;
        if (!userNameOrEmail || !password) {
            setAuthError('incorrect username or password');
        }
    };

    const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const signUpData = new FormData(e.currentTarget);
        const username = signUpData.get('username');
        const email = signUpData.get('email');
        const password = signUpData.get('password');
        // if(!username || !email || !password)
    };

    return (
        <StyledAuthWrapper justifyContent="center">
            <Card>
                <StyledHeader justifyContent="center" alignItems="center">
                    <img src={TaskyDoLogo} />
                </StyledHeader>
                <StyledError>{authError}</StyledError>
                {authType === 'login' ? (
                    <form onSubmit={handleLogin}>
                        <Flex
                            direction="column"
                            rowGap="16px"
                            alignItems="center"
                        >
                            <Input
                                ref={userNameOrEmailRef}
                                placeholder="email"
                                name="email"
                                onChange={() => {
                                    setAuthError('');
                                }}
                            />
                            <Input
                                ref={passwordRef}
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={() => {
                                    setAuthError('');
                                }}
                            />
                            <Button type="submit">Login</Button>
                        </Flex>
                    </form>
                ) : (
                    <form onSubmit={handleSignUp}>
                        <Flex
                            direction="column"
                            rowGap="16px"
                            alignItems="center"
                        >
                            <Input
                                placeholder="Name"
                                name="username"
                                onChange={() => {
                                    setAuthError('');
                                }}
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="email"
                                onChange={() => {
                                    setAuthError('');
                                }}
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={() => {
                                    setAuthError('');
                                }}
                            />
                            <Button type="submit">SingUp</Button>
                        </Flex>
                    </form>
                )}
                <StyledSeparator
                    alignItems="center"
                    justifyContent="space-around"
                >
                    <hr />
                    <span>
                        <b>OR</b>
                    </span>
                    <hr />
                </StyledSeparator>
                <StyledFooter direction="column" alignItems="center">
                    <p>
                        {authType === 'login' ? `Don't` : 'Already'} have an
                        account?
                    </p>
                    <Link
                        onClick={() => {
                            if (authType === 'login') setAuthType('signup');
                            else setAuthType('login');
                        }}
                    >
                        {authType === 'login' ? 'SignUp' : 'Login'}
                    </Link>
                </StyledFooter>
            </Card>
        </StyledAuthWrapper>
    );
};

export default Login;
