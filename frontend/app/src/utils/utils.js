// Date/Time
export const dateToString = (date, format) => {
    if (format === "MM/YYYY"){
        return date.toLocaleDateString().slice(3)
    } else if (format === "YYYY-MM-DD"){
        const offset = date.getTimezoneOffset()
        date = new Date(date.getTime() - (offset*60*1000))
        return date.toISOString().split('T')[0]
    } else if (format === "DD/MM/YYYY"){
        return date.toLocaleString().slice(0, 10)
    } else if (format == "monthShortName") {
        const monthShortNames = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun",
            "Jul", "Ago", "Set", "Out", "Nov", "Dez"];
        return monthShortNames[date.getMonth()]
    }
    return date.toLocaleDateString()
}

export const stringToDate = (strDate, format) => {
    if (format === "YYYY-MM-DD"){
        return new Date(strDate.replace(/-/g, '\/'))
    }
}

export const sortArrayOfDates = (arrayOfDates) => {
    return arrayOfDates.sort((a,b) =>{
        return a - b;
    })
}

// Arrays
export const sumObjectArrayProperty = (array, property) => {
    return array?.reduce((acc, obj) => {
        return acc + obj[property];
    }, 0)
}

export const sortArrayByProperty = (array, property, order="asc") => {
    function compare_asc(a,b){
        if (a[property] < b[property])
            return -1;
        if (a[property] > b[property])
            return 1;
        return 0;
    }

    function compare_desc(a,b){
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

export const groupBy = (array, keys, variable) => {
    var i, key, temp, split;
    var data = array.reduce((result,currentValue) => {
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
    var grouped = [];
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