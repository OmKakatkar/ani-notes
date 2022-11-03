import { useState } from 'react';
import { Link } from 'react-router-dom';

import Input from '../../../components/Input/Input';
import { SIGNUP_DB } from '../../../constants/signup-form-data';
import { TEST_USER_SIGNUP } from '../../../constants/test-user';
import { useAuth } from '../../../context/auth-context';

import '../Auth.css';

type SignUpDataType = {
  [key: string]: string;
};

function SignUp() {
  const initialSignUpData = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  };
  const { handleSignUp } = useAuth();
  const [signUpData, setSignUpData] = useState(initialSignUpData);
  const [acceptTnC, setAcceptTnC] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleSignUp(signUpData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSignUpData({ ...signUpData, [e.target.name]: e.target.value });
  };

  const handleGuestSignUp = () => {
    setSignUpData(TEST_USER_SIGNUP);
    setAcceptTnC(true);
  };

  return (
    <main className='flex-container auth-container'>
      <div className='form-container'>
        <form
          className='flex-container flex-column'
          onSubmit={handleSubmit}>
          <h1 className='text-xhuge form-heading'>Sign Up</h1>
          {SIGNUP_DB.map(
            ({ id, type, label, name, autoComplete, required }) => (
              <Input
                key={id}
                type={type}
                label={label}
                name={name}
                autoComplete={autoComplete}
                value={(signUpData as SignUpDataType)[name]}
                handleChange={handleChange}
                required={required}
              />
            )
          )}
          <div className='input-container'>
            <label
              htmlFor='remember'
              className='checkbox text-xsm'>
              <input
                type='checkbox'
                name='remember'
                id='remember'
                required={true}
                className='checkbox-input form-checkbox'
                checked={acceptTnC}
                onChange={() =>
                  setAcceptTnC((currentAcceptTnC) => !currentAcceptTnC)
                }
              />
              <div className='checkbox-icon'></div>I accept all Terms &
              Conditions*
            </label>
          </div>
          <button
            type='submit'
            className='btn rounded bg-blue'>
            Create New Account
          </button>
        </form>
        <button
          type='submit'
          className='btn rounded bd-blue'
          onClick={handleGuestSignUp}>
          Fill Guest Credentials
        </button>
        <div className='text-center'>
          <Link
            to='/login'
            className='form-link'>
            Already have an account
          </Link>
        </div>
      </div>
    </main>
  );
}

export default SignUp;
