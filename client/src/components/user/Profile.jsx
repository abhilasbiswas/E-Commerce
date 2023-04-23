import React, { useState } from 'react'
import "./style.css"
import EditIcon from '@mui/icons-material/Edit';
import ControlPointIcon from '@mui/icons-material/ControlPoint';
import TextField from '@mui/material/TextField';

import IconButton from '@mui/material/IconButton';
import Nav from "../home/Nav"
import {useNavigate} from 'react-router-dom'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';
import { loadingStart,dialogMsg, loadingStop, dialogError, dialogSuccess, dialogClose} from '../dialog/dialog'

import DeleteIcon from '@mui/icons-material/Delete';
import {RateDialog, Button} from '../common/common'
import {ProfileInfo, ProfileCover, UserProfile} from './UserProfilePage'

function InputDialog(props) {
    return (
        <div className="row-input-dialog">
            <p className="row-update-title">
                {props.title}
            </p>
            <input type="text" value={props.value} className="row-upate-input" />
            
            <p className="row-update-button">
                UPDATE
            </p>
        </div>
    )
}

//TODO implement edit funtion
function InputRow({title, v, number,name, onFieldUpdate, disable, placeholder}) {

    const [value, setValue] = useState(v?v:"")

    let emt = true;
    if (value){
        if (value.length>0)
        emt = false;
    }
    
    const [editing, setEdit] = React.useState(false)
    const [empty, setEmpty] = React.useState(emt)

    function edit(){
        if (editing){
            setEdit(false)
            onFieldUpdate(name, value)
        }else if(empty){
            setEdit(true);
        }
        else{
            setEdit(true);
        }
    }
    function handler(event){
        setValue(event.target.value)
        onFieldUpdate(name, event.target.value)
    }

    return (
        <div className="input-row">
            <p className="input-row-name">
                {title}
            </p>

            <div className="row-input"> 
                <input placeholder={placeholder?placeholder:""} maxLength={25}  type={number?"number":"text"} className={editing?"row-input-value-edit":"row-input-value"} value={value} onChange={handler}/>
                {disable?"":
                <IconButton aria-label="delete" onClick={edit}>
                    {editing?<CheckCircleIcon/>:(empty?<ControlPointIcon/>:<EditIcon />)}
                </IconButton>}
            </div>
        </div>
    )
}

function AccountSetting({user, updateField}){

    return (
        <div className="setting-card">
            {/* <InputDialog/> */}
            {/* <p className="sub-menu-title">
                Account Info
            </p> */}
            {/* <InputRow disable name="name" onFieldUpdate={updateField} title="Name" v={user.name} /> */}
            {/* <InputRow disable name="email" onFieldUpdate={updateField} title="Email" v={user.email}/> */}
            {/* <InputRow name="mobile" onFieldUpdate={updateField} number title="Mobile Number" v={user.mobile}/> */}
        </div>
    )
}

function AddressUpdateDialog(){
    return (
    <div className="address-update-dialog">
        <p className="address-update-title">

        </p>
        <TextField
          id="outlined-multiline-static"
          label="Multiline"
          multiline
          rows={4}
          defaultValue="Default Value"
        />

    </div>)
}


//TODO implement add address functions
function NewAddress({onClick}){
        return (
            <div onClick={onClick} className="address-container">
                <ion-icon name="add"></ion-icon>
            </div>
        )
}

function AddressRow({title, value, field, update, number, length}){

    const [v, setV] = useState(value);
    function handle(event){
        update(field, event.target.value)
    }

    return (
        <div className="address-row">
            <p>{title}</p>
            <input 
                onChange={handle} 
                className="address-row-input-edit" 
                maxLength={length?length:30} 
                type={number?"number":"text"}
                value={v}
                />

        </div>
    )
}
 function Address({addr}){

    return (
        <div className="address-container">
            <p className="address-title">{addr.type}</p>
            <p className="address-row">{addr.line1}</p>
            <p className="address-row">{addr.line2}</p>
            <p className="address-row">{addr.district}, {addr.state}</p>
            <p className="address-row">Pin: {addr.pin}</p>
            <p className="address-row">Ph: {addr.mobile}</p>
                
        </div>
    )
}

