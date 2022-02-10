describe('MMM-YNAB', () => {
    beforeAll(() => {
        require('../__mocks__/Module');
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
});
