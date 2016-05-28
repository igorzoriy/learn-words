import expect from 'expect.js'
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

        expect(output.type).to.be('div')
        expect(output.props.className).to.be('preloader')

        expect(svg.type).to.be('svg')
        expect(svg.props.className).to.be('preloader-image')
    })
})
