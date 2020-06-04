import React, { Component, Suspense, lazy } from 'react'
import { render } from 'react-dom'

const Calculator = lazy(() => import('../components/Calculator/Calculator'))

import '../../static/scss/App.scss'

class App extends Component {
    render() {
        return (
            <div className="container">
                <Suspense fallback={<h1>Loading</h1>}>
                    <Calculator />
                </Suspense>
            </div>
        )
    }
}

render(<App />, document.getElementById('App'))
