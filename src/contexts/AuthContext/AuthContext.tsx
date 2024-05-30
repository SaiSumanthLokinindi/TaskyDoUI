import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    memo,
    useState,
} from 'react';

type Auth = {
    isAuthenticated: boolean;
    setIsAuthenticated: Dispatch<SetStateAction<boolean>>;
};
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
