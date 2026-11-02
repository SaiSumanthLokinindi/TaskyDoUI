import { FC, memo } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';

import Flex from '../Flex/flex';
import { navigationItems, type NavigationItem } from './navigationItems';

export const StyledNavigation = styled(Flex)(({
    theme: {
        baseColors: { tertiary, secondaryLight, secondaryHover },
        spacing,
    },
}) => {
    return css`
        background-color: ${secondaryLight};
        border-radius: 50px;

        ul {
            list-style-type: none;
            margin: unset;
            padding: calc(0.5 * ${spacing});
            white-space: nowrap;
            display: flex;
            align-items: center;
            column-gap: ${spacing};
            height: var(--mobile-nav-height);
            box-sizing: border-box;

            li {
                display: inline-block;
                color: ${({ theme }) => theme.text.primary};
                border-radius: 100%;
                box-sizing: border-box;
                padding: ${spacing};

                a {
                    text-decoration: none;
                    font-size: 1.25rem;
                    color: inherit;
                    display: block;
                    height: 100%;
                    width: 100%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    transition: background-color 0.25s linear;
                    border-radius: inherit;

                    &[aria-current='page'] {
                        color: ${tertiary};
                    }
                }

                &:hover {
                    background-color: ${secondaryHover};
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
