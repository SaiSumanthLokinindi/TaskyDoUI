import { useFetchTasksOnLoad } from 'src/store/hooks/useFetchTasksOnLoad';
import { fetchMyDay } from 'src/store/Task/MyDaySlice';

const MyDay = () => {
    useFetchTasksOnLoad(fetchMyDay);

    return <div>MyDay</div>;
};

export default MyDay;
