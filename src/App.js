import React from 'react';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import Calculator from './component/Calculator/Calculator';

const App = () => (
    <Router>
        <Route path = "/" exact component={Calculator}/>
    </Router>
);

export default App;