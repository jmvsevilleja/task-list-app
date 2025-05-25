import { useMutation } from "@apollo/client"
import { LOGIN_USER } from "../graphql/queries"
import { useNavigate } from "react-router-dom"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Link } from "react-router-dom"
import useAuth from "@/hooks/useAuth"
import { toast } from "sonner"
import { useState } from "react"

export default function LoginPage() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loginUser] = useMutation(LOGIN_USER)
    const { login } = useAuth()
    const navigate = useNavigate()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        try {
            const { data } = await loginUser({
                variables: { email, password },
            })

            if (data?.login?.token) {
                login(data.login.token)
                navigate("/tasks")
                toast("Success", {
                    description: "Logged in successfully",
                })
            }
        } catch (err) {
            toast.error("Error", {
                description: "Invalid email or password"
            })
        }
    }

    return (
        <div className="flex items-center justify-center min-h-[70vh]">
            <div className="w-full max-w-md p-8 space-y-8 bg-card rounded-lg shadow-lg">
                <div className="space-y-2 text-center">
                    <h1 className="text-2xl font-bold">Login</h1>
                    <p className="text-muted-foreground">
                        Enter your email and password to login
                    </p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="space-y-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="m@example.com"
                            required
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="password">Password</Label>
                        <Input
                            id="password"
                            type="password"
                            required
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <Button type="submit" className="w-full">
                        Login
                    </Button>
                </form>
                <div className="text-center text-sm">
                    Don't have an account?{" "}
                    <Link to="/register" className="underline">
                        Register
                    </Link>
                </div>
            </div>
        </div>
    )
}