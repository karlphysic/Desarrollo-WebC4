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
import {Jugador} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository : JugadorRepository,
  ) {}

  @post('/jugadors')
  @response(200, {
    description: 'Jugador model instance',
    content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
  })
  async create(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugador',
            exclude: ['id'],
          }),
        },
      },
    })
    jugador: Omit<Jugador, 'id'>,
  ): Promise<Jugador> {
    return this.jugadorRepository.create(jugador);
  }

  @get('/jugadors/count')
  @response(200, {
    description: 'Jugador model count',
    content: {'application/json': {schema: CountSchema}},
  })
  async count(
    @param.where(Jugador) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.jugadorRepository.count(where);
  }

  @get('/jugadors')
  @response(200, {
    description: 'Array of Jugador model instances',
    content: {
      'application/json': {
        schema: {
          type: 'array',
          items: getModelSchemaRef(Jugador, {includeRelations: true}),
        },
      },
    },
  })
  async find(
    @param.filter(Jugador) filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.jugadorRepository.find(filter);
  }

  @patch('/jugadors')
  @response(200, {
    description: 'Jugador PATCH success count',
    content: {'application/json': {schema: CountSchema}},
  })
  async updateAll(
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Jugador,
    @param.where(Jugador) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.jugadorRepository.updateAll(jugador, where);
  }

  @get('/jugadors/{id}')
  @response(200, {
    description: 'Jugador model instance',
    content: {
      'application/json': {
        schema: getModelSchemaRef(Jugador, {includeRelations: true}),
      },
    },
  })
  async findById(
    @param.path.string('id') id: string,
    @param.filter(Jugador, {exclude: 'where'}) filter?: FilterExcludingWhere<Jugador>
  ): Promise<Jugador> {
    return this.jugadorRepository.findById(id, filter);
  }

  @patch('/jugadors/{id}')
  @response(204, {
    description: 'Jugador PATCH success',
  })
  async updateById(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.updateById(id, jugador);
  }

  @put('/jugadors/{id}')
  @response(204, {
    description: 'Jugador PUT success',
  })
  async replaceById(
    @param.path.string('id') id: string,
    @requestBody() jugador: Jugador,
  ): Promise<void> {
    await this.jugadorRepository.replaceById(id, jugador);
  }

  @del('/jugadors/{id}')
  @response(204, {
    description: 'Jugador DELETE success',
  })
  async deleteById(@param.path.string('id') id: string): Promise<void> {
    await this.jugadorRepository.deleteById(id);
  }
}
