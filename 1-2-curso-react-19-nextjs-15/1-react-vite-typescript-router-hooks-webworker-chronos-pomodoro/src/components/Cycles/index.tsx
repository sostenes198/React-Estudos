import styles from './styles.module.css';
import {useTaskContext} from '../../contexts/TaskContext/useTaskContext';
import {getNextCycle} from '../../utils/getNextCycle';
import {getNextCycleType} from '../../utils/getNextCycleType';
import type {TaskStateModel} from '../../models/TaskStateModel';

export function Cycles() {
    const {state} = useTaskContext();

    const cyleStep = Array.from({length: state.currentCycle});

    const cycleDescritionMap: { [k in keyof TaskStateModel['config']]: string } = {
        'workTime': 'foco',
        'shortBreakTime': 'descanso curto',
        'longBreakTime': 'descanso longo',
    };

    return (
        <div className={styles.cycles}>
            <span>Ciclos:</span>

            <div className={styles.cycleDots}>
                {cyleStep.map((_, index) => {
                    const nextCycle = getNextCycle(index);
                    const nextCycleType = getNextCycleType(nextCycle);
                    return (
                        <span key={`${nextCycleType}_${nextCycle}`}
                              className={`${styles.cycleDot} ${styles[nextCycleType]}`}
                              aria-label={`Indicador de ciclo de ${cycleDescritionMap[nextCycleType]}`}
                              title={`Indicador de ciclo de ${cycleDescritionMap[nextCycleType]}`}>
                            </span>

                    );
                })}
            </div>
        </div>
    );
}