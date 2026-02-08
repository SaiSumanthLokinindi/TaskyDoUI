import {
    Dispatch,
    FormEvent,
    SetStateAction,
    memo,
    useContext,
    useEffect,
    useState,
} from 'react';
import { fieldRequiredValidator } from 'src/utils/validators';
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
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import { setUserProfile } from 'src/store/User/UserSlice';

const SignUp = memo(
    ({
        setFormError,
    }: {
        setFormError: Dispatch<SetStateAction<string | undefined>>;
    }) => {
        const { setIsAuthenticated } = useContext(AuthContext);
        const dispatch = useDispatch<AppDispatch>();
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
                            dispatch(setUserProfile(response.data.user));
                            navigate('/');
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
                        label="Full Name"
                        placeholder="eg: John Doe"
                        name="name"
                        onChange={() => {
                            setFormError('');
                            resetError('name');
                        }}
                        onBlur={(e) => {
                            setFieldValue('name', e.target.value);
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
                        label="Email"
                        type="email"
                        name="email"
                        placeholder="eg: jondoe@company.com"
                        onChange={() => {
                            setFormError('');
                            resetError('email');
                        }}
                        onBlur={(e) => {
                            setFieldValue('email', e.target.value);
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
                        label="Password"
                        type="password"
                        name="password"
                        placeholder="*******"
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
                            setFieldValue('password', e.target.value);
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
                        Sign Up
                    </Button>
                </Flex>
            </form>
        );
    },
);

export default SignUp;
