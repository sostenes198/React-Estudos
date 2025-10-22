// import { Fragment } from 'react';
// <Fragment>
//   Framento 2
// </Fragment>

import './styles/theme.css';
import './styles/global.css';

import {Home} from './pages/Home';
import {TaskContextProvider} from './contexts/TaskContext/TaskContextProvider';


function App() {
    return (
        <TaskContextProvider>
            <Home/>;
        </TaskContextProvider>
    );

}

export {App};