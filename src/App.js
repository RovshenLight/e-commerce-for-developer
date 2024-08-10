import Home from './pages/home/Home'
import Productslist from './pages/productslist/Productslist'
import Productslistiunit from './pages/productslistiunit/Productslistiunit';
import Basket from './pages/basket/Basket'
import Regist from './pages/regist/Regist'
import Login from './pages/login/Login'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { login } from './basketRedax/userRedux';
import Cookies from 'js-cookie';
import { useEffect } from 'react';
import Card from './pages/card/Card'
import NotFound from './pages/notfound/NotFound';

function App() {

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);

  useEffect(() => {
    const token = Cookies.get('authToken');

    if (token) {
      const simulatedUser = { username: 'user' };
      dispatch(login({ user: simulatedUser }));
    }
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <Switch>
          <Route path='/' exact>
            <Home />
          </Route>
          <Route path='/Productslist'>
            <Productslist />
          </Route>
          <Route path='/Productslist/:category'>
            <Productslist />
          </Route>
          <Route path='/Productslistiunit/:id'>
            <Productslistiunit />
          </Route>
          <Route path='/Basket'>
            <Basket />
          </Route>
          <Route path='/Card'>
            <Card />
          </Route>
          <Route path='/Login'>
          {isAuthenticated ? <Redirect to='/' /> : <Login />}
          </Route>
          <Route path='/Regist'>
          {isAuthenticated ? <Redirect to='/' /> : <Regist />}
          </Route>
          <Route path='*'>
            <NotFound />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
