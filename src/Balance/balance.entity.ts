import { RootUserEntity } from 'src/Root-User/root-user.entity';
import { BaseEntity } from 'src/Common/base.entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';

@Entity('Balance')
export class BalanceEntity extends BaseEntity {
  @Column({ name: 'amount', type: 'decimal' })
  amount: number;

  @Column({ type: 'bool', default: false })
  isApproved: boolean;

  @ManyToOne(() => RootUserEntity, (root) => root.balance, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  root: RootUserEntity;

  @Column('int', { array: true, default: [] })
  approval: number[];
}
