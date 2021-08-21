import React, { useEffect, useState } from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/layout/Header'
import Footer from './components/layout/Footer'

//Products
import Home from './screens/Home'
import Detail from './screens/products/Detail'

//Users
import Login from './screens/users/Login'
import Register from './screens/users/Register'
import Profile from './screens/users/Profile'
import { loadUser } from './actions/userActions'
import ProtectRoute from './components/route/ProtectRoute'
import UpdateProfile from './screens/users/UpdateProfile'
import UpdatePassword from './screens/users/UpdatePassword'
import ForgotPassword from './screens/users/ForgotPassword'
import ResetPassword from './screens/users/ResetPassword'

//Cart 
import Cart from './screens/cart/Cart'
import Shipping from './screens/cart/Shipping'
import ConfirmOrder from './screens/cart/ConfirmOrder'
import Payment from './screens/cart/Payment'

//Orders
import OrderSuccess from './screens/cart/OrderSuccess'
import MyOrders from './screens/order/MyOrders'
import MyOrderDetail from './screens/order/MyOrderDetail'

//Admin
import Dashboard from './components/admin/Dashboard'
import ProductList from './components/admin/ProductList'
import CreateProduct from './components/admin/CreateProduct'
import UpdateProduct from './components/admin/UpdateProduct'
import OrdersList from './components/admin/OrdersList'
import ProcessOrder from './components/admin/ProcessOrder'
import UserList from './components/admin/UserList'
import UpdateUser from './components/admin/UpdateUser'
import ProductReviews from './components/admin/ProductReviews'

import store from './store'
import axios from 'axios'

// Payment
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'


function App() {

  const [stripeApiKey, setStripeApiKey] = useState('');

  useEffect(() => {

    store.dispatch(loadUser())

    async function getStripApiKey() {
      const { data } = await axios.get('/api/payment/stripe-api');

      setStripeApiKey(data.stripeApiKey)
    }

    getStripApiKey();

    
  }, [])

  
  
  return (
    <Router>
      <div className="App">
        <Header />
        <div className="container container-fluid">
          <Route path="/" component={Home} exact  />
          <Route path="/search/:keyword" component={Home} />
          <Route path="/product/:id" component={Detail} exact />
          
          <Route path="/cart" component={Cart}/>
          <ProtectRoute path="/shipping" component={Shipping} exact />
          <ProtectRoute path="/order/confirm" component={ConfirmOrder} exact />
          <ProtectRoute path="/order/success" component={OrderSuccess} exact />


          <ProtectRoute path="/orders/me" component={MyOrders} exact />
          <ProtectRoute path="/order/detail/:id" component={MyOrderDetail} exact  />

          {stripeApiKey &&
            <Elements stripe={loadStripe(stripeApiKey)}>
              <ProtectRoute path="/order/payment" component={Payment} />
            </Elements>
          }
          

          <Route path="/login" component={Login} />
          <Route path="/register" component={Register} />
          <Route path="/password/reset/:token" component={ResetPassword} exact/>
          <Route path='/password/forgot' component={ForgotPassword} />
          <ProtectRoute path="/me" component={Profile} exact/>
          <ProtectRoute path="/me/update" component={UpdateProfile} exact/>
          <ProtectRoute path="/password/update" component={UpdatePassword} exact/>
          </div>

            <ProtectRoute path="/dashboard" isAdmin={true} component={Dashboard} exact  />
            <ProtectRoute path="/admin/products" isAdmin={true} component={ProductList} exact  />
            <ProtectRoute path="/admin/product/update/:id" isAdmin={true} component={UpdateProduct} exact  />
            <ProtectRoute path="/admin/product/new" isAdmin={true} component={CreateProduct} exact  />
            <ProtectRoute path="/admin/orders" isAdmin={true} component={OrdersList} exact  />
            <ProtectRoute path="/admin/order/update/:id" isAdmin={true} component={ProcessOrder} exact  />
            <ProtectRoute path="/admin/users" isAdmin={true} component={UserList} exact  />
            <ProtectRoute path="/admin/user/update/:id" isAdmin={true} component={UpdateUser} exact  />
            <ProtectRoute path="/admin/reviews" isAdmin={true} component={ProductReviews} exact  />
            
          <Footer />
      
      </div>
    </Router>
  );
}

export default App;
