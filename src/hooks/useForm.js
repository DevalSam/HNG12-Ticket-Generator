import { useState, useEffect } from 'react';
import { validateEmail, validateImageUrl } from '../utils/validation';  // Updated path
import { getStoredData, storeData } from '../utils/storage';  // Updated path

const useForm = ({ initialValues, onSubmit }) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedData = getStoredData('formData');
    if (storedData) {
      console.log('Loading stored data:', storedData); // Debug log
      setFormData(storedData);
    }
  }, []);

  useEffect(() => {
    console.log('Saving form data:', formData); // Debug log
    storeData('formData', formData);
  }, [formData]);

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName?.trim()) {  // Added optional chaining
      newErrors.fullName = 'Full name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.avatarUrl) {
      newErrors.avatarUrl = 'Avatar URL is required';
    } else if (!validateImageUrl(formData.avatarUrl)) {
      newErrors.avatarUrl = 'Please enter a valid image URL';
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log('Handling change:', { name, value }); // Debug log
    
    setFormData((prev) => {
      const newData = {
        ...prev,
        [name]: value,
      };
      console.log('Updated form data:', newData); // Debug log
      return newData;
    });

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: '',
      }));
    }
  };

  const handleImageChange = (e) => {
    handleChange(e);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log('Handling submit with data:', formData); // Debug log

    const newErrors = validateForm();
    if (Object.keys(newErrors).length === 0) {
      console.log('Form is valid, submitting:', formData); // Debug log
      onSubmit(formData);
      // Clear form after successful submission
      setFormData(initialValues);
    } else {
      console.log('Form has errors:', newErrors); // Debug log
      setErrors(newErrors);
    }

    setIsSubmitting(false);
  };

  return {
    formData,
    errors,
    isSubmitting,
    handleChange,
    handleImageChange,
    handleSubmit,
  };
};

export default useForm;