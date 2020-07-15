import { LightningElement, api, wire, track } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import getCars from "@salesforce/apex/CarSearchResultController.getCars";

export default class CarSearchResult extends LightningElement {
  @api carTypeId;

  @track cars;
  @track selectedCarId;

  @wire(CurrentPageReference) pageRef;

  @wire(getCars, { carTypeId: "$carTypeId" }) wiredCars({ data, error }) {
    if (data) {
      this.cars = data;
    } else if (error) {
      this.showToast("ERROR", error.body.message, "error");
    }
  }

  carSelectHandler(event) {
    const carId = event.detail;
    this.selectedCarId = carId;
  }

  connectedCallback() {
    getCars({ carTypeId: "" })
      .then(response => {
        this.cars = response;
      })
      .catch(error => {
        this.showToast("ERROR", error.body.message, "error");
      });
  }

  get carsFound() {
    if (this.cars) {
      return true;
    }
    return false;
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }
}
