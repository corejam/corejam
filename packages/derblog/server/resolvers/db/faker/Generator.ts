import { lorem } from "faker";
import { updateDates } from "@corejam/base";
import { BlogArticle } from "../../../../shared/types/Blog"

const images = [
    "https://images.unsplash.com/photo-1610050152335-4133c2c7d500?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
]

export function generateBlogArticle({
    title = lorem.words(),
    description = lorem.sentence(),
    content = lorem.paragraphs(5),
} = {}): BlogArticle {
    return {
        title: title,
        description: description,
        content: content,
        ...updateDates(),
    };
}
