import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ unique: [true, "Duplicate Email Entered"] })
  email: string;

  @Prop()
  password: string;

  @Prop()
  role: string;

  @Prop()
  status: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
