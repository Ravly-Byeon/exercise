export namespace CHAT{
    export interface IChatting{
        _id: string;
        _id_chat: string;
        _id_user: string;
        message: string;
        createAt: Date;
    }
}