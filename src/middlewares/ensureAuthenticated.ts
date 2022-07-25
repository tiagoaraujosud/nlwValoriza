import { Request, Response, NextFunction } from "express";
import { verify } from "jsonwebtoken";

interface IPayload {
    sub: string;
}


export function ensureAuthenticated(request: Request, response: Response, next: NextFunction){
    
    // Get Token
    const authToken = request.headers.authorization;
    
    // Token Validate
    if(!authToken){
        return response.status(401).end();
    }
    
    // Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InRpYWdvQGdtYWlsLmNvbSIsImlhdCI6MTY1ODUwMzM0OSwiZXhwIjoxNjU4NTg5NzQ5LCJzdWIiOiJiZjY2Njg4Ni03ZTAwLTRjZDUtYWUzMi1jMjYzOGRiNDA3MzUifQ.VmVAiux-GEfZJPYA06WQvDUIXxxlQaJMbovTw4NNMT4
    const [, token] = authToken.split(" ")

    try {
        const { sub } = verify(token, "c8e4765517ac1d21276c37cce7d94b3d") as IPayload;

        // Get user information
        request.user_id = sub;
        return next();
    } catch (err) {
        return response.status(401).end();
    }


    console.log(authToken);
    

    


     
}