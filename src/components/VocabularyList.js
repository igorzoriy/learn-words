import React, { PropTypes } from 'react'
import Component from './Component'
import VocabularyItem from './VocabularyItem'
import EmptyList from './EmptyList'

export default class VocabularyList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        handleRemove: PropTypes.func.isRequired,
    }

    renderList () {
        const { items, handleRemove } = this.props
        return (
            <ul className="list-group">
                { items.map((item) => {
                    return (
                        <VocabularyItem
                            { ...item }
                            handleRemove={ handleRemove }
                            key={ item.id } />
                    )
                }) }
            </ul>
        )
    }

    render () {
        return this.props.items.length ? this.renderList() : <EmptyList />
    }
}
