import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Alojamiento, AlojamientoRelations, Equipo} from '../models';
import {EquipoRepository} from './equipo.repository';

export class AlojamientoRepository extends DefaultCrudRepository<
  Alojamiento,
  typeof Alojamiento.prototype.id,
  AlojamientoRelations
> {

  public readonly equipos: HasManyRepositoryFactory<Equipo, typeof Alojamiento.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Alojamiento, dataSource);
    this.equipos = this.createHasManyRepositoryFactoryFor('equipos', equipoRepositoryGetter,);
    this.registerInclusionResolver('equipos', this.equipos.inclusionResolver);
  }
}
