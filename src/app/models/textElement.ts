export interface TextElement {
    _id: string | undefined
    text: string
    x: number
    y: number
    color: string
    size: number
    bold: boolean
    createdAt: Date | undefined
    updatedAt: Date | undefined
}