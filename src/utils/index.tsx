export function className(...classes:any[]){
    return classes.filter(Boolean).join(" ");
}

export const getNonNullValue = (value: any) => {
    if(value != ""){
        return value;
    }else{
        return undefined
    }
}