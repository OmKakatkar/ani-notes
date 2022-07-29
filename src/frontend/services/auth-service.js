import axios from "axios";
import { toast } from "react-toastify";
import {
	API_LOGIN,
	API_SIGNUP,
	API_USER_PROFILE,
} from "../constants/api-constant";

/**
 * Login the user if email and password are correct
 * @param {string} email
 * @param {string} password
 * @return user
 */
export const login = async ({ email, password }) => {
	try {
		const { data } = await axios.post(API_LOGIN, {
			email,
			password,
		});
		toast.success("Login Successful!");
		return data;
	} catch (err) {
		if (err.response.status === 404 || err.response.status === 401) {
			toast.error("Wrong email or password");
		} else {
			console.error(err.response.status);
			toast.error("Internal Error");
		}
		return {};
	}
};

/**
 * SignUp the user with given credentials
 * @param {string} firstName
 * @param {string} lastName
 * @param {string} email
 * @param {string} password
 * @return user
 */
export const signup = async ({ firstName, lastName, email, password }) => {
	try {
		const { data } = await axios.post(API_SIGNUP, {
			firstName,
			lastName,
			email,
			password,
		});
		toast.success("SignUp Successful!");
		return data;
	} catch (err) {
		if (err.response.status === 422) {
			toast.error("User Already Exists, check your credentials");
		} else {
			console.error(err.response.status);
			toast.error("Internal Error");
		}
		return {};
	}
};

/**
 * Get user profile
 * @param {string} authToken
 * @return user
 */
export const getUserDetails = async (authToken) => {
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
