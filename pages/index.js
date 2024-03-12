import { useSession, signIn, signOut } from "next-auth/react"
import { io } from "socket.io-client"

export default function Home() {
  const { data: session } = useSession()
  const socket = io("http://localhost:5000")
  socket.on("connect", () => console.log('Client connected', socket.id))
  return (<main className="flex min-h-screen flex-col items-center justify-between p-24">
    <section className="cursor-pointer">
      {session
        ? <div onClick={() => signOut()}>Sign Out</div>
        : <div onClick={() => signIn()}>Sign In</div>
      }
    </section>
  </main>)
}
