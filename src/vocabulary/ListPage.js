import React, { Component } from 'react'
import PropTypes from 'prop-types'
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
import { getVocabularyItems, removeVocabularyItem } from './actions'

export class ListPage extends Component {
    static propTypes = {
        status: PropTypes.string.isRequired,
        items: PropTypes.array.isRequired,
    }

    constructor (props) {
        super(props)

        const { dispatch } = props
        dispatch(getVocabularyItems())
    }

    handleRemove = (id) => {
        const { dispatch } = this.props
        dispatch(removeVocabularyItem(id))
    }

    renderList (items) {
        return (
            <VocabularyList
                items={ items }
                handleRemove={ this.handleRemove }
                key="list" />
        )
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
                content.push(this.renderList(items))
                break
            case STATUS_FAILURE:
                content.push(<Alert key="error" type="danger" message="Failed to load vocabulary list." />)
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

function mapStateToProps (state) {
    const { status, ids, hash } = state.vocabulary.entities
    const items = ids.map((id) => ({id, ...hash[id]}))
    return {
        status,
        items,
    }
}

export default connect(mapStateToProps)(ListPage)
