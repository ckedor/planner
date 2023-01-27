import React, { useEffect, useState } from 'react';

export default function useForm(initialFormValues:any){

    const [formValues, setFormValues] = useState(initialFormValues)
    const [errors, setErrors] = useState<any>({})
    
    useEffect(() => {
        setFormValues(initialFormValues)
    }, [initialFormValues]);

    console.log(formValues)

    const handleInputChange = (e:any) =>{
        let { name, value } = e.target
        if (typeof(value) === 'string'){
            value = parseFloat(value)
        }
        setFormValues({
            ...formValues,
            [name]:value
        })
    }

    return {
        formValues,
        errors,
        setErrors,
        handleInputChange,
    }

}