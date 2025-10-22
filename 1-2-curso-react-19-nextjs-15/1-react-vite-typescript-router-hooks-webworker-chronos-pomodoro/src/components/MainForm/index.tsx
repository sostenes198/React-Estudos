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

export function MainForm() {
    const {state, dispatch} = useTaskContext();
    const taskNameInput = useRef<HTMLInputElement>(null);

    const nextCycle = getNextCycle(state.currentCycle);
    const nextCycleType = getNextCycleType(nextCycle);

    function handleCreateNewTask(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();

        if (!taskNameInput.current) {
            return;
        }

        const taskName = taskNameInput.current.value.trim();
        if (taskName === '') {
            alert('Digite o nome da tarefa');
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


        // taskNameInput.current.value = '';
    }

    function handleInterruptTask(event: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        event.preventDefault();
        dispatch({
            type: TaskActionType.INTERRUPT_TASK
        });
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
                        disabled={!!state.activeTask}/>
                </div>

                <div className="formRow">
                    <p>Próximo intervalo é de 25 minutos</p>
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