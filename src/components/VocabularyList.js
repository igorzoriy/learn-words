import React, { PropTypes } from 'react'
import Component from './Component'
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
