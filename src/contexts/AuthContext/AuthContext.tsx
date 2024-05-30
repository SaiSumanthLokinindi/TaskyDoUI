import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    memo,
    useState,
} from 'react';
import type { UserInfo } from '../UserContext/UserContext';

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
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    return (
        <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export default memo(AuthProvider);
