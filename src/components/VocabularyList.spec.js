import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import VocabularyList from './VocabularyList'

function setup (items) {
    const props = {
        items,
        handleRemove: () => {},
    }

    const renderer = new ReactShallowRenderer()
    renderer.render(<VocabularyList { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer,
    }
}

describe('VocabularyList component', () => {
    it('should render empty list correctly', () => {
        const { output } = setup([])
        expect(output.type.name).toBe('EmptyList')
    })

    it('should render list correctly', () => {
        const { output } = setup([
            {
                id: 'id1',
                phrase: 'phrase1',
                translation: 'translation1',
            },
        ])
        const [item1] = output.props.children

        expect(output.type).toBe('ul')
        expect(output.props.className).toBe('list-group')
        expect(item1.type.displayName).toBe('VocabularyItem')
    })
})
