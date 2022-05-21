require('setimmediate');

const { mockConsole, restoreConsole } = require('./__mocks__/console');

global.waitForAsync = () => new Promise(resolve => setImmediate(resolve));

afterEach(() => {
  jest.clearAllMocks();
});

afterAll(restoreConsole);
