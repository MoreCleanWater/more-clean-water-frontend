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
        
        if (data.confirmPassword && data.password !== '' && data.confirmPassword !== '') {
            if (data.password !== data.confirmPassword) {
                newErrors.password = 'Ops, passwords don\'t match';
                newErrors.confirmPassword = 'Ops, passwords don\'t match';
                isValidated = false;
            } else {
                newErrors.password = '';
                newErrors.confirmPassword = '';
            }
        }
        if (data.email) {
            if (!/\S+@\S+\.\S+/.test(data.email)) {
                newErrors.email = 'Ops, invalid email detected';
                isValidated = false;
            } else {
                newErrors.email = '';
            }
        }
        
        this.errors = {...this.errors, ...newErrors};

        return [isValidated, this.errors];
    }
};
export default Validation;