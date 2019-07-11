import React from "react"
import { createRenderer } from "react-test-renderer/shallow"
import { Alert } from "./Alert"
import EmptyList from "./EmptyList"

function setup() {
    const renderer = createRenderer()
    renderer.render(<EmptyList />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe("EmptyList component", () => {
    it("should render correctly", () => {
        const { output } = setup()

        expect(output.type).toBe(Alert)
        expect(output.props.message).toBe("Your list of phrases is empty.")
    })
})
