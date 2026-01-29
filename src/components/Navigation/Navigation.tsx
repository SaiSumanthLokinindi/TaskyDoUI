import { FC, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { IoHomeOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { GoCalendar } from 'react-icons/go';
import { LuListTodo } from 'react-icons/lu';
import Flex from '../Flex/flex';

type Route = 'home' | 'myday' | 'search' | 'calendar';

export const StyledNavigation = styled(Flex)<{ activeRoute: Route }>(({
    activeRoute,
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
                }

                &:nth-child(
                        ${['home', 'myday', 'search', 'calendar'].indexOf(
                                activeRoute,
                            ) + 1}
                    ) {
                    color: ${tertiary};

                    a {
                        background-color: ${secondaryHover};
                    }

                    a:hover {
                        cursor: default;
                    }
                }
            }
        }
    `;
});

const Navigation: FC = memo(() => {
    const [activeRoute, setActiveRoute] = useState<Route>('home');

    return (
        <StyledNavigation
            forwardedAs="nav"
            alignItems="center"
            activeRoute={activeRoute}
        >
            <ul>
                <li>
                    <NavLink to="/">
                        {({ isActive }) => {
                            if (isActive) setActiveRoute('home');
                            return <IoHomeOutline />;
                        }}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/myday">
                        {({ isActive }) => {
                            if (isActive) setActiveRoute('myday');
                            return <LuListTodo />;
                        }}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/search">
                        {({ isActive }) => {
                            if (isActive) setActiveRoute('search');
                            return <FiSearch />;
                        }}
                    </NavLink>
                </li>
                <li>
                    <NavLink to="/calendar">
                        {({ isActive }) => {
                            if (isActive) setActiveRoute('calendar');
                            return <GoCalendar />;
                        }}
                    </NavLink>
                </li>
            </ul>
        </StyledNavigation>
    );
});

export default Navigation;
