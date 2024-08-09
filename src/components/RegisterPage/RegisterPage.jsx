import React from 'react';
import RegisterForm from '../RegisterForm/RegisterForm';
import { useHistory } from 'react-router-dom';

function RegisterPage() {
  const history = useHistory();

  return (
    <div>
      <RegisterForm />
    </div>
  );
}

export default RegisterPage;
