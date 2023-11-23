import Flex from '../../components/Flex/flex';
import Input from '../../components/Input/input';
import Button from '../../components/Button/button';
import Link from '../../components/Link/link';
import TaskyDoLogo from '../../assets/TaskyDoLogo.svg';
import Card from '../../components/Card/card';
import {
    FocusEvent,
    FormEvent,
    memo,
    useEffect,
    useRef,
    useState,
} from 'react';
import {
    StyledHeader,
    StyledError,
    StyledSeparator,
    StyledFooter,
    StyledAuthWrapper,
} from './authentication.styles';
import { useForm } from '../../hooks/useForm';

const fieldRequiredValidator = (
    fieldName: 'username' | 'email' | 'password',
) => {
    return (data: Record<string, string>) => {
        return !data[fieldName] ? `${fieldName} is required` : '';
    };
};

const Authentication = ({ type = 'login' }: { type: 'login' | 'signup' }) => {
    const [authType, setAuthType] = useState(type);
    const {
        errors: formErrors,
        registerInput,
        setFieldValue,
        runValidators,
        resetError,
    } = useForm();

    useEffect(() => {
        if (type === 'signup') {
            registerInput('username', [
                fieldRequiredValidator('username'),
                (data) => {
                    return data['username'] && data['username']?.length < 10
                        ? 'Name should be at least 10 characters'
                        : '';
                },
            ]);
            registerInput('email', [fieldRequiredValidator('email')]);
            registerInput('password', [fieldRequiredValidator('password')]);
        } else {
            registerInput('email', [fieldRequiredValidator('email')]);
            registerInput('password', [fieldRequiredValidator('password')]);
        }
    }, [type]);

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
        runValidators();
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
                                    resetError('username');
                                }}
                                onBlur={(e: FocusEvent<HTMLInputElement>) => {
                                    setFieldValue('username', e.target.value);
                                }}
                                info={
                                    formErrors.username?.length > 0
                                        ? formErrors.username
                                        : undefined
                                }
                            />
                            <Input
                                type="email"
                                name="email"
                                placeholder="email"
                                onChange={() => {
                                    setAuthError('');
                                    resetError('email');
                                }}
                                onBlur={(e: FocusEvent<HTMLInputElement>) => {
                                    setFieldValue('email', e.target.value);
                                }}
                                info={
                                    formErrors.email?.length > 0
                                        ? formErrors.email
                                        : undefined
                                }
                            />
                            <Input
                                type="password"
                                name="password"
                                placeholder="password"
                                onChange={() => {
                                    setAuthError('');
                                    resetError('password');
                                }}
                                onBlur={(e: FocusEvent<HTMLInputElement>) => {
                                    setFieldValue('password', e.target.value);
                                }}
                                info={
                                    formErrors.password?.length > 0
                                        ? formErrors.email
                                        : undefined
                                }
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

export default memo(Authentication);
