import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchMyDayTasks } from 'src/store/Task/TaskActions';

const MyDay = () => {
    const myDayTasks = useSelector((state) => state.task.myDay);
    const dispatch = useDispatch();

    useEffect(() => {
        console.log('myDay', myDayTasks);
    }, [myDayTasks]);

    useEffect(() => {
        dispatch(fetchMyDayTasks());
    }, [dispatch]);
    return <div>MyDay</div>;
};

export default MyDay;
