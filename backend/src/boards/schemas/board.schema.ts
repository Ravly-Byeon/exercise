import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";
import {UPLOAD} from "../../interface/upload";

export type BoardDocument = Board & Document

@Schema()
export class Board{
    @Prop()
    _id: string;

    @Prop()
    _id_user: string;

    @Prop()
    _id_buyer: string;

    @Prop()
    category: string;

    @Prop()
    title: string;

    @Prop()
    price: number;

    @Prop()
    content: string;

    @Prop()
    likeList: UPLOAD.ILike[];

    @Prop()
    chatList: UPLOAD.IChat[];

    @Prop()
    fileList: UPLOAD.IFile[];

    @Prop()
    isSold: boolean;

    @Prop()
    isUse: boolean;

    @Prop()
    createAt: Date;

    @Prop()
    updateAt: Date;

}

export const BoardSchema = SchemaFactory.createForClass(Board);