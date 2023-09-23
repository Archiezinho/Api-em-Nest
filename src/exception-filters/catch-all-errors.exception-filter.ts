import { ArgumentsHost, Catch, ExceptionFilter } from "@nestjs/common";

@Catch(Error)
export class CatchAllErrors implements ExceptionFilter{
    catch(exception: any, host: ArgumentsHost){
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        let statusCode = !exception.response ? 500 : exception.response.statusCode;
        let message = !exception.response ? 'Internal Error' : exception.response.message;

        switch(exception.message){
            case 'UNF':
                statusCode = 404;
                message = 'User not found';
            break;
            case 'UAE':
                statusCode = 400;
                message = 'User already exists';
            break;
            case 'USI':
                statusCode = 400;
                message = 'User or Password Invalid';
            break;
            case 'TI':
                statusCode = 404;
                message = 'Token Invalid';
            break;
        }


        return response.status(statusCode).json({
            statusCode: statusCode,
            message: message
        });
    }
}