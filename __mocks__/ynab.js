const mock = jest.fn().mockImplementation(() => {
    const { generateResponse } = require('../__mocks__/mockResponse');

    return { categories: {
        getCategories: async () => { return generateResponse() },
    }};
});

exports.API = mock;
