import { LightningElement, wire } from "lwc";
import { fireEvent } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";

export default class ContactSearch extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  searchText;

  inputHandler(event) {
    this.searchText = event.target.value;
    fireEvent(this.pageRef, "contactsearch", this.searchText);
  }
}