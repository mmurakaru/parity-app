import React, { createContext, useState, useEffect } from 'react';

type ThemeCtx = {
    theme: string,
    toggleTheme: Function
}

export const ThemeContext = createContext<ThemeCtx>({
    theme: 'light',
    toggleTheme: () => { },
});

type Props = {
    children: JSX.Element
}

export default function ThemeProvider({ children }: Props) {
    const [theme, setTheme] = useState('light')

    useEffect(() => {
        const theme = localStorage.getItem('theme')
        if (theme != null) {
            setTheme(JSON.parse(theme))
        }
    }, [])

    function toggleTheme() {
        const newTheme = theme === 'light' ? 'dark' : 'light'
        setTheme(newTheme)
        localStorage.setItem('theme', JSON.stringify(newTheme))
    }

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    )
}