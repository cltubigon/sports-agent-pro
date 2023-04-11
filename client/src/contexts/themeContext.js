import { createContext } from "react";
import useLocalStorage from "use-local-storage";

export const ThemeContext = createContext()
export const ThemeUpdateContext = createContext()

export function ThemeProvider({children}) {
    const [darkTheme, setDarkTheme] = useLocalStorage(true)
    
    function toggleTheme() {
            setDarkTheme(darktheme => !darktheme)
            console.log("rendered once")
    }
    return (
        <ThemeContext.Provider value={darkTheme}>
            <ThemeUpdateContext.Provider value={toggleTheme}>
                {children}
            </ThemeUpdateContext.Provider>
        </ThemeContext.Provider>
    )
}