import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional } from "class-validator";
import { PermissionDto } from 'src/permission/dto/permissionDto';

export class CreateRoleDto {
  @ApiProperty()
  @IsNotEmpty()
  roleName: string;

  @ApiProperty()
  @IsOptional()
  roleDesc: string;

  @ApiProperty()
  @IsOptional()
  createTime: string;

  @ApiProperty()
  @IsNotEmpty()
  premissions: PermissionDto[];
}
