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
import RecentViewJob from "./pages/RecentViewJob";
import AppliedJob from "./pages/AppliedJob";
import EmployerPage from "./pages/Employer/EmployerPage";
import RootHeaderEmployer from "./pages/Employer/RootHeaderEmployer";
import SignInPageEmployer from "./pages/Employer/SignInPageEmployer";
import RootSystem from "./pages/Employer/RootSystem";
import JobPage from "./pages/Employer/JobPage";
import CreateJobs from "./pages/Employer/CreateJobs";
import DetailsCV from "./pages/Employer/DetailsCV";
import AppliedCV from "./pages/Employer/AppliedCV";
import ManageCVs from "./pages/Employer/ManageCVs";
import ProfileEmployer from "./pages/Employer/ProfileEmployer";
import Profile from "./pages/Employer/Profile";

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

          {
            path: "recent-viewed",
            element: <RecentViewJob />,
          },

          {
            path: "applied",
            element: <AppliedJob />,
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
  // employer
  {
    path: "/employers",
    element: <RootHeaderEmployer />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <EmployerPage />,
      },
    ],
  },
  {
    path: "/employers/login",
    element: <SignInPageEmployer />,
  },

  {
    path: "/employer-verify/jobs",
    element: <RootSystem />,
    errorElement: <ErrorPage />,
    id: "root1",
    children: [
      {
        path: "Detail/CV/AppliedCV",
        element: <DetailsCV />,
        children: [
          {
            index: true,
            element: <AppliedCV />,
          },
          {
            path: "CV/Recommend",
            element: <AppliedCV />,
          },
        ],
      },

      {
        index: true,
        element: <JobPage />,
      },
      {
        path: "account",
        element: <ProfileEmployer />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
        ],
      },
      {
        path: "create-jobs",
        element: <CreateJobs />,
      },
      {
        path: "manageCVs",
        element: <ManageCVs />,
      },
    ],
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
