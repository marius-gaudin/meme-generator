import { TextElement } from "./textElement"

export interface Meme {
    _id: string
    image: string
    createdAt: Date
    updatedAt: Date
    texts: TextElement[]
}