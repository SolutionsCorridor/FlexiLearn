import {
  Body,
  Controller,
  Post,
  Req,
  Get,
  UseGuards,
  Res,
} from "@nestjs/common";
import { CreateUserDto } from "src/user/dto/dto/user.dto";
import { UserService } from "src/user/user.service";
import { LoginDto } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { Response, Request } from "express";
import { RefreshJwtGuard } from "./guards/refresh.guard";
import { JwtGuard } from "./guards/jwt.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private userService: UserService,
    private authService: AuthService
  ) {}

  @Post("register")
  async registerUser(@Body() dto: CreateUserDto) {
    return await this.userService.create(dto);
  }

  @Post("login")
  async login(
    @Body() dto: LoginDto,
    @Res({ passthrough: true }) response: Response
  ) {
    return await this.authService.login(dto);
  }

  @UseGuards(JwtGuard) // Assuming you have a JwtAuthGuard that validates the access token
  @Get("validate-session")
  validateSession(@Req() request: Request) {
    // If the guard passes, the request will have a user object attached by JwtAuthGuard
    if (request.user) {
      return { isAuthenticated: true, user: request.user };
    }
    return { isAuthenticated: false };
  }

  @UseGuards(RefreshJwtGuard)
  @Post("refresh")
  async refreshToken(@Req() req) {
    console.log("refreshed");

    return await this.authService.refreshToken(req.user);
  }
}
