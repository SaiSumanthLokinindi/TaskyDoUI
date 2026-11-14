import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';
import { isAfter, isSameDate } from 'src/utils/dates';
import { TaskInfo } from './Task.types';

const TODAY = new Date().toISOString().slice(0, 10);

const selectToday = () => TODAY;

const selectEntities = (state: RootState) => state.tasks.entities;

const selectIds = (state: RootState) => state.tasks.ids;

const selectTasks = createSelector(
    [selectEntities, selectIds],
    (entities, ids) => {
        return ids.map((id) => entities[id]);
    },
);

export const SelectTaskById = createSelector(
    [selectEntities, (_, id: TaskInfo['id']) => id],
    (entities, id) => {
        return entities[id];
    },
);

export const selectMyDayTasks = createSelector(
    [selectTasks, selectToday],
    (tasks, today) => {
        return tasks.filter((task) => {
            const scheduleDate = task.scheduleDate?.slice(0, 10);
            const dueDate = task.dueDate?.slice(0, 10);

            if (!scheduleDate) return true;
            else if (isSameDate(scheduleDate, today)) return true;
            else if (dueDate && isSameDate(dueDate, today)) return true;
            else return false;
        });
    },
);

export const selectOverdueTasks = createSelector(
    [selectTasks, selectToday],
    (tasks, today) => {
        return tasks.filter((task) => {
            if (task.dueDate && isAfter(today, task.dueDate) && !task.status?.completed) return true;
            else return false;
        });
    },
);

export const selectOverDueTasksCount = createSelector([selectOverdueTasks], (tasks)=>{
    return tasks.length;
})

export const selectUpcomingTasks = createSelector(
    [selectTasks, selectToday],
    (tasks, today) => {
        return tasks.filter((task) => {
            const scheduleDate = task.scheduleDate?.slice(0, 10);

            if (scheduleDate && isAfter(scheduleDate, today) && !task.status?.completed) return true;
            else return false;
        });
    },
);

export const selectRecentlyCompletedTasks = createSelector([selectTasks], (tasks)=>{
    return tasks.filter(task=> task.status?.completed).sort((a,b)=> new Date(b.status?.completedOn as string).getTime() - new Date(a.status?.completedOn as string).getTime());
})
