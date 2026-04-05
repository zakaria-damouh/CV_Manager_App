import prisma from "../config/db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


export const registerService = async (firstName, lastName, email, password) => {
    // check if this user data already in use 
    const existingUser = await prisma.user.findUnique({
        where: { email }
    }) 

    if(existingUser){
        throw new Error('Email already in use')
    }

    // hash user password 
    const hashedPassword = await bcrypt.hash(password , 10)

    // create new user in User table 
    const user = await prisma.user.create({
        data:{
            firstName,
            lastName,
            email,
            password : hashedPassword
        }
    })

    // return the created user without his password 
    const {password : _ , ...userWithoutPassword} = user;
    return userWithoutPassword;
}

export const loginService = async (email, password) => {
    const user = await prisma.user.findUnique({
        where: { email }
    });

    if (!user) {
        throw new Error('User not found');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        throw new Error('Invalid password');
    }

    // create JsonWebTokens  
    const token = jwt.sign(
        { userId: user.id, email: user.email },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
    )

    return {token}
};


export const updateAccountService = async (userId, firstName, lastName) => {
    const existingUser = await prisma.user.findUnique({
        where: { id: userId }
    });

    if (!existingUser) {
        throw new Error('User not found');
    }

    const user = await prisma.user.update({
        where: { id: userId },
        data: { firstName, lastName },
    });

    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
};



export const deleteAccountService = async (userId) => {
    const existingUser = await prisma.user.findUnique({
        where: { id: userId }
    });
    if (!existingUser) {
        throw new Error('User not found');
    }
    await prisma.user.delete({
        where: { id: userId },
    });
};