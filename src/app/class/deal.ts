export class Deal{
    name!:string
    sms!:number
    calls!:number
    data!:number // In Mo
    validity!:number //Number of days
    price!:number
    
    constructor(){
        this.name = "";
        this.sms = 0;
        this.calls = 0;
        this.data = 0;
        this.validity = 0;
        this.price = 0;
    }
}