import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { verify, decode } from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
        //pegando o token
        let token = '';
        if(request.query.token){
            token = request.query.token;
        }
        else if(request.body.token){
            token = request.body.token;
        }

        //vendo se ele está vazio
        if(token == ''){
            throw new Error("TI");
        }
        try {
            verify(token, process.env.TOKEN_SECRET)

            const {sub: userId} = decode(token);

            request.body.userId = String(userId);

            delete request.body.token;

            return true;
        }
        catch(err){
            throw new Error("TI");
        }
    
  }
}