import { updateDates } from "@corejam/base";
import { generateImage, generateSeo } from "@corejam/base/dist/resolvers/db/faker/Generator";
import { lorem, random } from "faker";
import { BlogArticle } from "../../../../shared/types/Blog";

const images = [
    "https://images.unsplash.com/photo-1610050152335-4133c2c7d500?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1610355054181-c6cf0df09ab8?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80",
    "https://images.unsplash.com/photo-1610241594473-a2de0c177e86?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0MXx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=60",
    "https://images.unsplash.com/photo-1610307629393-cd401645123e?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw0OHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=60",
    "https://images.unsplash.com/photo-1610241599795-60b7c0b255fd?ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw2MHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=60"
]

export function generateBlogArticle({
    title = lorem.words(),
    description = lorem.sentence(),
    content = lorem.paragraphs(5),
    image = generateImage({
        src: images[random.number(images.length - 1)]
    }),
    seo = generateSeo()
} = {}): BlogArticle {
    return {
        title: title,
        description: description,
        content: content,
        coverImage: image,
        seo: seo,
        ...updateDates(),
    };
}
