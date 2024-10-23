import {
    Dispatch,
    FormEvent,
    SetStateAction,
    memo,
    useContext,
    useEffect,
    useState,
} from 'react';
import { fieldRequiredValidator } from './authUtils';
import { useForm } from 'src/hooks/useForm';
import axios from 'src/axios-instance/axios-instance';
import { AxiosError } from 'axios';
import Flex from 'src/components/Flex/flex';
import Input from 'src/components/Input/input';
import Button from 'src/components/Button/button';
import {
    AuthContext,
    AuthResponse,
} from 'src/contexts/AuthContext/AuthContext';
import { UserContext } from 'src/contexts/UserContext/UserContext';
import { useNavigate } from 'react-router-dom';

const SignUp = memo(
    ({
        setFormError,
    }: {
        setFormError: Dispatch<SetStateAction<string | undefined>>;
    }) => {
        const { setIsAuthenticated } = useContext(AuthContext);
        const { setUserInfo } = useContext(UserContext);
        const [signUpPasswordInfo, setSignUpPasswordInfo] = useState<string>();
        const [loading, setLoading] = useState<boolean>(false);
        const navigate = useNavigate();

        const {
            errors: formErrors,
            registerInput,
            deregisterInput,
            setFieldValue,
            runValidators,
            resetError,
            data: formData,
        } = useForm();

        useEffect(() => {
            registerInput('name', [
                fieldRequiredValidator('name'),
                (data) => {
                    if (!data['name']) return '';
                    return !/^[A-Za-z\s]{2,25}$/.test(data['name'])
                        ? 'Name should be minimum of 2 and maximum of 25 character long and can only contain alphabets and spaces'
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
            return () => {
                deregisterInput('name', 'email', 'password');
            };
        }, [registerInput, deregisterInput]);

        const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
            if (!runValidators()) {
                setLoading(true);
                axios
                    .post<AuthResponse>('user', formData)
                    .then((response) => {
                        if (response.status === 201) {
                            setIsAuthenticated(true);
                            localStorage.setItem(
                                'accessToken',
                                response.data.token,
                            );
                            setUserInfo(response.data.user);
                            navigate('/myday');
                        }
                    })
                    .catch(
                        (
                            error: AxiosError<{
                                code: string;
                                message: string;
                            }>,
                        ) => {
                            if (error.code === 'ERR_NETWORK')
                                setFormError('something went wrong');
                            else setFormError(error.response?.data.message);
                        },
                    )
                    .finally(() => {
                        setLoading(false);
                    });
            }
            e.preventDefault();
        };

        return (
            <form onSubmit={handleSignUp}>
                <Flex direction="column" rowGap="16px" alignItems="center">
                    <Input
                        placeholder="Name"
                        name="name"
                        onChange={() => {
                            setFormError('');
                            resetError('name');
                        }}
                        onBlur={(e) => {
                            setFieldValue('name', e?.target?.value as string);
                        }}
                        info={
                            formErrors.name?.length > 0
                                ? formErrors.name
                                : undefined
                        }
                        status={
                            formErrors.name?.length > 0 ? 'error' : undefined
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
                        onBlur={(e) => {
                            setFieldValue('email', e?.target?.value as string);
                        }}
                        info={
                            formErrors.email?.length > 0
                                ? formErrors.email
                                : undefined
                        }
                        status={
                            formErrors.email?.length > 0 ? 'error' : undefined
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
                        onBlur={(e) => {
                            setFieldValue(
                                'password',
                                e?.target?.value as string,
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
                        signUp
                    </Button>
                </Flex>
            </form>
        );
    },
);

export default SignUp;
