import expect from 'expect.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import VocabularyItem from './VocabularyItem'

function setup () {
    const props = {
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
        const [phrase, translation] = output.props.children

        expect(output.type).to.be('li')
        expect(output.props.className).to.be('list-group-item')

        expect(phrase.props.className).to.be('list-item-phrase')
        expect(phrase.props.children).to.be('get')

        expect(translation.props.className).to.be('list-item-translation')
        expect(translation.props.children).to.be('get trans')
    })
})
