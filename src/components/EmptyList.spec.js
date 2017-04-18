import React from 'react'
import ReactShallowRenderer from 'react-test-renderer/shallow'
import EmptyList from './EmptyList'

function setup () {
    const renderer = new ReactShallowRenderer()
    renderer.render(<EmptyList />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('EmptyList component', () => {
    it('should render correctly', () => {
        const { output } = setup()

        expect(output.type.displayName).toBe('Alert')
        expect(output.props.message).toBe('Your list of phrases is empty.')
    })
})
