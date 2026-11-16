sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageToast"
], (Controller, MessageToast) => {
    "use strict";

    return Controller.extend("pl.tauron.db.flights.controller.Main", {
        onInit() {
            // let iNumberRoom = 123;
            // let iNumberRoom2 = "123";
            // let sCity = "Warszawa";
            // debugger;

            // // iNumberRoom = sCity;

            // console.log("iNumberRoom == iNumberRoom2: " + (iNumberRoom == iNumberRoom2))
            // console.log("iNumberRoom === iNumberRoom2: " + (iNumberRoom === iNumberRoom2))
            // console.log(iNumberRoom = iNumberRoom2)

            this._oBundle = this.getOwnerComponent().getModel("i18n").getResourceBundle();

        },

        onGreet(oEvent) {
            var sName = this.byId("nameInput").getValue();
            if(!sName) {
                MessageToast.show(this._oBundle.getText("nameMissing"));
                return;
            }

			MessageToast.show(this._oBundle.getText("greeting", [sName]));
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
        }
    });
});