import {
  Count,
  CountSchema,
  Filter,
  FilterExcludingWhere,
  repository,
  Where,
} from '@loopback/repository';
import {
  post,
  param,
  get,
  getModelSchemaRef,
  patch,
  put,
  del,
  requestBody,
  response,
} from '@loopback/rest';
import {Torneo} from '../models';
import {TorneoRepository} from '../repositories';

export class TorneoController {
  constructor(
    @repository(TorneoRepository)
    public torneoRepository : TorneoRepository,
  ) {}

  @post('/torneos')
  @response(200, {
    description: 'Torneo model instance',
    content: {'application/json': {schema: getModelSchemaRef(Torneo)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {
            title: 'NewTorneo',
            exclude: ['id'],
          }),
        },
      },
    })
    torneo: Omit<Torneo, 'id'>,
  ): Promise<Torneo> {
    return this.torneoRepository.create(torneo);
  }

  @get('/torneos/count')
  @response(200, {
    description: 'Torneo model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Torneo) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.torneoRepository.count(where);
  }

  @get('/torneos')
  @response(200, {
    description: 'Array of Torneo model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Torneo, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Torneo) filter?: Filter<Torneo>,
  ): Promise<Torneo[]> {
    return this.torneoRepository.find(filter);
  }

  @patch('/torneos')
  @response(200, {
    description: 'Torneo PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {partial: true}),
        },
      },
    })
    torneo: Torneo,
    @param.where(Torneo) where?: Where<Torneo>,
  ): Promise<Count> {
    return this.torneoRepository.updateAll(torneo, where);
  }

  @get('/torneos/{id}')
  @response(200, {
    description: 'Torneo model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Torneo, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Torneo, {exclude: 'where'}) filter?: FilterExcludingWhere<Torneo>
  ): Promise<Torneo> {
    return this.torneoRepository.findById(id, filter);
  }

  @patch('/torneos/{id}')
  @response(204, {
    description: 'Torneo PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Torneo, {partial: true}),
        },
      },
    })
    torneo: Torneo,
  ): Promise<void> {
    await this.torneoRepository.updateById(id, torneo);
  }

  @put('/torneos/{id}')
  @response(204, {
    description: 'Torneo PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() torneo: Torneo,
  ): Promise<void> {
    await this.torneoRepository.replaceById(id, torneo);
  }

  @del('/torneos/{id}')
  @response(204, {
    description: 'Torneo DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.torneoRepository.deleteById(id);
  }
}
