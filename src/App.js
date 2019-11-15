import React, {Component} from 'react';
import {Route,Switch} from 'react-router-dom'
import BasicLayout from './pages/basicLayout/basicLayout'


class App extends Component {
  render() {
    return (
        <Switch>
          <Route path='/' component={BasicLayout}/>
        </Switch>
    )
  }
}

export default App;
