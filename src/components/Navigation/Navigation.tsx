import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Flex from '../Flex/flex';
import { navigationItems, type NavigationItem } from './navigationItems';

export const StyledNavigation = styled(Flex)(({
    theme: {
        baseColors: { tertiary, secondary, secondaryHover },
        spacing,
    },
}) => {
    return css`
        background-color: ${secondary};
        border-radius: 50px;

        ul {
            list-style-type: none;
            margin: unset;
            padding: calc(0.5 * ${spacing});
            white-space: nowrap;
            display: flex;
            column-gap: ${spacing};

            li {
                display: inline-block;
                color: ${({ theme }) => theme.text.primary};
                border-radius: 50px;

                a {
                    text-decoration: none;
                    font-size: 1.25rem;
                    color: inherit;
                    display: block;
                    height: 20px;
                    padding: ${spacing};
                    transition: background-color 0.25s linear;
                    border-radius: inherit;

                    &:hover {
                        background-color: ${secondaryHover};
                    }

                    &[aria-current='page'] {
                        color: ${tertiary};
                        background-color: ${secondaryHover};
                    }
                }
            }
        }
    `;
});

const Navigation: FC = memo(() => {
    return (
        <StyledNavigation forwardedAs="nav" alignItems="center">
            <ul>
                {navigationItems.map(({ to, label, icon }: NavigationItem) => {
                    return (
                        <li>
                            <NavLink
                                to={to}
                                end={to === '/'}
                                aria-label={label}
                            >
                                {icon}
                            </NavLink>
                        </li>
                    );
                })}
            </ul>
        </StyledNavigation>
    );
});

export default Navigation;
