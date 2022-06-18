import { CreateCompanyDto } from './dto/create-company.dto';
import { Roles } from './../../common/decorators/roles.decorator';
import { Role } from 'src/common/constants/user-role.enum';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import {
  Body,
  Controller,
  DefaultValuePipe,
  Get,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CompaniesService } from './companies.service';

@ApiBearerAuth()
@ApiTags('companies')
@Controller('company')
export class CompaniesController {
  constructor(private readonly companiesService: CompaniesService) {}

  @Roles(Role.ADMIN)
  @Post('create')
  create(@Body() dto: CreateCompanyDto) {
    return this.companiesService.create(dto);
  }

  @Roles(Role.ADMIN)
  @ApiQuery({
    name: 'page',
    required: false,
    description: 'Page number, default = 1',
  })
  @ApiQuery({
    name: 'size',
    required: false,
    description: 'Page size, default = 10',
  })
  @Get('all')
  getAll(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return this.companiesService.getAll(page, size);
  }
}
