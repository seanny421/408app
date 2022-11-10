
import { useSession, signIn, signOut } from "next-auth/react"
export default function LoginForm(){
  const {data: session} = useSession()
  if(session){
    return(
      <div>
        <h2>Welcome, {session.token?.email}</h2>
        <button onClick={() => signOut()}>Sign Out</button>
      </div>
    )
  }
  else{
    return(
      <div>
        <button onClick={() => signIn()}>Sign In</button>
      </div>
    )
  }

}
