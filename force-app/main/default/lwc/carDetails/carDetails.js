import { LightningElement, track, api, wire } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { NavigationMixin, CurrentPageReference } from "lightning/navigation";

export default class CarDetails extends NavigationMixin(LightningElement) {
  @track activeTab;
  @api car;
  @wire(CurrentPageReference) pageRef;

  connectedCallback() {
    registerListener("carselect", this.carSelectHandler, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  carSelectHandler(payload) {
    this.car = payload;
  }

  goToCarRecordPage() {
    this[NavigationMixin.Navigate]({
      type: "standard__recordPage",
      attributes: {
        objectApiName: "Car__c",
        actionName: "view",
        recordId: this.car.Id
      }
    });
  }

  experienceAddedHandler() {
    const viewExperiencesComponent = this.template.querySelector(
      "c-view-experiences"
    );
    if (viewExperiencesComponent) {
      viewExperiencesComponent.getCarExperiences();
      this.activeTab = "viewexperiences";
    }
  }
}
