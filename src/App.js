import React, {Component} from 'react';
import {BrowserRouter as Router, Switch, Route, Redirect} from 'react-router-dom'
import BasicLayout from './pages/basicLayout'
import Login from './pages/login'
import Index from './pages'
import Register from './pages/register'
import NotFound from "./pages/notFound";

import addBug from './pages/bug/addBug';
import bugList from './pages/bug/bugList';
import bugDetail from './pages/bug/bugDetail';
import storage from "./utils/storage";

const routes = [
  {
    path: "/",
    component: Index
  },
  {
    path: "/register",
    component: Register
  },
  {
    path: "/login",
    component: Login
  }
];
const privateRoutes = [
  {
    path: "/pages",
    component: BasicLayout,
    routes: [
      {
        path: "/pages/addBug/:type",
        component: addBug
      },
      {
        path: "/pages/bugList",
        component: bugList
      },
      {
        path: "/pages/bugDetail/:id",
        component: bugDetail
      },
    ]
  }
];

function PrivateRoute({children, ...rest}) {
  let token = storage.get('token')
  return (
    <Route
      exact
      {...rest}
      render={({location}) =>
        token ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login",
              state: {from: location}
            }}
          />
        )
      }
    />
  );
}

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Switch>
            {routes.map((route, i) => (
              <Route
                exact
                key={i}
                path={route.path}
                render={props => (
                  <route.component {...props} routes={route.routes}/>
                )}
              />
            ))}
            {privateRoutes.map((route, i) => (
              <PrivateRoute
                key={i}
              >
                <route.component {...this.props} path={route.path} routes={route.routes}/>
              </PrivateRoute>
            ))}
            <Route path='/404' component={NotFound}/>
            <Redirect from='*' to='/404'/>
          </Switch>
        </Switch>
      </Router>
    )
  }
}

export default App;
