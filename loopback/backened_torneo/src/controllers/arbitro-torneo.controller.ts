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
  Arbitro,
  Torneo,
} from '../models';
import {ArbitroRepository} from '../repositories';

export class ArbitroTorneoController {
  constructor(
    @repository(ArbitroRepository) protected arbitroRepository: ArbitroRepository,
  ) { }

  @get('/arbitros/{id}/torneos', {
    responses: {
      '200': {
        description: 'Array of Arbitro has many Torneo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Torneo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Torneo>,
  ): Promise<Torneo[]> {
    return this.arbitroRepository.torneos(id).find(filter);
  }

  @post('/arbitros/{id}/torneos', {
    responses: {
      '200': {
        description: 'Arbitro model instance',
        content: {'application/json': {schema: getModelSchemaRef(Torneo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Arbitro.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {
            title: 'NewTorneoInArbitro',
            exclude: ['id'],
            optional: ['arbitroId']
          }),
        },
      },
    }) torneo: Omit<Torneo, 'id'>,
  ): Promise<Torneo> {
    return this.arbitroRepository.torneos(id).create(torneo);
  }

  @patch('/arbitros/{id}/torneos', {
    responses: {
      '200': {
        description: 'Arbitro.Torneo PATCH success count',
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
    return this.arbitroRepository.torneos(id).patch(torneo, where);
  }

  @del('/arbitros/{id}/torneos', {
    responses: {
      '200': {
        description: 'Arbitro.Torneo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Torneo)) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.arbitroRepository.torneos(id).delete(where);
  }
}
