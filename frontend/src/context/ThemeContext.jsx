import { createContext, useReducer, useEffect } from "react";

export const ThemeContext = createContext()

export const themeReducer = (state, action) => {
    switch (action.type) {
        case 'UPDATE':
            return {
                theme: action.payload
            }

        default:
            return state
    }
}

export const ThemeContextProvider = ({ children }) => {

    const [state, dispatch] = useReducer(themeReducer, {
        theme: "light"
    })

    //run just once at the start
    useEffect(() => {
        const theme = "light"
    }, [])

    return(
        <ThemeContext.Provider value={{...state, dispatch}}>
            { children }
        </ThemeContext.Provider>
    )
}