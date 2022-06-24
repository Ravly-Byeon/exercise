import {CHAT} from "./chat";

export namespace UPLOAD{
    export interface ILike{
        _id: string;
        _id_board: string;
        _id_user: string;
        createDt: Date;
    }

    export interface IChat{
        _id: string;
        _id_board: string;
        _id_user: string;
        chattings: CHAT.IChatting[]
        createDt: Date;
    }

    export interface IFile{
        filename: string;
        savedPath: string;
        size: number;
    }
}