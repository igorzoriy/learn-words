import React, { PropTypes } from 'react'
import Component from './Component'
import VocabularyItem from './VocabularyItem'
import Alert from './Alert'

export default class VocabularyList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        handleRemove: PropTypes.func.isRequired,
    };

    renderEmpty () {
        return <Alert type="info" message="Your list of phrases is empty." />
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
        return this.props.items.length ? this.renderList() : this.renderEmpty()
    }
}
