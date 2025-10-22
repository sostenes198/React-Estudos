import type {TaskStateModel} from '../../models/TaskStateModel';
import * as React from 'react';
import {initialTaskState} from './initialTaskState';
import {createContext} from 'react';
import type {TaskActionModel} from './taskActionType';

type TaskContextProps = {
    state: TaskStateModel;
    dispatch: React.Dispatch<TaskActionModel>;
}

const initialContextValue = {
    state: initialTaskState,
    dispatch: () => {
    },
};

export const TaskContext = createContext<TaskContextProps>(initialContextValue);