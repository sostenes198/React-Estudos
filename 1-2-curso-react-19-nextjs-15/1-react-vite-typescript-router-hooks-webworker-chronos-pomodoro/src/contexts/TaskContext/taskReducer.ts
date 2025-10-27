import type {TaskStateModel} from '../../models/TaskStateModel';
import {type TaskActionModel, TaskActionType} from './taskActionType';
import {getNextCycle} from '../../utils/getNextCycle';
import {formatSecondsToMinutes} from '../../utils/formaSecondsToMinutes';
import {initialTaskState} from './initialTaskState';

export function taskReducer(state: TaskStateModel, action: TaskActionModel): TaskStateModel {
    switch (action.type) {
        case TaskActionType.START_TASK: {
            const newTask = action.payload;
            const nextCycle = getNextCycle(state.currentCycle);
            const secondsRemaining = newTask.duration * 60;

            return {
                ...state,
                activeTask: newTask,
                currentCycle: nextCycle,
                secondsRemaining: secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(secondsRemaining),
                tasks: [
                    ...state.tasks,
                    newTask,
                ],
            };
        }
        case TaskActionType.INTERRUPT_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                        if (state.activeTask?.id === task.id) {
                            return {
                                ...task,
                                interruptDate: Date.now(),
                            };
                        }

                        return task;
                    },
                ),
            };
        }
        case TaskActionType.RESET_STATE:
            return {...initialTaskState};
        case TaskActionType.COUNT_DOWN:
            return {
                ...state,
                secondsRemaining: action.payload.secondsRemaining,
                formattedSecondsRemaining: formatSecondsToMinutes(action.payload.secondsRemaining),
            };
        case TaskActionType.CHANGE_SETTINGS: {
            return {...state, config: {...action.payload}};
        }
        case TaskActionType.COMPLETE_TASK: {
            return {
                ...state,
                activeTask: null,
                secondsRemaining: 0,
                formattedSecondsRemaining: '00:00',
                tasks: state.tasks.map(task => {
                        if (state.activeTask?.id === task.id) {
                            return {
                                ...task,
                                completeDate: Date.now(),
                            };
                        }

                        return task;
                    },
                ),
            };
        }
        default:
            return state;
    }
}