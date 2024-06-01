import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useMemo,
    useState,
} from 'react';
import type { UserInfo } from '../UserContext/UserContext';
import { isExpired } from 'react-jwt';

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
    const isAccessTokenValid = useMemo(() => {
        const accessToken = localStorage.getItem('accessToken');

        return !!accessToken && !isExpired(accessToken);
    }, []);

    const [isAuthenticated, setIsAuthenticated] = useState(isAccessTokenValid);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
