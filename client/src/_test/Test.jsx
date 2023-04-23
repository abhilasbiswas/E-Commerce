import React, {useContext, useState} from 'react'

import "./Test.css"


export function Drawer({setter, children}){
    
  const [drawer,setDrawer] = useState(false)

    setter(setDrawer)

    return(
      <div 
        className={"drawer_container " + (drawer?"drawer_container_open":"drawer_container_close")}
        onClick={()=>{setDrawer(false);}}
        >
        <div className="drawer_content"
          onClick={(e)=>{
            e.stopPropagation();
          }}
        >
          {children}
        </div>
      </div>
    )
  }

export default function Test(props) {

  let setx;
  
  return (
    <>
      <div className="test_container"><input type="button" value="Open" 
      onClick={()=>{setx(true)}}/>
    
      <Drawer
        setter={(set)=>{setx=set}}
        sx={{
          '& .MuiDrawer-root': {
              position: 'absolute'
          },
          '& .MuiPaper-root': {
              position: 'absolute'
          },
        }}
            
          >
            sdjfksdjklfhsdjk
          </Drawer>
      </div>
  </>
  )
}
