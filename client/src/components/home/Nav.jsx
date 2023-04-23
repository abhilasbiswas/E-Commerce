
import React, { Component , useState, useEffect} from 'react'
import './Nav.css'
import Badge from '@mui/material/Badge';
import {Drawer} from '@mui/material';
import {Drawer as DrawerX} from "../common/common";

import Box from '@mui/material/Box';
import {NavHead} from "../common/common";
import {useNavigate, Link} from "react-router-dom";

import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import LocalMallIcon from '@mui/icons-material/LocalMall';

import FavoriteIcon from '@mui/icons-material/Favorite';
import PermMediaIcon from '@mui/icons-material/PermMedia';
import CollectionsIcon from '@mui/icons-material/Collections';
import MailIcon from '@mui/icons-material/Mail';
import NotificationsIcon from '@mui/icons-material/Notifications';

import InfoIcon from '@mui/icons-material/Info';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import axios from 'axios'
import { googleLogout } from '@react-oauth/google';

import { loadingStart,dialogMsg, loadingStop, dialogError} from '../dialog/dialog'




const logo = 'https://ik.imagekit.io/abhilasbiswas/logo.png?updatedAt=1678945307021';

//HACK update search interface, retieves products and injection funtionalities
function SearchBar({callback}) {
  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      if (callback){
      callback(event.target.value);
      }
    }
  }


    return <div id="seach-bar-container" className='search-bar'>
                <input id="search-input-field" onKeyDown={handleKeyDown} placeholder='search here...' type="text" className="search-input"/>
                
                <ion-icon className="search-icon" onClick={()=>{

                  if (document.getElementById("seach-bar-container").className=="search-bar"){
                    document.getElementById("logo").className = "logo2";
                    document.getElementById("seach-bar-container").className = "search-bar2";
                  }
                  else{
                    document.getElementById("logo").className = "logo";
                    document.getElementById("seach-bar-container").className = "search-bar";
                  }
                  
                }} name="search"></ion-icon>
              </div>
          }
  











