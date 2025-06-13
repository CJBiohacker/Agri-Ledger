import { isValidCPF, isValidCNPJ } from '../../src/utils';

describe('Utils', () => {
  describe('isValidCPF', () => {
    it('deve validar um CPF válido', () => {
      expect(isValidCPF('52998224725')).toBe(true);
    });
    it('deve invalidar um CPF inválido', () => {
      expect(isValidCPF('123')).toBe(false);
    });
  });

  describe('isValidCNPJ', () => {
    it('deve validar um CNPJ válido', () => {
      expect(isValidCNPJ('19131243000197')).toBe(true);
    });
    it('deve invalidar um CNPJ inválido', () => {
      expect(isValidCNPJ('123')).toBe(false);
    });
  });
});
