import { Button } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/router"

const RegisterSuccess = () => {
  const router = useRouter()
  return (
    <div className="flex w-screen flex-col items-center justify-center gap-10 p-4">
      <div className="flex flex-col items-center justify-center gap-10">
        <Image
          src="/general/logo.svg"
          alt="logo"
          width={180}
          height={180}
        />
        <Image
          src="/illustration/email-send.svg"
          alt="success"
          width={500}
          height={500}
        />
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-3xl font-bold text-danger-500">Create Account Success</h1>
          <p className="text-xl text-gray-500 font-bold">
            Check Your Email to Activation
          </p>
        </div>
        <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={()=> router.push("/")}>
          Back To Home
        </Button>
      </div>
    </div>
  )
}

export default RegisterSuccess