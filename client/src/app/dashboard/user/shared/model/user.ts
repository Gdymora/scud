export class User {
    static createBlank(): User {
        return new User();
    }

    clone(): User {
        return new User(this.name, this.lastName, this.tags, this.id);
    }

    get fullName(): string {
        return `${this.name} ${this.lastName}`;
    }

    get valid(): boolean {
        return this.name.length > 0 && this.lastName.length > 0;
    }

    constructor(
        public name: string = '',
        public lastName: string = '',
        public tags: string[] = [],
        public id?: string
    ) { }
}