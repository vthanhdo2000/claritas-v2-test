import { Base } from 'src/common/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'user_buildings' })
export class UserBuilding extends Base {
  @Column({ type: 'int4' })
  @Index()
  user_id: number;

  @Column({ type: 'int4' })
  @Index()
  building_id: number;
}
