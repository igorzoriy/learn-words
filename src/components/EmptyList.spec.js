import React from 'react'
import TestUtils from 'react-addons-test-utils'
import EmptyList from './EmptyList'

function setup () {
    const renderer = TestUtils.createRenderer()
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
