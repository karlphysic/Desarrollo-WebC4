import {
  Count,
  CountSchema,
  Filter,
  repository,
  Where,
} from '@loopback/repository';
import {
  del,
  get,
  getModelSchemaRef,
  getWhereSchemaFor,
  param,
  patch,
  post,
  requestBody,
} from '@loopback/rest';
import {
  Estadio,
  Torneo,
} from '../models';
import {EstadioRepository} from '../repositories';

export class EstadioTorneoController {
  constructor(
    @repository(EstadioRepository) protected estadioRepository: EstadioRepository,
  ) { }

  @get('/estadios/{id}/torneo', {
    responses: {
      '200': {
        description: 'Estadio has one Torneo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Torneo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Torneo>,
  ): Promise<Torneo> {
    return this.estadioRepository.torneo(id).get(filter);
  }

  @post('/estadios/{id}/torneo', {
    responses: {
      '200': {
        description: 'Estadio model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torneo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Estadio.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {
            title: 'NewTorneoInEstadio',
            exclude: ['id'],
            optional: ['estadioId']
          }),
        },
      },
    }) torneo: Omit<Torneo, 'id'>,
  ): Promise<Torneo> {
    return this.estadioRepository.torneo(id).create(torneo);
  }

  @patch('/estadios/{id}/torneo', {
    responses: {
      '200': {
        description: 'Estadio.Torneo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {partial: true}),
        },
      },
    })
    torneo: Partial<Torneo>,
    @param.query.object('where', getWhereSchemaFor(Torneo)) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.estadioRepository.torneo(id).patch(torneo, where);
  }

  @del('/estadios/{id}/torneo', {
    responses: {
      '200': {
        description: 'Estadio.Torneo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torneo)) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.estadioRepository.torneo(id).delete(where);
  }
}
