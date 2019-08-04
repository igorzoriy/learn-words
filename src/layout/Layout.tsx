import React, { FunctionComponent, MouseEvent, StrictMode, useState } from "react"
import { connect } from "react-redux"
import { Redirect, Route, RouteComponentProps, Switch, withRouter } from "react-router"
import { Link } from "react-router-dom"
import { Dispatch, Store } from "redux"
import { logout } from "../account/actions"
import { LoginPageContainer as LoginPage } from "../account/LoginPage"
import { Preloader } from "../components/Preloader"
import {
    PhraseTranslationPageContainer as PhraseTranslationExercisePage,
} from "../exercises/PhraseTranslationPage.container"
import { FlashcardsPageContainer as FlashcardsPage } from "../flashcards/FlashcardsPage"
import { IStoreState } from "../types"
import { AddItemPageContainer as AddVocabularyItemPage } from "../vocabulary/AddItemPage"
import { EditItemPageContainer as EditVocabularyItemPage } from "../vocabulary/EditItemPage"
import { ListPageContainer as ListVocabularyItemsPage } from "../vocabulary/ListPage"
import { Menu } from "./Menu"
import { NotFoundPage } from "./NotFoundPage"
import { PrivateRoute } from "./PrivateRoute"

interface IProps extends RouteComponentProps {
    logout: () => void
    store: Store
    isLoading: boolean
    isAnonymous: boolean
}

export const Layout: FunctionComponent<IProps> = ({ logout: wrappedLogout, isAnonymous, isLoading }: IProps) => {
    const [isSidebarOpened, setIsSidebarOpened] = useState(false)
    const handleMenuItemClick = () => setIsSidebarOpened(false)
    const handleToggle = () => setIsSidebarOpened(!isSidebarOpened)
    const handleLogoutClick = (e: MouseEvent) => {
        e.preventDefault()
        setIsSidebarOpened(false)
        wrappedLogout()
    }

    const pagesSwitcher = (
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
    )

    return (
        <StrictMode>
            <nav className="navbar navbar-dark bg-dark">
                <button
                    type="button"
                    className="navbar-toggler"
                    onClick={handleToggle}
                >
                    <svg className="icon-menu">
                        <use xlinkHref="#icon-menu" />
                    </svg>
                </button>
                <Link to="/" className="navbar-brand" onClick={handleMenuItemClick}>
                    Learn Words
                    </Link>
                {isSidebarOpened && <Menu
                    isAnonymous={isAnonymous}
                    onMenuItemClick={handleMenuItemClick}
                    onLogoutClick={handleLogoutClick}
                />}
            </nav>
            <main className="container-fluid">
                {isLoading ? <Preloader /> : pagesSwitcher}
            </main>
        </StrictMode>
    )
}

const mapStateToProps = (state: IStoreState) => ({
    isLoading: state.account.isLoading,
    isAnonymous: state.account.isAnonymous,
})

const mapDispatchToProps = (dispatch: Dispatch) => ({
    logout: () => dispatch(logout()),
})

export const LayoutContainer = withRouter(connect(mapStateToProps, mapDispatchToProps)(Layout))
