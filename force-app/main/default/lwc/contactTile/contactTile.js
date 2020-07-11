import { LightningElement, api, wire } from "lwc";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class ContactTile extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @api contact;
  contactSelect(event) {
    fireEvent(this.pageRef, "contactselect", this.contact);
  }
}
