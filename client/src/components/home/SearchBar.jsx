import React, { Component } from 'react'
import "./SearchBar.css"

import Search from './Search'
class SearchTip extends Component {
  render() {
    return (
      <div>
        <div className="group">
          {this.props.name}
        </div>
      </div>
    )
  }
}


export default class SearchBar extends Component {
  render() {
    return (
        <div className="groups">
            
        <SearchTip className="item" name="Group a"/>
        <SearchTip className="item" name="Group a"/>
        <SearchTip className="item" name="Group a"/>
        <SearchTip className="item" name="Group a"/>
        <SearchTip className="item" name="Group a"/>
        
        <Search/>
      </div>
    )
  }
}
