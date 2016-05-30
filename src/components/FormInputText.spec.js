import expect from 'expect.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import FormInputText from './FormInputText'

function setup (placeholder) {
    const props = {
        placeholder,
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<FormInputText { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('FormInputText component', () => {
    it('should render correctly', () => {
        const { output } = setup('pholder')

        expect(output.type).to.be('input')
        expect(output.props.type).to.be('text')
        expect(output.props.className).to.be('form-control')
        expect(output.props.placeholder).to.be('pholder')
    })
})
