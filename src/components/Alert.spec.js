import expect from 'expect.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Alert from './Alert'

function setup (message, type) {
    const props = {
        message,
        type,
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<Alert { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('Alert component', () => {
    it('should render correctly', () => {
        const { output } = setup('message', 'info')

        expect(output.type).to.be('div')
        expect(output.props.className).to.be('alert alert-info')
        expect(output.props.children).to.be('message')
    })
})