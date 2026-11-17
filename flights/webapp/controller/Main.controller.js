sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast",
    "../model/formatter"
], (Controller, MessageToast, formatter) => {
    "use strict";

    return Controller.extend("pl.tauron.db.flights.controller.Main", {
        formatter: formatter,

        onInit() {
            this._oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

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
            MessageToast.show(this._getText("comingSoon"));
        }
    });
});