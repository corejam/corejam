import { lorem } from "faker";
import { updateDates } from "@corejam/base";
import { BlogArticle } from "../../../../shared/types/Blog"

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
