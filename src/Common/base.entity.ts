import { IsDate, IsNumber, IsOptional, IsUUID } from 'class-validator';
import {
  CreateDateColumn,
  PrimaryGeneratedColumn,
  BaseEntity as TypeOrmBaseEntity,
  UpdateDateColumn,
  VersionColumn,
} from 'typeorm';

export class BaseEntity extends TypeOrmBaseEntity {
  @PrimaryGeneratedColumn()
  Id: number;

  @CreateDateColumn({ type: 'timestamp' })
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @VersionColumn({ nullable: true })
  @IsNumber()
  @IsOptional()
  version: number;
}
