import { ArgumentsHost, BadRequestException } from '@nestjs/common';
import { AllExceptionsFilter } from '../../src/common/all-exceptions.filter';

describe('AllExceptionsFilter', () => {
  it('deve capturar BadRequestException e retornar response customizado', () => {
    const filter = new AllExceptionsFilter();
    const exception = new BadRequestException('Erro de validação');
    const mockJson = jest.fn();
    const mockSend = jest.fn();
    const mockStatus = () => ({ json: mockJson, send: mockSend });
    const mockGetResponse = () => ({ status: mockStatus, send: mockSend });
    const mockGetRequest = () => ({ url: '/rota' });
    const mockSwitchToHttp = () => ({
      getResponse: mockGetResponse,
      getRequest: mockGetRequest,
    });
    const mockHost = {
      switchToHttp: mockSwitchToHttp,
    } as unknown as ArgumentsHost;

    filter.catch(exception, mockHost);
    const expected = expect.objectContaining({
      statusCode: 400,
      message: expect.any(String),
      path: '/rota',
    });
    const jsonCalled = mockJson.mock.calls.some((call) =>
      expected.asymmetricMatch(call[0]),
    );
    const sendCalled = mockSend.mock.calls.some((call) =>
      expected.asymmetricMatch(call[0]),
    );
    expect(jsonCalled || sendCalled).toBe(true);
  });
});
