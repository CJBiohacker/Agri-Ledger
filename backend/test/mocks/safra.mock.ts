// Mocks para safra
export const mockSafra = {
  id: 1,
  nome: 'Safra 2024',
  ano: 2024,
  propriedadeId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockSafraArray = [
  { ...mockSafra },
  {
    id: 2,
    nome: 'Safra 2023',
    ano: 2023,
    propriedadeId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCreateSafraDto = {
  nome: 'Nova Safra',
  ano: 2025,
  propriedadeId: 1,
};

export const mockUpdateSafraDto = {
  nome: 'Safra Atualizada',
};

export const mockSafraModel = {
  findAll: jest.fn().mockResolvedValue(mockSafraArray),
  findByPk: jest.fn().mockImplementation((id) =>
    Promise.resolve(mockSafraArray.find((s) => s.id === id))
  ),
  create: jest.fn().mockImplementation((dto) =>
    Promise.resolve({ id: 3, ...dto, createdAt: new Date(), updatedAt: new Date() })
  ),
};
