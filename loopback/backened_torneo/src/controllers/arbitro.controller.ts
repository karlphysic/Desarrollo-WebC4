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
import {Arbitro} from '../models';
import {ArbitroRepository} from '../repositories';

export class ArbitroController {
  constructor(
    @repository(ArbitroRepository)
    public arbitroRepository : ArbitroRepository,
  ) {}

  @post('/arbitros')
  @response(200, {
    description: 'Arbitro model instance',
    content: {'application/json': {schema: getModelSchemaRef(Arbitro)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Arbitro, {
            title: 'NewArbitro',
            exclude: ['id'],
          }),
        },
      },
    })
    arbitro: Omit<Arbitro, 'id'>,
  ): Promise<Arbitro> {
    return this.arbitroRepository.create(arbitro);
  }

  @get('/arbitros/count')
  @response(200, {
    description: 'Arbitro model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Arbitro) where?: Where<Arbitro>,
  ): Promise<Count> {
    return this.arbitroRepository.count(where);
  }

  @get('/arbitros')
  @response(200, {
    description: 'Array of Arbitro model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Arbitro, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Arbitro) filter?: Filter<Arbitro>,
  ): Promise<Arbitro[]> {
    return this.arbitroRepository.find(filter);
  }

  @patch('/arbitros')
  @response(200, {
    description: 'Arbitro PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Arbitro, {partial: true}),
        },
      },
    })
    arbitro: Arbitro,
    @param.where(Arbitro) where?: Where<Arbitro>,
  ): Promise<Count> {
    return this.arbitroRepository.updateAll(arbitro, where);
  }

  @get('/arbitros/{id}')
  @response(200, {
    description: 'Arbitro model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Arbitro, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Arbitro, {exclude: 'where'}) filter?: FilterExcludingWhere<Arbitro>
  ): Promise<Arbitro> {
    return this.arbitroRepository.findById(id, filter);
  }

  @patch('/arbitros/{id}')
  @response(204, {
    description: 'Arbitro PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Arbitro, {partial: true}),
        },
      },
    })
    arbitro: Arbitro,
  ): Promise<void> {
    await this.arbitroRepository.updateById(id, arbitro);
  }

  @put('/arbitros/{id}')
  @response(204, {
    description: 'Arbitro PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() arbitro: Arbitro,
  ): Promise<void> {
    await this.arbitroRepository.replaceById(id, arbitro);
  }

  @del('/arbitros/{id}')
  @response(204, {
    description: 'Arbitro DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.arbitroRepository.deleteById(id);
  }
}
