import React, { PropTypes } from 'react'
import Component from './Component'
import VocabularyItem from './VocabularyItem'

export default class VocabularyList extends Component {
    static propTypes = {
        items: PropTypes.array.isRequired,
        handleEdit: PropTypes.func.isRequired,
        handleRemove: PropTypes.func.isRequired,
    };

    render () {
        const { handleEdit, handleRemove } = this.props
        return (
            <ul className="list-group">
                { this.props.items.map((item) => {
                    return (
                        <VocabularyItem
                            { ...item }
                            handleEdit={ handleEdit }
                            handleRemove={ handleRemove }
                            key={ item.id } />
                    )
                }) }
            </ul>
        )
    }
}
