// Mocks centralizados para testes de Produtor
export const mockProdutor = {
  id: 1,
  nome: 'João da Silva',
  cpfCnpj: '12345678901',
  propriedades: [],
  createdAt: new Date(),
  updatedAt: new Date(),
};

export const mockProdutorArray = [
  { ...mockProdutor },
  {
    id: 2,
    nome: 'Maria Souza',
    cpfCnpj: '98765432100',
    propriedades: [],
    createdAt: new Date(),
    updatedAt: new Date(),
  },
];

export const mockCreateProdutorDto = {
  nome: 'Novo Produtor',
  cpfCnpj: '52998224725', // CPF válido para passar na validação
};

export const mockUpdateProdutorDto = {
  nome: 'Produtor Atualizado',
};

export const mockProdutorModel = {
  findAll: jest.fn().mockResolvedValue(mockProdutorArray),
  findByPk: jest
    .fn()
    .mockImplementation((id) =>
      Promise.resolve(mockProdutorArray.find((p) => p.id === id)),
    ),
  create: jest.fn().mockImplementation((dto) =>
    Promise.resolve({
      id: 3,
      ...dto,
      propriedades: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    }),
  ),
};
