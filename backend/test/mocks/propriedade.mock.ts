// Mocks para propriedade
export const mockPropriedade = {
  id: 1,
  nome: 'Fazenda Bela Vista',
  cidade: 'Uberlândia',
  estado: 'MG',
  areaTotal: 100,
  produtorId: 1,
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockPropriedadeArray = [
  { ...mockPropriedade },
  {
    id: 2,
    nome: 'Sítio Esperança',
    cidade: 'Patos de Minas',
    estado: 'MG',
    areaTotal: 50,
    produtorId: 1,
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCreatePropriedadeDto = {
  nome: 'Nova Propriedade',
  cidade: 'Araxá',
  estado: 'MG',
  areaTotal: 80,
  areaAgricultavel: 60,
  areaVegetacao: 20,
  produtorId: 1,
};

export const mockUpdatePropriedadeDto = {
  nome: 'Propriedade Atualizada',
};

export const mockPropriedadeModel = {
  findAll: jest.fn().mockResolvedValue(mockPropriedadeArray),
  findByPk: jest
    .fn()
    .mockImplementation((id) =>
      Promise.resolve(mockPropriedadeArray.find((p) => p.id === id)),
    ),
  create: jest.fn().mockImplementation((dto) =>
    Promise.resolve({
      id: 3,
      ...dto,
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ),
};
