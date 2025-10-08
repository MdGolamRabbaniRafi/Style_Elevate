import { BalanceEntity } from 'src/Balance/balance.entity';
import { BaseEntity } from 'src/Common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('RootUser')
export class RootUserEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 150 })
  name: string;

  @Column({ name: 'email', type: 'varchar', length: 150, unique: true })
  email: string;

  @Column({ name: 'address', type: 'varchar', length: 150, nullable: true })
  address: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  phone: string;

  @Column({ name: 'password', type: 'varchar', length: 150 })
  password: string;

  @Column({ name: 'registration_date', type: 'timestamp' })
  registration_date: Date;

  @Column({ name: 'role', type: 'varchar' })
  role: string;

  @Column({ name: 'User Image', type: 'varchar' })
  Image: string;

  @Column({ name: 'netBalance', type: 'decimal', nullable: true })
  netBalance: number;

  @Column({ name: 'Status', type: 'boolean', default: true })
  isActive: boolean;

  @OneToMany(() => BalanceEntity, (balance) => balance.root)
  balance: BalanceEntity[];
}
