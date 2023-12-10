import {
    Dispatch,
    ReactNode,
    SetStateAction,
    createContext,
    useMemo,
    useState,
} from 'react';

type Auth = {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};

export const AuthContext = createContext<Auth | null>({
    isAuthenticated: false,
    setIsAuthenticated: () => {},
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const auth: Auth = useMemo(() => {
        return { isAuthenticated, setIsAuthenticated };
    }, [isAuthenticated, setIsAuthenticated]);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
