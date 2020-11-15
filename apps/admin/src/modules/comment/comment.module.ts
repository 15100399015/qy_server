import { CommentController } from "./comment.controller";
import { Module } from "@nestjs/common";

@Module({
  imports: [],
  controllers: [CommentController],
  providers: [],
})
export class CommentModule {}
