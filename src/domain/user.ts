export class User {
    public readonly name: String;
    public readonly age: number;
    public readonly registration: String;
    
    constructor (name?: string, age?: number, registration?: string) {
        if(name) this.name = name;
        if(age) this.age = age;
        if(registration) this.registration = registration;
    }
}