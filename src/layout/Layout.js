import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Route, Switch, Redirect, withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import Preloader from '../components/Preloader'
import PrivateRoute from './PrivateRoute'
import NotFoundPage from './NotFoundPage'
import LoginPage from '../account/LoginPage'
import ListVocabularyItemsPage from '../vocabulary/ListPage'
import AddVocabularyItemPage from '../vocabulary/AddItemPage'
import EditVocabularyItemPage from '../vocabulary/EditItemPage'
import FlashcardsPage from '../flashcards/FlashcardsPage'
import PhraseTranslationExercisePage from '../exercises/PhraseTranslationPage'
import { logout } from '../account/actions'

export class Layout extends Component {
    static propTypes = {
        history: PropTypes.object.isRequired,
        dispatch: PropTypes.func.isRequired,
        isLoading: PropTypes.bool.isRequired,
        isAnonymous: PropTypes.bool.isRequired,
    }

    constructor (props) {
        super(props)
        this.state = {
            sidebarOpen: false,
        }
    }

    handleToggle = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
        })
    }

    handleMenuItemClick = () => {
        this.setState({
            sidebarOpen: false,
        })
    }

    handleLogoutClick = (e) => {
        e.preventDefault()
        this.handleMenuItemClick()
        this.props.dispatch(logout())
    }

    renderMenu (isAnonymous) {
        let content = []
        if (!isAnonymous) {
            content.push(
                <li className="navbar-nav-item" key="list">
                    <Link className="nav-link" to="/vocabulary/list" onClick={this.handleMenuItemClick}>
                        Vocabulary list
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="add">
                    <Link className="nav-link" to="/vocabulary/add" onClick={this.handleMenuItemClick}>
                        Add new item
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="flashcards">
                    <Link className="nav-link" to="/flashcards" onClick={this.handleMenuItemClick}>
                        Flashcards
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="exercise1">
                    <Link className="nav-link" to="/exercises/phrase-translation" onClick={this.handleMenuItemClick}>
                        Phrase-Translation Exercise
                    </Link>
                </li>,
                <li className="navbar-nav-item" key="logout">
                    <button type="button" className="navbar-nav-item-button" onClick={this.handleLogoutClick}>
                        Logout
                    </button>
                </li>
            )
        } else {
            content.push(
                <li className="navbar-nav-item" key="login">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>
            )
        }

        return (
            <ul className="nav navbar-nav">
                {content}
            </ul>
        )
    }

    renderContent (isAnonymous) {
        return (
            <main className="container-fluid">
                <Switch>
                    <Redirect exact from="/" to="/vocabulary/list" />
                    <Route path="/login" component={LoginPage} />
                    <PrivateRoute
                        path="/vocabulary/list"
                        component={ListVocabularyItemsPage}
                        isLoggedIn={!isAnonymous}
                    />
                    <PrivateRoute
                        path="/vocabulary/add"
                        component={AddVocabularyItemPage}
                        isLoggedIn={!isAnonymous}
                    />
                    <PrivateRoute
                        path="/vocabulary/edit/:id"
                        component={EditVocabularyItemPage}
                        isLoggedIn={!isAnonymous}
                    />
                    <PrivateRoute
                        path="/flashcards"
                        component={FlashcardsPage}
                        isLoggedIn={!isAnonymous}
                    />
                    <PrivateRoute
                        path="/exercises/phrase-translation"
                        component={PhraseTranslationExercisePage}
                        isLoggedIn={!isAnonymous}
                    />
                    <Route path="*" component={NotFoundPage} />
                </Switch>
            </main>
        )
    }

    render () {
        const { isLoading, isAnonymous } = this.props
        const { sidebarOpen } = this.state

        if (isLoading) {
            return <Preloader />
        }

        return (
            <div>
                <nav className="navbar navbar-dark bg-dark">
                    <button
                        type="button"
                        className="navbar-toggler"
                        onClick={this.handleToggle}
                    >
                        <svg className="icon-menu">
                            <use xlinkHref="#icon-menu" />
                        </svg>
                    </button>
                    <Link to="/" className="navbar-brand" onClick={this.handleMenuItemClick}>
                        Learn Words
                    </Link>
                    { sidebarOpen ? this.renderMenu(isAnonymous) : null }
                </nav>
                {this.renderContent(isAnonymous)}
            </div>
        )
    }
}

function mapStateToProps (state) {
    return {
        isLoading: state.account.isLoading,
        isAnonymous: state.account.isAnonymous,
    }
}

export default withRouter(connect(mapStateToProps)(Layout))
