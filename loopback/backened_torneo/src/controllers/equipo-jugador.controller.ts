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
  Equipo,
  Jugador,
} from '../models';
import {EquipoRepository} from '../repositories';

export class EquipoJugadorController {
  constructor(
    @repository(EquipoRepository) protected equipoRepository: EquipoRepository,
  ) { }

  @get('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Array of Equipo has many Jugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Jugador)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Jugador>,
  ): Promise<Jugador[]> {
    return this.equipoRepository.jugadors(id).find(filter);
  }

  @post('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Equipo model instance',
        content: {'application/json': {schema: getModelSchemaRef(Jugador)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Equipo.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {
            title: 'NewJugadorInEquipo',
            exclude: ['id'],
            optional: ['equipoId']
          }),
        },
      },
    }) jugador: Omit<Jugador, 'id'>,
  ): Promise<Jugador> {
    return this.equipoRepository.jugadors(id).create(jugador);
  }

  @patch('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Equipo.Jugador PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Jugador, {partial: true}),
        },
      },
    })
    jugador: Partial<Jugador>,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.equipoRepository.jugadors(id).patch(jugador, where);
  }

  @del('/equipos/{id}/jugadors', {
    responses: {
      '200': {
        description: 'Equipo.Jugador DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Jugador)) where?: Where<Jugador>,
  ): Promise<Count> {
    return this.equipoRepository.jugadors(id).delete(where);
  }
}
