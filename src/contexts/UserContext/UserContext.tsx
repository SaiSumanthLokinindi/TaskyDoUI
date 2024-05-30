import {
    Dispatch,
    PropsWithChildren,
    SetStateAction,
    createContext,
    memo,
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
};

export const UserContext = createContext<
    UserInfo & { setUserInfo: Dispatch<SetStateAction<UserInfo>> }
>(defaultUserInfo);

const UserProvider = ({ children }: PropsWithChildren) => {
    const [userInfo, setUserInfo] = useState<UserInfo>({ name: '', email: '' });

    return (
        <UserContext.Provider value={{ ...userInfo, setUserInfo }}>
            {children}
        </UserContext.Provider>
    );
};

export default memo(UserProvider);
