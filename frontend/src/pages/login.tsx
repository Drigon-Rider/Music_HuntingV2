import type { NextPage } from "next"
import Head from "next/head"
import LoginForm from "../Components/auth/LoginForm"

const LoginPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Login | Music Hunting</title>
        <meta name="description" content="Login to your Music Hunting account" />
      </Head>
      <div className="container mx-auto px-4 py-8">
        <LoginForm />
      </div>
    </>
  )
}

export default LoginPage
