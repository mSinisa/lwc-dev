import { LightningElement, api, wire } from "lwc";
import { CurrentPageReference } from "lightning/navigation";
import { fireEvent } from "c/pubsub";

export default class BoatTile extends LightningElement {
  @wire(CurrentPageReference) pageRef;
  @api boat;
  @api selectedBoatId;

  // Getter for dynamically setting the background image for the picture
  get backgroundStyle() {
    return `background-image:url(${this.boat.Picture__c})`;
  }

  // Getter for dynamically setting the tile class based on whether the
  // current boat is selected
  get tileClass() {
    if (this.boat.Id === this.selectedBoatId) {
      return "tile-wrapper selected";
    }
    return "tile-wrapper";
  }

  // Fires event with the Id of the boat that has been selected.
  selectBoat() {
    const boatId = this.boat.Id;

    const selectedBoat = new CustomEvent("boatselect", {
      detail: boatId
    });
    this.dispatchEvent(selectedBoat);

    fireEvent(this.pageRef, "boatselect", this.boat.Id);
  }
}
