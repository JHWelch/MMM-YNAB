const ynab = require('ynab');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	socketNotificationReceived (noti, payload) {
		if (noti == "YNAB_GET_DATA") {
			this.initialize(payload);
		}
	},

	initialize (payload) {
		var ynabAPI = new ynab.API(payload.token);

		if (payload.budgetId) {
			ynabBudgetId = payload.budgetId;
			this.updateBudget(payload);
			// this.setInterval();

			return;
		}

		ynabAPI.budgets.getBudgets().then(budgetsResponse => {
			ynabBudgetId = budgetsResponse.data.budgets[0].id;
			this.updateBudget(payload);
			// this.setInterval();
		}).catch(e => {
			console.log("error: " + e);
		});
	},

	setInterval () {
		if (!interval) {
			interval = setInterval(this.updateBudget, 90000);
		}
	},

	async updateBudget (payload) {
		var ynabAPI = new ynab.API(payload.token);

		categoriesResponse = ynabAPI.categories.getCategories(ynabBudgetId).then(categoriesResponse => {
            const map = [].concat(...Array.from(categoriesResponse.data.category_groups.map(a => Array.from(a.categories))))
                    .reduce((map, o) => { map[o.name] = o; return map; }, new Map());

            var list = payload.categories.map(a => map[a]).filter(a => a != undefined);

            this.sendSocketNotification("YNAB_UPDATE", list);
		}).catch(e => {
			console.log("error: " + e);
		});
	}
});
