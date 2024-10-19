import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./Services/mainService";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage";
import store from "./redux/store";
import { Provider } from "react-redux";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import ErrorPage from "./pages/ErrorPage";
import RootLayout from "./pages/RootLayout";
// import SignInPage from "./pages/SignInPage";
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
// import EmployerPage from "./pages/Employer/EmployerPage";
// import RootHeaderEmployer from "./pages/Employer/RootHeaderEmployer";
import SignInPageEmployer from "./pages/Employer/SignInPageEmployer";
import RootSystem from "./pages/Employer/RootSystem";
import JobPage from "./pages/Employer/JobPage";
import CreateJobs from "./pages/Employer/CreateJobs";
import DetailsCV from "./pages/Employer/DetailsCV";
import AppliedCV from "./pages/Employer/AppliedCV";
import ManageCVs from "./pages/Employer/ManageCVs";
import ProfileEmployer from "./pages/Employer/ProfileEmployer";
import Profile from "./pages/Employer/Profile";
import NotificationSystem from "./components/Employer/NotificationSystem";
import CompanyInfo from "./pages/Employer/CompanyInfo";
import SignInPageJobSeekers from "./pages/Employer/SignInPageJobSeekers";

import { tokenLoader } from "./utils/Auth";
import { action as LogoutAction } from "./utils/logout";
import EmployerProtectedRoute from "./components/Employer/EmployerProtectedRoute";
import JobSeekerProtectedRoute from "./components/JobSeekerProtectedRoute";
import SignInPage from "./pages/SignInPage";
import RootAdminSystem from "./pages/Admin/RootAdminSystem";
import ManageAccount from "./pages/Admin/ManageAccount";
import ManageJobPosting from "./pages/Admin/ManageJobPosting";
import EditableJobDetailPage from "./pages/Employer/JobDetails";
import ManageComments from "./pages/Admin/ManageComments";
import NotificationSystemAdmin from "./pages/Admin/NotificationSystemAdmin";
import CreateCompany from "./pages/Employer/CreateCompany";
import ChooseCompany from "./pages/Employer/ChooseCompany";
import ApplySuccess from "./pages/ApplySuccess";
import ProtectedRouteCompany from "./components/Employer/ProtectedRouteCompany";
import CreateCompanyEmployer from "./pages/Employer/CreateCompanyEmployer";
import RootJobsStatus from "./pages/RootJobsStatus";
import PendingJob from "./pages/PendingJob";
import RejectedJob from "./pages/RejectedJob";
import PassedJob from "./pages/PassedJob";
import RootCVtemplate from "./pages/RootCVtemplate";
import ElegantTemplate from "./pages/ElegantTemplate";
import MinimalTemplate from "./pages/MinimalTemplate";
import ProfileSystem from "./pages/Employer/ProfileSystem";
import ChangePassword from "./pages/Employer/ChangePassword";
import AuthVeritication from "./pages/Employer/AuthVeritication";
import PutEmailVeritication from "./pages/Employer/PutEmailVeritication";
import ProtectedRouteVerifi from "./components/Employer/ProtectedRouteVerifi";
import VerifiInfomation from "./pages/Employer/VerifiInfomation";
import Comment from "./pages/Employer/Comment";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <JobSeekerProtectedRoute>
        <RootLayout />
      </JobSeekerProtectedRoute>
    ),

    // element:<RootLayout/>,
    errorElement: <ErrorPage />,
    id: "root",

    loader: tokenLoader,
    children: [
      {
        index: true,
        element: <HomePage />,
      },

      {
        path: "new",
        element: <ForgotPassword />,
      },
      {
        path: "jobs/detail/:JobId",
        element: <JobDetails />,
      },
      {
        path: "company/detail/:CompanyId",
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
          <ProtectedRoute>
            <RootProfile />
          </ProtectedRoute>
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
        path: "Job-invitation",
        element: (
          <ProtectedRoute>
            <RootJobsStatus />
          </ProtectedRoute>
        ),
        children: [
          {
            index: true,
            element: <PendingJob />,
          },

          {
            path: "Rejected-Jobs",
            element: <RejectedJob />,
          },

          {
            path: "Passed",
            element: <PassedJob />,
          },
        ],
      },
      {
        // Protect my-jobs routes
        path: "my-jobs",
        element: (
          <ProtectedRoute>
            <RootJobs />
          </ProtectedRoute>
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
        id: "CompanyJob",
      },
      {
        path: "all/company",
        element: <CompanyReviews />,
      },
      {
        path: "vietnam-best-it-companies",
        element: <Recommend />,
      },

      {
        path: "logout",
        action: LogoutAction,
      },
    ],
  },
  {
    path: "cv-templates",

    element: (
      <ProtectedRoute>
        <RootCVtemplate />,
      </ProtectedRoute>
    ),

    children: [
      {
        index: true,
        element: <ElegantTemplate />,
      },
      {
        path: "Minimal-template",
        element: <MinimalTemplate />,
      },
    ],
  },
  {
    path: "thankyou/:JobId",
    element: <ApplySuccess />,
  },
  {
    path: "job/Apply/:JobId",
    element: (
      <ProtectedRoute>
        <Apply />
      </ProtectedRoute>
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
  // {
  //   path: "/employers",
  //   element: <RootHeaderEmployer />,
  //   errorElement: <ErrorPage />,
  //   children: [
  //     {
  //       index: true,
  //       element: <EmployerPage />,
  //     },
  //   ],
  // },
  {
    path: "/employers/login",
    element: <SignInPageEmployer />,
  },
  {
    path: "/JobSeekers/login",
    element: <SignInPageJobSeekers />,
  },
  {
    path: "/Auth/Veritication",
    element: <AuthVeritication />,
  },
  {
    path: "/Auth/PutVeritication",
    element: <PutEmailVeritication />,
  },
  {
    path: "auth/Admin",
    element: <SignInPage />,
  },

  {
    path: "/employer-verify/jobs",
    element: (
      <EmployerProtectedRoute>
        <RootSystem />
      </EmployerProtectedRoute>
    ),
    errorElement: <ErrorPage />,
    loader: tokenLoader,
    id: "root1",
    children: [
      {
        path: "Detail/CV/AppliedCV/:JobId",
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
        element: (
          <ProtectedRouteVerifi>
            <JobPage />,
          </ProtectedRouteVerifi>
        ),
      },

      {
        path:'InfoVerification',
        element:<VerifiInfomation/>
      },
      // {
      //   path: "account",
      //   element: <ProfileEmployer />,
      //   children: [
      //     {
      //       index: true,
      //       element: <Profile />,
      //     },
      //     {
      //       path: "company",

      //       element: (
      //         <ProtectedRouteCompany>
      //           <CompanyInfo />
      //          </ProtectedRouteCompany>
      //       ),
      //     },
      //     {
      //       path: "Choosecompany",
      //       element: <CreateCompany />,
      //       children: [
      //         {

      //           index: true,
      //           element: <ChooseCompany />,
      //         },
      //         {
      //           path:'create',
      //           element:<CreateCompanyEmployer/>
      //         }
      //       ],
      //     },
      //   ],
      // },
      {
        path: "account",
        element: <ProfileEmployer />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: "ChangePassword",
            element: <ChangePassword />,
          },
          {
            path: "company",
            element: (
              <ProtectedRouteCompany>
                <CompanyInfo />
              </ProtectedRouteCompany>
            ),
          },
          {
            path: "Choosecompany",
            element: <CreateCompany />,
            children: [
              {
                index: true,
                element: <ChooseCompany />,
              },
              {
                path: "create",
                element: <CreateCompanyEmployer />,
              },
            ],
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
      {
        path: "system-Comment/:commentId",
        element: <Comment/>,
      },
      {
        path: "system-notification",
        element: <NotificationSystem />,
      },
      {
        path: "jobDetail/:id",
        element: <EditableJobDetailPage />,
      },
    ],
  },

  {
    path: "userProfileSystem/:ProfileId",
    element: <ProfileSystem />,
  },
  {
    path: "Admin",
    element: <RootAdminSystem />,
    errorElement: <ErrorPage />,
    id: "root2",
    children: [
      {
        path: "Account",
        index: true,
        element: <ManageAccount />,
      },
      {
        path: "JobPosting",
        // index:true,
        element: <ManageJobPosting />,
      },
      {
        path: "Comment",
        // index:true,
        element: <ManageComments />,
      },
      {
        path: "Notification",
        element: <NotificationSystemAdmin />,
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
