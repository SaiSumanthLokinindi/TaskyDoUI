import { memo } from 'react';
import { IoAdd } from 'react-icons/io5';
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
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';

const StyledFlex = styled(Flex)(({ theme: { spacing, breakpoints } }) => {
    return css`
        padding: calc(4 * ${spacing});
        width: 100%;
        height: 100%;
        box-sizing: border-box;
        min-height: 0;

        @media (max-width: ${breakpoints.sm}) {
            padding: calc(1.5 * ${spacing});
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

        & > ${StyledButton} > svg {
            height: 1.5em;
            width: 1.5em;
            flex-shrink: 0;
        }

        @media (max-width: ${breakpoints.md}) {
            ${StyledButton}:last-child {
                border-radius: 100%;
                width: 40px;
                justify-content: center;
            }
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
    const { name, loading: userLoading } = useSelector((state: RootState) => ({
        name: state.user.profile.name,
        loading: state.user.loading,
    }));

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
                    secondary={new Date()
                        .toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                        })
                        .replace(',', '')
                        .replace(/^(\w+)\s(\d+)\s(\d+)$/, '$2 $1 $3')}
                    loading={userLoading}
                />
                <StyledNavigationWrapper columnGap="0.5rem" alignItems="center">
                    <Navigation />
                    <Button>
                        <IoAdd />{' '}
                        {isMediumScreenOrAbove && <span> Add Task</span>}
                    </Button>
                </StyledNavigationWrapper>
            </Flex>
            <Flex style={{ flex: 1, minHeight: 0 }}>
                <Outlet />
            </Flex>
        </StyledFlex>
    );
});

export default AppContainer;
