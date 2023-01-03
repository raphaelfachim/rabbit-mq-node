export class MQConcat {

    static execute(obj: any, template: any): string {
        var message: string = "";
        
        const keys = Object.keys(obj);
        for(var key of keys){
            message = message.concat(obj[key]);
            var templateKey = key.concat("Len");
            message = message.concat(" ".repeat(template[templateKey] - obj[key].toString().length));
        }
        return message;
    }

}