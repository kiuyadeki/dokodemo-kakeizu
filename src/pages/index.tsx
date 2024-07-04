import { WithAuthenticatorProps } from "@aws-amplify/ui-react";
import { signOut } from "aws-amplify/auth";

const HomePage = ({signOut, user}: WithAuthenticatorProps) => {
    return (
        <div>
            <h1>Home</h1>
            <button onClick={signOut}>Sign Out {user!.username}</button>
        </div>
    )
}

export default HomePage;