import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { RoleEntity } from './entities/role.entity';
import { RoleAndPermissionEntity } from './entities/role-permission.entity';
import { PermissionEntity } from 'src/permission/entities/permission.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RoleEntity, RoleAndPermissionEntity, PermissionEntity])],
  controllers: [RoleController],
  providers: [RoleService],
})
export class RoleModule { }
