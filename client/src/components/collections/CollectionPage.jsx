import React, { Component, useEffect} from 'react'
import "./CollectionPage.css"
import {CollectionCard} from './CollectionCard'
import CollectionModel from '../../data/model/CollectionModel'
import axios from 'axios'
import Nav from "../home/Nav"
import {FAB} from "../common/common"

export default function CollectionPage(props) {
    const [model, setModel] = React.useState([]);

        useEffect(() => {
          if (model.length>0)
          return;
            const link = process.env.REACT_APP_SERVER+"collection";
            // console.log(link);
            axios.post(link)
            .then((data) => {
              setModel(data.data);
              // console.log(data.data);
            })
            .catch((error) => {
              // console.error(error);
            })
        });
    

    return (
      <div className='collection-page'>
        <Nav back creater logged_in={localStorage.getItem("token")} title="Collections"/>
          <div className="tab"><p className="all-collection">
              All
            </p>
            <p className="my-collection">
              My Collection
            </p>
            
          </div>

        <div className='collection_container'>
          {model.map((m,i)=>{return <CollectionCard key={i} model = {m}/>})}
        </div>
        {/* <FAB/> */}
      </div>
    )
  }

