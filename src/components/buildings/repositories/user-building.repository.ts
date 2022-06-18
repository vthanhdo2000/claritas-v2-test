import { UserBuilding } from './../entities/user-building.entity';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(UserBuilding)
export class UserBuildingRepository extends Repository<UserBuilding> {}
