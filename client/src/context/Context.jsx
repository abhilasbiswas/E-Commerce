
import React,{createContext, useContext, useState} from 'react'


const ActionContext = createContext();

export function useAction(){
  const [action, setAction] = useContext(ActionContext)
  return action;
}
export function useSetAction(act){
  const [action, setAction] = useContext(ActionContext)
  setAction(()=>{return act});
}

export function ActionProvider({children}) {
  
  const [action, setAction] = useState(()=>{})

  return (
    <ActionContext.Provider value={[action, setAction]}>
        {children}
    </ActionContext.Provider>
  )
}




const CartContext = createContext()

export function useCartContex(){
  const [action, setAction] = useContext(CartContext)
  return action;
}
export function useSetCartContext(act){
  const [action, setAction] = useContext(CartContext)
  setAction(()=>{return act});
}

export function CartContextProvider({children}){

  const [state, setState] = useState([])

  return (
    <CartContext.Provider value={[state, setState]}>
      {children}
    </CartContext.Provider>
  )
}
