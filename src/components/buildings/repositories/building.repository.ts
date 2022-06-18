import { Building } from './../entities/building.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Building)
export class BuildingRepository extends Repository<Building> {}
