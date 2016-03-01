import React, { Component } from 'react'
import { AppBar, LeftNav, Menu, MenuItem } from 'material-ui'
import { Link } from 'react-router'

const SIDEBAR_WIDTH = 250

export default class App extends Component {
    state = {
        open: false,
    }

    handleToggle = () => {
        this.setState({
            open: !this.state.open,
        })
    }

    render () {
        return (
            <div>
                <LeftNav width={ SIDEBAR_WIDTH } open={ this.state.open } openRight={ true }>
                    <Menu>
                        <MenuItem>
                            <Link to="vocabulary/new">
                                Add new word
                            </Link>
                        </MenuItem>
                        <MenuItem>
                            <Link to="vocabulary">
                                Vocabulary list
                            </Link>
                        </MenuItem>
                    </Menu>
                </LeftNav>
                <AppBar
                    title="Learn Words"
                    onLeftIconButtonTouchTap={ this.handleToggle } />
                <main className="content">
                    { this.props.children }
                </main>
            </div>
        )
    }
}
