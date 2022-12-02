import { StaticImage } from "gatsby-plugin-image"
import React, { useContext } from "react"
import darkmodeIcon from "../assets/darkmode-icon.svg"
import lightmodeIcon from "../assets/lightmode-icon.svg"
import { ThemeContext } from "../context/ThemeContext"

const pageStyles = {
    padding: 96,
    fontFamily: "-apple-system, Roboto, sans-serif, serif",
}
const headerStyles = {
    display: 'flex',
    alignItems: 'center',
    marginBottom: 64
}
const headingStyles = {
    margin: '0 30px 0 0',
    maxWidth: 320,
}
const iconStyles = {
    cursor: 'pointer'
}

type Props = {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <main style={{ ...pageStyles, backgroundColor: theme === 'light' ? "#FFFFFF" : "#CDCECD" }}>
            <header style={headerStyles}>
                <h1 style={{ ...headingStyles, color: theme === 'light' ? "#232129" : "#FFFFFF" }}>
                    Parity blog
                </h1>
                <img
                    src={theme === 'light' ? darkmodeIcon : lightmodeIcon}
                    style={iconStyles}
                    onClick={() => toggleTheme()} />
            </header>
            {children}
            <StaticImage
                src="../images/parity-logo-square.png"
                alt="Parity logo"
                placeholder="blurred"
                layout="fixed"
                width={24}
                height={24}
            />
        </main>
    )
}