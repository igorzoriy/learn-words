import React, { FunctionComponent, MouseEventHandler } from "react"
import { Link } from "react-router-dom"

interface IProps {
    isAnonymous: boolean
    onMenuItemClick: MouseEventHandler
    onLogoutClick: MouseEventHandler
}

export const Menu: FunctionComponent<IProps> = ({ isAnonymous, onMenuItemClick, onLogoutClick }) => {
    if (isAnonymous) {
        return (
            <ul className="nav navbar-nav">
                <li className="navbar-nav-item" key="login">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            </ul>
        )
    }

    return (
        <ul className="nav navbar-nav">
            <li className="navbar-nav-item" key="list">
                <Link className="nav-link" to="/vocabulary/list" onClick={onMenuItemClick}>
                    Vocabulary list
                </Link>
            </li>
            <li className="navbar-nav-item" key="add">
                <Link className="nav-link" to="/vocabulary/add" onClick={onMenuItemClick}>
                    Add new item
                </Link>
            </li>
            <li className="navbar-nav-item" key="flashcards">
                <Link className="nav-link" to="/flashcards" onClick={onMenuItemClick}>
                    Flashcards
                </Link>
            </li>
            <li className="navbar-nav-item" key="exercise1">
                <Link className="nav-link" to="/exercises/phrase-translation" onClick={onMenuItemClick}>
                    Phrase-Translation Exercise
                </Link>
            </li>
            <li className="navbar-nav-item" key="logout">
                <button type="button" className="navbar-nav-item-button" onClick={onLogoutClick}>
                    Logout
                </button>
            </li>
        </ul>
    )
}
