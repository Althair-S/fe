import { useState } from "react";
import * as yup from 'yup';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { IRegister } from "@/types/Auth";
import authServices from "@/services/auth.service";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";


const registerSchema = yup.object({
  fullName: yup.string().required('Fullname is required'),
  userName: yup.string().required('Username is required'),
  email: yup.string().email('Email is invalid').required('Email is required'),
  password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
  confirmPassword: yup.string().required('Confirm Password is required').oneOf([yup.ref('password')], 'Passwords do not match')
});

const useRegister = () => {
  const router = useRouter();
    const [vissiblePassword, setVisiblePassword] = useState({
      password: false,
      confirmPassword: false
    });

    const { control, handleSubmit, formState: { errors }, reset, setError } = useForm({ resolver: yupResolver(registerSchema) });

    const handleVisiblePassword = (key: 'password' | 'confirmPassword') => {
      setVisiblePassword({
        ...vissiblePassword,
        [key]: !vissiblePassword[key]
      });
    };



    const registerService = async (payload: IRegister) => {
      const result = await authServices.register(payload);
      return result;
    }

    const { mutate: mutateRegister, isPending: isPendingRegister } = useMutation({
      mutationFn: registerService,
      onError: (error: any) => {
        setError('root', { message: error.message });
      },
      onSuccess: () => {
        router.push("/auth/register/success");
        reset();
      }
    })

    const handleRegister = (data: IRegister) => {
      mutateRegister(data);
    }

    return {
      vissiblePassword,
      handleVisiblePassword,
      control,
      handleSubmit,
      handleRegister,
      isPendingRegister,
      errors
    }
}

export default useRegister;
