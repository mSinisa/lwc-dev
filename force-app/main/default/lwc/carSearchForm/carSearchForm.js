import { LightningElement, wire, track } from "lwc";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";
import getCarTypes from "@salesforce/apex/CarSearchFormController.getCarTypes";

export default class CarSearchForm extends NavigationMixin(LightningElement) {
  @track carTypes;

  @wire(CurrentPageReference) pageRef;
  @wire(getCarTypes) wiredCarTypes({ error, data }) {
    if (data) {
      this.carTypes = [{ label: "All Types", value: "" }];
      data.forEach(carType => {
        let type = {};
        type.label = carType.Name;
        type.value = carType.Id;
        this.carTypes.push(type);
      });
    } else if (error) {
      this.showToast("ERROR", error.body.message, "error");
    }
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }

  handleCarTypeChange(event) {
    const carTypeId = event.target.value;
    const carSelect = new CustomEvent("cartypeselect", { detail: carTypeId });
    this.dispatchEvent(carSelect);
  }

  createNewCarType() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Car_Type__c",
        actionName: "new"
      }
    });
  }
}
