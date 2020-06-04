import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Customer from '../models/Customer';
import Researcher from '../models/Researcher';
import GenerateTokensController from './GenerateTokensController';

class ResearcherController {
  async index(request: Request, response: Response) {
    const researchers = await Researcher.findAll({
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone', 'code'],
        },
      ],
      attributes: [
        'id',
        'name',
        'full_name',
        'email',
        'phone',
        'code',
        'last_updated',
      ],
    });
    return response.status(200).json(researchers);
  }

  async show(request: Request, response: Response) {
    const { id } = request.params;
    const researchers = await Researcher.findOne({
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone', 'code'],
        },
      ],
      where: { id },
      attributes: ['id', 'name', 'full_name', 'email', 'phone', 'code'],
    });
    return response.status(200).json(researchers);
  }

  async store(request: Request, response: Response) {
    const { customer_id, email, phone, code } = request.body;

    if (!!code === false) {
      let error = { error: `You should information field "CODE"!` };
      return response.status(409).json(error);
    }

    if (!!email === false) {
      let error = { error: `You should information field "Email"!` };
      return response.status(409).json(error);
    }

    if (!!phone === false) {
      let error = { error: `You should information field "Phone"` };
      return response.status(409).json(error);
    }

    const isResearcher = await Researcher.findOne({
      where: { [Op.or]: [{ code }, { email }, { phone }] },
      include: [
        {
          model: Customer,
          attributes: ['id', 'name', 'email', 'phone', 'code'],
        },
      ],
      attributes: ['id', 'name', 'email', 'phone', 'code', 'creation'],
    });

    if (!!isResearcher) {
      return response.status(409).json(isResearcher);
    }

    const researcher = await Researcher.create(request.body);
    const token_info = await GenerateTokensController.generateResearcherToken(
      researcher.id
    );
    return response.status(200).json({ researcher, token: token_info });
  }

  async update(request: Request, response: Response) {
    const { id } = request.params;
    return response.status(200).json({ update: true, ...request.body });
  }
}

export default new ResearcherController();
