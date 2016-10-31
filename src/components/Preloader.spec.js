import React from 'react'
import TestUtils from 'react-addons-test-utils'
import Preloader from './Preloader'

function setup () {
    const renderer = TestUtils.createRenderer()
    renderer.render(<Preloader />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('Preloader component', () => {
    it('should render correctly', () => {
        const { output } = setup()
        const svg = output.props.children

        expect(output.type).toBe('div')
        expect(output.props.className).toBe('preloader')

        expect(svg.type).toBe('svg')
        expect(svg.props.className).toBe('preloader-image')
    })
})
