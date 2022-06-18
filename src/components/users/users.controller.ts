import { CreateUserByAdminDto } from './dto/create-user-by-admin.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  UseGuards,
  Request,
  Get,
  DefaultValuePipe,
  ParseIntPipe,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { Public } from 'src/common/decorators/public.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.dto';
import { Roles } from 'src/common/decorators/roles.decorator';
import { Role } from 'src/common/constants/user-role.enum';

@ApiTags('users')
@ApiBearerAuth()
@Controller('user')
export class UsersController {
  constructor(
    private readonly usersService: UsersService,
    private readonly authService: AuthService,
  ) {}

  @Public()
  @Post('register')
  register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }

  @Public()
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(@Request() request, @Body() body: LoginDto) {
    return this.authService.login(request.user as User);
  }

  @Get('me')
  getMe(@Request() request: any) {
    return this.usersService.getMe(request.user.userId as number);
  }

  @Post('register-admin')
  @Roles(Role.ADMIN)
  registerAdmin(@Body() dto: CreateUserByAdminDto) {
    return this.usersService.registerAdmin(dto);
  }

  @Roles(Role.ADMIN)
  @Get('all')
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
  getAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number,
    @Query('size', new DefaultValuePipe(10), ParseIntPipe) size: number,
  ) {
    return this.usersService.getAllUsers(page, size);
  }

  @Get("alll")
  getAlllUserTest(){
    return this.usersService.getAllUserTest();
  }
}
