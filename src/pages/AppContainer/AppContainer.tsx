import { memo, useContext } from 'react';
import { IoAddOutline } from 'react-icons/io5';
import UserInfo from 'src/components/UserInfo/UserInfo';
import Image from '../../components/Image/Image';
import Navigation, {
    StyledNavigation,
} from 'src/components/Navigation/Navigation';
import Flex from 'src/components/Flex/flex';
import { Outlet } from 'react-router-dom';
import styled, { css } from 'styled-components';
import Button, { StyledButton } from 'src/components/Button/button';
import useBreakpoint from 'src/hooks/useBreakpoint';
import { UserContext } from 'src/contexts/UserContext/UserContext';

const StyledFlex = styled(Flex)(({ theme: { spacing, breakpoints } }) => {
    return css`
        margin: calc(2 * ${spacing});
        width: 100%;

        @media (max-width: ${breakpoints.sm}) {
            margin: ${spacing};
            position: relative;

            ${StyledNavigation} {
                position: fixed;
                inset-block-end: calc(2 * ${spacing});
                inset-inline-start: 50%;
                transform: translateX(-50%);
            }
        }
    `;
});

const StyledNavigationWrapper = styled(Flex)(({
    theme: { spacing, breakpoints },
}) => {
    return css`
        ${StyledButton} {
            padding: ${spacing} calc(2 * ${spacing});
            border-radius: 50px;
            min-width: unset;
            display: flex;
            align-items: center;
            column-gap: ${spacing};
            color: #ffffff;
        }

        @media (max-width: ${breakpoints.sm}) {
            ${StyledButton} {
                padding: ${spacing};
                width: 40px;
                border-radius: 100%;
                justify-content: center;
            }
        }
    `;
});

const AppContainer = memo(() => {
    const isMediumScreenOrAbove = useBreakpoint('md');
    const { name, loading: userLoading } = useContext(UserContext);

    return (
        <StyledFlex direction="column">
            <Flex alignItems="center" justifyContent="space-between">
                <UserInfo
                    visual={
                        <Image
                            src="https://i.pravatar.cc/300"
                            alt="user image"
                        />
                    }
                    primary={name}
                    secondary="3 tasks due today"
                    loading={userLoading}
                />
                <StyledNavigationWrapper columnGap="0.5rem" alignItems="center">
                    <Navigation />
                    <Button>
                        <IoAddOutline />{' '}
                        {isMediumScreenOrAbove && <span> Add Task</span>}
                    </Button>
                </StyledNavigationWrapper>
            </Flex>
            <Flex>
                <Outlet />
            </Flex>
        </StyledFlex>
    );
});

export default AppContainer;
