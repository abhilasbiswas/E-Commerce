import React, { Component, useState} from 'react'
import {ProductItem} from '../products/Product'
import Nav from '../home/Nav'
import axios from 'axios'
import { Empty } from '../common/common';

import { loadingStart, loadingStop} from '../dialog/dialog'


export default class Favourites extends Component {

  constructor(props) {
    super(props);
    this.state ={model: []};
    
  }

  componentDidMount() {
    this.getproducts();
  }
  
  insertProduct = (p)=>{ 
    
    this.setState({
      model: this.state.model.concat(p)
    });
  }

  getproducts = ()=>{
    loadingStart()
    const link = process.env.REACT_APP_SERVER+"user/favourites";
    const favourites = JSON.parse(localStorage.getItem("user")).favourites;
    axios.post(link, {favourites: favourites})
    .then((data) => {
      loadingStop()
      this.setState({model: data.data});
    })
    .catch((error) => {
      console.error(error);
    });
  }


  render() {
    return (
      <div>
        <Nav back nosearch title="My Favourites"/>
        {
        this.state.model.length>0?
        this.state.model.map(
          (m, i)=>
          {
            return <ProductItem key={i} model={m}/>
          })
        :
        <Empty/>
        }
      </div>
    )
  }
}
