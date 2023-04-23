import {Routes, Route} from "react-router-dom";
import Products from "./components/products/ProductPage";
import Collections from "./components/collections/CollectionPage";
import ProductView from "./components/products/ProductView";
import CollecitonView from "./components/collections/CollectionView";
import HomePage from "./components/home/HomePage";
import Login from "./components/user/Login"
import Signup from "./components/user/Signup"
import Cart from "./components/user/ProductCart"
import AdminLogin from './components/admin/login';

import ProductUpdateView from './components/admin/ProductUpdateView'
import CollectionUpdateView from './components/admin/CollectionUpdateView'
import CollectionPanel from './components/admin/CollectionPanel'
import ProductPanel from './components/admin/ProductPanel';
import HomeManagement from './components/admin/homepage';

import Profile from './components/user/Profile';
import Order from './components/user/Order';
import Favourites from './components/user/Favourites';
import Inbox from './components/user/Inbox';
import Notifications from './components/user/Notifications';
import MessageView from './components/user/MessageView';
import "./app.css"
import { GoogleOAuthProvider } from '@react-oauth/google';
import Dialog from "./components/dialog/dialog"

import ProfilePage from './components/user/UserProfilePage';
import Test from "./_test/Test"

function App() {
    return (
      <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
      <div className="top-level-containerx">
      <div className="top-level-container">
      <div className="app-main-container">
        <Dialog>
          <Routes>
            <Route exact path="/" element={<HomePage/>}> </Route>
            <Route exact path="/home" element={<HomePage/>}> </Route>
            <Route exact path="/products" element={<Products/>}> </Route>
            <Route exact path="/collections" element={<Collections/>}> </Route>
            <Route exact path="/product" element={<ProductView/>}> </Route>
            <Route exact path="/collection" element={<CollecitonView/>}> </Route>
            
            <Route exact path="/login" element={<Login/>}> </Route>
            <Route exact path="/signup" element={<Signup/>}> </Route>
            <Route exact path="/cart" element={<Cart/>}> </Route>
            <Route exact path="/admin" element={<AdminLogin/>}> </Route>
            <Route exact path="/admin/products" element={<ProductPanel/>}/> 
            <Route exact path="/admin/collections" element={<CollectionPanel/>}/> 
            <Route exact path="/admin/product" element={<ProductUpdateView/>}/> 
            <Route exact path="/admin/collection" element={<CollectionUpdateView/>}/> 
            <Route exact path="/admin/home" element={<HomeManagement/>}/> 
            
            <Route exact path="/bio" element={<ProfilePage/>}> </Route>
            <Route exact path="/profile" element={<Profile/>}> </Route>
            <Route exact path="/orders" element={<Order/>}> </Route>
            <Route exact path="/favourites" element={<Favourites/>}> </Route>
            
            <Route exact path="/inbox" element={<Inbox/>}> </Route>
            <Route exact path="/notifications" element={<Notifications/>}> </Route>
            
            <Route exact path="/message" element={<MessageView/>}> </Route>
            <Route exact path="/*" element={<HomePage/>}> </Route>
            <Route exact path="/test" element={<Test/>}> </Route>
            
          </Routes>
        </Dialog>
      </div>
      </div></div>
      </GoogleOAuthProvider>
  );
}

export default App;
