Module.register("MMM-YNAB", {
    result: [],
    defaults: {
        token: "",
        categories: [ "Household", "Pets", "Grocery", "Lunch", "Kids Clothes", "Restaurants", "Spontaneous Fun" ]
    },

    start: function () {
        Log.info(`Starting module: ${this.name}`);
        const self = this;

        this.getData();

        setInterval(() => {
          self.getData();
        }, 90000);
    },

    getDom: function () {
        var wrapper = document.createElement("div");
        wrapper.classList = ["xsmall"];
        wrapper.innerHTML = "Loading YNAB";
        if (this.result && this.result.length > 0) {
            for (let i of this.result) {
                wrapper.innerHTML = this.result.map(a => "<span class='ynab-name'>" + a.name + "</span><span class='ynab-balance'>$" + (a.balance/1000).toFixed(2) + "</span>").join('');
            }
        }
        return wrapper;
    },

    socketNotificationReceived: function (notification, payload) {
        console.log("notification: " + notification);
        console.log("payload: " + JSON.stringify(payload));
        if (notification == "YNAB_UPDATE") {
            this.result = payload;
            this.updateDom(0);
        }
    },

    getStyles: function() {
        return [
            this.file('MMM-YNAB.css')
        ]
    },

    getData: function() {
        this.sendSocketNotification('YNAB_GET_DATA', this.config);
    }
});
