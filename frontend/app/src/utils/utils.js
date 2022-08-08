// Date/Time
export const dateToString = (date, format) => {
    if (format === "MM/YYYY"){
        return date.toLocaleDateString().slice(3)
    } else if (format === "YYYY-MM-DD"){
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000))
        return date.toISOString().split('T')[0]
    } else if (format === "DD/MM/YYYY"){
        date = new Date(date)
        return date.toLocaleString().slice(0, 10)
    }
    return date.toLocaleDateString()
}

export const stringToDate = (strDate, format) => {
    if (format === "YYYY-MM-DD"){
        return new Date(strDate.replace(/-/g, '\/'))
    }
}

// Arrays
export const sumObjectArrayProperty = (array, property) => {
    return array?.reduce((acc, obj) => {
        console.log(acc, obj)
        console.log(typeof(obj[property]))
        return acc + obj[property];
    }, 0)
}

export const sort = (property) => {
    var sortOrder = 1;
    if(property[0] === "-") {
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (a,b) {
        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
        return result * sortOrder;
    }
}

export const sortMultiple = (arg1, arg2) => {
    var props = [arg1, arg2];
    return function (obj1, obj2) {
        var i = 0, result = 0, numberOfProperties = props.length;
        while(result === 0 && i < numberOfProperties) {
            result = sort(props[i])(obj1, obj2);
            i++;
        }
        return result;
    }
}

// Number/Strings/Currency
export const numberToLocaleCurrencyString = (value) => {
    if (value < 0){
        return "- R$ " + numberToLocaleString(-value, 2)
    }
    return "R$ " + numberToLocaleString(value, 2)
}

export const numberToLocaleString = (value, digits) => {
    return (value?.toLocaleString(undefined, 
            {minimumFractionDigits: digits, 
            maximumFractionDigits: digits})
    )
}