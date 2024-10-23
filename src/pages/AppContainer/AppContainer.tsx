import { memo } from 'react';
import UserInfo from 'src/components/UserInfo/UserInfo';
import Image from '../../components/Image/Image';
import useBreakpoint from 'src/hooks/useBreakpoint';
import Navigation from 'src/components/Navigation/Navigation';

const AppContainer = memo(() => {
    const isMediumScreenOrAbove = useBreakpoint('sm');

    return (
        <>
            <UserInfo
                visual={
                    <Image src="https://i.pravatar.cc/300" alt="user image" />
                }
                primary="Sai Sumanth"
                secondary="3 tasks due today"
            />
            <Navigation />
        </>
    );
});

export default AppContainer;
