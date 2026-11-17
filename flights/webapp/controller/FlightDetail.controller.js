sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, History, MessageToast) {
    "use strict";

    return Controller.extend("pl.tauron.db.flights.controller.FlightDetail", {

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteFlight")
                .attachPatternMatched(this._onPatternMatched, this);
        },

        _getText: function (sKey, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, aArgs);
        },

        _onPatternMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oModel = this.getOwnerComponent().getModel("carriers");

            // po odświeżeniu strony plik JSON może się jeszcze ładować
            oModel.dataLoaded().then(function () {
                var aFlights = oModel.getProperty("/Flights") || [];
                var iIndex = aFlights.findIndex(function (oFlight) {
                    return oFlight.carrierId === oArgs.carrierId && oFlight.connId === oArgs.connId;
                });

                if (iIndex < 0) {
                    MessageToast.show(this._getText("flightNotFound", [oArgs.carrierId, oArgs.connId]));
                    this.getOwnerComponent().getRouter().navTo("RouteMain", {}, true);
                    return;
                }
                this.getView().bindElement({ path: "/Flights/" + iIndex, model: "carriers" });
            }.bind(this));
        },


        onNavBack() {
            if (History.getInstance().getPreviousHash() !== undefined) {
                window.history.go(-1);
            } else {
                this.getOwnerComponent().getRouter().navTo("RouteMain", {}, true);
            }
        }

    });
});