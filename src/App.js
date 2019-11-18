import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import BasicLayout from './pages/basicLayout/basicLayout'
import Login from './pages/login/login'

class App extends Component {
  render() {
    return (
        <Switch>
            <Route path='/login' component={Login}></Route>
            <Route path='/' component={BasicLayout}/>
        </Switch>
    )
  }
}

export default App;
