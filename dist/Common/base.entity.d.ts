import { BaseEntity as TypeOrmBaseEntity } from 'typeorm';
export declare class BaseEntity extends TypeOrmBaseEntity {
    Id: number;
    createdAt: Date;
    updatedAt: Date;
    version: number;
}
