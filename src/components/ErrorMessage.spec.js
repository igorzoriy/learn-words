import expect from 'expect.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import ErrorMessage from './ErrorMessage'

function setup (message) {
    const props = {
        message,
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<ErrorMessage { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('ErrorMessage component', () => {
    it('should render correctly', () => {
        const { output } = setup('error message')

        expect(output.type).to.be('div')
        expect(output.props.className).to.be('alert alert-danger')
        expect(output.props.children).to.be('error message')
    })
})
