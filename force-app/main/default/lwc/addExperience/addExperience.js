import { LightningElement, api, track } from "lwc";
import { createRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from "lightning/platformShowToastEvent";
import CAR_EXPERIENCE_OBJECT from "@salesforce/schema/Car_Experience__c";
import NAME_FIELD from "@salesforce/schema/Car_Experience__c.Name";
import EXPERIENCE_FIELD from "@salesforce/schema/Car_Experience__c.Experience__c";
import CAR_FIELD from "@salesforce/schema/Car_Experience__c.Car__c";

export default class AddExperience extends LightningElement {
  @api carId;
  title;
  experience;

  handleTitleChange(event) {
    this.title = event.target.value;
  }

  handleExperienceChange(event) {
    this.experience = event.target.value;
  }

  createExperienceRecord() {
    const fields = {};
    fields[NAME_FIELD.fieldApiName] = this.title;
    fields[EXPERIENCE_FIELD.fieldApiName] = this.experience;
    fields[CAR_FIELD.fieldApiName] = this.carId;

    const recordInput = {
      apiName: CAR_EXPERIENCE_OBJECT.objectApiName,
      fields
    };

    createRecord(recordInput)
      .then(experienceRecord => {
        this.showToast("SUCCESS", "Experience Record Created", "success");
        const recordAdded = new CustomEvent("experienceadded");
        this.dispatchEvent(recordAdded);
      })
      .catch(error => {
        this.showToast("ERROR", error, "error");
        // this.showToast("ERROR", error.body.message, "error");
      });
  }

  showToast(title, message, variant) {
    const event = new ShowToastEvent({
      title: title,
      message: message,
      variant: variant
    });
    this.dispatchEvent(event);
  }

  // clearFieldInputs() {
  //   const titleField = this.template.getElementById("titleInput");
  //   console.log("hello", titleField.value);
  //   console.log("hello", titleField.innerText);
  //   console.log("hello", titleField);
  // }
}
