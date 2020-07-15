import { LightningElement, track } from "lwc";

export default class CarSearch extends LightningElement {
  @track carTypeId;

  handleCarTypeSelectHandler(event) {
    this.carTypeId = event.detail;
  }
}
