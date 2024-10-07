import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import validations from "../validations/validations";

const messages: any = {
    MANDATORY: "All the fields are mandatory",
    CONNECTION_LOST: "Network connection lost",
    USERNAME_ERROR: "Enter a valid username",
    EMAIL_ERROR: "Enter a valid email",
    NEWPASSWORD_ERROR: "Enter a strong password",
    CONFIRMPASSWORD_ERROR: "Passwords did not match",
    SUCCESS: "Password updated successfully, redirecting to login page"
};
export interface ForgotPasswordForm {
    username: string;
    emailId: string;
    newPassword: string;
    confirmPassword: string;
}

export interface ForgotPasswordFormError {
    usernameError: string;
    emailIdError: string;
    newPasswordError: string;
    confirmPasswordError: string;
}

const ForgotPassword: React.FC = (): JSX.Element => {
    const [forgotPasswordForm, setForgotPasswordForm] = useState<ForgotPasswordForm>({
        username: '',
        emailId: '',
        newPassword: '',
        confirmPassword: ''
    });

    const [forgotPasswordFormError, setForgotPasswordFormError] = useState<ForgotPasswordFormError>({
        usernameError: "",
        emailIdError: "",
        newPasswordError: "",
        confirmPasswordError: ""
    });

    const [successMessage, setSuccessMessage] = useState<string>('');
    const [isValid, setIsValid] = useState<boolean>(true);
    const [errorMessage, setErrorMessage] = useState<string>('');

    const navigate = useNavigate();

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
        const { name, value } = event.target;

        if(name === 'newPassword') {
            setForgotPasswordForm((prevForgotPasswordForm: ForgotPasswordForm): ForgotPasswordForm => {
                return {
                    ...prevForgotPasswordForm,
                    newPassword: value,
                    confirmPassword: ""
                };
            });
        }

        else {
            setForgotPasswordForm((prevForgotPasswordForm: ForgotPasswordForm): ForgotPasswordForm => {
                return {
                    ...prevForgotPasswordForm,
                    [name]: value
                };
            });
        }

        validateFields(name, value);
    }

    const validateFields = (name: string, value: string): void => {
        const errors: ForgotPasswordFormError = {...forgotPasswordFormError};
        
        switch(name) {
            case 'username': 
                if (!validations.validateUsername(value)) {
                    errors.usernameError = messages.USERNAME_ERROR;
                }
                else {
                    errors.usernameError = "";
                }

                break;

            case 'emailId': 
                if (!validations.validateEmailId(value)) {
                    errors.emailIdError = messages.EMAIL_ERROR;
                }
                else {
                    errors.emailIdError = "";
                }

                break;

            case 'newPassword': 
                if (!validations.validatePassword(value)) {
                    errors.newPasswordError = messages.NEWPASSWORD_ERROR;
                }
                else {
                    errors.newPasswordError = "";
                }
                
                break;

            case 'confirmPassword': 
                if (value !== forgotPasswordForm.newPassword) {
                    errors.confirmPasswordError = messages.CONFIRMPASSWORD_ERROR;
                }
                else {
                    errors.confirmPasswordError = "";
                }

                break;

            default: 
                break;
        }

        setForgotPasswordFormError(errors);
        
        if (
            errors.usernameError==="" || 
            errors.emailIdError==="" || 
            errors.newPasswordError==="" || 
            errors.confirmPasswordError===""
        ) {
            setIsValid(false);
        }
        else {
            setIsValid(true);
        }
    }

    const resetPassword = async() : Promise<void> => {
        try {
            const response = await axios.put('http://localhost:8100/user-api/reset-password',
                {
                    "username": forgotPasswordForm.username,
                    "emailId": forgotPasswordForm.emailId,
                    "password": forgotPasswordForm.newPassword
                }
            );

            const msg : string = response.data
            setSuccessMessage(msg);

        }

        catch (error: any) {
            console.log(error);
            setErrorMessage("Server down, please try again");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
        event.preventDefault();

        if (
            forgotPasswordForm.username === '' || 
            forgotPasswordForm.emailId === '' || 
            forgotPasswordForm.newPassword === '' || 
            forgotPasswordForm.confirmPassword === ''
        ) {
            setErrorMessage(messages.MANDATORY);
            return;
        }
        resetPassword();
    }

    return (
        <div className="w-full min-h-screen bg-[#F6F6F6] relative pb-12 pt-[120px]">
            <div 
                className="w-[90%] max-w-[500px] mx-auto bg-white rounded-lg flex flex-col items-center py-6" 
                style={{boxShadow: "0px 0px 8px 0px lightgrey"}}
            >
                    <div className="text-[21px] font-medium text-gray-600">
                        Forgot Password
                    </div>

                    <form 
                        className="mt-8 w-full flex flex-col gap-y-4 items-center"
                        onSubmit={handleSubmit}
                    >
                        <div className="w-[85%]">
                            <label htmlFor="username" className="text-[18px] text-gray-600 font-medium">
                                Username
                            </label>
                            <input 
                                id="username"
                                name="username"
                                type="text"
                                placeholder="Enter your username"
                                onChange={handleChange}
                                value={forgotPasswordForm.username}
                                className="focus:outline-none focus:border-gray-500 focus:ring-0 border-[1px] p-[10px] w-full border-gray-400 rounded-md text-gray-600 mt-2 mb-1 placeholder:text-[#858585]"
                            />
                            {
                                forgotPasswordFormError.usernameError 
                                && 
                                <span className="text-red-500 font-medium">
                                    {messages.USERNAME_ERROR}
                                </span>
                            }
                        </div>

                        <div className="w-[85%]">
                            <label 
                                htmlFor="emailid" 
                                className="text-[18px] text-gray-600 font-medium"
                            >
                                EmailId
                            </label>
                            <input id="emailId"
                                name="emailId"
                                type="text"
                                placeholder="Enter your email id"
                                onChange={handleChange}
                                value={forgotPasswordForm.emailId}
                                className="focus:outline-none focus:border-gray-500 focus:ring-0 border-[1px] p-[10px] w-full border-gray-400 rounded-md text-gray-600 mt-2 mb-1 placeholder:text-[#858585]"
                            />
                            {
                                forgotPasswordFormError.emailIdError 
                                && 
                                <span className="text-red-500 font-medium">
                                    {messages.EMAIL_ERROR}
                                </span>
                            }
                        </div>

                        <div className="w-[85%]">
                            <label 
                                htmlFor="newPassword" 
                                className="text-[18px] text-gray-600 font-medium"
                            >
                                    New Password
                            </label>
                            <input 
                                id="newPassword"
                                name="newPassword"
                                type="password"
                                placeholder="Enter new password"
                                onChange={handleChange}
                                value={forgotPasswordForm.newPassword}
                                className="focus:outline-none focus:border-gray-500 focus:ring-0 border-[1px] p-[10px] w-full border-gray-400 rounded-md text-gray-600 mt-2 mb-1 placeholder:text-[#858585]"
                            />
                            {
                                forgotPasswordFormError.newPasswordError 
                                && 
                                <span className="text-red-500 font-medium">
                                    {messages.NEWPASSWORD_ERROR}
                                </span>
                            }
                        </div>

                        <div className="w-[85%]">
                            <label 
                                htmlFor="confirmPassword" 
                                className="text-[18px] text-gray-600 font-medium"
                            >
                                Confirm Password
                            </label>
                            <input 
                                id="confirmPassword"
                                name="confirmPassword"
                                type="password"
                                placeholder="Enter your password again"
                                onChange={handleChange}
                                value={forgotPasswordForm.confirmPassword}
                                className="focus:outline-none focus:border-gray-500 focus:ring-0 border-[1px] p-[10px] w-full border-gray-400 rounded-md text-gray-600 mt-2 mb-1 placeholder:text-[#858585]"
                            />
                            {
                                forgotPasswordFormError.confirmPasswordError 
                                && 
                                <span className="text-red-500 font-medium">
                                    {messages.CONFIRMPASSWORD_ERROR}
                                </span>
                            }
                        </div>

                        <div className="w-[85%] text-lg font-medium">
                            <button 
                                type="submit"
                                
                                className="w-full  py-3 rounded-md disabled:bg-gray-500 disabled:cursor-nnot-allowed">
                                    Reset Password
                                </button>

                                {
                                    errorMessage 
                                    && 
                                    <div className="text-red-500 mt-2">
                                        {errorMessage}
                                    </div>
                                }
                                {
                                    successMessage 
                                    && 
                                    <div className="text-green-500 mt-2">
                                        {successMessage}
                                    </div>
                                }
                        </div>
                    </form>
                    {
                        ( !successMessage) 
                        && 
                        <div className="mt-6 text-gray-600 text-lg font-medium underline px-2 text-center">
                            <Link to='/login'>
                                Login here
                            </Link>
                        </div>
                    }
                
            </div>
        </div>
    );
}
export default ForgotPassword;
