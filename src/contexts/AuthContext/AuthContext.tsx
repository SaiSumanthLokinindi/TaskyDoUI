/* eslint-disable no-console */
import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useEffect,
    useState,
    memo,
} from 'react';
import axios from 'src/axios-instance/axios-instance';
import { isExpired } from 'react-jwt';
import { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'src/store';
import {
    setUserInfoLoading,
    setUserProfile,
    UserInfo,
} from 'src/store/User/UserSlice';

type Auth = {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export type AuthResponse = { user: UserInfo } & { token: string };

export const AuthContext = createContext<Auth>({
    isAuthenticated: false,
    setIsAuthenticated: () => undefined,
});

const AuthProvider = memo(({ children }: PropsWithChildren) => {
    const dispatch = useDispatch<AppDispatch>();

    const accessToken = localStorage.getItem('accessToken');
    const tokenValid = accessToken && !isExpired(accessToken);

    const [isAuthenticated, setIsAuthenticated] = useState(!!tokenValid);

    useEffect(() => {
        if (!tokenValid) {
            setIsAuthenticated(false);
            return;
        }

        dispatch(setUserInfoLoading(true));
        axios
            .get('/user')
            .then((response) => {
                if (response.status === 200) {
                    dispatch(setUserProfile(response.data.user as UserInfo));
                    console.log('User authenticated');
                    setIsAuthenticated(true);
                } else {
                    console.log(
                        'Unable to fetch user details with current token',
                    );
                    setIsAuthenticated(false);
                }
            })
            .catch(
                (
                    error: AxiosError<{
                        code: string;
                        message: string;
                    }>,
                ) => {
                    setIsAuthenticated(false);
                    console.log(error.message);
                },
            )
            .finally(() => {
                dispatch(setUserInfoLoading(false));
            });
    }, []);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
});

export default AuthProvider;
