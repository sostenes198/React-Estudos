import {MainTemplate} from '../../templates/MainTemplate';
import {Container} from '../../components/Container';
import {Heading} from '../../components/Heading';
import {DefaultInput} from '../../components/DefaultInput';
import {DefaultButton} from '../../components/DefaultButton';
import {SaveIcon} from 'lucide-react';
import * as React from 'react';
import {useEffect, useRef} from 'react';
import {useTaskContext} from '../../contexts/TaskContext/useTaskContext';
import {showMessage} from '../../adapters/showMessage';
import {TaskActionType} from '../../contexts/TaskContext/taskActionType';


export function Settings() {
    const {state, dispatch} = useTaskContext();

    const workTimeInputRef = useRef<HTMLInputElement>(null);
    const shortBreakTimeTimeInputRef = useRef<HTMLInputElement>(null);
    const longBreakTimeTimeInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        document.title = 'Entenda a Técnica Pomodoro - Chronos Pomodoro';
    }, []);

    function handleSaveSettings(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        showMessage.dismiss();

        const formErrors = [];

        const workTime = Number(workTimeInputRef.current?.value);
        const shortBreakTime = Number(shortBreakTimeTimeInputRef.current?.value);
        const longBreakTime = Number(longBreakTimeTimeInputRef.current?.value);

        if (isNaN(workTime) || isNaN(shortBreakTime) || isNaN(longBreakTime)) {
            formErrors.push('Digite apenas números para TODOS os campos');
        }

        if (workTime < 1 || workTime > 99) {
            formErrors.push('Digite valores entre 1 e 99 para foco');
        }

        if (shortBreakTime < 1 || shortBreakTime > 30) {
            formErrors.push('Digite valores entre 1 e 30 para descanso curto');
        }

        if (longBreakTime < 1 || longBreakTime > 60) {
            formErrors.push('Digite valores entre 1 e 60 para descanso longo');
        }

        if (formErrors.length > 0) {
            formErrors.forEach(error => {
                showMessage.error(error);
            });
            return;
        }

        dispatch({
            type: TaskActionType.CHANGE_SETTINGS, payload: {
                workTime, shortBreakTime, longBreakTime,
            },
        });
        showMessage.success('Configurações salvas');
    }

    return (
        <>
            <MainTemplate>

                <Container>
                    <Heading>
                        Configurações
                    </Heading>
                </Container>

                <Container>
                    <p style={{textAlign: 'center'}}>
                        Modifique as configurações para tempo de foco, descanso curto e descanso longo
                    </p>
                </Container>

                <Container>
                    <form onSubmit={handleSaveSettings} action={''} className={'form'}>
                        <div className={'formRow'}>
                            <DefaultInput id={'workTime'}
                                          labelText={'Foco'}
                                          ref={workTimeInputRef}
                                          defaultValue={state.config.workTime}
                                          type={'number'}/>
                            <DefaultInput id={'shortBreakTime'}
                                          labelText={'Decanso curto'}
                                          ref={shortBreakTimeTimeInputRef}
                                          defaultValue={state.config.shortBreakTime}
                                          type={'number'}/>
                            <DefaultInput id={'longBreakTime'}
                                          labelText={'Decanso longo'}
                                          ref={longBreakTimeTimeInputRef}
                                          defaultValue={state.config.longBreakTime}
                                          type={'number'}/>
                        </div>
                        <div className={'formRow'}>
                            <DefaultButton id={'settingsFormButton'} icon={<SaveIcon/>}
                                           aria-label={'Salvar configurações'}
                                           title={'Salvar configurações'}
                            />
                        </div>
                    </form>
                </Container>

            </MainTemplate>
        </>

    );
}