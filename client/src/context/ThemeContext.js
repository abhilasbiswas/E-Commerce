import React, {useState, createContext, useContext} from "react";

export const ThemeContext = createContext();

export function useTheme(){
    return useContext(ThemeContext);
}


export default function ThemeProvider({children}){

    const [dark, setDark] = useState("Hello World");
    const toggle =()=>{
        setDark(dark + "\nNew Children\n");
    }

    return (<>
        <ThemeContext.Provider value={[dark, toggle]}>
                {children}
        </ThemeContext.Provider>
    </>);
}