import { signIn, signOut, useSession } from "next-auth/react"
import { FC } from "react";

const ProtectedPage:FC = () => {
  const { data: session, status} = useSession(
  //   {
  //   required: true,
  //   onUnauthenticated() {
  //     signIn();
  //   }
  // }
);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  if (session) {
    return (
      <>
        <p>Signed ins as {session?.user?.email}</p>
        <button onClick={() => signOut()}>Sign Out</button>
      </>
    )
  }

  return (
    <div>
      <h1>Not signed in</h1>
      <button onClick={() => signIn()}>Sign in</button>
    </div>
  )
}

export default ProtectedPage;