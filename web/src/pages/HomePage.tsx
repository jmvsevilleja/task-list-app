import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import {
  RocketIcon,
  ListChecksIcon,
  LogInIcon,
  UserPlusIcon,
} from "lucide-react";

export default function HomePage() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-340px)] py-12 px-4 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
          Manage Your Tasks <span className="text-primary">Effortlessly</span>
        </h1>
        <p className="mt-6 text-lg leading-8 text-muted-foreground max-w-2xl mx-auto">
          A simple yet powerful task management application to organize your
          work and personal life.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-6xl">
        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <RocketIcon className="h-10 w-10 mb-4 text-primary" />
            <CardTitle>Boost Productivity</CardTitle>
            <CardDescription>
              Get more done with organized tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Prioritize your work and never miss important deadlines with our
              intuitive interface.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <ListChecksIcon className="h-10 w-10 mb-4 text-primary" />
            <CardTitle>Stay Organized</CardTitle>
            <CardDescription>All your tasks in one place</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Create, update, and track your tasks with due dates and completion
              status.
            </p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-lg transition-shadow">
          <CardHeader>
            <UserPlusIcon className="h-10 w-10 mb-4 text-primary" />
            <CardTitle>Secure Access</CardTitle>
            <CardDescription>Your data is always protected</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Register once and access your tasks from anywhere with our secure
              authentication.
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-16 flex gap-4">
        {isAuthenticated ? (
          <Button asChild size="lg">
            <Link to="/tasks">
              <ListChecksIcon className="mr-2 h-4 w-4" />
              View Your Tasks
            </Link>
          </Button>
        ) : (
          <>
            <Button asChild variant="outline" size="lg">
              <Link to="/login">
                <LogInIcon className="mr-2 h-4 w-4" />
                Log In
              </Link>
            </Button>
            <Button asChild size="lg">
              <Link to="/register">
                <UserPlusIcon className="mr-2 h-4 w-4" />
                Sign Up
              </Link>
            </Button>
          </>
        )}
      </div>
    </div>
  );
}
