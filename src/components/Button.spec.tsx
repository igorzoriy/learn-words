import React from "react"
import { createRenderer } from "react-test-renderer/shallow"
import { Button, IProps } from "./Button"

function setup(props: IProps) {
    const renderer = createRenderer()
    renderer.render(<Button {...props} />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe("Button component", () => {
    it("should render correctly", () => {
        const { output } = setup({
            onClick: () => {},
            children: "some button",
        })

        expect(output.type).toBe("button")
        expect(output.props.className).toBe("btn btn-info")
        expect(output.props.children).toBe("some button")
    })
})
