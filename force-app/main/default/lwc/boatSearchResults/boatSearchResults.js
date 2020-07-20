import { LightningElement, api, wire, track } from "lwc";
import getBoats from "@salesforce/apex/BoatDataService.getBoats";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class BoatSearchResults extends LightningElement {
  @api boatTypeId;
  @track boats = [];
  selectedBoatId;

  @api searchBoats(boatTypeId) {
    const loading = new CustomEvent("loading");
    this.dispatchEvent(loading);
    getBoats({ boatTypeId: boatTypeId })
      .then(boats => {
        this.boats = boats;
        const doneLoading = new CustomEvent("doneloading");
        this.dispatchEvent(doneLoading);
      })
      .catch(error => {
        this.showToast("ERROR", error.body.message, "error");
      });
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  }

  get boatsFound() {
    if (this.boats.length > 0) {
      return true;
    }
    return false;
  }

  boatSelectHandler(event) {
    const boatId = event.detail;
    this.selectedBoatId = boatId;
  }
}
