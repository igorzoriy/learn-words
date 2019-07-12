import React from "react"
import { createRenderer } from "react-test-renderer/shallow"
import { FormSubmit } from "./FormSubmit"

function setup(title: string) {
    const props = {
        title,
    }

    const renderer = createRenderer()
    renderer.render(<FormSubmit {...props} />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe("FormSubmit component", () => {
    it("should render correctly", () => {
        const { output } = setup("add")
        expect(output.type).toBe("button")
        expect(output.props.className).toBe("btn btn-primary")
        expect(output.props.children).toBe("add")
    })
})
