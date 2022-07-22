import { getCustomRepository } from "typeorm";

import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";

import { UsersRepositories } from "../repositories/UsersRepositories";


interface IAuthenticateRequest{
    email: string;
    password: string;
}

class AuthenticateUserService{
    async execute({email, password}: IAuthenticateRequest){

        const usersRepositories = getCustomRepository(UsersRepositories);

        //Verify email
        const user = await usersRepositories.findOne({
            email
        });

        if(!user){
            throw new Error("Email/password incorrect")
        }

        //Verify password
        const passwordMatch = await compare(password, user.password);

        if(!passwordMatch){
            throw new Error("Email/password incorrect")
        }

        //Token Generate
        const token = sign(
            {
                email: user.email
            }, 
            "c8e4765517ac1d21276c37cce7d94b3d", 
            {
                subject: user.id,
                expiresIn: "1d"
            }
        );

        return token
    }
}

export { AuthenticateUserService }