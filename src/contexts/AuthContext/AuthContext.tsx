import {
    ReactNode,
    createContext,
    useCallback,
    useMemo,
    useState,
} from 'react';

export const AuthContext = createContext({
    isAuthenticated: false,
    setAuthState: () => void
});

const AuthProvider = ({ children }: { children: ReactNode }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const setAuthState = useCallback(
        (authState: boolean) => {
            setIsAuthenticated(authState);
        },
        [setIsAuthenticated],
    );

    const auth = useMemo(() => {
        return { isAuthenticated, setAuthState };
    }, [isAuthenticated, setAuthState]);

    return <AuthContext.Provider value={auth}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
