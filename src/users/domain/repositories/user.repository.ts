import { Entity } from '@/shared/domain/entities/entity'
import { UserEntity } from '../entities/user.entity'

export interface UserRepository<E extends Entity> {
  findByEmail(email: string): Promise<UserEntity>
  emailExists(email: string): Promise<void>
}
