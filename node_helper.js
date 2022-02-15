const ynab = require('ynab');
var NodeHelper = require("node_helper");

module.exports = NodeHelper.create({

	socketNotificationReceived: function (noti, payload) {
		if (noti == "YNAB_GET_DATA") {
			this.initialize(payload);
		}
	},

	initialize: function (payload) {
		self = this;
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

	setInterval: function () {
		if (!interval) {
			interval = setInterval(self.updateBudget, 90000);
		}
	},

	updateBudget: function (payload) {
		var ynabAPI = new ynab.API(payload.token);

		ynabAPI.categories.getCategories(ynabBudgetId).then(categoriesResponse => {
			console.log(JSON.stringify(categoriesResponse));
			const map = [].concat(...Array.from(categoriesResponse.data.category_groups.map(a => Array.from(a.categories)))).reduce((map, o) => { map[o.name] = o; return map; }, new Map());
			var list = payload.categories.map(a => map[a]).filter(a => a != undefined);
			self.sendSocketNotification("YNAB_UPDATE", {
				items: list,
			});
		}).catch(e => {
			console.log("error: " + e);
		});
	}
});
