const { mockConsole, restoreConsole } = require('./__mocks__/console');

beforeAll(mockConsole);

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(restoreConsole);
