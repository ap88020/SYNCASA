import bcrypt from 'bcryptjs'

export const hashPassword = async (password) => {

    const salt = await bcrypt.genSalt(10);    
    const bcryptPassword = await bcrypt.hash(password,salt)

    return bcryptPassword;
}

export const decodePassword = async (enteredPassword,hashPassword) => {
    const isMatch = await bcrypt.compare(enteredPassword,hashPassword)
    return isMatch;
}