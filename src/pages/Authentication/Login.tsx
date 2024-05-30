import {
    Dispatch,
    FormEvent,
    SetStateAction,
    memo,
    useContext,
    useEffect,
    useState,
} from 'react';
import { useForm } from 'src/hooks/useForm';
import { fieldRequiredValidator } from './utils';
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

const Login = ({
    setFormError,
}: {
    setFormError: Dispatch<SetStateAction<string | undefined>>;
}) => {
    const { setIsAuthenticated } = useContext(AuthContext);
    const { setUserInfo } = useContext(UserContext);
    const [loading, setLoading] = useState<boolean>(false);

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
        registerInput('email', [fieldRequiredValidator('email')]);
        registerInput('password', [fieldRequiredValidator('password')]);
        return () => {
            deregisterInput('email', 'password');
        };
    }, [registerInput, deregisterInput]);

    const handleLogin = (e: FormEvent<HTMLFormElement>) => {
        if (!runValidators()) {
            setLoading(true);
            axios
                .post<AuthResponse>('user/login', formData)
                .then((response) => {
                    if (response.status === 200) {
                        setIsAuthenticated(true);
                        localStorage.setItem(
                            'accessToken',
                            response.data.token,
                        );
                        setUserInfo(response.data.user);
                    }
                })
                .catch(
                    (
                        error: AxiosError<{
                            code: string;
                            message: string;
                        }>,
                    ) => {
                        setFormError(error.response?.data.message);
                    },
                )
                .finally(() => {
                    setLoading(false);
                });
        }
        e.preventDefault();
    };

    return (
        <form onSubmit={handleLogin}>
            <Flex direction="column" rowGap="16px" alignItems="center">
                <Input
                    placeholder="email"
                    name="email"
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
                />
                <Input
                    type="password"
                    name="password"
                    placeholder="password"
                    onChange={() => {
                        setFormError('');
                        resetError('password');
                    }}
                    onBlur={(e) => {
                        setFieldValue('password', e?.target?.value as string);
                    }}
                    info={
                        formErrors.password?.length > 0
                            ? formErrors.password
                            : undefined
                    }
                />
                <Button type="submit" progress={loading}>
                    Login
                </Button>
            </Flex>
        </form>
    );
};

export default memo(Login);
