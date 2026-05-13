import sqlite3 from 'sqlite3';
import { open } from 'sqlite';
//import path from  'path';

//const dbPath = path.resolve('data', 'database.sqlite');

// Conexão com o banco
export async function connectDB() {
  return open({
    filename: '/home/alldev/programacao/projetos-estudos/Barber/src/data/database.sqlite',
    driver: sqlite3.Database
  })
}

// Criar tabelas apenas se não existirem
export async function createUserTable() {

  const db = await connectDB();
    //Usuarios
    await db.exec(`CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY NOT NULL,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        salt DOUBLE);`
    );

    await db.exec(`CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
        id_user INTEGER NOT NULL,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        data DATETIME NOT NULL,
        price REAL NOT NULL,
        FOREIGN KEY(id_user) REFERENCES users(id));`
    );

    console.log("Tabelas criadas/verificadas com sucesso!");
}