function NavigationView() {
      const navigate = useNavigate();

      let active = localStorage.getItem("user");

      const view = <div>
        
        <List>
          <ListItem key='profile' disablePadding>
              <ListItemButton disabled={!active} onClick={()=>{navigate("/profile")}}>
                <ListItemIcon>
                  <AccountBoxIcon/>
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>

            <ListItem key='my_cart' disablePadding>
              <ListItemButton disabled={!active} onClick={()=>{navigate("/cart")}}>
                <ListItemIcon>
                  <ShoppingCartIcon/>
                </ListItemIcon>
                <ListItemText primary="My Cart" />
              </ListItemButton>
            </ListItem>

            <ListItem key='my_orders' disablePadding>
              <ListItemButton disabled={!active} onClick={()=>{navigate("/orders")}}>
                <ListItemIcon>
                  <LocalMallIcon/>
                </ListItemIcon>
                <ListItemText primary="My Orders" />
                <div className="notification-dot"></div>
              </ListItemButton>
            </ListItem>

            <ListItem key='favourites' disablePadding>
              <ListItemButton disabled={!active} onClick={()=>{navigate("/favourites")}}>
                <ListItemIcon>
                  <FavoriteIcon/>
                </ListItemIcon>
                <ListItemText primary="Favourites" />
              </ListItemButton>
            </ListItem>

            <ListItem key='inbox' disablePadding>
              <ListItemButton disabled={!active} onClick={()=>{navigate("/inbox")}}>
                <ListItemIcon>
                  <MailIcon/>
                </ListItemIcon>
                <ListItemText primary="Inbox" />
                <div className="notification-dot"></div>
              </ListItemButton>
            </ListItem>

            <ListItem key='notification' disablePadding>
              <ListItemButton disabled={!active} onClick={()=>{navigate("/notifications")}}>
                <ListItemIcon>
                  <NotificationsIcon/>
                </ListItemIcon>
                <ListItemText primary="Notifications" />
                <div className="notification-dot"></div>
              </ListItemButton>
            </ListItem>
        </List>


        <Divider />
        <List>
          
            <ListItem key='collections' disablePadding>
              <ListItemButton onClick={()=>{navigate("/collections")}}>
                <ListItemIcon>
                <PermMediaIcon/>
                </ListItemIcon>
                <ListItemText primary="Collections" />
              </ListItemButton>
            </ListItem>
            <ListItem key='products' disablePadding>
              <ListItemButton onClick={()=>{navigate("/products")}}>
                <ListItemIcon>
                <CollectionsIcon/>
                </ListItemIcon>
                <ListItemText primary="Products" />
              </ListItemButton>
            </ListItem>
        </List>
        <Divider />
        <List>
          <ListItem key='about' disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InfoIcon/>
              </ListItemIcon>
              <ListItemText primary="About Us" />
            </ListItemButton>
          </ListItem>
        </List>
        </div>

      return view;
}




  

  export default function Nav({back, title, nosearch, nocart,creater, searchCallback}) {
    
    const navigate = useNavigate();
    function login(){
      navigate("/login")
    }
    function logout(){
      
      setDrawer(false);
      dialogMsg("Do you want to logout?", "Logout", execute)
      function execute(){
        loadingStart();
          googleLogout()
          axios.post(process.env.REACT_APP_SERVER+"user/logout",{token: localStorage.getItem("token")})
          .then((response)=>{
            loadingStop();
            // console.log("response: "+response.data)
            if(response.data){
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              
              window.location.reload();
        }
      })
      .catch((e)=>{
        loadingStop();
        dialogError("Some error occured")
      })
      ;

    }
    }

    let data = {
      name: "name",
      logged_in: false,
      dp: "https://ik.imagekit.io/abhilasbiswas/default_dp.png?updatedAt=1678945306750",
      login: login,
      logout: logout
    };

    let showDrawer;
    const [drawer_state, setDrawer] = useState(false);


    let logged_in = false;
    
    const user = localStorage.getItem("user");
    let count = 0;
    
      if (user){
        logged_in = true;
        let user_data;
        try{
          user_data = JSON.parse(user)
          count =  user_data.carts.length;
          data ={ 
            name: user_data.name,
            logged_in: true,
            dp: user_data.dp,
            login: login,
            logout: logout
          }
        }
        catch(e){
          logout()
        }
      }
    
    return (
      // <div className="app-bar-container">
      <div className='app-bar'>
        
          {
          back?
          <ion-icon id="navigation" onClick={()=>navigate(-1)}  name="arrow-back"></ion-icon>
          :(<div className="menu-icon-holder"><ion-icon id="navigation" 
          onClick={() => 
            {
              setDrawer(true);
              if (showDrawer){
              showDrawer(true);
              }
            }}
          
          name="menu"></ion-icon>
          <div className="notification-dot"></div>
          </div>
          )
          }
          <div id='logo' className="logo">
            {title?<p className="nav-title">{title}</p>:<img src={logo}/>}
          </div>

          {!nosearch? <SearchBar callback={searchCallback}/>:""}
          

          {
            creater?(
              <p className="appbar-create-button">Create</p>
            ):
            (!nocart?(  logged_in?
              <Link to="/cart">
                <div className="cart">
                  <Badge badgeContent={count} sx={{
                        "& .MuiBadge-badge": {
                          color: "white",
                          backgroundColor: "red"
                        }
                      }}   >
                    <ShoppingCartIcon color="action" sx={{color: "white"}}/>
                  </Badge>
                </div>
              </Link>
              :
              <Link to="/login">
                <div className="cart">
                  <PersonAddIcon sx={{color:"white"}}/>
                </div>
              </Link>):"")

          }
          
          {/* #### My Drawer  ########## */}



          {/* #####  MUI Drawer #### */}

          {/* <Drawer
            anchor={'left'}
            open={drawer_state}
            onClose ={()=>setDrawer(false)}
          >
            <Box
            sx={{ width: 260 }}
            role="presentation"
          >
            <NavHead data={data}/>
            <NavigationView/>
        </Box>
          </Drawer> */}


      {/* </div> */}

      
      <DrawerX setter={(set)=>{showDrawer=set}}>
        
          <Box
              sx={{ width: 260 }}
              role="presentation"
            >
              <NavHead data={data}/>
              <NavigationView/>
          </Box>
      </DrawerX> 


      </div>
    )
  }

