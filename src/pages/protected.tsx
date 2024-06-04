import { stat } from "fs";
import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

export default function MembershipPage() {
  const { data: session, status} = useSession();

  useEffect(() => {
    if (status !== 'loading' && !session) {
      signIn('cognito');
    }
  }, [session, status]);

  if (status === "loading") {
    return <p>Loading...</p>;
  }

  return (
    <div>
      {session ? `Signed in as ${session.user.email}` : 'You are not signed in.'}
    </div>
  )
}