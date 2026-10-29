import { memo } from 'react';
import 'react-day-picker/style.css';
import { StyledHomeContainer, StyledTaskList } from './Home.styles';
import useBreakpoint from 'src/hooks/useBreakpoint';
import UpcomingTasks from '../UpcomingTasks/UpcomingTasks';
import OverdueTasks from '../Overdue Tasks/OverdueTasks';
import MyDayTasks from '../MyDay/MyDayTasks';
import Insights from '../Insights/Insights';

const Home = memo(() => {
    const isMediumScreen = useBreakpoint('md');

    return (
        <StyledHomeContainer>
            <Insights />
            {isMediumScreen && (
                <>
                    <StyledTaskList gridArea="myday">
                        <MyDayTasks />
                    </StyledTaskList>
                    <StyledTaskList gridArea="overdue">
                        <OverdueTasks />
                    </StyledTaskList>
                    <StyledTaskList gridArea="upcoming">
                        <UpcomingTasks />
                    </StyledTaskList>
                    <StyledTaskList gridArea="recentlycompleted">
                        {/* ToDo: Change this to Recently completed tasks */}
                        <MyDayTasks />
                    </StyledTaskList>
                </>
            )}
        </StyledHomeContainer>
    );
});

export default Home;
