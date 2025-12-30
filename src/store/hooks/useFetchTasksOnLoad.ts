import { useEffect } from 'react';
import { AppDispatch } from '..';
import { useDispatch } from 'react-redux';

type FetchThunk = () => any;

export const useFetchTasksOnLoad = (thunk: FetchThunk) => {
    const dispatch = useDispatch<AppDispatch>();
    useEffect(() => {
        void dispatch(thunk());
    }, []);

    return;
};
