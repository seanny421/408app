
import NextAuth from "next-auth/next"
import GoogleProvider from "next-auth/providers/google"

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      idToken: true,
    }),
  ],
  secret: process.env.NEXT_PUBLIC_JWT_SECRET,
  callbacks: {
      jwt: ({token, user, account, profile})=> {
        // console.log({token,user,account,profile})
        if (account?.access_token) {
          token.access_token = account.access_token;
        }
        return token;
      },
      session: async ({session, user,token}) => {
        session.user = user;
        session.token = token;
        return session
      }
    },
});
