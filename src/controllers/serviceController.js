import * as serviceService from '../services/serviceService.js';

export async function create(req, res) {
    try {
        const { name, description, data, price } = req.body;
        const userId = req.user.id; //vem do middleware de autenticação
        //console.log("USER:", req.user); //ver se o id esta sendo extraido
        const result = await serviceService.createService(name, description, data, price, userId);

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

export async function update(req, res) {
    try {
        const service = req.body;
        const userId = req.use.id;
    } catch {
        
    }
}