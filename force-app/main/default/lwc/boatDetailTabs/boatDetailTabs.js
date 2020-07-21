import { LightningElement, wire, track } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
import { getRecord } from "lightning/uiRecordApi";
import NAME_FIELD from "@salesforce/schema/Boat__c.Name";
import TYPE_FIELD from "@salesforce/schema/Boat__c.BoatType__r.Name";
import LENGTH_FIELD from "@salesforce/schema/Boat__c.Length__c";
import PRICE_FIELD from "@salesforce/schema/Boat__c.Price__c";
import DESCRIPTION_FIELD from "@salesforce/schema/Boat__c.Description__c";

const fields = [
  NAME_FIELD,
  TYPE_FIELD,
  LENGTH_FIELD,
  PRICE_FIELD,
  DESCRIPTION_FIELD
];

export default class BoatDetailTabs extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @track boatId;
  @track boat;
  @wire(getRecord, { recordId: "$boatId", fields })
  wiredBoat({ data, error }) {
    if (data) {
      this.boat = data;
      console.log(JSON.stringify(this.boat));
    } else if (error) {
      console.error(error.body.message);
    }
  }

  connectedCallback() {
    registerListener("boatselect", this.boatSelectHandler, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  boatSelectHandler(payload) {
    this.boatId = payload;
  }

  get detailsTabIconName() {
    if (this.boat) {
      return "utility:anchor";
    }
    return null;
  }

  get boatName() {
    if (this.boat) {
      return this.boat.fields.Name.value;
    }
  }

  get boatTypeName() {
    if (this.boat) {
      return this.boat.fields.BoatType__r.value.apiName;
    }
  }

  get boatLoaded() {
    if (this.boat) {
      return true;
    }
    return false;
  }
}
