import { Body, Controller, Get, Param, Query, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtAdminGuard } from 'src/auth/guards/admin.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtAdminGuard)
  @Get()
  async getAllUsers(
    @Query('page') page: number,
    @Query('limit') limit: number,
    @Query('query') query: string,
  ) {
    // Calculate skip value based on page number and limit
    const skip = (page - 1) * limit;
    
    // Fetch users with pagination and search query
    const users = await this.userService.findAll(skip, limit, query);

    // Remove users with role 'admin' if necessary
    const filteredUsers = users.filter((user) => user.role !== 'admin');

    return filteredUsers;
  }

  @UseGuards(JwtAdminGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
  }

  @UseGuards(JwtAdminGuard)
  @Put('change-status/:id')
  async changeStatus(@Param('id') id: string, @Body() body: any) {
    const { status } = body;
    return await this.userService.changeStatus(id, status);
  }

  // @Post('register-admin')
  // async registerAdmin(@Body() body: any) {
  //   return await this.userService.createAdmin(body);
  // }

  // @UseGuards(JwtGuard)
  // @Get(':id')
  // async getUserProfile(@Param('id') id: number) {
  //   return await this.userService.findById(id);
  // }

}
