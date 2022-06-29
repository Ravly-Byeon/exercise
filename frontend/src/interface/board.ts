export namespace BOARD{
    export interface IFile{
        filename: string;
        savedPath: string;
        size: number;
    }

    export interface IBoard{
        _id: string;
        _id_user: string;
        _id_buyer: string;
        category: string;
        title: string;
        price: number;
        content: string;
        likeList: ILike[];
        chatList: IChat[];
        fileList: IFile[];
        isSold: boolean;
        isUse: boolean;
        createAt: Date;
        updateAt: Date;
    }

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
        chattings: IChatting[]
        createDt: Date;
    }

    export interface IChatting{
        _id: string;
        _id_chat: string;
        _id_user: string;
        message: string;
        createAt: Date;
    }
}