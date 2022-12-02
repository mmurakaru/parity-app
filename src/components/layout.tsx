import { StaticImage } from "gatsby-plugin-image"
import React, { useContext } from "react"
import darkmodeIcon from "../assets/darkmode-icon.svg"
import lightmodeIcon from "../assets/lightmode-icon.svg"
import { ThemeContext } from "../context/ThemeContext"
import { Link } from "gatsby"

const pageStyles = {
    padding: '50px 80px 200px',
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
    textDecoration: 'none'
}
const iconStyles = { cursor: 'pointer' }
const logoStyles = { marginTop: 64 }

type Props = {
    children: JSX.Element
}

export default function Layout({ children }: Props) {
    const { theme, toggleTheme } = useContext(ThemeContext)
    return (
        <main style={{ ...pageStyles, backgroundColor: theme === 'light' ? "#FFFFFF" : "#CDCECD" }}>
            <header style={headerStyles}>
                <Link
                    to='/'
                    style={headingStyles}
                >
                    <h1 style={{ color: theme === 'light' ? "#232129" : "#FFFFFF" }}>
                        Parity blog
                    </h1>
                </Link>
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
                style={logoStyles}
            />
        </main>
    )
}