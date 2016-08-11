import expect from 'expect.js'
import React from 'react'
import { createRenderer } from 'react-addons-test-utils'
import VocabularyList from './VocabularyList'

function setup (items) {
    const props = {
        items,
        handleRemove: () => {},
    }

    const renderer = createRenderer()
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

        expect(output.type.displayName).to.be('EmptyList')
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

        expect(output.type).to.be('ul')
        expect(output.props.className).to.be('list-group')
        expect(item1.type.displayName).to.be('VocabularyItem')
    })
})
