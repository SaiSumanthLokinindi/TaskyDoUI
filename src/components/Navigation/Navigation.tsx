import { FC, memo, useState } from 'react';
import { NavLink } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { IoHomeOutline } from 'react-icons/io5';
import { FiSearch } from 'react-icons/fi';
import { GoCalendar } from 'react-icons/go';
import { LuListTodo } from 'react-icons/lu';
import Flex from '../Flex/flex';

type Route = 'home' | 'myday' | 'search' | 'calendar';

const StyledNavigation = styled(Flex)<{ activeRoute: Route }>(({
    activeRoute,
    theme: {
        baseColors: { tertiary, secondary, secondaryHover },
        spacing,
    },
}) => {
    return css`
        padding: ${spacing};
        background-color: ${secondary};
        border-radius: 50px;

        ul {
            list-style-type: none;
            margin: unset;
            padding: unset;
            white-space: nowrap;

            li {
                display: inline-block;
                margin-inline: calc(0.5 * ${spacing});
            }

            a {
                text-decoration: none;
                font-size: 1.5rem;
                color: #ffffff;
                display: block;
                height: 24px;
                padding: ${spacing};
                transition: background-color 0.25s linear;
                border-radius: 50px;

                &:hover {
                    background-color: ${secondaryHover};
                }

                &:nth-child(
                        ${['home', 'myday', 'search', 'calendar'].indexOf(
                                activeRoute,
                            ) + 1}
                    ) {
                    color: ${tertiary};
                    background-color: ${secondaryHover};
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
