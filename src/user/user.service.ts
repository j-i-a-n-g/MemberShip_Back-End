import { Injectable, BadGatewayException, HttpStatus, HttpException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { generateRandomString } from 'src/common/method';
import { UserEntity } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm'
import { Repository } from 'typeorm';
const jwt = require('jsonwebtoken');

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userEntity: Repository<UserEntity>
  ) { }
  // 创建或登录
  async create(createUserDto: CreateUserDto) {
    try {
      let { username, password } = createUserDto;
      const createObj: CreateUserDto = {
        tag: generateRandomString('u'),
        username,
        password,
        memberLevel: 0,
        topic: 0,
        createTime: new Date()
      }
      const user: UserEntity = await this.userEntity.findOne({
        where: { username }
      })
      let token = "Bearer " + jwt.sign({ ...createObj }, "password", { expiresIn: "3 days" })
      console.log(token)
      if (user) {
        if (user.password !== password) {
          throw new HttpException('密码错误', 500)
        }
        return {
          data: {
            user,
            token
          },
          message: '登录成功'
        }
      }
      let result: UserEntity = await this.userEntity.create(createObj);
      await this.userEntity.save(result)
      return {
        data: {
          user,
          token,
        },
        message: '注册成功'
      }
    } catch (error) {
      throw new HttpException(error, 500)
    }
  }

  autoLogin() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
