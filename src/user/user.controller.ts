import { Controller, Get, Post, Body, Patch, Param, Delete, Request, HttpException } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
const jwt = require('jsonwebtoken');

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService
  ) { }

  @Post('login')
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get('autoLogin')
  autoLogin(@Request() req) {
    let token = req.headers["authorization"].split(" ")[1];
    let user = jwt.verify(token, "password");
    if (user) {
      return { data: user }
    } else {
      throw new HttpException('登录过期，请重新登录', 500)
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
