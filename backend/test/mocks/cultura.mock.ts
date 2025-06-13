// Mocks para cultura
export const mockCultura = {
  id: 1,
  nome: 'Soja',
  safraId: 1,
  area: 50,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockCulturaArray = [
  { ...mockCultura },
  {
    id: 2,
    nome: 'Milho',
    safraId: 1,
    area: 30,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCreateCulturaDto = {
  nome: 'Feijão',
  safraId: 1,
  area: 20,
};

export const mockUpdateCulturaDto = {
  nome: 'Cultura Atualizada',
};

export const mockCulturaModel = {
  findAll: jest.fn().mockResolvedValue(mockCulturaArray),
  findByPk: jest.fn().mockImplementation((id) =>
    Promise.resolve(mockCulturaArray.find((c) => c.id === id))
  ),
  create: jest.fn().mockImplementation((dto) =>
    Promise.resolve({ id: 3, ...dto, createdAt: new Date(), updatedAt: new Date() })
  ),
};
