import { CreateCompanyDto } from './dto/create-company.dto';
import { CompaniesService } from './companies.service';
export declare class CompaniesController {
    private readonly companiesService;
    constructor(companiesService: CompaniesService);
    create(dto: CreateCompanyDto): Promise<string>;
    getAll(page: number, size: number): Promise<{
        companies: import("./entities/company.entity").Company[];
        hasNext: boolean;
        page: number;
        maxPage: number;
    }>;
}
