import { searchRequestSchema } from './search-request.schema';

describe('Search request validation', () => {
  it('aceita uma busca válida', () => {
    const result = searchRequestSchema.safeParse({
      origin: 'gru',
      destination: 'gig',
      date: '2099-12-31',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.origin).toBe('GRU');
      expect(result.data.destination).toBe('GIG');
    }
  });

  it('aceita os nomes alternativos em português', () => {
    expect(searchRequestSchema.safeParse({
      origem: 'GRU',
      destino: 'REC',
      data: '2099-12-31',
    }).success).toBe(true);
  });

  it('rejeita origem e destino iguais', () => {
    expect(searchRequestSchema.safeParse({
      origin: 'GRU',
      destination: 'GRU',
      date: '2099-12-31',
    }).success).toBe(false);
  });

  it('rejeita uma data de calendário inexistente', () => {
    expect(searchRequestSchema.safeParse({
      origin: 'GRU',
      destination: 'GIG',
      date: '2099-02-30',
    }).success).toBe(false);
  });

  it('rejeita campos obrigatórios ausentes', () => {
    expect(searchRequestSchema.safeParse({}).success).toBe(false);
  });
});
