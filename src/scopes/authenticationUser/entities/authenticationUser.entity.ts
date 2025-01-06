import {
  Entity,
  PrimaryGeneratedColumn,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  Column,
} from 'typeorm';
import { Post } from '../../post/entities/post.entity';
import { Follow } from '../../follow/entities/follow.entity';

@Entity()
export class AuthenticationUsers {
  @PrimaryGeneratedColumn('uuid', { name: 'ID' })
  id: string;

  @Column({ name: 'EMAIL', unique: true })
  email: string;

  @Column({ name: 'PASSWORD' })
  password: string;

  @Column({ name: 'NAME' })
  name: string;

  @Column({ name: 'PROFILE_PICTURE', nullable: true })
  profilePicture?: string;

  @Column({ name: 'BIO', nullable: true })
  bio?: string;

  @Column({ name: 'LOCATION', nullable: true })
  location?: string;

  @OneToMany(() => Post, (post) => post.author)
  posts: Post[];

  @OneToMany(() => Follow, (follow) => follow.follower)
  following: Follow[];

  @OneToMany(() => Follow, (follow) => follow.following)
  followers: Follow[];

  @Column({ name: 'USER_TYPE', default: 'regular' })
  userType: string; // Possible values: 'regular', 'admin'

  @Column({ name: 'ACCOUNT_STATUS', default: 'active' })
  accountStatus: string;  // Possible values: 'active', 'suspended'

  @CreateDateColumn({ name: 'CREATED_AT' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'UPDATED_AT' })
  updatedAt: Date;
}
