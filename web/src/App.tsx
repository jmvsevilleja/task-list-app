import { ApolloProvider } from "@apollo/client";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import client from "./apolloClient";
import Header from "./components/Header";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import AuthRoute from "./components/AuthRoute";
// import LoginPage from "./pages/LoginPage";
// import RegisterPage from "./pages/RegisterPage";
// import TaskListPage from "./pages/TaskListPage";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-1 container py-4 mx-auto">
            <Routes>
              <Route path="/" element={<HomePage />} />
              {/* <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} /> */}
              <Route
                path="/tasks"
                element={
                  <AuthRoute>
                    <>TaskListPage</>
                    {/* <TaskListPage /> */}
                  </AuthRoute>
                }
              />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
