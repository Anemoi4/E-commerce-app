import React from 'react'
import { Link } from 'react-router-dom'
import homeIcon from './../images/home_black_24dp.svg'


export default function NotFound() {
    return (
        <div className="container center error-box">
            <h1 className="error-text h1">404 - No such page found</h1>
            <span className="home-page-redirect">
                <Link to="/">
                    Back to home page
                </Link>
                <div className="icon-wrapper">
                    <img className="icon home-icon filter-dark-gray" src={homeIcon} alt="home icon" />
                </div>
            </span>
        </div>
    )
}
