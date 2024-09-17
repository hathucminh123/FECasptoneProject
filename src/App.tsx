import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
import SignInPage from "./pages/SignInPage";
import ForgotPassword from "./pages/ForgotPassword";
import JobDetails from "./pages/JobDetails";
import CompanyDetail from "./pages/CompanyDetail";
import Profilecv from "./pages/Profilecv";
import RootProfile from "./pages/RootProfile";
import ManageCV from "./pages/ManageCV";
import FilterJobbySkill from "./pages/FilterJobbySkill";
import RootJobs from "./pages/RootJobs";
import SaveJobs from "./pages/SaveJobs";
import Apply from "./components/Apply";
import CompanyDetailRoot from "./pages/CompanyDetailRoot";
import CompanyReview from "./pages/CompanyReview";
import CompanyComment from "./pages/CompanyComment";
import CompanyReviews from "./pages/CompanyReviews";
import Recommend from "./pages/Recommend";
import ProtectedRoute from "./components/ProtectedRoute"; // Import ProtectedRoute

export const queryClient = new QueryClient();

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    id: "root",
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "auth",
        element: <SignInPage />,
      },
      {
        path: "new",
        element: <ForgotPassword />,
      },
      {
        path: "jobs/detail/:id",
        element: <JobDetails />,
      },
      {
        path: "company/detail/:id",
        element: <CompanyDetailRoot />,
        children: [
          {
            index: true,
            element: <CompanyDetail />,
          },
          {
            path: "review",
            element: <CompanyReview />,
          },
        ],
      },
      {
        // Protect profile-cv routes
        path: "profile-cv",
        element: (
          // <ProtectedRoute>
            <RootProfile />
          // </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <Profilecv />,
          },
          {
            path: "manage-cv",
            element: <ManageCV />,
          },
        ],
      },
      {
        // Protect my-jobs routes
        path: "my-jobs",
        element: (
          // <ProtectedRoute>
            <RootJobs />
          // </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <SaveJobs />,
          },
        ],
      },
      {
        path: "it-jobs",
        element: <FilterJobbySkill />,
      },
      {
        path: "all/company",
        element: <CompanyReviews />,
      },
      {
        path: "vietnam-best-it-companies",
        element: <Recommend />,
      },
    ],
  },
  {
    path: "job/Apply",
    element: (
      // <ProtectedRoute>
        <Apply />
      // </ProtectedRoute>
    ),
  },
  {
    path: "company/Comment",
    element: (
      <ProtectedRoute>
        <CompanyComment />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}

export default App;
