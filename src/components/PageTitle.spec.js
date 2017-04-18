import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import PageTitle from './PageTitle'

function setup (title) {
    const props = {
        title,
    }

    const renderer = new ReactShallowRenderer()
    renderer.render(<PageTitle { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('PageTitle component', () => {
    it('should render correctly', () => {
        const { output } = setup('page title')

        expect(output.type).toBe('h1')
        expect(output.props.children).toBe('page title')
    })
})
