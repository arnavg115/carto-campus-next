import "reflect-metadata";
import { Query, Resolver } from "type-graphql";

@Resolver()
export class MainResolver {
  @Query(() => String)
  hello() {
    return "Hello World!";
  }
}
