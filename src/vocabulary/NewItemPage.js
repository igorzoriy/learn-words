import React, { Component } from 'react'
import TextField from 'material-ui/lib/text-field'
import RaisedButton from 'material-ui/lib/raised-button'

export default class NewItemPage extends Component {
    render () {
        return (
            <div>
                <TextField hintText="Word" />
                <TextField hintText="Translation" />
                <br />
                <RaisedButton label="Add" primary={ true } />
            </div>
        )
    }
}
