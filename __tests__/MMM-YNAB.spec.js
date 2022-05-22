const {getMockData } = require('../__mocks__/mockData');

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
        const config = {
            token: 'YNAB_TOKEN',
            categories: [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ],
        };

        beforeEach(() => {
          MMMYNAB.setConfig(config);
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
            config
          );
        });

        test('interval requests data from node_helper', () => {
          MMMYNAB.start();
          global.setInterval.mock.calls[0][0]();

          expect(MMMYNAB.sendSocketNotification).toHaveBeenCalledTimes(2);
          expect(MMMYNAB.sendSocketNotification).toHaveBeenNthCalledWith(
            1,
            'YNAB_GET_DATA',
            config
          );
        });

    });

    describe('YNAB_UPDATE socket notification recieved with no budget id specified', () => {
        test('DOM is updated', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE', getMockData(5));

            expect(MMMYNAB.updateDom).toHaveBeenCalledWith(0);
        })

        test('Results are recorded from payload', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE',getMockData());

            expect(MMMYNAB.result).toStrictEqual(getMockData().budgets);
        });
    });

    describe('YNAB_UPDATE socket notification recieved with correct budget id ', () => {
        const config = {
            budgetId: 5,
        };

        beforeEach(() => {
            MMMYNAB.setConfig(config);
            global.setInterval = jest.fn();
        });

        test('DOM is updated', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE', getMockData(5));

            expect(MMMYNAB.updateDom).toHaveBeenCalledWith(0);
        })

        test('Results are recorded from payload', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE',getMockData(5));

            expect(MMMYNAB.result).toStrictEqual(getMockData().budgets);
        });
    });

    describe('YNAB_UPDATE socket notification recieved for different budget id', () => {
        const config = {
            budgetId: 5,
        };

        beforeEach(() => {
            MMMYNAB.setConfig(config);
            global.setInterval = jest.fn();
        });

        test('DOM is not updated', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE', getMockData(10));

            expect(MMMYNAB.updateDom).not.toHaveBeenCalled();
        })

        test('Results are not recorded from payload', () => {
            MMMYNAB.socketNotificationReceived('YNAB_UPDATE', getMockData(10));

            expect(MMMYNAB.result).toEqual([]);
        });
    });

    describe('getDom with no result', () => {
        test('Shows loading', () => {
            expect(MMMYNAB.getDom().outerHTML).toBe('<div class="xsmall">Loading YNAB</div>');
        });
    });

    describe('getDom with returned results', () => {
        test('Displays category budgets', () => {
            MMMYNAB.result =getMockData().budgets;

            var expectedHtml ='<div class="xsmall"><span class="ynab-name">Household</span><span class="ynab-balance">$10.00</span><span class="ynab-name">Pets</span><span class="ynab-balance">$2.00</span><span class="ynab-name">Grocery</span><span class="ynab-balance">$5.00</span><span class="ynab-name">Lunch</span><span class="ynab-balance">$7.50</span><span class="ynab-name">Kids Clothes</span><span class="ynab-balance">$3.00</span></div>'

            expect(MMMYNAB.getDom().outerHTML).toBe(expectedHtml);
        });
    })
});
