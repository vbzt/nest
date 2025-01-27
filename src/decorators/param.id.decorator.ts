import { createParamDecorator, ExecutionContext, ParseIntPipe } from "@nestjs/common";

export const ParamId = createParamDecorator((_data: unknown, context: ExecutionContext) => {
  return Number(context.switchToHttp().getRequest().params.id)
})      