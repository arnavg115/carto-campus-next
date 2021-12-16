import { ObjectType, Field, Int } from "type-graphql";
@ObjectType()
export class School {
  @Field()
  _id?: string;

  @Field()
  //   @ts-ignore
  name: string;

  @Field(() => Int)
  //   @ts-ignore
  zip: number;
}
