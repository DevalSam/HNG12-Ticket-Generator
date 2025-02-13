import React from 'react';
import FormInput from './FormInput';
import AvatarUpload from './AvatarUpload';
import useForm from '../../hooks/useForm';
import './Form.css';

const Form = ({ onSubmit }) => {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    handleImageChange,
  } = useForm({
    initialValues: {
      fullName: '',
      email: '',
      avatarUrl: '',
    },
    onSubmit,
  });

  return (
    <form onSubmit={handleSubmit} className="form" noValidate>
      <FormInput
        label="Full Name"
        type="text"
        name="fullName"
        value={formData.fullName}
        onChange={handleChange}
        error={errors.fullName}
        required
        aria-describedby="fullName-error"
      />
      <FormInput
        label="Email Address"
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        error={errors.email}
        required
        aria-describedby="email-error"
      />
      <AvatarUpload
        value={formData.avatarUrl}
        onChange={handleImageChange}
        error={errors.avatarUrl}
      />
      <button type="submit" className="submit-button">
        Generate Ticket
      </button>
    </form>
  );
};

export default Form;  // Add this default export