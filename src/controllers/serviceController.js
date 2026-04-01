import * as serviceService from '../services/serviceService.js';

export async function create(req, res) {
    try {
        const { name, description, date, price } = req.body;
        const userId = req.user.id; //vem do middleware de autenticação
        const result = await serviceService.createService(name, description, date, price, userId);

        res.json(result);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}

// Listar serviços
export async function list(req, res) {
    try {
        const userId = req.user.id;

        const services = await serviceService.getServices(userId);

        res.json(services);

    } catch (error) {
        res.status(400).json({ error: error.message });
    }
}