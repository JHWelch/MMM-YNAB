
ynab = require('ynab');

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

            // done();

            expect(helper.sendSocketNotification).toHaveBeenCalledWith(
                'YNAB_UPDATE',
                [
                    {
                        id: "24c9af68-0fc6-4c91-bb9d-50036aeb00ee",
                        category_group_id: "aa5f3910-a8c2-448d-9949-f903377e7f29",
                        name: "Household",
                        hidden: false,
                        original_category_group_id: null,
                        note: null,
                        budgeted: 0,
                        activity: 0,
                        balance: 0,
                        goal_type: null,
                        goal_creation_month: null,
                        goal_target: 0,
                        goal_target_month: null,
                        goal_percentage_complete: null,
                        goal_months_to_budget: null,
                        goal_under_funded: null,
                        goal_overall_funded: null,
                        goal_overall_left: null,
                        deleted: false
                    },
                    {
                        id: "ee9fbb45-4b97-4695-ae78-601bed77c824",
                        category_group_id: "aa5f3910-a8c2-448d-9949-f903377e7f29",
                        name: "Pets",
                        hidden: false,
                        original_category_group_id: null,
                        note: null,
                        budgeted: 0,
                        activity: 0,
                        balance: 0,
                        goal_type: null,
                        goal_creation_month: null,
                        goal_target: 0,
                        goal_target_month: null,
                        goal_percentage_complete: null,
                        goal_months_to_budget: null,
                        goal_under_funded: null,
                        goal_overall_funded: null,
                        goal_overall_left: null,
                        deleted: false
                    },
                    {
                        id: "b694936b-b267-47d2-a63a-fee821cfaa1c",
                        category_group_id: "aa5f3910-a8c2-448d-9949-f903377e7f29",
                        name: "Grocery",
                        hidden: false,
                        original_category_group_id: null,
                        note: null,
                        budgeted: 0,
                        activity: 0,
                        balance: 0,
                        goal_type: null,
                        goal_creation_month: null,
                        goal_target: 0,
                        goal_target_month: null,
                        goal_percentage_complete: null,
                        goal_months_to_budget: null,
                        goal_under_funded: null,
                        goal_overall_funded: null,
                        goal_overall_left: null,
                        deleted: false
                      },
                    {
                        id: "c092992a-db1b-4720-b309-a2a1a36e8f0f",
                        category_group_id: "aa5f3910-a8c2-448d-9949-f903377e7f29",
                        name: "Lunch",
                        hidden: false,
                        original_category_group_id: null,
                        note: null,
                        budgeted: 0,
                        activity: 0,
                        balance: 0,
                        goal_type: null,
                        goal_creation_month: null,
                        goal_target: 0,
                        goal_target_month: null,
                        goal_percentage_complete: null,
                        goal_months_to_budget: null,
                        goal_under_funded: null,
                        goal_overall_funded: null,
                        goal_overall_left: null,
                        deleted: false
                    },
                    {
                        id: "389143b9-9da7-4c35-8cd6-4635a582470a",
                        category_group_id: "aa5f3910-a8c2-448d-9949-f903377e7f29",
                        name: "Kids Clothes",
                        hidden: false,
                        original_category_group_id: null,
                        note: null,
                        budgeted: 0,
                        activity: 0,
                        balance: 0,
                        goal_type: null,
                        goal_creation_month: null,
                        goal_target: 0,
                        goal_target_month: null,
                        goal_percentage_complete: null,
                        goal_months_to_budget: null,
                        goal_under_funded: null,
                        goal_overall_funded: null,
                        goal_overall_left: null,
                        deleted: false
                    }
                ]
            );
        });
    });

 });
