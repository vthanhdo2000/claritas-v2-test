import { CompanyRepository } from './../companies/repositories/company.repository';
import { UserBuilding } from './../buildings/entities/user-building.entity';
import { BuildingRepository } from './../buildings/repositories/building.repository';
import { UserBuildingRepository } from './../buildings/repositories/user-building.repository';
import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { UserRepository } from './repositories/user.repository';
import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import * as argon2 from 'argon2';
import { Role } from 'src/common/constants/user-role.enum';
import { User } from 'aws-sdk/clients/budgets';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserRepository)
    private readonly userRepository: UserRepository,
    @InjectRepository(UserBuildingRepository)
    private readonly userBuildingRepository: UserBuildingRepository,
    @InjectRepository(BuildingRepository)
    private readonly buildingRepository: BuildingRepository,
    @InjectRepository(CompanyRepository)
    private readonly companyRepository: CompanyRepository,
  ) {}

  async register({ password, ...info }: CreateUserDto) {
    const user = await this.userRepository.findOne({
      email: info.email,
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }
    const hashedPassword = await argon2.hash(password);
    const newUser = this.userRepository.create({
      ...info,
      password: hashedPassword,
      role: Role.CLIENT_OWNER,
    });
    await this.userRepository.save(newUser);
    return 'User created';
  }

  async registerAdmin({
    company_id,
    email,
    username,
    building_ids,
  }: CreateUserByAdminDto) {
    const user = await this.userRepository.findOne({
      email,
    });
    if (user) {
      throw new BadRequestException('User already exists');
    }

    const buildings = await this.buildingRepository.findByIds(building_ids);
    if (buildings.length !== building_ids.length) {
      throw new BadRequestException('Invalid building ids');
    }
    const hashedPassword = await argon2.hash('123456');
    const newUser = this.userRepository.create({
      email,
      username,
      company_id,
      password: hashedPassword,
    });
    const savedUser = await this.userRepository.save(newUser);
    await this.addUserToBuildings(savedUser.id, building_ids);
    return 'User created';
  }

  async addUserToBuildings(userId: number, buildingIds: number[]) {
    const userBuildings = buildingIds.map((buildingId) => {
      return {
        user_id: userId,
        building_id: buildingId,
      };
    });
    await this.userBuildingRepository.save(userBuildings);
  }

  async getMe(userId: number) {
    const user = await this.userRepository.findOne(userId);

    const company = await this.companyRepository.findOne(user.company_id);
    const buildings = await this.buildingRepository
      .createQueryBuilder('b')
      .innerJoin(UserBuilding, 'ub', 'ub.building_id = b.id')
      .select('b.name, b.address, b.thumbnail, ub.building_id')
      .where('ub.user_id = :userId', { userId })
      .getRawMany();
    const modifiedUser = {
      ...user,
      password: undefined,
      company_id: undefined,
      company,
    };
    return { user: modifiedUser, buildings };
  }

  async getAllUsers(page: number, size: number) {
    const count = await this.userRepository.count();
    const maxPage = Math.ceil(count / size);
    const hasNext = page < maxPage;
    const users = await this.userRepository.find({
      skip: (page - 1) * size,
      take: size,
      select: ['email', 'status', 'username', 'company_id', 'role'],
    });
    return {
      users,
      hasNext,
      page,
      maxPage,
    };
  }

  async getAllUserTest() {
    return this.userRepository.find();
  }
}
