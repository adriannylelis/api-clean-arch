import { IsNotEmpty, IsNumber, IsString, MaxLength } from 'class-validator'
import { ClassValidatorsFields } from '../../class-validators-fields'

class StubRules {
  @MaxLength(255)
  @IsString()
  @IsNotEmpty()
  name: string
  @IsNotEmpty()
  @IsNumber()
  price: number

  constructor(data: any) {
    Object.assign(this, data)
  }
}

class StubClassValidatorsFields extends ClassValidatorsFields<StubRules> {
  validate(data: any): boolean {
    return super.validate(new StubRules(data))
  }
}

describe('ClassValidatorsFields integration tests', () => {
  it('Should validate with erros', () => {
    const validator = new StubClassValidatorsFields()
    expect(validator.validate(null)).toBeFalsy()
    expect(validator.errors).toStrictEqual({
      name: [
        'name should not be empty',
        'name must be a string',
        'name must be shorter than or equal to 255 characters',
      ],
      price: [
        'price must be a number conforming to the specified constraints',
        'price should not be empty',
      ],
    })
  })
  it('Should validate without erros', () => {
    const validator = new StubClassValidatorsFields()
    expect(validator.validate({ name: 'Value', price: 10 })).toBeTruthy()
    expect(validator.validatedData).toStrictEqual(
      new StubRules({ name: 'Value', price: 10 }),
    )
  })
})
