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
import {Alojamiento} from '../models';
import {AlojamientoRepository} from '../repositories';

export class AlojamientoController {
  constructor(
    @repository(AlojamientoRepository)
    public alojamientoRepository : AlojamientoRepository,
  ) {}

  @post('/alojamientos')
  @response(200, {
    description: 'Alojamiento model instance',
    content: {'application/json': {schema: getModelSchemaRef(Alojamiento)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alojamiento, {
            title: 'NewAlojamiento',
            exclude: ['id'],
          }),
        },
      },
    })
    alojamiento: Omit<Alojamiento, 'id'>,
  ): Promise<Alojamiento> {
    return this.alojamientoRepository.create(alojamiento);
  }

  @get('/alojamientos/count')
  @response(200, {
    description: 'Alojamiento model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Alojamiento) where?: Where<Alojamiento>,
  ): Promise<Count> {
    return this.alojamientoRepository.count(where);
  }

  @get('/alojamientos')
  @response(200, {
    description: 'Array of Alojamiento model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Alojamiento, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Alojamiento) filter?: Filter<Alojamiento>,
  ): Promise<Alojamiento[]> {
    return this.alojamientoRepository.find(filter);
  }

  @patch('/alojamientos')
  @response(200, {
    description: 'Alojamiento PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alojamiento, {partial: true}),
        },
      },
    })
    alojamiento: Alojamiento,
    @param.where(Alojamiento) where?: Where<Alojamiento>,
  ): Promise<Count> {
    return this.alojamientoRepository.updateAll(alojamiento, where);
  }

  @get('/alojamientos/{id}')
  @response(200, {
    description: 'Alojamiento model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Alojamiento, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Alojamiento, {exclude: 'where'}) filter?: FilterExcludingWhere<Alojamiento>
  ): Promise<Alojamiento> {
    return this.alojamientoRepository.findById(id, filter);
  }

  @patch('/alojamientos/{id}')
  @response(204, {
    description: 'Alojamiento PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Alojamiento, {partial: true}),
        },
      },
    })
    alojamiento: Alojamiento,
  ): Promise<void> {
    await this.alojamientoRepository.updateById(id, alojamiento);
  }

  @put('/alojamientos/{id}')
  @response(204, {
    description: 'Alojamiento PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() alojamiento: Alojamiento,
  ): Promise<void> {
    await this.alojamientoRepository.replaceById(id, alojamiento);
  }

  @del('/alojamientos/{id}')
  @response(204, {
    description: 'Alojamiento DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.alojamientoRepository.deleteById(id);
  }
}
