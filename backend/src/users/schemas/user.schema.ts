import { Document } from "mongoose";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type UserDocument = User & Document;

@Schema()
export class User{
    @Prop()
    _id: string;

    @Prop()
    email: string;

    @Prop()
    password: string;

    @Prop()
    nickname: string;

    @Prop()
    region: string;
}

export const UserSchema = SchemaFactory.createForClass(User);