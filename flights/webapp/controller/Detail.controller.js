sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/core/routing/History",
    "sap/m/MessageToast"
], function (Controller, History, MessageToast) {
    "use strict";

    return Controller.extend("pl.tauron.db.flights.controller.Detail", {

        onInit: function () {
            this.getOwnerComponent().getRouter().getRoute("RouteDetail")
                .attachPatternMatched(this._onPatternMatched, this);
        },

        _getText: function (sKey, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, aArgs);
        },

        _onPatternMatched: function (oEvent) {
            var oArgs = oEvent.getParameter("arguments");
            var oModel = this.getOwnerComponent().getModel();
            var oView = this.getView();

            oModel.metadataLoaded().then(function () {
                var sPath = oModel.createKey("/Connection", {
                    CarrierId: oArgs.carrierId,
                    ConnectionId: oArgs.connId
                });

                oView.bindElement({
                    path: sPath,
                    parameters: { expand: "to_Flight" },
                    events: {
                        dataRequested: function () {
                            oView.setBusy(true);
                        },
                        dataReceived: function (oDataEvent) {
                            oView.setBusy(false);
                            if (!oDataEvent.getParameter("data")) {
                                MessageToast.show(this._getText("connectionNotFound", [oArgs.carrierId, oArgs.connectionId]));
                                this.getOwnerComponent().getRouter().navTo("RouteMain", {}, true);
                            }
                        }.bind(this)
                    }
                });


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