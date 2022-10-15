import axios from 'axios';
import { toast } from 'react-toastify';
import {
  API_LOGIN,
  API_SIGNUP,
  API_USER_PROFILE,
} from '../constants/api-constant';

type LoginType = {
  email: string;
  password: string;
};

type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

/**
 * Login the user if email and password are correct
 */

export const login = async ({ email, password }: LoginType) => {
  try {
    const { data } = await axios.post(API_LOGIN, {
      email,
      password,
    });
    toast.success('Login Successful!');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 404 || error.response?.status === 401) {
        toast.error('Wrong email or password');
      } else {
        console.error(error.response?.status);
        toast.error('Internal Error');
      }
    }
  }
};

/**
 * SignUp the user with given credentials
 */
export const signup = async ({
  firstName,
  lastName,
  email,
  password,
}: SignUpType) => {
  try {
    const { data } = await axios.post(API_SIGNUP, {
      firstName,
      lastName,
      email,
      password,
    });
    toast.success('SignUp Successful!');
    return data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 422) {
        toast.error('User Already Exists, check your credentials');
      } else {
        console.error(error.response?.status);
        toast.error('Internal Error');
      }
    }
  }
};

/**
 * Get user profile
 */
export const getUserDetails = async (authToken: string) => {
  try {
    const {
      data: { user },
    } = await axios.get(API_USER_PROFILE, {
      headers: {
        authorization: authToken,
      },
    });
    return user;
  } catch (err) {
    console.error(err);
  }
};
