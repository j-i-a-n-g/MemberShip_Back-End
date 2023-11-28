import { HttpException, Injectable } from '@nestjs/common';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { RoleEntity } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { generateRandomString } from 'src/common/method';
import { RoleAndPermissionEntity } from './entities/role-permission.entity';
import { PermissionEntity } from 'src/permission/entities/permission.entity';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleEntity: Repository<RoleEntity>,
    @InjectRepository(RoleAndPermissionEntity)
    private readonly roleAndPermissionEntity: Repository<RoleAndPermissionEntity>,
    @InjectRepository(PermissionEntity)
    private readonly permissionEntity: Repository<PermissionEntity>,
  ) { }
  async create(createRoleDto: CreateRoleDto) {
    let { roleName, roleDesc, roleLevel, premissions = [] } = createRoleDto
    // 以下逻辑应该添加一个事务管理
    let flag = await this.roleEntity.findOne({
      where: { roleName }
    })
    if (flag) {
      throw new HttpException('角色已存在', 500)
    }
    let tag = generateRandomString('r', '00');
    let result = await this.roleEntity.create({
      tag,
      roleName,
      roleDesc,
      roleLevel
    })
    await this.roleEntity.save(result);
    // 查找权限是否存在
    premissions.forEach(async item => {
      let permiss = await this.permissionEntity.findOne({
        where: { permiKey: item.permiKey }
      })
      if (permiss) {
        // 保存角色和权限关系表
        let r_p_relation = await this.roleAndPermissionEntity.create({
          roleTag: result.tag,
          roleName: result.roleName,
          permiTag: permiss.tag,
          permiKey: permiss.permiKey,
          permiName: permiss.permiName,
        })
        await this.roleAndPermissionEntity.save(r_p_relation)
      }
    })
    return "创建角色成功"
  }

  async findAll() {
    return await this.roleEntity.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, updateRoleDto: UpdateRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
