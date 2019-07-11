import React from "react"
import { createRenderer } from "react-test-renderer/shallow"
import EmptyList from "../components/EmptyList"
import { ICard } from "../types"
import VocabularyItem from "./VocabularyItem"
import VocabularyList from "./VocabularyList"

function setup(items: ICard[]) {
    const props = {
        items,
        handleRemove: () => {},
    }

    const renderer = createRenderer()
    renderer.render(<VocabularyList {...props} />)
    const output = renderer.getRenderOutput()

    return {
        props,
        output,
        renderer,
    }
}

describe("VocabularyList component", () => {
    it("should render empty list correctly", () => {
        const { output } = setup([])
        expect(output.type).toBe(EmptyList)
    })

    it("should render list correctly", () => {
        const { output } = setup([
            {
                id: "id1",
                phrase: "phrase1",
                translation: "translation1",
            },
        ])
        const [item1] = output.props.children

        expect(output.type).toBe("ul")
        expect(output.props.className).toBe("list-group")
        expect(item1.type).toBe(VocabularyItem)
    })
})
