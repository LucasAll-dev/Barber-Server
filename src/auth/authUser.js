//autenticacao de login usando o modulo "crypto" do node para criar um hash da senha do usuario e armazenar no banco de dados sqlite3

import crypto from 'crypto';

/*
db.get(`SELECT passwordhash, salt FROM user WHERE username = ?`, [username], function (err, row) {
    if (err) return console.error(err);*/

export const hashpass = (row, password) => {
        let senha = crypto.createHash("sha512")
        .update(row.salt + password, "utf8")
        .digest("hex");

    if (newhash === row.passwordhash) {
        console.log("Autenticação bem-sucedida!");
    } else {
        console.log("Senha incorreta.");
    }
    db.close(); // Fechar a conexão com o banco de dados
    return senha;
}