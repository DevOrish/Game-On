import React from 'react'
import { Link } from 'react-router-dom'

export function NavBar() {
    return (
        <nav>
            <div className="logo">
                <h1>Mr. <span>₿</span></h1>
            </div>
            <div>
                <Link to="/home">Home</Link>
                <Link to="/contact">Contacts</Link>
                <Link to="/statistics">Statistics</Link>
            </div>
        </nav>
    )
}