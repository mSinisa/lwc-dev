import { LightningElement, track, api, wire } from "lwc";
import getExperiences from "@salesforce/apex/ViewCarExperiencesController.getExperiences";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

export default class ViewExperiences extends NavigationMixin(LightningElement) {
  @track carExperiences = [];
  // @api carId;
  privateCarId;

  connectedCallback() {
    this.getCarExperiences();
  }

  @api
  get carId() {
    return this.privateCarId;
  }

  set carId(value) {
    this.privateCarId = value;
    this.getCarExperiences();
  }

  @api
  getCarExperiences() {
    getExperiences({ carId: this.privateCarId })
      .then(data => {
        this.carExperiences = data;
      })
      .catch(error => {
        console.error(error.body.message);
        this.showToast("ERROR", error.body.message, "error");
      });
  }

  userClickHandler(event) {
    const userId = event.target.getAttribute("data-userid");
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        objectApiName: "User",
        actionName: "view",
        recordId: userId
      }
    });
  }

  get hasExperiences() {
    if (this.carExperiences.length > 0) {
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
