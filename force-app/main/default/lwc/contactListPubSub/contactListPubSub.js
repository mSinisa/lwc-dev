import { LightningElement, track, wire } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
import getContacts from "@salesforce/apex/ContactController.getContacts";
import { ShowToastEvent } from "lightning/platformShowToastEvent";

export default class ContactListPubSub extends LightningElement {
  searchText;
  @track contacts;
  @wire(CurrentPageReference) pageRef;

  @wire(getContacts, { textSearch: "$searchText" })
  wiredContacts({ data, error }) {
    if (data) {
      this.contacts = data;
    } else if (error) {
      this.showToast("ERROR", error.body.message, "error");
    }
  }

  connectedCallback() {
    getContacts({ textSearch: "" })
      .then(data => {
        this.contacts = data;
      })
      .catch(err => {
        console.log(error.body.message);
      });
    registerListener("contactsearch", this.handleSearch, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  handleSearch(searchedText) {
    this.searchText = searchedText;
  }

  showToast(title, message, variant) {
    const evt = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(evt);
  }
}
