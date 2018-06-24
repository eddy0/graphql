import React, {Fragment} from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Home from './Home'

const App = () => (
    <Router>
        <Route exact path="/" component={Home} />
    </Router>
)

export default App
