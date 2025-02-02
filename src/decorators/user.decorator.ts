import { createParamDecorator, ExecutionContext, NotFoundException, ParseIntPipe } from "@nestjs/common";


export const User = createParamDecorator((args: string, context: ExecutionContext) => {
  const request = context.switchToHttp().getRequest()
  const userData = request.userData

  if(!userData) throw new NotFoundException("Usuario nao encontrado")
  if(args) return userData[args]


  return userData
})      