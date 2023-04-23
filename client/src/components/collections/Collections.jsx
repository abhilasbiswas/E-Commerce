import React, { Component } from 'react'
import "./CollectionCard.css"
import {CollectionCard} from './CollectionCard'
import CollectionModel from '../../data/model/CollectionModel'
import axios from 'axios'
export default class Collections extends Component {

    constructor(props) {
      super(props);
      this.state ={model: []};
    }

    componentDidMount() {
      this.getCollections();
    }
  
    getCollections = ()=>{
      // console.log("Fetching...");
      const link = process.env.REACT_APP_SERVER+"collection";
      // console.log(link);
      axios.post(link)
      .then((res) => { return res.json(); })
      .then((data) => {
        this.setState({model: data});
        // console.log(data);
      })
      .catch((error) => {
        // console.error(error);
      });
    }

  render() {
    return (
      <div className='collection_container'>
        {this.state.model.map((m)=>{return <CollectionCard model = {m}/>})}
      </div>
    )
  }
}
