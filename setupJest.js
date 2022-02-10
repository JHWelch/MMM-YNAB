const { mockConsole, restoreConsole } = require('./__mocks__/console');

beforeAll(mockConsole);

afterEach(() => {
  fetchMock.mockClear();
  jest.clearAllMocks();
});

afterAll(restoreConsole);
