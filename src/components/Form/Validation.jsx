const Validation = {
    errors: {
        
    },
    
    isValidated (data = [], fields = [], step) {
        let isValidated = true;
        const checkFields = fields.filter(i => i.required && i.step === step);
        const newErrors = {...this.errors};
        checkFields.forEach(i => {
            newErrors[i.name] = '';
            if (!data[i.name]) {
                newErrors[i.name] = 'Ops! This field is required';
                isValidated = false;
            } 
        })

        if (data.password !== '' && data.confirmPassword !== '') {
            if (data.password !== data.confirmPassword) {
                newErrors.password = 'Ops Passwords don\'t match';
                newErrors.confirmPassword = 'Ops Passwords don\'t match';
                isValidated = false;
            } else {
                newErrors.password = '';
                newErrors.confirmPassword = '';
            }
        }
        
        this.errors = {...this.errors, ...newErrors};

        return [isValidated, this.errors];
    }
};
export default Validation;