import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import Alert from './Alert'

function setup (message, type) {
    const props = {
        message,
        type,
    }

    const renderer = new ReactShallowRenderer()
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

        expect(output.type).toBe('div')
        expect(output.props.className).toBe('alert alert-info')
        expect(output.props.children).toBe('message')
    })
})
