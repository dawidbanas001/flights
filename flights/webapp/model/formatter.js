sap.ui.define([], function () {
    "use strict";

    return {
        statusState: function (sStatus) {
            switch (sStatus) {
                case "Active": return "Success";
                case "Inactive": return "Error";
                default: return "None";
            }
        },

        countTitle: function (sTitle, aItems) {
            return sTitle + " (" + (aItems ? aItems.length : 0) + ")";
        }
    };
});
