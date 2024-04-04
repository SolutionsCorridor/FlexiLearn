import { Body, Controller, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { JwtAdminGuard } from 'src/auth/guards/admin.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) { }

  @UseGuards(JwtAdminGuard)
  @Get()
  async getAllUsers() {
    const users = await this.userService.findAll();

    const usersWithDetails = await Promise.all(
      users.map(async (user) => {
        const userId = user._id.toString();
        const userDetails = await this.userService.findUserDetails(
          userId,
          user.role,
        );
        return { ...user, userDetails };
      }),
    );

    // remove users with role admin
    const filteredUsers = usersWithDetails.filter(
      (user) => user.role !== 'admin',
    );

    return filteredUsers;
  }

  @UseGuards(JwtAdminGuard)
  @Get(':id')
  async getUser(@Param('id') id: string) {
    const user = await this.userService.getUserById(id);
    return user;
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
