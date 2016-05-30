import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    STATUS_INIT,
    STATUS_REQUEST,
    STATUS_SUCCESS,
    STATUS_FAILURE,
} from '../api/constants'
import PageTitle from '../components/PageTitle'
import VocabularyList from '../components/VocabularyList'
import Preloader from '../components/Preloader'
import Alert from '../components/Alert'
import { getVocabularyList } from './actions'

export class ListPage extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
    }

    constructor (props) {
        super(props)

        const { dispatch } = props
        dispatch(getVocabularyList())
    }

    render () {
        const { items, status } = this.props
        const content = []

        switch (status) {
            case STATUS_INIT:
            case STATUS_REQUEST:
                content.push(<Preloader key="preloader" />)
                break
            case STATUS_SUCCESS:
                content.push(<VocabularyList items={ items } key="list" />)
                break
            case STATUS_FAILURE:
                content.push(<Alert key="error" type="warning" message="Failed to load vocabulary list." />)
                break
        }

        return (
            <div>
                <PageTitle title="Vocabulary list" />
                { content }
            </div>
        )
    }
}

function select (state) {
    return {
        status: state.vocabulary.list.status,
        items: state.vocabulary.list.items,
    }
}

export default connect(select)(ListPage)