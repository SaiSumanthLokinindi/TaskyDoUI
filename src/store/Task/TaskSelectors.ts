import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '..';

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

export const selectMyDayTasks = createSelector(
    [selectTasks, selectToday],
    (tasks, today) => {
        return tasks.filter((task) => {
            const scheduleDate = task.scheduleDate?.slice(0, 10);
            const dueDate = task.dueDate?.slice(0, 10);

            if (!scheduleDate) return true;
            else if (scheduleDate === today) return true;
            else if (dueDate && dueDate === today) return true;
            else return false;
        });
    },
);

export const selectOverdueTasks = createSelector(
    [selectTasks, selectToday],
    (tasks, today) => {
        return tasks.filter((task) => {
            if (task.dueDate && task.dueDate < today) return true;
            else return false;
        });
    },
);

export const selectUpcomingTasks = createSelector(
    [selectTasks, selectToday],
    (tasks, today) => {
        return tasks.filter((task) => {
            if (task.scheduleDate && task.scheduleDate > today) return true;
            else return false;
        });
    },
);
