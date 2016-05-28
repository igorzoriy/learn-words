import React, { Component, PropTypes } from 'react'
import VocabularyItem from './VocabularyItem'

export default class VocabularyList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
    };

    render () {
        return (
            <ul className="list-group">
                { this.props.items.map((item) => <VocabularyItem { ...item } key={ item.id } />) }
            </ul>
        )
    }
}
