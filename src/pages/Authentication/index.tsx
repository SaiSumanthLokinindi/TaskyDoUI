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
} from './authentication.styles';

const Login = ({ type = 'login' }: { type: 'login' | 'signup' }) => {
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
            {type === 'login' ? (
                <form onSubmit={handleLogin}>
                    <StyledError>{error}</StyledError>
                    <Flex direction="column" rowGap="16px" alignItems="center">
                        <Input
                            ref={userNameOrEmailRef}
                            placeholder="email"
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
            ) : (
                <form onSubmit={handleLogin}>
                    <StyledError>{error}</StyledError>
                    <Flex direction="column" rowGap="16px" alignItems="center">
                        <Input
                            placeholder="Name"
                            onChange={() => {
                                setError('');
                            }}
                        />
                        <Input
                            type="email"
                            placeholder="email"
                            onChange={() => {
                                setError('');
                            }}
                        />
                        <Input
                            type="password"
                            placeholder="password"
                            onChange={() => {
                                setError('');
                            }}
                        />
                        <Button type="submit">SingUp</Button>
                    </Flex>
                </form>
            )}
            <StyledSeparator alignItems="center" justifyContent="space-around">
                <hr />
                <span>
                    <b>OR</b>
                </span>
                <hr />
            </StyledSeparator>
            <StyledFooter direction="column" alignItems="center">
                <p>{type === 'login' ? `Don't` : 'Already'} have an account?</p>
                <Link href="">{type === 'login' ? 'SignUp' : 'Login'}</Link>
            </StyledFooter>
        </Card>
    );
};

export default Login;
