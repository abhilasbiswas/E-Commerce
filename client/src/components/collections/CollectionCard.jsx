import React, { Component } from 'react'
import "./CollectionCard.css"
import {Link} from "react-router-dom"


export function CollectionCard({model}) {
    
    return (
      <Link to = "/collection" state={{model: model}}>
        <div className="groupCard">
          {/* <div className="img-container"> */}
            <img className='collection-feature' src={model.feature_image}/>
            
          {/* </div> */}
          <div className="cover"></div>
            <p className="collection_name"> {model.title} </p>
        </div>
      </Link>
    )
  }



// export default class Collections extends Component {
//   render() {
//     return (
//       <div className="collections">
//         <CollectionCard/>
//         <CollectionCard/>
//         <CollectionCard/>
//         <CollectionCard/>
        
//       </div>
//     )
//   }
// }
