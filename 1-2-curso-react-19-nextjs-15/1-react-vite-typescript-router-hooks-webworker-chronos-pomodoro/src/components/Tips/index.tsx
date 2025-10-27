import {useTaskContext} from '../../contexts/TaskContext/useTaskContext';
import type {TaskModel} from '../../models/TaskModel';

type TipsProps = {
    nextCycleType: TaskModel['type'];
}

export function Tips({nextCycleType}: TipsProps) {
    const {state} = useTaskContext();

    const tipsForWhenActiveTask = {
        workTime: <span>Foque por {state.config.workTime}</span>,
        shortBreakTime: <span>Descanse por {state.config.shortBreakTime}</span>,
        longBreakTime: <span>Decanso longo</span>,
    };

    const tipsForWhenNonActiveTask = {
        workTime: <span>Próximo ciclo é de {state.config.workTime}</span>,
        shortBreakTime: <span>Próximo descanso é de {state.config.shortBreakTime}</span>,
        longBreakTime: <span>Próximo decanso será longo</span>,
    };

    return (
        <>
            {!!state.activeTask && tipsForWhenActiveTask[state.activeTask.type]}
            {!state.activeTask && tipsForWhenNonActiveTask[nextCycleType]}
        </>
    );
}