import type { NextPage } from "next"
import Head from "next/head"
import RegisterForm from "../Components/auth/RegisterForm"

const RegisterPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Register | Music Hunting</title>
        <meta name="description" content="Create a new account for Music Hunting" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <RegisterForm />
      </div>
    </>
  )
}

export default RegisterPage
