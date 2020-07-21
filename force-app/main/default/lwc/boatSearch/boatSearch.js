import { LightningElement, wire } from "lwc";
import { NavigationMixin } from "lightning/navigation";
import { CurrentPageReference } from "lightning/navigation";

export default class BoatSearch extends NavigationMixin(LightningElement) {
  @wire(CurrentPageReference) pageRef;
  boatTypeId = "";
  spinnerClass = "display: none;";
  // Handles loading event
  handleLoading() {
    this.spinnerClass = "display: block;";
  }

  // Handles done loading event
  handleDoneLoading() {
    this.spinnerClass = "display: none;";
  }

  // Handles search boat event
  // This custom event comes from the form
  searchBoats(event) {
    this.boatTypeId = event.detail;
    const searchResultsComponent = this.template.querySelector(
      "c-boat-search-results"
    );
    searchResultsComponent.searchBoats(this.boatTypeId);
  }

  createNewBoat() {
    this[NavigationMixin.Navigate]({
      type: "standard__objectPage",
      attributes: {
        objectApiName: "Boat__c",
        actionName: "new"
      }
    });
  }
}
