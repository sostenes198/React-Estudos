import type {TaskModel} from '../../models/TaskModel';
import type {TaskStateModel} from '../../models/TaskStateModel';

export enum TaskActionType {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE',
    COUNT_DOWN = 'COUNT_DOWN',
    COMPLETE_TASK = 'COMPLETE_TASK',
    CHANGE_SETTINGS = 'CHANGE_SETTINGS',
}

export type TaskActionModel = |
    {
        type: TaskActionType.START_TASK;
        payload: TaskModel
    }
    |
    {
        type: TaskActionType.INTERRUPT_TASK;
    }
    |
    {
        type: TaskActionType.RESET_STATE;
    }
    |
    {
        type: TaskActionType.COUNT_DOWN;
        payload: { secondsRemaining: number; };
    }
    |
    {
        type: TaskActionType.CHANGE_SETTINGS;
        payload: TaskStateModel['config'];
    }
    |
    {
        type: TaskActionType.COMPLETE_TASK;
    }