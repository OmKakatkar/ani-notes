import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import { API_LOGIN, API_SIGNUP } from '../constants/api-constant';

export type LoginType = {
  email: string;
  password: string;
};

type LoginReturnType = {
  encodedToken: string;
  foundUser: AuthUserType;
};

export type SignUpType = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
};

type SignUpReturnType = {
  encodedToken: string;
  createdUser: AuthUserType;
};

export type AuthUserType = {
  createdAt: string;
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  updatedAt: string;
  _id: string;
  archives: NoteType[];
  notes: NoteType[];
  trash: NoteType[];
};

export type NoteType = {
  createdAt: string;
  description: string;
  noteColor: string;
  priority: 'low' | 'medium' | 'high';
  tags: string[];
  title: string;
  updatedAt: string;
  _id: string;
};

/**
 * Login the user if email and password are correct
 */

export const login = async ({ email, password }: LoginType) => {
  try {
    const { data }: AxiosResponse<LoginReturnType> = await axios.post(
      API_LOGIN,
      {
        email,
        password,
      }
    );
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
    return {} as LoginReturnType;
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
    const { data }: AxiosResponse<SignUpReturnType> = await axios.post(
      API_SIGNUP,
      {
        firstName,
        lastName,
        email,
        password,
      }
    );
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
  return {} as SignUpReturnType;
};
