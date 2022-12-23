export class DealForm{
    priority!:{
        sms:number
        call:number
        data:number
    }
    validity:number = 0
    price:number = 0

    constructor(){
        let p = {
            sms: 0,
            call: 0,
            data: 0
        }
        this.priority = p
    }
}