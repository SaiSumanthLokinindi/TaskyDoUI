import { memo, FC, ReactNode, useState } from 'react';
import Text, { StyledText } from '../Text/Text';
import Flex from '../Flex/flex';
import styled, { css, useTheme } from 'styled-components';
import { StyledImage } from '../Image/Image';
import Card from '../Card/card';
import { useModal } from '../Modal/ModalContext';
import { clearUserProfile, type UserInfo } from 'src/store/User/UserSlice';
import axios from 'src/axios-instance/axios-instance';
import { useDispatch } from 'react-redux';
import { replace, useNavigate } from 'react-router-dom';

export interface UserInfoProps {
    /** User image prop */
    visual?: ReactNode;
    /** Primary information about the user */
    primary: string;
    /** Secondary text shown below the user name
     * useful to showing any dynamic useful information like tasks due or the date etc
     */
    secondary?: string;
    /** Email of user */
    email: string;
    /**
     * @default false
     * user to indicate loading state of user data
     */
    loading?: boolean;
}

const StyledUserInfo = styled(Card)(({ theme }) => {
    return css`
        display: flex;
        column-gap: calc(1.5 * ${theme.spacing});
        width: max-content;
        align-items: center;
        padding: calc(1 * ${theme.spacing});
        border: 1.5px solid ${theme.baseColors.secondary};
        transition: border-color 0.2s ease;

        ${StyledImage} {
            max-height: 40px;
            max-width: 40px;
            border-radius: 100%;
        }

        div > ${StyledText} {
            line-height: 1;
        }

        &:hover {
            border-color: ${theme.baseColors.tertiary};
            cursor: pointer;
        }
    `;
});

const StyledInitials = styled(Flex)(({
    theme: {
        spacing,
        components: {
            text: { size },
        },
    },
}) => {
    return css`
        width: 40px;
        height: 40px;
        background-color: gray;
        box-sizing: border-box;
        border-radius: 100%;
        vertical-align: middle;
        padding: calc(0.5 * ${spacing});

        span {
            font-size: ${size.md};
            font-weight: 700;
            letter-spacing: 1px;
        }
    `;
});

const Initials = ({ name }: { name: string }) => {
    return (
        <StyledInitials alignItems="center" justifyContent="center">
            <span>
                {name
                    .split(' ')
                    .map((word) => word.charAt(0))
                    .slice(0, 2)
                    .join('')
                    .toUpperCase()}
            </span>
        </StyledInitials>
    );
};

const UserProfile = memo(({ name, email }: UserInfo) => {
    const theme = useTheme();
    return (
        <Flex direction="column" rowGap={`calc(2 * ${theme.spacing})`}>
            <Flex direction="column" rowGap={theme.spacing}>
                <Text variant="helper">Full Name</Text>
                <Text size="sm">{name}</Text>
            </Flex>
            <Flex direction="column" rowGap={theme.spacing}>
                <Text variant="helper">Email</Text>
                <Text size="sm">{email}</Text>
            </Flex>
        </Flex>
    );
});

const UserInfo: FC<UserInfoProps> = memo(
    ({ visual, primary, secondary, email, loading = false }: UserInfoProps) => {
        const theme = useTheme();
        const { openModal, closeModal } = useModal();
        const dispatch = useDispatch();
        const navigate = useNavigate();
        const [logoutProgress, setLogoutProgress] = useState(false);

        const handleClick = () => {
            openModal({
                title: 'User Profile',
                body: <UserProfile name={primary} email={email} />,
                actions: [
                    {
                        label: 'Logout',
                        onClick: () => {
                            setLogoutProgress(true);
                            axios
                                .post('user/logout')
                                .then((response) => {
                                    if (response.status === 200) {
                                        closeModal();
                                        dispatch(clearUserProfile());
                                        localStorage.removeItem('accessToken');
                                        navigate('/login', { replace: true });
                                    }
                                })
                                .catch((err) => {
                                    console.error('failed to logout user', err);
                                })
                                .finally(() => {
                                    setLogoutProgress(false);
                                });
                        },
                        variant: 'primary',
                        progress: logoutProgress,
                    },
                ],
            });
        };

        return (
            <StyledUserInfo role="button" onClick={handleClick}>
                {visual || <Initials name={primary} />}
                <Flex
                    direction="column"
                    rowGap={`calc(0.75 * ${theme.spacing})`}
                    justifyContent="center"
                >
                    {loading ? (
                        <span>Loading...</span>
                    ) : (
                        <Text size="rg">{primary}</Text>
                    )}
                    <Text variant="helper" size="xxs">
                        {secondary}
                    </Text>
                </Flex>
            </StyledUserInfo>
        );
    },
);

export default UserInfo;
