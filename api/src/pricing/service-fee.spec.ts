import { priceOf, serviceFeeCents } from './service-fee';

describe('Pricing - taxa de serviço', () => {
  it('calcula 7% sobre 3976 centavos conforme a regra atual de arredondamento para cima', () => {
    expect(serviceFeeCents(3976)).toBe(279);
  });

  it('mantém os valores de taxas e total em centavos inteiros', () => {
    expect(priceOf(39.76)).toEqual({
      taxesBrl: 39.76,
      serviceFeeBrl: 2.79,
      totalBrl: 42.55,
    });
  });

  it('retorna zero para taxas iguais a zero', () => {
    expect(priceOf(0)).toEqual({
      taxesBrl: 0,
      serviceFeeBrl: 0,
      totalBrl: 0,
    });
  });
});
