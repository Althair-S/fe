import { Button, Card, CardBody, Input, Spinner } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import useRegister from "./useRegister";
import { FaEye, FaEyeSlash } from "react-icons/fa6";
import { Controller } from "react-hook-form";
import { cn } from "@/utils/cn";

const Register = () => {
  const { vissiblePassword, handleVisiblePassword, control, handleSubmit, handleRegister, isPendingRegister, errors } = useRegister();

    return (
        <div className="flex w-full flex-col lg:flex-row items-center justify-center lg:gap-20 gap-10">
            <div className="flex lg:w-1/3 w-full flex-col items-center justify-center gap-10 py-10 lg:py">
                <Image
                    src="/general/logo.svg"
                    alt="logo"
                    width={180}
                    height={180}
                />
                <Image
                    src="/illustration/login.svg"
                    alt="logo illustration"
                    className="lg:w-full w-2/3"
                    width={500}
                    height={500}
                />
            </div>
                <Card>
                    <CardBody className="p-8">
                      <h2 className="text-xl font-bold text-danger-500"> Create Account</h2>
                      <p className="mb-4 text-sm">have an account?&nbsp; 
                        <Link href="/auth/login" className="font-semibold text-danger-400">
                          Login Here
                        </Link>
                      </p>
                      {errors.root && (
                        <p className="text-danger-500 text-sm mb-2">{errors?.root?.message}</p>
                      )}
                      <form className={cn("flex w-80 flex-col", Object.keys(errors).length > 0 ? "gap-4" : "gap-2")} onSubmit={handleSubmit(handleRegister)}>
                        <Controller 
                        name="fullName" 
                        control={control} 
                        render={({field}) => (
                          <Input 
                          {...field}                            
                            type="text"
                            label="Fullname"
                            variant="bordered"
                            autoComplete="off"
                            isInvalid={!!errors.fullName}
                            errorMessage={errors.fullName?.message}
                          />
                        )} />

                        <Controller 
                        name="userName" 
                        control={control} 
                        render={({field}) => (
                          <Input 
                          {...field}                            
                            type="text"
                            label="Username"
                            variant="bordered"
                            autoComplete="off"
                            isInvalid={!!errors.userName}
                            errorMessage={errors.userName?.message}
                          />
                        )} />

                        <Controller 
                        name="email" 
                        control={control} 
                        render={({field}) => (
                          <Input
                          {...field}
                          type="email"
                          label="Email"
                          variant="bordered"
                          autoComplete="off"
                          isInvalid={!!errors.email}
                          errorMessage={errors.email?.message}
                        />
                        )} />
                        
                        <Controller 
                        name="password" 
                        control={control} 
                        render={({field}) => (
                          <Input
                          {...field}
                          type={vissiblePassword.password ? 'text' : 'password'}
                          label="Password"
                          variant="bordered"
                          autoComplete="off"
                          endContent = {
                            <button 
                              className="focus:outline-none"
                              type="button"
                              onClick={() => handleVisiblePassword('password')}
                            >
                              {vissiblePassword.password ? (
                                <FaEye className="text-xl text-default-400 pointer-events-none"/>
                              ) : (
                                <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                              )}
                            </button>
                          }
                          isInvalid={!!errors.password}
                          errorMessage={errors.password?.message}
                        />
                        )} />

                        <Controller 
                        name="confirmPassword" 
                        control={control} 
                        render={({field}) => (
                          <Input
                          {...field}
                          type={vissiblePassword.confirmPassword ? 'text' : 'password'}
                          label="Confirm Password"
                          variant="bordered"
                          autoComplete="off"
                          endContent = {
                            <button 
                              className="focus:outline-none"
                              type="button"
                              onClick={() => handleVisiblePassword('confirmPassword')}
                            >
                              {vissiblePassword.confirmPassword ? (
                                <FaEye className="text-xl text-default-400 pointer-events-none"/>
                              ) : (
                                <FaEyeSlash className="text-xl text-default-400 pointer-events-none"/>
                              )}
                            </button>
                          }
                          isInvalid={!!errors.confirmPassword}
                          errorMessage={errors.confirmPassword?.message}
                        />
                        )} />
                        
                        <Button color="danger" size="lg" type="submit" className="w-full">
                          {isPendingRegister ? (
                            <Spinner color="white" size="sm" />
                          ) : "Register" }
                        </Button>
                      </form>
                    </CardBody>
                </Card>
        </div>
    );
};

export default Register;