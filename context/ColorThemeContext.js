
import React, { createContext, useContext, useState } from "react";

const ColorThemeContext = createContext();

export const ColorThemeProvider = ({ children }) => {
    const [ colorTheme, setColorTheme ] = useState(false);

    const toggleTheme = () => {
        setColorTheme((prev) => !prev);
    };

    return (
        <ColorThemeContext.Provider value={{ colorTheme, toggleTheme }}>
            {children}
        </ColorThemeContext.Provider>
    )
}

export const useColorTheme = () => useContext(ColorThemeContext);