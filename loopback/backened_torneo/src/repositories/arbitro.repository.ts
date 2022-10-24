import {inject, Getter} from '@loopback/core';
import {DefaultCrudRepository, repository, HasManyRepositoryFactory} from '@loopback/repository';
import {MongoDbDataSource} from '../datasources';
import {Arbitro, ArbitroRelations, Torneo} from '../models';
import {TorneoRepository} from './torneo.repository';

export class ArbitroRepository extends DefaultCrudRepository<
  Arbitro,
  typeof Arbitro.prototype.id,
  ArbitroRelations
> {

  public readonly torneos: HasManyRepositoryFactory<Torneo, typeof Arbitro.prototype.id>;

  constructor(
    @inject('datasources.MongoDb') dataSource: MongoDbDataSource, @repository.getter('TorneoRepository') protected torneoRepositoryGetter: Getter<TorneoRepository>,
  ) {
    super(Arbitro, dataSource);
    this.torneos = this.createHasManyRepositoryFactoryFor('torneos', torneoRepositoryGetter,);
    this.registerInclusionResolver('torneos', this.torneos.inclusionResolver);
  }
}
