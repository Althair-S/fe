import { Button } from "@nextui-org/react"
import Image from "next/image"
import { useRouter } from "next/router"

interface PropTypes {
  status: 'success' | 'failed';
}

const Activation = (props : PropTypes) => {
  const router = useRouter()
  const { status } = props
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
          src={status === 'success' ? '/illustration/success.svg' : '/illustration/pending.svg'}
          alt="success"
          width={500}
          height={500}
        />
        <div className="flex flex-col items-center text-center gap-2">
          <h1 className="text-3xl font-bold text-danger-500">{status === 'success' ? 'Activation Success' : 'Activation Failed'}</h1>
          <p className="text-xl text-gray-500 font-bold">
            {status === 'success' ? 'Your account has been activated. You can now login to your account.' : 'Activation failed. Please contact the administrator for assistance.'}
          </p>
        </div>
        <Button className="mt-4 w-fit" variant="bordered" color="danger" onClick={()=> router.push("/")}>
          Back To Home
        </Button>
      </div>
    </div>
  )
}

export default Activation