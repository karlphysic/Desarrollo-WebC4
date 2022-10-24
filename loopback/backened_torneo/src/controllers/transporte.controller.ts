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
import {Transporte} from '../models';
import {TransporteRepository} from '../repositories';

export class TransporteController {
  constructor(
    @repository(TransporteRepository)
    public transporteRepository : TransporteRepository,
  ) {}

  @post('/transportes')
  @response(200, {
    description: 'Transporte model instance',
    content: {'application/json': {schema: getModelSchemaRef(Transporte)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transporte, {
            title: 'NewTransporte',
            exclude: ['id'],
          }),
        },
      },
    })
    transporte: Omit<Transporte, 'id'>,
  ): Promise<Transporte> {
    return this.transporteRepository.create(transporte);
  }

  @get('/transportes/count')
  @response(200, {
    description: 'Transporte model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Transporte) where?: Where<Transporte>,
  ): Promise<Count> {
    return this.transporteRepository.count(where);
  }

  @get('/transportes')
  @response(200, {
    description: 'Array of Transporte model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Transporte, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Transporte) filter?: Filter<Transporte>,
  ): Promise<Transporte[]> {
    return this.transporteRepository.find(filter);
  }

  @patch('/transportes')
  @response(200, {
    description: 'Transporte PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transporte, {partial: true}),
        },
      },
    })
    transporte: Transporte,
    @param.where(Transporte) where?: Where<Transporte>,
  ): Promise<Count> {
    return this.transporteRepository.updateAll(transporte, where);
  }

  @get('/transportes/{id}')
  @response(200, {
    description: 'Transporte model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Transporte, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Transporte, {exclude: 'where'}) filter?: FilterExcludingWhere<Transporte>
  ): Promise<Transporte> {
    return this.transporteRepository.findById(id, filter);
  }

  @patch('/transportes/{id}')
  @response(204, {
    description: 'Transporte PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Transporte, {partial: true}),
        },
      },
    })
    transporte: Transporte,
  ): Promise<void> {
    await this.transporteRepository.updateById(id, transporte);
  }

  @put('/transportes/{id}')
  @response(204, {
    description: 'Transporte PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() transporte: Transporte,
  ): Promise<void> {
    await this.transporteRepository.replaceById(id, transporte);
  }

  @del('/transportes/{id}')
  @response(204, {
    description: 'Transporte DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.transporteRepository.deleteById(id);
  }
}
