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
  Alojamiento,
  Equipo,
} from '../models';
import {AlojamientoRepository} from '../repositories';

export class AlojamientoEquipoController {
  constructor(
    @repository(AlojamientoRepository) protected alojamientoRepository: AlojamientoRepository,
  ) { }

  @get('/alojamientos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Array of Alojamiento has many Equipo',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipo)},
          },
        },
      },
    },
  })
  async find(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo[]> {
    return this.alojamientoRepository.equipos(id).find(filter);
  }

  @post('/alojamientos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Alojamiento model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Alojamiento.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInAlojamiento',
            exclude: ['id'],
            optional: ['alojamientoId']
          }),
        },
      },
    }) equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.alojamientoRepository.equipos(id).create(equipo);
  }

  @patch('/alojamientos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Alojamiento.Equipo PATCH success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async patch(
    @param.path.string('id') id: string,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {partial: true}),
        },
      },
    })
    equipo: Partial<Equipo>,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.alojamientoRepository.equipos(id).patch(equipo, where);
  }

  @del('/alojamientos/{id}/equipos', {
    responses: {
      '200': {
        description: 'Alojamiento.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.alojamientoRepository.equipos(id).delete(where);
  }
}
