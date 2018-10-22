export class People {
  firstName: any;
  lastName: string;

  constructor(name: string) {
    const commaPos = name.indexOf(", ");
    if (commaPos > 0) {
      this.lastName = name.substring(0, commaPos);
      this.firstName = name.substring(commaPos + 2);
    } else {
      var namesSplitPos = name.lastIndexOf(' ');
      this.firstName = name.substring(0, namesSplitPos);
      this.lastName = name.substring(namesSplitPos + 1);
    }
  }

  toString() {
    return `${this.firstName} ${this.lastName}`;
  }
}