import * as React from 'react'
import { render } from 'react-dom'

import Calculator from '../components/Calculator/Calculator'

import '../../static/scss/App.scss'

class App extends React.Component {
    render() {
        return (
            <div className="container">
                <Calculator />
            </div>
        )
    }
}

render(<App />, document.getElementById('App'))
