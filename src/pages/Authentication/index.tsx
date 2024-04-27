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
    useState,
    useContext,
} from 'react';
import {
    StyledHeader,
    StyledError,
    StyledSeparator,
    StyledFooter,
    StyledAuthWrapper,
} from './authentication.styles';
import axios from 'src/axios-instance/axios-instance';
import { AuthContext } from 'src/contexts/AuthContext/AuthContext';
import { useForm } from 'src/hooks/useForm';
import { AxiosError } from 'axios';

const fieldRequiredValidator = (fieldName: string) => {
    return (data: Record<string, string>) => {
        return !data[fieldName] ? `${fieldName} is required` : '';
    };
};

const Authentication = memo(
    ({ type = 'login' }: { type: 'login' | 'signup' }) => {
        const { setIsAuthenticated } = useContext(AuthContext);
        const [authType, setAuthType] = useState(type);
        const [loading, setLoading] = useState(false);
        const [formError, setFormError] = useState<string>();
        const [signUpPasswordInfo, setSignUpPasswordInfo] = useState<string>();
        const {
            errors: formErrors,
            registerInput,
            setFieldValue,
            runValidators,
            resetError,
            data: formData,
        } = useForm();

        useEffect(() => {
            if (type === 'signup') {
                registerInput('name', [
                    fieldRequiredValidator('name'),
                    (data) => {
                        if (!data['name']) return '';
                        return !/^[A-Za-z\s]{2,25}$/.test(data['name'])
                            ? 'Name should be minimum of 2 and maximum of 25 character long and can only contain alphabets or spaces'
                            : '';
                    },
                ]);
                registerInput('email', [
                    fieldRequiredValidator('email'),
                    (data) => {
                        if (!data['email']) return '';
                        return !/^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(
                            data['email'],
                        )
                            ? 'email is invalid'
                            : '';
                    },
                ]);
                registerInput('password', [
                    fieldRequiredValidator('password'),
                    (data) => {
                        if (!data['password']) return '';
                        return !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,32}$/.test(
                            data['password'],
                        )
                            ? 'Password should be 8 to 32 characters long, should contain at least one uppercase, lowercase, number and special character '
                            : '';
                    },
                ]);
            } else {
                registerInput('email', [fieldRequiredValidator('email')]);
                registerInput('password', [fieldRequiredValidator('password')]);
            }
        }, [type, registerInput]);

        const handleLogin = (e: FormEvent<HTMLFormElement>) => {
            if (!runValidators()) {
                setLoading(true);
                axios
                    .post('user/login', formData)
                    .then((response) => {
                        if (response.statusText === '200')
                            setIsAuthenticated(true);
                        setLoading(false);
                    })
                    .catch(
                        (
                            error: AxiosError<{
                                code: string;
                                message: string;
                            }>,
                        ) => {
                            setFormError(error.response?.data.message);
                            setLoading(false);
                        },
                    );
            }
            e.preventDefault();
        };

        const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
            if (!runValidators()) {
                setLoading(true);
                axios
                    .post('user', formData)
                    .then((response) => {
                        if (response.statusText === '201')
                            setIsAuthenticated(true);
                        setLoading(false);
                    })
                    .catch(
                        (
                            error: AxiosError<{
                                code: string;
                                message: string;
                            }>,
                        ) => {
                            setFormError(error.response?.data.message);
                            setLoading(false);
                        },
                    );
            }
            e.preventDefault();
        };

        return (
            <StyledAuthWrapper justifyContent="center">
                <Card>
                    <StyledHeader justifyContent="center" alignItems="center">
                        <img alt="logo of tasky do app" src={TaskyDoLogo} />
                    </StyledHeader>
                    <StyledError>{formError}</StyledError>
                    {authType === 'login' ? (
                        <form onSubmit={handleLogin}>
                            <Flex
                                direction="column"
                                rowGap="16px"
                                alignItems="center"
                            >
                                <Input
                                    placeholder="email"
                                    name="email"
                                    onChange={() => {
                                        setFormError('');
                                        resetError('email');
                                    }}
                                    onBlur={(
                                        e: FocusEvent<HTMLInputElement>,
                                    ) => {
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
                                        setFormError('');
                                        resetError('password');
                                    }}
                                    onBlur={(
                                        e: FocusEvent<HTMLInputElement>,
                                    ) => {
                                        setFieldValue(
                                            'password',
                                            e.target.value,
                                        );
                                    }}
                                    info={
                                        formErrors.password?.length > 0
                                            ? formErrors.password
                                            : undefined
                                    }
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
                                    name="name"
                                    onChange={() => {
                                        setFormError('');
                                        resetError('name');
                                    }}
                                    onBlur={(
                                        e: FocusEvent<HTMLInputElement>,
                                    ) => {
                                        setFieldValue('name', e.target.value);
                                    }}
                                    info={
                                        formErrors.name?.length > 0
                                            ? formErrors.name
                                            : undefined
                                    }
                                    status={
                                        formErrors.name?.length > 0
                                            ? 'error'
                                            : undefined
                                    }
                                />
                                <Input
                                    type="email"
                                    name="email"
                                    placeholder="email"
                                    onChange={() => {
                                        setFormError('');
                                        resetError('email');
                                    }}
                                    onBlur={(
                                        e: FocusEvent<HTMLInputElement>,
                                    ) => {
                                        setFieldValue('email', e.target.value);
                                    }}
                                    info={
                                        formErrors.email?.length > 0
                                            ? formErrors.email
                                            : undefined
                                    }
                                    status={
                                        formErrors.email?.length > 0
                                            ? 'error'
                                            : undefined
                                    }
                                />
                                <Input
                                    type="password"
                                    name="password"
                                    placeholder="password"
                                    onChange={() => {
                                        setFormError('');
                                        resetError('password');
                                    }}
                                    onFocus={() => {
                                        setSignUpPasswordInfo(
                                            'password should be at least 8 characters long, it should contain a lowercase, uppercase, number and a special character',
                                        );
                                    }}
                                    onBlur={(
                                        e: FocusEvent<HTMLInputElement>,
                                    ) => {
                                        setFieldValue(
                                            'password',
                                            e.target.value,
                                        );
                                        setSignUpPasswordInfo(undefined);
                                    }}
                                    info={
                                        formErrors.password?.length > 0
                                            ? formErrors.password
                                            : signUpPasswordInfo || undefined
                                    }
                                    status={
                                        formErrors.password?.length > 0
                                            ? 'error'
                                            : undefined
                                    }
                                />
                                <Button type="submit" progress={loading}>
                                    SignUp
                                </Button>
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
    },
);

export default Authentication;
