// import { Fragment } from 'react';
// <Fragment>
//   Framento 2
// </Fragment>

import './styles/theme.css';
import './styles/global.css';

import {Container} from './components/Container';
import {Footer} from './components/Footer';
import {Logo} from './components/Logo';
import {Menu} from './components/Menu';
import {CountDown} from './components/CountDown';
import {DefaultInput} from './components/DefaultInput';
import {Cycles} from './components/Cycles';
import {DefaultButton} from './components/DefaultButton';
import {PlayCircleIcon} from 'lucide-react';


function App() {
    return (
        <>
            <Container>
                <Logo/>
            </Container>

            <Container>
                <Menu/>
            </Container>

            <Container>
                <CountDown/>
            </Container>

            <Container>
                <form className="form" action="#">
                    <div className="formRow">
                        <DefaultInput labelText={'Task'} id={'taskId'} type="" placeholder={'Digite algo'}/>
                    </div>

                    <div className="formRow">
                        <p>Lorem ipsum dolor sit down.</p>
                    </div>

                    <div className="formRow">
                        <Cycles/>
                    </div>

                    <div className="formRow">
                        <DefaultButton id={'myButton'} icon={<PlayCircleIcon/>} color={'red'}/>
                    </div>
                </form>
            </Container>

            <Container>
                <Footer/>
            </Container>
        </>

    );
}

export {App};