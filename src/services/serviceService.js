import { connectDB } from "../config/db.js";
import { logger } from "../utils/logger.js";

export async function createService(service) {
    const db = await connectDB();

    try {
        await db.run("INSERT INTO services (name, description, data, price, id_user) VALUES (?, ?, ?, ?, ?)",[service.name, service.description, service.date, service.price, service.id_user]);
        logger.info(`Servico ${service.name} criado com sucesso`);
        
    } catch (error) {
        logger.error(`Erro ao criar o servico ${service.name}: ${error.message}`);
        throw new Error("Erro ao criar o servico");
    }
}

export async function getUserServices(userId) {
    const db = await connectDB();

    try {
        const services = await db.all("SELECT * FROM services WHERE id_user = ?", [userId]);
        logger.info(`Servicos do usuario ${userId} buscados com sucesso`);
        
    } catch (error) {
        logger.error(`Erro ao buscar os servicos do usuario ${userId}: ${error.message}`);
        throw new Error("Erro ao buscar os servicos do usuario");
    }
}

export async function updateServices(service) {
    const db = await connectDB();

    try {
        const sercices = await db.run(`UPDATE services SET name = ?, description = ?, data = ?, price = ? WHERE id = ? AND id_user = ?`, [service.name, service.description, service.date, service.price, service.id, service.id_user]);

        //verifica se realmente atualizou 
        if (sercices.changes === 0) {
            logger.warn(`Nenhum servico atualizado para o usuario ${service.id_user.name} com o id ${service.id}`);
            throw new Error("Nenhum servico atualizado");
        }

        logger.info(`Servico: ${service.name} atualizado com sucesso para o usuario: ${service.id_user.name}`);
        
    } catch (error) {
        logger.error(`Erro ao atualizar servico: ${service.name} do usuario: ${service.id_user.name}`)
    }
}