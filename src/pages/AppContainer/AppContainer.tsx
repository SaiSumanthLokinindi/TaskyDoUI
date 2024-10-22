import { memo } from 'react';
import UserInfo from 'src/components/UserInfo/UserInfo';
import Image from '../../components/Image/Image';

const AppContainer = memo(() => {
    return (
        <UserInfo
            visual={<Image src="https://i.pravatar.cc/300" alt="user image" />}
            primary="Sai Sumanth"
            secondary="3 tasks due today"
        />
    );
});

export default AppContainer;
