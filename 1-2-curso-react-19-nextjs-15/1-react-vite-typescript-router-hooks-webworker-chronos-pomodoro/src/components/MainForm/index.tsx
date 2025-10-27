import {DefaultInput} from '../DefaultInput';
import {Cycles} from '../Cycles';
import {DefaultButton} from '../DefaultButton';
import {PlayCircleIcon, StopCircleIcon} from 'lucide-react';
import * as React from 'react';
import {useRef} from 'react';
import type {TaskModel} from '../../models/TaskModel';
import {useTaskContext} from '../../contexts/TaskContext/useTaskContext';
import {getNextCycle} from '../../utils/getNextCycle';
import {getNextCycleType} from '../../utils/getNextCycleType';
import {TaskActionType} from '../../contexts/TaskContext/taskActionType';
import {Tips} from '../Tips';
import {showMessage} from '../../adapters/showMessage';

export function MainForm() {
    const {state, dispatch} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);
    const lastTaskName = state.tasks[state.tasks.length - 1]?.name || '';

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        showMessage.dismiss();

        if (!taskNameInput.current) {
            return;
        }

        const taskName = taskNameInput.current.value.trim();
        if (taskName === '') {
            showMessage.warn('Digite o nome da tarefa.');
            return;
        }

        const newTask: TaskModel = {
            id: Date.now().toString(),
            name: taskName,
            startDate: Date.now(),
            completeDate: null,
            interruptDate: null,
            duration: state.config[nextCycleType],
            type: nextCycleType,
        };

        dispatch({
            type: TaskActionType.START_TASK, payload: newTask,
        });

        showMessage.success('Tarefa iniciada com sucesso.');
    }

    function handleInterruptTask(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        dispatch({
            type: TaskActionType.INTERRUPT_TASK,
        });
        showMessage.dismiss();
        showMessage.info('Tarefa pausada.');
    }

    return (
        <>
            <form onSubmit={handleCreateNewTask} className="form" action="">
                <div className="formRow">
                    <DefaultInput
                        labelText={'Task'}
                        id={'taskId'}
                        type=""
                        placeholder={'Digite algo'}
                        // value={taskName}
                        // onChange={(event) => setTaskName(event.target.value)} // Forma controlada de usar o input || forma não controlada
                        ref={taskNameInput}
                        disabled={!!state.activeTask}
                        defaultValue={lastTaskName}/>
                </div>

                <div className="formRow">
                    <p>
                        <Tips nextCycleType={nextCycleType}/>
                    </p>
                </div>

                {state.currentCycle > 0 && (
                    <div className="formRow">
                        <Cycles/>
                    </div>
                )}

                <div className="formRow">
                    {!state.activeTask ?
                        (
                            <DefaultButton
                                key="buttonStarkTaskId"
                                id="buttonStarkTaskId"
                                type="submit"
                                icon={<PlayCircleIcon/>}
                                color={'green'}
                                aria-label={'Inicia nova tarefa'}
                                title={'Iniciar nova tarefa'}/>
                        )
                        :
                        (
                            <DefaultButton
                                key="buttonStopTaskId"
                                id="buttonStopTaskId"
                                type="button"
                                icon={<StopCircleIcon/>}
                                color={'red'}
                                onClick={handleInterruptTask}
                                aria-label={'Parar tarefa atual'}
                                title={'Parar tarefa atual'}/>
                        )
                    }

                </div>
            </form>
        </>
    );
}