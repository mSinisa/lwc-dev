import { LightningElement, wire, track } from "lwc";
import { registerListener, unregisterAllListeners } from "c/pubsub";
import { CurrentPageReference } from "lightning/navigation";
import FIRST_NAME_FIELD from "@salesforce/schema/Contact.FirstName";
import LAST_NAME_FIELD from "@salesforce/schema/Contact.LastName";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Contact.AccountId";
import DEPARTMENT_FIELD from "@salesforce/schema/Contact.Department";
import EMAIL_FIELD from "@salesforce/schema/Contact.Email";
import PHONE_FIELD from "@salesforce/schema/Contact.Phone";
import TITLE_FIELD from "@salesforce/schema/Contact.Title";

const formFields = [
  FIRST_NAME_FIELD,
  LAST_NAME_FIELD,
  ACCOUNT_NAME_FIELD,
  DEPARTMENT_FIELD,
  EMAIL_FIELD,
  PHONE_FIELD,
  TITLE_FIELD
];

export default class ContactDetailsPubSub extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @track contact;
  @track fields = this.formFields;
  objectApiName = "Contact";
  fields = formFields;

  connectedCallback() {
    registerListener("contactselect", this.getContactInfo, this);
  }

  disconnectedCallback() {
    unregisterAllListeners(this);
  }

  getContactInfo(payload) {
    this.contact = payload;
    console.log(payload);
  }

  handleSubmit(event) {}
}