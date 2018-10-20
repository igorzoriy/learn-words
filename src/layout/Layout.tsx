import * as React from "react"
import { connect } from "react-redux"
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router"
import { Link } from "react-router-dom"
import { Dispatch, Store } from "redux"
import { logout } from "../account/actions"
import LoginPage from "../account/LoginPage"
import Preloader from "../components/Preloader"
import PhraseTranslationExercisePage from "../exercises/PhraseTranslationPage"
import FlashcardsPage from "../flashcards/FlashcardsPage"
import { IStoreState } from "../types"
import AddVocabularyItemPage from "../vocabulary/AddItemPage"
import EditVocabularyItemPage from "../vocabulary/EditItemPage"
import ListVocabularyItemsPage from "../vocabulary/ListPage"
import NotFoundPage from "./NotFoundPage"
import PrivateRoute from "./PrivateRoute"

interface IProps extends RouteComponentProps {
    store: Store,
    dispatch: Dispatch,
    isLoading: boolean,
    isAnonymous: boolean,
}

interface IState {
    sidebarOpen: boolean,
}

export class Layout extends React.PureComponent<IProps, IState> {
    constructor(props: IProps) {
        super(props)
        this.state = {
            sidebarOpen: false,
        }
    }

    private handleToggle = () => {
        this.setState({
            sidebarOpen: !this.state.sidebarOpen,
        })
    }

    private handleMenuItemClick = () => {
        this.setState({
            sidebarOpen: false,
        })
    }

    private handleLogoutClick = (e: React.MouseEvent) => {
        e.preventDefault()
        this.handleMenuItemClick()
        this.props.dispatch(logout())
    }

    private renderMenu(isAnonymous: boolean) {
        const content = []
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
                </li>,
            )
        } else {
            content.push(
                <li className="navbar-nav-item" key="login">
                    <Link className="nav-link" to="/login">
                        Login
                    </Link>
                </li>,
            )
        }

        return (
            <ul className="nav navbar-nav">
                {content}
            </ul>
        )
    }

    private renderContent(isAnonymous: boolean) {
        return (
            <main className="container-fluid">
                <Switch>
                    <Redirect exact={true} from="/" to="/vocabulary/list" />
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

    public render() {
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
                    {sidebarOpen ? this.renderMenu(isAnonymous) : null}
                </nav>
                {this.renderContent(isAnonymous)}
            </div>
        )
    }
}

function mapStateToProps(state: IStoreState) {
    return {
        isLoading: state.account.isLoading,
        isAnonymous: state.account.isAnonymous,
    }
}

export default withRouter(connect(mapStateToProps)(Layout))
