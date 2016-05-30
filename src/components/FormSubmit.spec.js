import expect from 'expect.js'
import React from 'react'
import TestUtils from 'react-addons-test-utils'
import FormSubmit from './FormSubmit'

function setup (title) {
    const props = {
        title,
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<FormSubmit { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('FormSubmit component', () => {
    it('should render correctly', () => {
        const { output } = setup('add')

        expect(output.type).to.be('button')
        expect(output.props.className).to.be('btn btn-primary')
        expect(output.props.children).to.be('add')
    })
})
