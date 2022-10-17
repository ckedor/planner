// Debug useful functions
export async function delay(delayInms:any) {
    return new Promise(resolve => setTimeout(resolve, delayInms));
}

// Date/Time
export function dateToString(date:Date, format:string) {
    if (format === "MM/YYYY"){
        return date.toLocaleDateString('pt-br').slice(3)
    } else if (format === "YYYY-MM-DD"){
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000))
        return date.toISOString().split('T')[0]
    } else if (format === "DD/MM/YYYY"){
        return date.toLocaleString('pt-br').slice(0, 10)
    } else if (format == "monthShortName") {
        const monthShortNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        return monthShortNames[date.getMonth()]
    }
    return date.toLocaleDateString()
}

export function stringToDate(date:string, format:string){
    if (format === "YYYY-MM-DD"){
        return new Date(date.replace(/-/g, '\/'))
    }
}

export function sortArrayOfDates(array:Array<Date>){
    return array.sort((a:any, b:any) =>{
        return a - b;
    })
}

// Arrays
export function sumObjectArrayProperty(array:Array<any>, property:string){
    return array?.reduce((acc, obj) => {
        return acc + obj[property];
    }, 0)
}

export function sortArrayByProperty(array:Array<any>, property:string, order:string = "asc") {
    function compare_asc(a:any, b:any){
        if (a[property] < b[property])
            return -1;
        if (a[property] > b[property])
            return 1;
        return 0;
    }

    function compare_desc(a:any, b:any){
        if (a[property] > b[property])
            return -1;
        if (a[property] < b[property])
            return 1;
        return 0;
    }

    if (order === "asc")
        return array.sort(compare_asc) 
    else 
        return array.sort(compare_desc)
}

export function groupBy(array:Array<any>, keys:string[], variable:string) {
    let i, key, temp:any, split;
    let data = array.reduce((result,currentValue) => {
        key = "";
        for(i = 0; i < keys.length; i++) {
            key = key + currentValue[keys[i]] + "_";
        }
        if(!result[key]) {
            result[key] = 0;
        }
        result[key] += parseFloat(currentValue[variable]);
        return result;
    }, {});
    let grouped:any = [];
    Object.keys(data).forEach(function(key) {
        temp = {};
        split = key.split("_");
        for(i=0; i < split.length - 1; i++) {
            temp[keys[i]] = split[i]
        }
        temp[variable] = data[key];
        grouped.push(temp);
    });
    return grouped;
}

// Number/Strings/Currency
export function numberToLocaleCurrencyString(value:number) : string {
    if (value < 0){
        return "- R$ " + numberToLocaleString(-value, 2)
    }
    return "R$ " + numberToLocaleString(value, 2)
}

export function numberToLocaleString(value:number, digits:number){
    return (value?.toLocaleString(undefined, 
            {minimumFractionDigits: digits, 
            maximumFractionDigits: digits})
    )
}