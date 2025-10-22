import type {TaskModel} from '../../models/TaskModel';

export enum TaskActionType {
    START_TASK = 'START_TASK',
    INTERRUPT_TASK = 'INTERRUPT_TASK',
    RESET_STATE = 'RESET_STATE',
}

export type TaskActionModel = |
    {
        type: TaskActionType.START_TASK,
        payload: TaskModel
    }
    |
    {
        type: TaskActionType.INTERRUPT_TASK,
    }
    |
    {
        type: TaskActionType.RESET_STATE,
    }