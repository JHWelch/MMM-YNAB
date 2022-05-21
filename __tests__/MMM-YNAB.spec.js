const { mockData } = require('../__mocks__/mockData');

describe('MMM-YNAB', () => {
    beforeAll(() => {
        require('../__mocks__/Module');
        require('../__mocks__/Logger');
    });

    const name = 'MMM-YNAB';

    let MMMYNAB;

    beforeEach(() => {
        jest.resetModules();
        require('../MMM-YNAB');

        MMMYNAB = global.Module.create(name);
        MMMYNAB.setData({ name, identifier: `Module_1_${name}` });
    });

    describe('Defaults', () => {
        test('token is empty', () => {
            expect(MMMYNAB.defaults.token).toBe('');
        });

        test('categories is default list', () => {
            expect(MMMYNAB.defaults.categories)
                .toStrictEqual(["Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun"]);
        });
    });

    describe('start', () => {
        const originalInterval = setInterval;
        const configObject = {
            token: 'YNAB_TOKEN',
            categories: [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ],
        };

        beforeEach(() => {
          MMMYNAB.setConfig(configObject);
          global.setInterval = jest.fn();
        });

        afterEach(() => {
          global.setInterval = originalInterval;
        });

        test('logs start of module', () => {
          MMMYNAB.start();

          expect(global.Log.info).toHaveBeenNthCalledWith(
            1,
            'Starting module: MMM-YNAB'
          );
        });

        test('requests data from node_helper with config variables', () => {
          MMMYNAB.start();

          expect(MMMYNAB.sendSocketNotification).toHaveBeenNthCalledWith(
            1,
            'YNAB_GET_DATA',
            configObject
          );
        });

        test('interval requests data from node_helper', () => {
          MMMYNAB.start();
          global.setInterval.mock.calls[0][0]();

          expect(MMMYNAB.sendSocketNotification).toHaveBeenCalledTimes(2);
          expect(MMMYNAB.sendSocketNotification).toHaveBeenNthCalledWith(
            1,
            'YNAB_GET_DATA',
            configObject
          );
        });

    });

    describe('YNAB_UPDATE socket notification recieved', () => {
        test('DOM is updated', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE', mockData);

            expect(MMMYNAB.updateDom).toHaveBeenCalledWith(0);
        })

        test('Results are recorded from payload', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE', mockData);

            expect(MMMYNAB.result).toBe(mockData);
        });
    });
});
