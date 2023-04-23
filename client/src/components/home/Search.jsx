import React, { Component } from 'react'
import './Search.css'

export default class SearchBar extends Component {

  searchBox(){
    if (this.props.expand=="true"){
      return <input className="search_input" placeholder="" type='text'/>
    }
    else
    {
      return <div className="search_box" placeholder="" type=''/>
    }
  }

  render() {

    if (this.props.expand=="true"){
      return (
      <div className="search_container_expand">
          <div className="search_expand">
              <input className="search_input" placeholder="Search Items" type='text'/>
              <ion-icon className="search_icon" name="search-outline"></ion-icon>
              
          </div>
          
        </div>
      )
    }
    else
    {
      return (
        <div className="search_container">
          <div className="search">
              <div className="search_input" placeholder="" type=''/>
              <ion-icon className="search_icon" name="search-outline"></ion-icon>
              
          </div>
          
        </div>
      )
    }

  }
}
