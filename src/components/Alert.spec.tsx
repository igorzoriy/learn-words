import React from "react"
import { createRenderer } from "react-test-renderer/shallow"
import { Alert, IProps } from "./Alert"

function setup(props: IProps) {
    const renderer = createRenderer()
    renderer.render(<Alert {...props} />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe("Alert component", () => {
    it("should render correctly with default params", () => {
        const { output } = setup({
            message: "message",
        })
        expect(output.type).toBe("div")
        expect(output.props.className).toBe("alert alert-info")
        expect(output.props.children).toBe("message")
    })
})
