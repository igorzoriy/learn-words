import React from 'react'
import TestUtils from 'react-addons-test-utils'
import VocabularyItem from './VocabularyItem'

function setup () {
    const props = {
        id: 'id',
        phrase: 'get',
        translation: 'get trans',
        handleRemove: () => {},
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<VocabularyItem { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer,
    }
}

describe('VocabularyItem component', () => {
    it('should render correctly', () => {
        const { output } = setup()
        const [phrase, translation, controls] = output.props.children
        const [edit, remove] = controls.props.children

        expect(output.type).toBe('li')
        expect(output.props.className).toBe('list-group-item')

        expect(phrase.props.className).toBe('list-item-phrase')
        expect(phrase.props.children).toBe('get')

        expect(translation.props.className).toBe('list-item-translation')
        expect(translation.props.children).toBe('get trans')

        expect(edit.type.displayName).toBe('Link')
        expect(edit.props.to).toBe('/vocabulary/edit/id')
        expect(edit.props.className).toBe('list-item-control')

        expect(remove.type).toBe('button')
        expect(remove.props.className).toBe('list-item-control')
        expect(remove.props.onClick).toBeDefined()
    })
})
