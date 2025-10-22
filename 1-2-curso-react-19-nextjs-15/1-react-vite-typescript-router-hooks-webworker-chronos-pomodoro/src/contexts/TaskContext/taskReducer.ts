import type {TaskStateModel} from '../../models/TaskStateModel';
import {type TaskActionModel, TaskActionType} from './taskActionType';
import {getNextCycle} from '../../utils/getNextCycle';
import {formatSecondsToMinutes} from '../../utils/formaSecondsToMinutes';

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
            return state;
        default:
            return state;
    }
}