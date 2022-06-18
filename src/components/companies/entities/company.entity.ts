import { CompanyStatus } from './../constants/company-status.enum';
import { Base } from 'src/common/entites/base.entity';
import { Column, Entity, Index } from 'typeorm';

@Entity({ name: 'companies' })
export class Company extends Base {
  @Column({ type: 'varchar', length: 100, nullable: false })
  @Index()
  name: string;

  @Column({ type: 'text', nullable: true, default: null })
  address: string;

  @Column({ type: 'enum', enum: CompanyStatus, default: CompanyStatus.ACTIVE })
  status: CompanyStatus;

  @Column({ type: 'text', nullable: true, default: true })
  thumbnail: string;
}
