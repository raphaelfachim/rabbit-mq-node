export class User {
    public name: string;
    public age: number;
    public registration: string;
    
    constructor (name?: string, age?: number, registration?: string) {
        if(name) this.name = name;
        if(age) this.age = age;
        if(registration) this.registration = registration;
    }
}