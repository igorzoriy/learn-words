import expect from 'expect.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import VocabularyList from './VocabularyList'

function setup () {
    const props = {
        items: [],
        handleRemove: () => {},
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<VocabularyList { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer,
    }
}

describe('VocabularyList component', () => {
    it('should render correctly', () => {
        const { output } = setup()

        expect(output.type).to.be('ul')
        expect(output.props.className).to.be('list-group')
        expect(output.props.children).to.eql([])
    })
})
