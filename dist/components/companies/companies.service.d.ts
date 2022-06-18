import { CreateCompanyDto } from './dto/create-company.dto';
import { CompanyRepository } from './repositories/company.repository';
export declare class CompaniesService {
    private readonly companyRepository;
    constructor(companyRepository: CompanyRepository);
    create(dto: CreateCompanyDto): Promise<string>;
    getAll(page: number, size: number): Promise<{
        companies: import("./entities/company.entity").Company[];
        hasNext: boolean;
        page: number;
        maxPage: number;
    }>;
}
