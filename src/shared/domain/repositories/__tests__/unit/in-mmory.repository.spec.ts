import { Entity } from '@/shared/domain/entities/entity'
import { InMemoryRepository } from '../../in-mmory.repository'
import { NotFoundError } from 'rxjs'

type StubEntityProps = {
  name: string
  price: number
}

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

describe('InMemoryRepository', () => {
  let sut: StubInMemoryRepository

  beforeEach(() => {
    sut = new StubInMemoryRepository()
  })

  it('Should inserts a new entity', async () => {
    const entity = new StubEntity({ name: 'any_name', price: 10 })

    await sut.insert(entity)

    expect(entity.toJSON()).toStrictEqual(sut.items[0].toJSON())
  })

  it('Should throw error when entity not found', async () => {
    await expect(sut.findById('fakeId')).rejects.toThrow(
      new NotFoundError('Entity not found'),
    )
  })

  it('Should find a entity by id', async () => {
    const entity = new StubEntity({ name: 'any_name', price: 10 })
    await sut.insert(entity)
    const result = await sut.findById(entity.id)
    expect(result.toJSON()).toStrictEqual(entity.toJSON())
  })

  it('Should return all entities', async () => {
    const entity = new StubEntity({ name: 'any_name', price: 10 })
    await sut.insert(entity)
    const result = await sut.findAll()
    expect([entity]).toStrictEqual(result)
  })
})