let addNewAddress;
function AddNewAddress({action}){

    const [visible, setVisibility] = useState(false);
    addNewAddress = (new_addr)=>{
        setVisibility(true);
        setAddress(new_addr)
    }
    
    let [address, setAddress]= useState("");

    function updateAddress(field, value){
        address[field]=value;
        setAddress(address);
    }

    return (
      <div className={visible?"new-comment-bg":"new-comment-bg-close"} >
        <div className="comment-new">
          <div className="address-container">
            <AddressRow 
            field="type"  
            update={updateAddress}
            title={"Type"} 
            value={address.type}
            />
            <AddressRow 
                field="line1"  
                update={updateAddress}
                title={"Line 1"} 
                value={address.line1}
                />
            <AddressRow 
                field="line2"  
                update={updateAddress}
                title={"Line 2"} 
                value={address.line2}
            />
            <div className="address-input-container">
                <AddressRow 
                    length={10} 
                    number 
                    field="mobile" 
                    update={updateAddress}
                    title={"Mobile"} 
                    value={address.mobile}
                    />
                    
                <AddressRow 
                    length={6}  
                    number 
                    field="pin"  
                    update={updateAddress}
                    title={"Pin"} 
                    value={address.pin}
                    />

                <AddressRow 
                    field="district"  
                    update={updateAddress}
                    value={address.district}
                    title={"District"} />

                <AddressRow 
                    field="state"  
                    update={updateAddress}
                    value={address.state}
                    title={"State"}/>
            </div>
        </div>



          {/* ################### */}
          <div className="comment-input-buttons">
            <Button 
            defocus 
            className="comment-cancel-button" 
            value="Cancel"
            onClick={()=>{
              setVisibility(false);
            }}
            />
            <Button className="comment-post-button" value="Add New"
                onClick={()=>{
                    action(address);
                    setVisibility(false);
                }}
            />
          </div>
        </div>
      </div>
    )
  }

function AddressBook({addresses, setAddresses}){
    
    function update(index, addr){
        const newAddress = []
        addresses.forEach(a => {newAddress.push(a)})
        newAddress[index]=addr;
        
        setAddresses(newAddress);
    }

    function removeAdress(index){
        const newAddress = [...addresses]
        newAddress.splice(index, 1)
        setAddresses(newAddress);
    }

    function addAddress(){
        addNewAddress({
            "type" : "Home",
            "line1" : "",
            "line2" : "",
            "mobile" : "",
            "pin" : "",
            "district" : "",
            "state" : ""
        })
    }

    return (
        <div className="setting-card">
            <div className="address-header">
                <p className="sub-menu-title">Address Book</p>
                <p className="address-button"
                    onClick={addAddress}
                >Add New</p>
                <p className="address-button">Remove</p>
            </div>
            {
                addresses.map((address, i)=>{
                    return <Address index={i} removeAddress={removeAdress} update={update} key={i} addr={address}/>
                })
            }
            
        </div>
    )
}


function Title({name, onUpdate}){
    const navigate = useNavigate();
    return(
    <div className="profile-title-bar">
        <IconButton onClick={()=>navigate("/")}>
            <ArrowBackIcon/>
        </IconButton>
        <p className="title"> </p>
        {/* <p className="title"> Hey! {name}</p> */}
        <div className="update-button" onClick={onUpdate}>UPDATE</div>
    </div>)
}

export default function Profile() {
    const user_info = localStorage.getItem("user");
    let user = []
    if (user_info){
        user = JSON.parse(user_info)
    }
    const [addresses, setAddresses] = useState(user.addresses)
    const [info, setInfo] = useState(user)

    function insertAddress(address){
        const new_address = [...addresses]
        new_address.push(address)
        setAddresses(new_address)
    }

    function updateProfile(){
        loadingStart();
        const token = localStorage.getItem("token")
        const data = {
            name: info.name,
            email: info.email,
            mobile: info.mobile,
            addresses: addresses
        }
        axios.post(process.env.REACT_APP_SERVER+"user/update", {token: token, data:data})
        .then((res) => {
            loadingStop();
            if(res.data!="-1"){
                const new_user = res.data;
                localStorage.setItem("user", JSON.stringify(new_user))
                dialogSuccess("Profile Updated Successful")
            }
            else
            dialogError("Profile Update Failed")
        })
        .catch((e)=>{
            loadingStop();
            dialogError("Sorry some error occured")
        })
    }

    function updateField(name, value) {
        info[name] = value;
        setInfo(info)
    }
    console.log(user.dp)
    return (
        <div className="profile-container">
            {/* <UserProfile self/> */}
            <Title name={user.name} onUpdate={updateProfile}/>
            <div className="profile-pic-container">
                <img src={user.dp}/>
                <p>{user.name}</p>
            </div>
            
            {/* <AccountSetting user={info} updateField={updateField}/> */}
            <AddressBook addresses = {addresses} setAddresses={setAddresses}/>
            
            <AddNewAddress action={insertAddress}/>
        </div>
    )
}
