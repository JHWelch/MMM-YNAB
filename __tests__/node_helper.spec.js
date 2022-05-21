
ynab = require('ynab');
const { getMockData } = require('../__mocks__/mockData');

const categories = [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ];

describe('node_helper', () => {
    let helper;

    beforeEach(() => {
        helper = require('../node_helper');
        helper.setName('MMM-YNAB');
    });

    describe('YNAB_GET_DATA socket notification received', () => {
        test('It creates an API instance with the token', () => {
            helper.socketNotificationReceived('YNAB_GET_DATA', {
                token: 'YNAB_TOKEN',
                budgetId: 1,
                categories: categories
            });

            expect(ynab.API).toHaveBeenCalledWith('YNAB_TOKEN');
        });

        test('it sends socket notification with categories', async () => {
            helper.socketNotificationReceived('YNAB_GET_DATA', {
                token: 'YNAB_TOKEN',
                budgetId: 1,
                categories: categories
            });

            await waitForAsync();

            expect(helper.sendSocketNotification).toHaveBeenCalledWith(
                'YNAB_UPDATE',
                getMockData(1),
            );
        });
    });

 });
