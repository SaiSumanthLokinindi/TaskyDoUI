import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    useMemo,
    useState,
} from 'react';

export type UserInfo = {
    name: string;
    email: string;
};

const defaultUserInfo = {
    name: '',
    email: '',
    setUserInfo: () => undefined,
    loading: false,
    setLoading: () => undefined,
};

export const UserContext = createContext<
    UserInfo & { setUserInfo: Dispatch<SetStateAction<UserInfo>> } & {
        loading: boolean;
        setLoading: Dispatch<SetStateAction<boolean>>;
    }
>(defaultUserInfo);

const UserProvider = ({ children }: PropsWithChildren) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({
        name: defaultUserInfo.name,
        email: defaultUserInfo.email,
    });

    const [loading, setLoading] = useState(false);

    const userData = useMemo(() => {
        return { ...userInfo, setUserInfo, loading, setLoading };
    }, [userInfo, setUserInfo, loading, setLoading]);

    return (
        <UserContext.Provider value={userData}>{children}</UserContext.Provider>
    );
};

export default UserProvider;
