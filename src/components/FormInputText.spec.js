import React from 'react'
import TestUtils from 'react-addons-test-utils'
import FormInputText from './FormInputText'

function setup (placeholder, value) {
    const props = {
        placeholder,
        value,
    }

    const renderer = TestUtils.createRenderer()
    renderer.render(<FormInputText { ...props } />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe('FormInputText component', () => {
    it('should render correctly', () => {
        const { output } = setup('pholder', 'vlue')

        expect(output.type).toBe('input')
        expect(output.props.type).toBe('text')
        expect(output.props.className).toBe('form-control')
        expect(output.props.placeholder).toBe('pholder')
        expect(output.props.value).toBe('vlue')
    })
})
