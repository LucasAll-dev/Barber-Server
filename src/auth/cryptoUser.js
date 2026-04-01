import crypto from 'crypto';


// Gerar o hash da senha usando o salt
export const hashpassword = (password, salt) => {
    //salt =  Math.round((Date.now() * Math.random())) + '';

    let passcripto = crypto.createHash("sha512")
    .update(salt + password, "utf8")
    .digest("hex"); 

    return passcripto;
}