import { EntityValidationError } from '@/shared/domain/errors/validation-error'
import { UserEntity, UserProps } from '@/users/domain/entities/user.entity'
import { UserDataBuilder } from '@/users/domain/testing/helpers/user-data-builder'

describe('User entity integration tests', () => {
  describe('Constructor method', () => {
    it('Should throw an error when creating a user whit invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: '',
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      }
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError)
    })
  })
})
