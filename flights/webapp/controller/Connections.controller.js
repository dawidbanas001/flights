sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast",
    "sap/ui/model/json/JSONModel",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
    "sap/ui/model/FilterType",
    "sap/ui/model/Sorter"

], function (Controller, History, MessageToast, JSONModel, Filter, FilterOperator, FilterType, Sorter) {
    "use strict";

    return Controller.extend("pl.tauron.db.flights.controller.Connections", {

        onInit() {
            this._bDescending = false;
            this.getView().setModel(new JSONModel({ title: "" }), "viewList");
        },

        _getText(sKey, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, aArgs);
        },

        onUpdateFinished(oEvent) {
            var iTotal = oEvent.getParameter("total");
            this.getView().getModel("viewList").setProperty("/title", this._getText("connectionsCount", [iTotal]));
        },

        onSort() {
            this._bDescending = !this._bDescending;
            this.byId("connectionTable").getBinding("items").sort([
                new Sorter("CarrierName", false, true),
                new Sorter("Distance", this._bDescending)
            ]);
        },

        onSearch(oEvent) {
            var sQuery = oEvent.getSource().getValue().trim();
            var aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter({
                    filters: [
                        new Filter("CarrierName", FilterOperator.Contains, sQuery),
                        new Filter("AirportFromId", FilterOperator.EQ, sQuery.toUpperCase()),
                        new Filter("AirportToId", FilterOperator.EQ, sQuery.toUpperCase())
                    ],
                    and: false
                }));
            }
            this.byId("connectionTable").getBinding("items").filter(aFilters, FilterType.Application);
        },

        onPress: function (oEvent) {
            var oContext = oEvent.getSource().getBindingContext();
            this.getOwnerComponent().getRouter().navTo("RouteDetail", {
                carrierId: oContext.getProperty("CarrierId"),
                connId: oContext.getProperty("ConnectionId")
            });

        },

        onShowCarriers: function () {
            this.getOwnerComponent().getRouter().navTo("RouteCarriers");
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