import { ClassValidatorsFields } from '../../class-validators-fields'
import * as libClassValidator from 'class-validator'

class StubClassValidatorsFields extends ClassValidatorsFields<{
  field: string
}> {}

describe('ClassValidatorsFields unit tests', () => {
  it('Should initialize erros and validatedData variables with null', () => {
    const sut = new StubClassValidatorsFields()
    expect(sut.errors).toBeNull()
    expect(sut.validatedData).toBeNull()
  })

  it('Should ivalidate with erros', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')

    spyValidateSync.mockReturnValue([
      {
        property: 'field',
        constraints: {
          isRequired: 'test error',
        },
      },
    ])

    const sut = new StubClassValidatorsFields()

    expect(sut.validate(null)).toBeFalsy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toBeNull()
    expect(sut.errors).toStrictEqual({ field: ['test error'] })
  })

  it('Should ivalidate without erros', () => {
    const spyValidateSync = jest.spyOn(libClassValidator, 'validateSync')
    spyValidateSync.mockReturnValue([])

    const sut = new StubClassValidatorsFields()

    expect(sut.validate({ field: 'value' })).toBeTruthy()
    expect(spyValidateSync).toHaveBeenCalled()
    expect(sut.validatedData).toStrictEqual({ field: 'value' })
    expect(sut.errors).toBeNull()
  })
})
