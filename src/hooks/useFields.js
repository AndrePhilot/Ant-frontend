import { useState } from 'react';

const useFields = (initialState) => {
    const [ formData, setFormData ] = useState(initialState);
    const [ isFormDirty, setIsFormDirty ] = useState(false);

    const handleChange = e => {
        setFormData(formData => ({
            ...formData,
            [e.target.name]: e.target.value
        }));
        setIsFormDirty(true);
    }

    const resetFormData = () => {
        setFormData(initialState)
    }

    return [ formData, handleChange, resetFormData, isFormDirty, setIsFormDirty ];
}

export default useFields;