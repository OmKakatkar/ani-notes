import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { LocationState } from '../../../components/Auth/Auth';

import Input from '../../../components/Input/Input';
import { LOGIN_DB } from '../../../constants/login-form-data';
import { TEST_USER_LOGIN } from '../../../constants/test-user';
import { useAuth } from '../../../context/auth-context';

import '../Auth.css';

type LoginDataType = {
  [key: string]: string;
};

function Login() {
  const initialLoginData = {
    email: '',
    password: '',
  };

  const [isLoginRemember, setIsLoginRemember] = useState(false);
  const navigate = useNavigate();
  const locationState = useLocation().state as LocationState;

  const redirectPath = locationState?.path || '/';

  const { handleLogin } = useAuth();
  const [loginData, setLoginData] = useState(initialLoginData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(loginData, isLoginRemember);
    navigate(redirectPath, { replace: true });
  };

  const handleGuestLogin = async (e: React.MouseEvent) => {
    setLoginData(TEST_USER_LOGIN);
    setIsLoginRemember(true);
  };

  return (
    <main className='flex-container auth-container'>
      <div className='form-container'>
        <form
          className='flex-container flex-column'
          onSubmit={handleSubmit}>
          <h1 className='text-xhuge form-heading'>Login</h1>
          {LOGIN_DB.map(({ id, type, label, name, autoComplete, required }) => (
            <Input
              key={id}
              type={type}
              label={label}
              name={name}
              autoComplete={autoComplete}
              value={(loginData as LoginDataType)[name]}
              handleChange={handleChange}
              required={required}
            />
          ))}
          <div className='input-container input-wrap'>
            <label
              htmlFor='isLoginRemember'
              className='checkbox text-sm'>
              <input
                type='checkbox'
                name='isLoginRemember'
                id='isLoginRemember'
                className='checkbox-input form-checkbox'
                checked={isLoginRemember}
                onChange={() =>
                  setIsLoginRemember(
                    (currentIsLoginRemember) => !currentIsLoginRemember
                  )
                }
              />
              <div className='checkbox-icon'></div>
              Remember me
            </label>
            {/* <Link to="/password-reset" className="form-link">
							Forgot Password?
						</Link> */}
          </div>
          <button
            type='submit'
            className='btn rounded bg-blue'>
            Login
          </button>
        </form>
        <button
          type='submit'
          className='btn rounded bd-blue'
          onClick={handleGuestLogin}>
          Fill Guest Credentials
        </button>
        <div className='text-center'>
          <Link
            to='/signup'
            className='form-link'>
            Create an account
          </Link>
        </div>
      </div>
    </main>
  );
}

export default Login;
