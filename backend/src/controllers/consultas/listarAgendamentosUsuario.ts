// AgendamentoController.ts

// 1. Listar médicos para o Select
export async function listarMedicos(req: Request, res: Response) {
    try {
        const medicos = await MedicoModel.findAll({
            attributes: ['id', 'nome', 'especialidade']
        });
        return res.json(medicos);
    } catch (error) {
        return res.status(500).json({ message: "Erro ao listar médicos." });
    }
}

// 2. Buscar agendamentos existentes (para desabilitar horários no front)
export async function listarOcupados(req: Request, res: Response) {
    const { id_medico, data } = req.query;
    try {
        const ocupados = await AgendamentoModel.findAll({
            where: {
                id_medico,
                data,
                status: { [Op.ne]: 'cancelada' }
            },
            attributes: ['hora']
        });
        // Retorna apenas um array de strings ['08:00', '10:30']
        return res.json(ocupados.map(o => o.hora));
    } catch (error) {
        return res.status(500).json({ message: "Erro ao buscar horários." });
    }
}

// 3. Salvar o agendamento (o que você testou no Insomnia)
export async function salvarAgendamento(req: Request, res: Response) {
    const { id_medico, data, hora, observacao } = req.body;
    const id_usuario = (req as any).usuarioLogado.id;

    try {
        const novo = await AgendamentoModel.create({
            id_usuario,
            id_medico,
            data, // Certifique-se que o banco aceite YYYY-MM-DD
            hora,
            observacoes: observacao,
            status: 'agendada'
        });
        return res.status(201).json({ success: true, novo });
    } catch (error) {
        return res.status(500).json({ message: "Erro ao agendar." });
    }
}