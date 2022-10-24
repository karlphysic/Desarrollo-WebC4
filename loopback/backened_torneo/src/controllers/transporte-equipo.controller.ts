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
  Transporte,
  Equipo,
} from '../models';
import {TransporteRepository} from '../repositories';

export class TransporteEquipoController {
  constructor(
    @repository(TransporteRepository) protected transporteRepository: TransporteRepository,
  ) { }

  @get('/transportes/{id}/equipo', {
    responses: {
      '200': {
        description: 'Transporte has one Equipo',
        content: {
          'application/json': {
            schema: getModelSchemaRef(Equipo),
          },
        },
      },
    },
  })
  async get(
    @param.path.string('id') id: string,
    @param.query.object('filter') filter?: Filter<Equipo>,
  ): Promise<Equipo> {
    return this.transporteRepository.equipo(id).get(filter);
  }

  @post('/transportes/{id}/equipo', {
    responses: {
      '200': {
        description: 'Transporte model instance',
        content: {'application/json': {schema: getModelSchemaRef(Equipo)}},
      },
    },
  })
  async create(
    @param.path.string('id') id: typeof Transporte.prototype.id,
    @requestBody({
      content: {
        'application/json': {
          schema: getModelSchemaRef(Equipo, {
            title: 'NewEquipoInTransporte',
            exclude: ['id'],
            optional: ['transporteId']
          }),
        },
      },
    }) equipo: Omit<Equipo, 'id'>,
  ): Promise<Equipo> {
    return this.transporteRepository.equipo(id).create(equipo);
  }

  @patch('/transportes/{id}/equipo', {
    responses: {
      '200': {
        description: 'Transporte.Equipo PATCH success count',
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
    return this.transporteRepository.equipo(id).patch(equipo, where);
  }

  @del('/transportes/{id}/equipo', {
    responses: {
      '200': {
        description: 'Transporte.Equipo DELETE success count',
        content: {'application/json': {schema: CountSchema}},
      },
    },
  })
  async delete(
    @param.path.string('id') id: string,
    @param.query.object('where', getWhereSchemaFor(Equipo)) where?: Where<Equipo>,
  ): Promise<Count> {
    return this.transporteRepository.equipo(id).delete(where);
  }
}
