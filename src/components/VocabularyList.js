import React, { PropTypes } from 'react'
import Component from './Component'
import VocabularyItem from './VocabularyItem'

export default class VocabularyList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        handleRemove: PropTypes.func.isRequired,
    };

    render () {
        const { handleRemove } = this.props
        return (
            <ul className="list-group">
                { this.props.items.map((item) => {
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
}
