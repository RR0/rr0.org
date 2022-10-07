export class People {

  constructor(readonly lastName: string, readonly firstNames: string[], readonly url: string | undefined) {
  }

  get fullName(): string {
    return this.firstNames.join(" ") + " " + this.lastName
  }
}
