import React, { Component, useState} from 'react'
import Product from './Product'
import {ProductModel} from "../../models/models"
import axios from 'axios'
export default class Products extends Component {

  constructor(props) {
    super(props);
    this.state ={model: []};
    
  }

  componentDidMount() {
    this.getproducts();
  }
  

  getproducts = ()=>{
    // console.log("Fetching...");
    const link = process.env.REACT_APP_SERVER+"product";
    // console.log(link);
    axios.post(link)
    .then((data) => {
      this.setState({model: data.data});
    })
    .catch((error) => {
      // console.error(error);
    });
  }




  render() {
    const user = localStorage.getItem("user");
    let favourites = null;
    try{
        favourites = JSON.parse(user).favourites;
    }catch(e){}
    
    return (
      <div>
        {
          this.state.model.slice(0).reverse().map((m)=>{
          m.love =favourites? favourites.includes(m.id):false;
          return <Product nocreater={this.props.nocreater} key={Math.random().toString(36).slice(2, 12)} model={m}/>})
        }
      </div>
    )
  }
}
