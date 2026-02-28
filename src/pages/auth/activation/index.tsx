import AuthLayout from "@/components/layouts/AuthLayout";
import Activation from "@/components/views/Auth/Activation";
import axios from "axios";

interface PropTypes {
  status : 'success' | 'failed';
  message : string;
}

const ActivationPage = (props : PropTypes) => {
    return (
        <AuthLayout title="Acara | Activation">
            <Activation {...props}/>
        </AuthLayout>
    );
};

export async function getServerSideProps (context:{query:{code:string}}) {
  try {
    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/activation`;
    const result = await axios.post(url, { code: context.query.code });
    if (result.data.data){
      return {
        props:{
          status:"success",
          message:result.data.message,
        },
      };
    } else {
      return {
        props:{
          status:"failed",
          message:result.data.message,
        },
      };
    }
  } catch (error) {
    return {
      props:{
        status:"failed",
        message:"Activation failed. Invalid or expired code.",
      },
    };
  }
}

export default ActivationPage;