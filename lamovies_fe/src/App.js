import './App.css';
import HomePage from './pages/home/HomePage';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import SinglePage from './components/watch/SinglePage';
import Header from './components/header/Header';
import Footer from './components/footer/Footer';
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
import ListMovie from './pages/movie/ListMovie';
import Pricings from './pages/pricing/Pricing';
import CheckOut from './pages/checkout/CheckOut';
import UserInfo from './pages/user/UserInfo';
import ChangePassword from './pages/user/ChangePassword';
import WatchMovie from './pages/movie/WatchMovie';
import WatchMovieSeries from './pages/movie/WatchMovieSeries';
import Room from './pages/room/Room';

import { PayPalScriptProvider } from '@paypal/react-paypal-js';

const initialOptions = {
    'client-id': 'Acvd0tGenxzM4iP1d-K4xqRsUiKndXC120ZPoAf91BUYO_swiyDB2aQ5zNRSL5DMdLoI-jHpBzO-rejO',
    currency: 'USD',
    intent: 'capture',
};
function App() {
    return (
        <>
            <Router>
                <Header />
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route exact path="/listmovie" component={ListMovie} />
                    <Route exact path="/pricing" component={Pricings} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />
                    <Route exact path="/userinfo" component={UserInfo} />
                    <Route exact path="/changepassword" component={ChangePassword} />
                    <Route path="/singlepage/:id" component={SinglePage} exact />
                    <Route path="/room/:idRoom/:id" component={Room} exact />
                    <Route path="/watchmovie/:id" component={WatchMovie} exact />
                    <Route path="/watchmovieseries/:id" component={WatchMovieSeries} exact />
                    <PayPalScriptProvider options={initialOptions}>
                        <Route path="/checkout/:id" component={CheckOut} exact />
                    </PayPalScriptProvider>
                </Switch>
                <Footer />
            </Router>
        </>
    );
}

export default App;
