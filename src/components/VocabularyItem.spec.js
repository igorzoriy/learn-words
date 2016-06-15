import expect from 'expect.js'
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

        expect(output.type).to.be('li')
        expect(output.props.className).to.be('list-group-item')

        expect(phrase.props.className).to.be('list-item-phrase')
        expect(phrase.props.children).to.be('get')

        expect(translation.props.className).to.be('list-item-translation')
        expect(translation.props.children).to.be('get trans')

        expect(edit.type.displayName).to.be('Link')
        expect(edit.props.to).to.be('/vocabulary/edit/id')
        expect(edit.props.className).to.be('list-item-control')

        expect(remove.type).to.be('button')
        expect(remove.props.className).to.be('list-item-control')
        expect(remove.props.onClick).to.be.a('function')
    })
})
