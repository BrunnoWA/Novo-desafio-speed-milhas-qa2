import { createOrderSchema } from './create-order.schema';

describe('Create order request validation', () => {
  it('aceita uma reserva válida e normaliza os dados do passageiro', () => {
    const result = createOrderSchema.safeParse({
      quoteId: 'quote-123',
      idempotencyKey: 'qa-key-001',
      passageiro: {
        nome: '  Maria Silva  ',
        documento: '123.456.789-00',
        documentoTipo: 'CPF',
        email: 'maria@example.com',
      },
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.passenger).toEqual({
        name: 'Maria Silva',
        document: '12345678900',
        documentType: 'cpf',
        email: 'maria@example.com',
      });
    }
  });

  it('rejeita quoteId ausente', () => {
    expect(createOrderSchema.safeParse({
      idempotencyKey: 'qa-key-002',
    }).success).toBe(false);
  });

  it('rejeita idempotencyKey ausente', () => {
    expect(createOrderSchema.safeParse({
      quoteId: 'quote-123',
    }).success).toBe(false);
  });

  it('aceita passageiro omitido, se os campos obrigatórios estiverem presentes', () => {
    const result = createOrderSchema.safeParse({
      quoteId: 'quote-123',
      idempotencyKey: 'qa-key-003',
    });

    expect(result.success).toBe(true);

    if (result.success) {
      expect(result.data.passenger.name).toBeNull();
    }
  });
});
