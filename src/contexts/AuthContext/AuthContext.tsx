import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useContext,
    useMemo,
    useState,
} from 'react';
import axios from 'src/axios-instance/axios-instance';
import { UserContext, type UserInfo } from '../UserContext/UserContext';
import { isExpired } from 'react-jwt';
import { AxiosError } from 'axios';

type Auth = {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export type AuthResponse = { user: UserInfo } & { token: string };

export const AuthContext = createContext<Auth>({
    isAuthenticated: false,
    setIsAuthenticated: () => undefined,
});

const AuthProvider = ({ children }: PropsWithChildren) => {
    const { setUserInfo, setLoading } = useContext(UserContext);

    const isAccessTokenValid = useMemo(() => {
        const accessToken = localStorage.getItem('accessToken');

        // return !!accessToken && !isExpired(accessToken);

        if (!accessToken || isExpired(accessToken)) return false;
        else {
            setLoading(true);
            axios
                .get('/user')
                .then((response) => {
                    if (response.status === 200) {
                        setUserInfo(response.data.user);
                    } else {
                        console.log(
                            'Unable to fetch user details with current token',
                        );
                    }
                    setLoading(false);
                })
                .catch(
                    (
                        error: AxiosError<{
                            code: string;
                            message: string;
                        }>,
                    ) => {
                        console.log(error.message);
                        setLoading(false);
                    },
                );
            return true;
        }
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(isAccessTokenValid);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
