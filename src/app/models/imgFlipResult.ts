import { ImgFlipMeme } from "./imgFlipMeme";

export interface ImgFlipResult {
    success: boolean;
    data: {
        memes: ImgFlipMeme[]
    }
}