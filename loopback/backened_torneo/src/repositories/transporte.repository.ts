import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasOneRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Transporte, TransporteRelations, Equipo} from '../models';
import {EquipoRepository} from './equipo.repository';

export class TransporteRepository extends DefaultCrudRepository<
  Transporte,
  typeof Transporte.prototype.id,
  TransporteRelations
> {

  public readonly equipo: HasOneRepositoryFactory<Equipo, typeof Transporte.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('EquipoRepository') protected equipoRepositoryGetter: Getter<EquipoRepository>,
  ) {
    super(Transporte, dataSource);
    this.equipo = this.createHasOneRepositoryFactoryFor('equipo', equipoRepositoryGetter);
    this.registerInclusionResolver('equipo', this.equipo.inclusionResolver);
  }
}
