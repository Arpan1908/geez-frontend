import { useSession, signIn, signOut } from "next-auth/react"

export default function Home() {
  const session = useSession()
  console.log(session)
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24">
    <section className="cursor-pointer">
      {session.data
        ? <div onClick={() => signOut()}>Sign Out</div>
        : <div onClick={() => signIn()}>Sign In</div>
      }
    </section>
  </main>)
}
