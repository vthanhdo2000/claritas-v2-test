import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './repositories/company.repository';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class CompaniesService {
  constructor(
    @InjectRepository(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async create(dto: CreateCompanyDto) {
    const newCompany = this.companyRepository.create(dto);
    await this.companyRepository.save(newCompany);
    return 'Company created';
  }

  async getAll(page: number, size: number) {
    const count = await this.companyRepository.count();
    const maxPage = Math.ceil(count / size);
    const hasNext = page < maxPage;
    const companies = await this.companyRepository.find({
      skip: (page - 1) * size,
      take: size,
    });

    return {
      companies,
      hasNext,
      page,
      maxPage,
    };
  }
}
