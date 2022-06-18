import { BuildingStatus } from './../constants/building-status.enum';
import { Base } from 'src/common/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'buildings' })
export class Building extends Base {
  @Column({ type: 'text', nullable: true, default: null })
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  address: string;

  @Column({ type: 'text', nullable: true, default: null })
  thumbnail: string;

  @Column({ type: 'int', nullable: true, default: null })
  company_id: number;

  @Column({
    type: 'enum',
    enum: BuildingStatus,
    default: BuildingStatus.ACTIVE,
  })
  status: BuildingStatus;
}
