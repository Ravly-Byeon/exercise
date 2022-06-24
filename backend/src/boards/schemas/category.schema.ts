import {Document} from "mongoose";
import {Prop, Schema, SchemaFactory} from "@nestjs/mongoose";

export type CategoryDocument = Category & Document;

@Schema()
export class Category{
    @Prop()
    _id: string;

    @Prop()
    name: string;
}

export const CategorySchema = SchemaFactory.createForClass(Category);