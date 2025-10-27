import * as React from 'react';
import {useEffect, useReducer, useRef} from 'react';
import {initialTaskState} from './initialTaskState';
import {TaskContext} from './TaskContext';
import {taskReducer} from './taskReducer';
import {TimerWorkerManager} from '../../workers/timerWorkerManager';
import {TaskActionType} from './taskActionType';
import {loadBeep} from '../../utils/loadBeep';

type TaskContextProviderProps = {
    children: React.ReactNode;
}

export function TaskContextProvider({children}: TaskContextProviderProps) {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState, () => {
        const storageState = localStorage.getItem('state');
        if (!storageState) return initialTaskState;

        const parsedState = JSON.parse(storageState);

        return {
            ...parsedState,
            activeTask: null,
            secondsRemaining: 0,
            formattedSecondsRemaining: '00:00',
        };
    });
    const playBeepRef = useRef<ReturnType<typeof loadBeep>>(null);

    const worker = TimerWorkerManager.getInstance();

    worker.onMessage((event: MessageEvent<number>) => {
        const countDownSeconds = event.data;

        if (countDownSeconds <= 0) {
            if (playBeepRef.current) {
                playBeepRef.current();
                playBeepRef.current = null;
            }

            dispatch({
                type: TaskActionType.COMPLETE_TASK,
            });
            worker.terminate();
        } else {
            dispatch({
                type: TaskActionType.COUNT_DOWN,
                payload: {secondsRemaining: countDownSeconds},
            });
        }
    });


    useEffect(() => {
        if (!state.activeTask) {
            worker.terminate();
        }

        localStorage.setItem('state', JSON.stringify(state));

        document.title = `${state.formattedSecondsRemaining} - Chronos Pomodoro`;

        worker.postMessage(state);
    }, [worker, state]);

    useEffect(() => {
        if (state.activeTask && playBeepRef.current === null) {
            playBeepRef.current = loadBeep();
        } else {
            playBeepRef.current = null;
        }
    }, [state.activeTask]);

    return (
        <TaskContext.Provider value={{state, dispatch}}>
            {children}
        </TaskContext.Provider>
    );
}