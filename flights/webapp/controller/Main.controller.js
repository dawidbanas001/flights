sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter",
    "sap/ui/model/json/JSONModel"
], (Controller, MessageToast, formatter, JSONModel) => {
    "use strict";

    return Controller.extend("pl.tauron.db.flights.controller.Main", {
        formatter: formatter,

        onInit() {
            this._oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();
            // var oNewCarrier = { newCarrier: {} };
            // var oJsonModel = new JSONModel(oNewCarrier);
            // this.getView().setModel(oJsonModel, "view");

            this.getView().setModel(new JSONModel({ newCarrier: {} }), "view");
        },

        _getText(sKey, aArgs) {
            return this.getOwnerComponent().getModel("i18n").getResourceBundle().getText(sKey, aArgs);
        },


        onGreet(oEvent) {
            var sName = this.byId("nameInput").getValue();
            // if(!sName) {
            //     MessageToast.show(this._oBundle.getText("nameMissing"));
            //     return;
            // }

			// MessageToast.show(this._oBundle.getText("greeting", [sName]));


            MessageToast.show(sName ? this._getText("greeting", [sName]) : this._getText("nameMissing"));

        },

        onNameLiveChange(oEvent) {
            var oInput = oEvent.getSource();
            var sName = oInput.getValue();
            var oButton = this.byId("nameButton");

            if (sName.length === 0) {
                oInput.setValueState(sap.ui.core.ValueState.Error);
                oInput.setValueStateText(this._oBundle.getText("emptyNameError"));
                oButton.setEnabled(false);
            } else {
                oInput.setValueState(sap.ui.core.ValueState.None);
                oButton.setEnabled(true)
            }
        },

        onOpenAddDialog(oEvent) {
            // MessageToast.show(this._oBundle.getText("comingSoon"));
            // MessageToast.show(this._getText("comingSoon"));
            var oNewCarrier = {
                id: "", name: "", currency: "EUR", avgPrice: 0, status: "Active"
            };
            this.getView().getModel("view").setProperty("/newCarrier", oNewCarrier);

            if (!this._pAddDialog) {
                this._pAddDialog = this.loadFragment({
                    name: "pl.tauron.db.flights.view.fragments.AddCarrierDialog"
                });
            }
            this._pAddDialog.then(function (oDialog) {
                oDialog.open();
            });

        },

        onCloseDialog() {
            this.byId("addCarrierDialog").close();
        },

        onSaveCarrier() {
            var oCarrierModel = this.getView().getModel("carriers");
            var oNew = Object.assign({}, this.getView().getModel("view").getProperty("/newCarrier"));
            var aCarriers = oCarrierModel.getProperty("/Carriers");

            oCarrierModel.setProperty("/Carriers", aCarriers.concat([oNew]));
            this.byId("addCarrierDialog").close();
            MessageToast.show(this._oBundle.getText("carrierAdded", [oNew.id]));
        },

        onFlightPress(oEvent) {
            var oContext = oEvent.getSource().getBindingContext("carriers");
            this.getOwnerComponent().getRouter().navTo("RouteFlight", {
                carrierId: oContext.getProperty("carrierId"),
                connId: oContext.getProperty("connId")
            });
        },

        onOpenConnections() {
            this.getOwnerComponent().getRouter().navTo("RouteConnections")
        }
    });
});