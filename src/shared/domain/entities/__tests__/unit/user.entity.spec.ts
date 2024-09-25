import { validate as uuidValidate } from 'uuid'
import { Entity } from '../../entity'

type StubProps = {
  prop1: string
  prop2: number
}

class StubEntity extends Entity<StubProps> {}

describe('Entity unit testes', () => {
  it('Should set props and id', () => {
    const props = { prop1: 'prop1', prop2: 1 }
    const entity = new StubEntity(props)

    expect(entity.props).toStrictEqual(props)
    expect(entity._id).not.toBeNull()
    expect(uuidValidate(entity._id)).toBeTruthy()
  })

  it('Should accept a valid uuid', () => {
    const props = { prop1: 'value', prop2: 15 }
    const id = '42229193-892c-4c4b-988e-e26007f77dfe'
    const entity = new StubEntity(props, id)

    expect(uuidValidate(entity._id)).toBeTruthy()
    expect(entity._id).toEqual(id)
  })

  it('Should convert a entity to a JavaScrip Object', () => {
    const props = { prop1: 'value', prop2: 15 }
    const id = '42229193-892c-4c4b-988e-e26007f77dfe'
    const entity = new StubEntity(props, id)

    expect(entity.toJSON()).toStrictEqual({
      id,
      ...props,
    })
  })
})
