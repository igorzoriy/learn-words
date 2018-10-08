import * as React from "react"
import { createRenderer } from "react-test-renderer/shallow"
import PageTitle from "./PageTitle"

function setup(title: string) {
    const props = {
        title,
    }

    const renderer = createRenderer()
    renderer.render(<PageTitle {...props} />)
    const output = renderer.getRenderOutput()

    return {
        output,
        renderer,
    }
}

describe("PageTitle component", () => {
    it("should render correctly", () => {
        const { output } = setup("page title")

        expect(output.type).toBe("h1")
        expect(output.props.children).toBe("page title")
    })
})
