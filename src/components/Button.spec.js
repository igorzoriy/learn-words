import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Button from './Button'

function setup (props) {
    let renderer = TestUtils.createRenderer()
    renderer.render(<Button { ...props } />)
    let output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('Button component', () => {
    it('should render correctly', () => {
        const { output } = setup({
            onClick: () => {},
            children: 'some button',
        })

        expect(output.type).toBe('button')
        expect(output.props.className).toBe('btn btn-info')
        expect(output.props.children).toBe('some button')
    })
})
