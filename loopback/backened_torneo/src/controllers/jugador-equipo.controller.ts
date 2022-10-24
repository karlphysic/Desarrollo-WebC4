import {
  repository,
} from '@loopback/repository';
import {
  param,
  get,
  getModelSchemaRef,
} from '@loopback/rest';
import {
  Jugador,
  Equipo,
} from '../models';
import {JugadorRepository} from '../repositories';

export class JugadorEquipoController {
  constructor(
    @repository(JugadorRepository)
    public jugadorRepository: JugadorRepository,
  ) { }

  @get('/jugadors/{id}/equipo', {
    responses: {
      '200': {
        description: 'Equipo belonging to Jugador',
        content: {
          'application/json': {
            schema: {type: 'array', items: getModelSchemaRef(Equipo)},
          },
        },
      },
    },
  })
  async getEquipo(
    @param.path.string('id') id: typeof Jugador.prototype.id,
  ): Promise<Equipo> {
    return this.jugadorRepository.equipo(id);
  }
}
