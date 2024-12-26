import React, { useEffect, useState } from "react";
import classes from "./FilterJobbySkill.module.css";
import FormSearch from "../components/FormSearch";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import FilterAltOutlinedIcon from "@mui/icons-material/FilterAltOutlined";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import AccessTimeOutlinedIcon from "@mui/icons-material/AccessTimeOutlined";
import { Link, useLocation, useNavigate } from "react-router-dom";
// import { TodoListSelector } from "../redux/selectorLogic/logicseacrh";
import { useAppDispatch, useAppSelector } from "../redux/hooks/hooks";
// import { companyData } from "../assets/data/CompanyData";
import CardJobSearch from "../components/CardJobSearch";
// import { add, remove } from "../redux/slices/favoriteJob";
import Alert from "@mui/material/Alert";
import AlertTitle from "@mui/material/AlertTitle";
import Stack from "@mui/material/Stack";
import { RootState } from "../redux/store";
import Visibility from "@mui/icons-material/Visibility";
// import { useCompanyAndJobData } from "../redux/selectorLogic/data";
// import { setCompanies } from "../redux/slices/companyJobslice";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";
import moment from "moment";
import { GetJobPost } from "../Services/JobsPost/GetJobPosts";
import { setCompanies, setJobPosts } from "../redux/slices/companyJobslice";

import { GetJobActivity } from "../Services/UserJobPostActivity/GetUserJobPostActivity";
import CheckCircleOutlineOutlinedIcon from "@mui/icons-material/CheckCircleOutlineOutlined";
import Image from "./../assets/image/download.png";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";

import CancelIcon from "@mui/icons-material/Cancel";
import { PostFavoriteJobs } from "../Services/FavoriteJobs/PostFavoriteJobs";
import { queryClient } from "../Services/mainService";
import { message } from "antd";
import { DeleteFavoriteJobs } from "../Services/FavoriteJobs/DeleteFavoriteJobs";
import { GetFavoriteJobs } from "../Services/FavoriteJobs/GetFavoriteJobs";
import { GetSeekerJobPost } from "../Services/JobsPost/GetSeekerJobPost";
import { AnimatePresence } from "framer-motion";
import FeedbackModal from "../components/FeedbackModal";
import { IconButton, Pagination } from "@mui/material";
import { Comment } from "@mui/icons-material";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
import FilterModal from "../components/FilterModal";
import GradientCircularProgress from "../components/NewUiEmployer/GradientCircularProgress";
import ModalSroreSeeker from "../components/ModalSroreSeeker";
import { GetUserProfile } from "../Services/UserProfileService/UserProfile";
interface JobType {
  id: number;
  name: string;
  description: string;
}
interface Benefits {
  id: number;
  name: string;
  // shorthand: string;
  // description: string;
}
interface JobPost {
  id: number;
  jobTitle: string;
  jobDescription: string;
  salary: number;
  postingDate: string;
  expiryDate: string;
  experienceRequired: number;
  qualificationRequired: string;
  benefits: string;
  imageURL: string;
  isActive: boolean;
  companyId: number;
  companyName: string;
  websiteCompanyURL: string;
  jobType: JobType;
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[];
  benefitObjects?: Benefits[];
}

interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface Company {
  id: number;
  companyName: string;
  companyDescription: string;
  websiteURL: string;
  establishedYear: number;
  country: string;
  city: string;
  address: string;
  numberOfEmployees: number;
  businessStream: BusinessStream;
  jobPosts: JobPost[];
  imageUrl: string;
}
interface UserJobActivity {
  id: number;
  applicationDate: string;
  status: string;
  imageURL: string;
  jobTitle: string;
  userId: number;
  jobPostId: number;
}

const FilterJobbySkill: React.FC = () => {
  const location = useLocation();
  // const [favorite, setFavorite] = useState<boolean>(false);
  const [jobDetails, setJobDetails] = useState<JobPost | null>(null);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  // const [totaljobs, setTotalJobs] = useState<number>(0);

  const [openModalScore, setOpenModalScore] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [openSearch,setOpenSearch]=useState<boolean>(false)
  // const [direction, setDirection] = useState(1);

  const itemsPerPage = 9;

  const scrollToTop = () => {
    window.scrollTo({
      top: 100,
      behavior: "smooth",
    });
  };

  function OpenhandleFilter() {
    setOpenFilter(true);
  }
  function CloseHandleFilter() {
    setOpenFilter(false);
  }
  const handleCloseModalScore = () => {
    setOpenModalScore(false);
  };

  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();

  const jobSearchPass = location.state?.jobSearch || [];
  const TextPass = location.state?.text || "";
  const totalJobs = location.state?.total ?? 0;

  console.log("tong job", totalJobs);
  const LocationPass = location.state?.location || [];
  console.log("JobSearchPass", jobSearchPass);

  console.log("text", TextPass);

  const [jobSearch, setJobSearch] = useState<JobPost[] | undefined>(
    location.state?.jobSearch || []
  );
  const auth = localStorage.getItem("Auth");
  const [isCreatingNewChallenge, setIsCreatingNewChallenge] =
    useState<boolean>(false);

  function handleStartAddNewChallenge() {
    setIsCreatingNewChallenge(true);
  }

  function handleDone() {
    setIsCreatingNewChallenge(false);
  }

  // const filteredJobs = useAppSelector(TodoListSelector);
  const {
    data: JobPosts,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPosts"],
    queryFn: ({ signal }) => GetJobPost({ signal: signal }),
    staleTime: 5000,
  });
  const JobPostsdata = JobPosts?.JobPosts;

  const filteredJobs = jobSearch;
  const dataa = useAppSelector((state) => state.companyJobs.jobPosts);
  const searchState = useAppSelector((state) => state.searchJob.search);
  console.log("fe", dataa);
  console.log("searchState", searchState);

  const [detailsCompany, setDetailsCompany] = useState<Company | undefined>();
  const [selectedJob, setSelectedJob] = useState<null | JobPost>(null);
  const [applied, setApplied] = useState<UserJobActivity | undefined>();
  const dispatch = useAppDispatch();
  const selectJobData = (state: RootState) => state.companyJobs.jobPosts;
  console.log("select", selectJobData);
  const {
    data: Company,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });

  const {
    data: JobPostActivity,
    // isLoading: isJobLoading,
    // isError: isJobError,
  } = useQuery({
    queryKey: ["JobPostActivity"],
    queryFn: ({ signal }) => GetJobActivity({ signal: signal }),
    staleTime: 5000,
  });
  const JobPostActivitydata = JobPostActivity?.UserJobActivitys;

  const Companiesdata = Company?.Companies;
  useEffect(() => {
    if (Companiesdata || JobPostsdata) {
      dispatch(setCompanies(Companiesdata || []));
      dispatch(setJobPosts(JobPostsdata || []));
    }
  }, [Companiesdata, JobPostsdata, dispatch]);

  useEffect(() => {
    if (filteredJobs && filteredJobs.length > 0) {
      if (
        !selectedJob ||
        !filteredJobs.some((job) => job.id === selectedJob.id)
      ) {
        const firstJob = filteredJobs[0];
        setJobDetails(firstJob);
        setSelectedJob(firstJob);
      }

      if (selectedJob && JobPostActivitydata) {
        const hasAppliedJobActivity = JobPostActivitydata.find(
          (activity) => activity.jobPostId === selectedJob.id
        );
        setApplied(hasAppliedJobActivity);
      }

      if (selectedJob && Companiesdata) {
        const foundCompany = Companiesdata.find(
          (item) => item.id === selectedJob.companyId
        );
        setDetailsCompany(foundCompany);
      }
    } else {
      setSelectedJob(null);
      setJobDetails(null);
      setDetailsCompany(undefined);
      setApplied(undefined);
    }
  }, [filteredJobs, selectedJob, Companiesdata, JobPostActivitydata]);

  const handleApplyClick = () => {
    if (!auth) {
      navigate(
        "/JobSeekers/login",
        //   {
        //   state: { from: window.location.pathname },
        // }
        { state: { from: `/job/Apply/${jobDetails?.id}` } }
      );
    } else {
      navigate(`/job/Apply/${jobDetails?.id}`);
    }
  };

  const handleOnclickDetails = (job: JobPost) => {
    setJobDetails(job);
    setSelectedJob(job);

    const foundCompany = Companiesdata?.find(
      (item) => item.id === job.companyId
    );
    setDetailsCompany(foundCompany);

    const hasAppliedJobActivity = JobPostActivitydata?.find(
      (activity) => activity.jobPostId === job?.id
    );
    setApplied(hasAppliedJobActivity);
  };

  const expiryDate = jobDetails?.expiryDate
    ? new Date(jobDetails?.expiryDate)
    : null;
  const today = new Date();

  const isExpired = expiryDate ? expiryDate < today : undefined;
  const [showAlert, setShowAlert] = useState<boolean>(false);
  // const handleSaveJob = () => {
  //   if (!auth) {
  //     navigate("/JobSeekers/login", {
  //       state: { from: window.location.pathname },
  //     });
  //   } else {
  //     setFavorite((prev) => !prev);
  //   }
  // };

  const { mutate } = useMutation({
    mutationFn: PostFavoriteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FavoriteJob"],
        refetchType: "active",
      });
      // setFavorite(true)
      setShowAlert(true);
      message.success(`Save ${jobDetails?.jobTitle} Successfully`);
    },
    onError: () => {
      message.error(`Failed to Follow ${jobDetails?.jobTitle} `);
    },
  });
  const { mutate: Unfollow } = useMutation({
    mutationFn: DeleteFavoriteJobs,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FavoriteJob"],
        refetchType: "active",
      });
      // setFavorite(false)
      message.success(`Unfollow ${jobDetails?.jobTitle} Successfully`);
    },
    onError: () => {
      message.error(`Failed to UnFollow ${jobDetails?.jobTitle} `);
    },
  });
  const handleUnFollow = () => {
    if (!auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    }
    Unfollow({ id: Number(haveFavorite?.id) });
  };

  const { data: SeekerApply } = useQuery({
    queryKey: ["SeekerApply", jobDetails?.id],
    queryFn: ({ signal }) =>
      GetSeekerJobPost({ id: Number(jobDetails?.id), signal }),
    enabled: !!jobDetails?.id,
  });

  const dataSeeker = SeekerApply?.GetSeekers;

  const feedBackUserJob = dataSeeker?.find(
    (item) => item.id === Number(userId)
  );
  const { data: UserProfile } = useQuery({
    queryKey: ["UserProfile"],
    queryFn: ({ signal }) =>
      GetUserProfile({ id: Number(userId), signal: signal }),
    enabled: !!userId,
  });

  const profile = UserProfile?.UserProfiles;

  const handleSaveJob = () => {
    if (!auth) {
      navigate("/JobSeekers/login", {
        state: { from: window.location.pathname },
      });
    } else {
      mutate({
        data: {
          jobPostId: Number(jobDetails?.id),
        },
      });
    }
  };

  const { data: FavoriteJob } = useQuery({
    queryKey: ["FavoriteJob"],
    queryFn: ({ signal }) => GetFavoriteJobs({ signal }),
    staleTime: 5000,
  });
  const FavoriteJobs = FavoriteJob?.JobPost;
  console.log("hehe", FavoriteJobs);

  const haveFavorite = FavoriteJobs?.find(
    (item) => item.id === Number(jobDetails?.id)
  );
  // useEffect(() => {
  //   if (favorite && jobDetails) {
  //     dispatch(add(jobDetails));
  //     setShowAlert(true);
  //     const timer = setTimeout(() => {
  //       setShowAlert(false);
  //     }, 3000);

  //     return () => clearTimeout(timer);
  //   } else if (!favorite && jobDetails) {
  //     dispatch(remove(jobDetails.id));
  //   }
  // }, [favorite, jobDetails, dispatch]);

  // const getJobLocation = (
  //   jobLocation: JobLocation | string | null | undefined
  // ): string => {
  //   if (typeof jobLocation === "string") {
  //     return jobLocation;
  //   } else if (jobLocation === null) {
  //     return "Location not specified";
  //   } else {
  //     return `${jobLocation?.district}, ${jobLocation?.city}, ${jobLocation?.state}, ${jobLocation?.country}`;
  //   }
  // };
  const [text, setText] = useState<string>(TextPass);

  useEffect(() => {
    if (TextPass) {
      setText(TextPass);
    }
  }, [TextPass]);
  const [locationne, setLocation] = useState<string>(LocationPass);
  console.log("duockoni", text);
  // const { mutateAsync } = useMutation({

  //   mutationFn: GetJobSearch,
  //   onSuccess: (data) => {
  //     console.log("Search result:", data);

  //     if (data && data.result && data.result.items.length > 0) {
  //       setJobSearch(data.result.items);
  //     }

  //     queryClient.invalidateQueries({
  //       queryKey: ["JobSearch"],
  //       refetchType: "active",
  //     });

  //     // navigate("/it-jobs");
  //   },
  //   onError: () => {
  //     message.error("Failed to Search");
  //   },
  // });

  const handlePageChange = async (
    _: React.ChangeEvent<unknown>,
    page: number
  ) => {
    // setDirection(page > currentPage ? 1 : -1);
    setCurrentPage(page);
    scrollToTop();
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }

    // Define the shape of each search data object
    interface SearchData {
      jobTitle?: string;
      companyName?: string;
      skillSet?: string;
      city?: string;
      location?: string;
      // experience?: number;
      jobType?: string;
      pageSize: number;
      pageIndex?: number;
      keyword?: string;
    }

    // Define searchDataArray with the SearchData[] type
    let searchDataArray: SearchData[];

    if (locationne === "All" && text === "") {
      searchDataArray = [
        // { jobTitle: text, pageSize: 9, pageIndex: page },
        // { companyName: text, pageSize: 9, pageIndex: page },
        // { skillSet: text, pageSize: 9, pageIndex: page },
        // { city: text, pageSize: 9, pageIndex: page },
        // { location: text, pageSize: 9, pageIndex: page },
        { keyword: text, pageSize: 9, pageIndex: page },
        // { experience: Number(text), pageSize: 9 },
        // { jobType: text, pageSize: 9, pageIndex: page },
      ];
    } else if (locationne !== "All" && text === "") {
      searchDataArray = [
        // { city: locationne, pageSize: 9, pageIndex: page },
        // { location: locationne, pageSize: 9, pageIndex: page },
        { keyword: locationne, pageSize: 9, pageIndex: page },
      ];
    } else if (locationne !== "All" && text !== "") {
      searchDataArray = [
        // {
        //   jobTitle: text,
        //   city: locationne,
        //   pageSize: 9,
        //   pageIndex: page,
        // },
        {
          // jobTitle: text,

          keyword: text,
          // city: locationne,
          pageSize: 9,
          pageIndex: page,
        },
        // {
        //   companyName: text,
        //   city: locationne,
        //   pageSize: 9,
        //   pageIndex: page,
        // },
        // {
        //   skillSet: text,
        //   city: locationne,
        //   pageSize: 9,
        //   pageIndex: page,
        // },
        // { city: text, pageSize: 9 },
        // {
        //   location: text,
        //   city: locationne,
        //   pageSize: 9,
        //   pageIndex: page,
        // },
        // // { experience: Number(text), city: locationne, pageSize: 9 },
        // {
        //   jobType: text,
        //   city: locationne,
        //   pageSize: 9,
        //   pageIndex: page,
        // },
      ];
    } else if (locationne == "All" && text !== "") {
      searchDataArray = [
        // { jobTitle: text, pageSize: 9, pageIndex: page },
        // { companyName: text, pageSize: 9, pageIndex: page },
        // { skillSet: text, pageSize: 9, pageIndex: page },
        // { city: text, pageSize: 9, pageIndex: page },
        // { location: text, pageSize: 9, pageIndex: page },
        { keyword: text, pageSize: 9, pageIndex: page },

        // { experience: Number(text), pageSize: 9 },
        // { jobType: text, pageSize: 9, pageIndex: page },
      ];
    } else {
      searchDataArray = []; // Default to an empty array if no conditions are met
    }

    // Loop through searchDataArray and attempt a job search with each item
    for (let i = 0; i < searchDataArray.length; i++) {
      try {
        console.log("Searching with:", searchDataArray[i]);

        const result: JobSearchResponse = await mutateAsync({
          data: searchState,
        });

        console.log("Search results:", result.result.items);

        // If there are results, set them and exit the loop
        if (result && result.result && result.result.items.length > 0) {
          setJobSearch(result.result.items);

          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        const total = data.result.totalCount;
        setJobSearch(data.result.items);
        setOpenSearch(false)
        // setCurrentPage(1)
        // setTotalJobs(data.result.totalCount);
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            text: text,
            // location: location,
            total: total,
            currentPage: 1,
          },
        });
      } else {
        setJobSearch([]);
        navigate("/it_jobs", {
          state: {
            text: text,
            // location: location,
            jobSearch: [],
            total: 0,
            currentPage: 0,
          },
        });
      }

      queryClient.invalidateQueries({
        queryKey: ["JobSearch"],
        refetchType: "active",
      });

      // navigate("/it-jobs",{state : text});
    },
    onError: () => {
      message.error("Failed to Search");
    },
  });

  useEffect(() => {
    if (location.state?.jobSearch) {
      setJobSearch(location.state.jobSearch);
    } else
      mutateAsync({
        data: {
          // keyword: text,  
          pageIndex: currentPage,
          pageSize: itemsPerPage,
        },
      });
  }, [
    location.state?.jobSearch,
    JobPostsdata,
    itemsPerPage,
    currentPage,
    mutateAsync,
  ]);

  // const handleNavigateJob = async () => {
  //   setCurrentPage(1);
  //   await mutateAsync({
  //     data: searchState, // Correct placement of the `data` key
  //   });
  // };
  
  const handleNavigateJob = async () => {
    setCurrentPage(1);
    // Define the shape of job data returned by the mutation
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }

    // Define the shape of each search data object
    interface SearchData {
      jobTitle?: string;
      companyName?: string;
      skillSet?: string;
      city?: string;
      location?: string;
      // experience?: number;
      jobType?: string;
      pageSize: number;

      pageIndex?: number;
      keyword?: string;
    }

    // Define searchDataArray with the SearchData[] type
    let searchDataArray: SearchData[];

    if (locationne === "All" && text === "") {
      searchDataArray = [
        // { jobTitle: text, pageSize: 9, pageIndex: 1 },
        // { companyName: text, pageSize: 9, pageIndex: 1 },
        //         { skillSet: text, pageSize: 9, pageIndex: 1 },
        // { city: text, pageSize: 9, pageIndex: 1 },
        // { location: text, pageSize: 9, pageIndex: 1 },
        { keyword: text, pageSize: 9, pageIndex: 1 },
        // { experience: Number(text), pageSize: 9 },
        // { jobType: text, pageSize: 9, pageIndex: 1 },
      ];
    } else if (locationne !== "All" && text === "") {
      searchDataArray = [
        // { city: locationne, pageSize: 9, pageIndex: 1 },
        // { location: locationne, pageSize: 9, pageIndex: 1 },
        { keyword: locationne, pageSize: 9, pageIndex: 1 },
      ];
    } else if (locationne !== "All" && text !== "") {
      searchDataArray = [
        // { jobTitle: text, city: locationne, pageSize: 9, pageIndex: 1 },
        // { companyName: text, city: locationne, pageSize: 9, pageIndex: 1 },
        // { skillSet: text, city: locationne, pageSize: 9, pageIndex: 1 },
        // { city: text, pageSize: 9 },
        // { location: text, city: locationne, pageSize: 9, pageIndex: 1 },
        { keyword: text, pageSize: 9, pageIndex: 1 },
        // { experience: Number(text), city: locationne, pageSize: 9 },
        // { jobType: text, city: locationne, pageSize: 9, pageIndex: 1 },
      ];
    } else if (locationne == "All" && text !== "") {
      searchDataArray = [
        // { jobTitle: text, pageSize: 9, pageIndex: 1 },
        // { companyName: text, pageSize: 9, pageIndex: 1 },
        // { skillSet: text, pageSize: 9, pageIndex: 1 },
        // { city: text, pageSize: 9, pageIndex: 1 },
        // { location: text, pageSize: 9, pageIndex: 1 },
        { keyword: text, pageSize: 9, pageIndex: 1 },
        // { experience: Number(text), pageSize: 9 },
        // { jobType: text, pageSize: 9, pageIndex: 1 },
      ];
    } else {
      searchDataArray = []; // Default to an empty array if no conditions are met
    }

    // Loop through searchDataArray and attempt a job search with each item
    for (let i = 0; i < searchDataArray.length; i++) {
      try {
        console.log("Searching with:", searchDataArray[i]);

        const result: JobSearchResponse = await mutateAsync({
          data: searchState,
        });

        console.log("Search results:", result.result.items);

        // If there are results, set them and exit the loop
        if (result && result.result && result.result.items.length > 0) {
          setJobSearch(result.result.items);

          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
  };

  return (
    <div className={classes.main}>
      {openFilter && (
        // <FilterModal filteredJobs={filteredJobs} onDone={CloseHandleFilter} />
        <FilterModal setText={setText} filteredJobs={JobPostsdata} onDone={CloseHandleFilter} />
      )}
      <AnimatePresence>
        {openModalScore && (
          <ModalSroreSeeker
            onClose={handleCloseModalScore}
            profile={profile}
            id={Number(userId)}
            idJob={jobDetails?.id}
            feedBackUserJob={feedBackUserJob}
          />
        )}
      </AnimatePresence>
      <div className={classes.main1}>
        {showAlert && (
          <Stack
            sx={{
              left: "inherit",
              right: 0,
              top: "120px",
              bottom: "inherit",
              marginRight: "48px",
              width: "400px",
              opacity: showAlert ? 1 : 0,
              zIndex: 11,
              backgroundColor: "#eaf9e9",
              padding: "16px 16px 16px 24px",
              border: "none",
              borderRadius: "8px",
              maxWidth: "400px",
              position: "fixed",
              boxShadow: "0px 6px 32px rgba(0, 0, 0, 0.08)",
              display: showAlert ? "block" : "none",
              fontSize: "0.875rem",
              pointerEvents: "auto",
              transition: "opacity 0.15s linear",
              boxSizing: "border-box",
            }}
          >
            <Alert severity="success">
              <AlertTitle>Success</AlertTitle>
              <div style={{ display: "block" }}>
                <div
                  style={{
                    color: "#121212",
                    marginRight: "18px",
                    display: "block",
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ fontWeight: 400, lineHeight: 1.5, fontSize: "16px" }}
                  >
                    This job has been added to your <strong> Saved jobs</strong>
                  </Typography>
                </div>
                <div
                  style={{
                    display: "flex",
                    gap: "20px",
                    color: "#0e2eed",
                    marginTop: "12px",
                  }}
                >
                  <Link
                    style={{ color: "#0e2eed", textDecoration: "none" }}
                    to={"/my-jobs"}
                  >
                    View list
                  </Link>
                </div>
              </div>
            </Alert>
          </Stack>
        )}
        <div className={classes.container}>
          <div className={classes.container1}>
            <FormSearch
              setJobSearch={setJobSearch}
              jobSearch={jobSearch}
              text={text}
              isPending={isPending}
              location={locationne}
              setLocation={setLocation}
              setText={setText}
              onClick={handleNavigateJob}
              open={openSearch}
              setOpen={setOpenSearch}
            />
          </div>
        </div>
        <div className={classes.content}>
          <div className={classes.content1}>
            <div className={classes.content2}>
              <div className={classes.content3}>
                <div className={classes.title1}>
                  <Typography
                    variant="h1"
                    sx={{
                      color: "#121212",
                      lineHeight: 1.5,
                      fontSize: "28px",
                      fontWeight: 700,
                      marginTop: 0,
                      marginBottom: 0,
                    }}
                  >
                    {/* {filteredJobs?.length} Jobs IT in Vietnam{" "} */}
                    {totalJobs === 0 ? filteredJobs?.length : totalJobs} Jobs IT
                    in Vietnam with {text} keyword
                  </Typography>
                  {filteredJobs &&
                  filteredJobs.length &&
                  filteredJobs.length > 0 ? (
                    <div className={classes.filter}>
                      <div className={classes.btn}>
                        <Button
                          variant="outlined"
                          startIcon={<FilterAltOutlinedIcon />}
                          onClick={OpenhandleFilter}
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            padding: "7px 20px",
                            minWidth: "140px",
                            borderRadius: "4px",
                            color: "#3cbc8c",
                            backgroundColor: "white",
                            borderColor: "#ed1b2f",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            lineHeight: 1.5,
                            border: "1px solid #3cbc8c",
                            gap: "8px",
                            "&:hover": {
                              backgroundColor: "#3cbc8c",
                              color: "black",
                              borderColor: "#3cbc8c",
                            },
                          }}
                        >
                          <span style={{ fontWeight: 5000 }}>Filter</span>
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className={classes.filter}>
                      <div className={classes.btn}>
                        <Button
                          variant="outlined"
                          startIcon={<FilterAltOutlinedIcon />}
                          onClick={OpenhandleFilter}
                          sx={{
                            fontSize: "16px",
                            fontWeight: 500,
                            padding: "7px 20px",
                            minWidth: "140px",
                            borderRadius: "4px",
                            color: "#ed1b2f",
                            backgroundColor: "#fff",
                            borderColor: "#ed1b2f",
                            display: "inline-flex",
                            justifyContent: "center",
                            alignItems: "center",
                            lineHeight: 1.5,
                            border: "1px solid #ed1b2f",
                            gap: "8px",
                            "&:hover": {
                              backgroundColor: "#f60d00",
                              color: "white",
                              borderColor: "#f60d00",
                            },
                          }}
                        >
                          <span style={{ fontWeight: 5000 }}>Filter</span>
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
                <div className={classes.detail}>
                  <div className={classes.detailleft}>
                    {filteredJobs?.map((job) => {
                      const companys = Companiesdata?.find(
                        (item) => item.id === job.companyId
                      );

                      // const jobs = JobPostsdata?.find(
                      //   (item) => item.id === job.id
                      // );
                      // const hasAppliedJobActivity = filteredJobs?.some((job) =>
                      //   JobPostActivitydata?.some(
                      //     (activity) => job.id === activity.jobPostId
                      //   )
                      // );
                      const hasAppliedJobActivity = JobPostActivitydata?.find(
                        (activity) => activity.jobPostId === job?.id
                      );

                      return (
                        <CardJobSearch
                          selectedJob={selectedJob}
                          key={job.id}
                          data={job}
                          applied={hasAppliedJobActivity}
                          img={
                            job?.imageURL === null || job?.imageURL === "string"
                              ? Image
                              : job?.imageURL
                          }
                          company={companys}
                          onclick={() => handleOnclickDetails(job)}
                        />
                      );
                    })}
                    <div className={classes.pagination}>
                      <Pagination
                        count={Math.ceil(totalJobs / itemsPerPage)}
                        page={currentPage}
                        onChange={handlePageChange}
                        color="primary"
                        size="large"
                        sx={{
                          display: "flex",
                          justifyContent: "center",
                          marginTop: "20px",
                        }}
                      />
                    </div>
                  </div>
                  {filteredJobs &&
                  filteredJobs.length > 0 &&
                  jobDetails &&
                  detailsCompany ? (
                    <div className={classes.detailRight}>
                      <AnimatePresence>
                        {isCreatingNewChallenge && (
                          <FeedbackModal
                            onDone={handleDone}
                            data={feedBackUserJob?.jobPostActivityComments}
                          />
                        )}
                      </AnimatePresence>
                      <div className={classes.apply}>
                        <div className={classes.apply1}>
                          <div className={classes.apply2}>
                            <img
                              src={
                                detailsCompany?.imageUrl === null ||
                                detailsCompany?.imageUrl === "string"
                                  ? Image
                                  : detailsCompany?.imageUrl
                              }
                              alt="Job"
                              style={{ width: "100px", height: "100px" }}
                            />
                            <div>
                              <Link
                                to={`/jobs/detail/${jobDetails?.id}`}
                                className={classes.link}
                              >
                                <Typography
                                  variant="h2"
                                  sx={{
                                    color: "#121212",
                                    lineHeight: 1.5,
                                    fontSize: "22px",
                                    fontWeight: 700,
                                    mt: 0,
                                    mb: 0,
                                    fontFamily: "Lexend, sans-serif",
                                  }}
                                >
                                  {jobDetails?.jobTitle}
                                </Typography>
                              </Link>
                              <Typography
                                variant="body1"
                                sx={{
                                  color: "#121212",
                                  lineHeight: 1.5,
                                  fontSize: "16px",
                                  fontWeight: 400,
                                  mt: 0,
                                  mb: 0,
                                  fontFamily: "Lexend, sans-serif",
                                }}
                              >
                                {detailsCompany?.companyName}
                              </Typography>
                              <div className={classes.money}>
                                <MonetizationOnOutlinedIcon
                                  sx={{ color: "#0ab305 !important" }}
                                />
                                <Typography
                                  variant="h6"
                                  gutterBottom
                                  sx={{
                                    alignItems: "start",
                                    fontWeight: "bold",
                                    mt: "7px",
                                    color: "#0ab305 !important",
                                    fontFamily: "Lexend, sans-serif",
                                  }}
                                >
                                  {jobDetails?.salary} USD
                                </Typography>
                              </div>
                            </div>
                            {feedBackUserJob ? (
                              <>
                                <button
                                  type="button"
                                  className={classes.button6}
                                  onClick={() =>
                                    setOpenModalScore(!openModalScore)
                                  }
                                >
                                  {/* <span className={classes.spanicon}> */}
                                  {feedBackUserJob.analyzedResult
                                    .matchDetails && (
                                    <GradientCircularProgress
                                      percentage={
                                        feedBackUserJob.analyzedResult
                                          .matchDetails.scores.overallMatch
                                      }
                                    />
                                  )}

                                  {/* </span> */}
                                </button>
                              </>
                            ) : undefined}
                          </div>
                          {applied && auth ? (
                            <div
                              className={
                                applied?.status === "Pending"
                                  ? classes.Pending
                                  : applied?.status === "Rejected"
                                  ? classes.Rejected
                                  : classes.jobapply
                              }
                            >
                              <div className={classes.jobapply1}>
                                {applied?.status === "Pending" ? (
                                  <HourglassEmptyIcon />
                                ) : applied?.status === "Rejected" ? (
                                  <CancelIcon />
                                ) : (
                                  <CheckCircleOutlineOutlinedIcon />
                                )}
                                {applied.status}{" "}
                                <div style={{ marginLeft: "auto" }}>
                                  Applied Date: {""}
                                  {moment(applied?.applicationDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </div>
                                {feedBackUserJob?.status === "Rejected" ||
                                feedBackUserJob?.status === "Passed" ||
                                feedBackUserJob?.status === "InterviewStage" ||
                                feedBackUserJob?.status ===
                                  "CVScreeningPassed" ? (
                                  <span className={classes.span1}>
                                    <IconButton
                                      onClick={() =>
                                        window.open(
                                          feedBackUserJob?.cvPath,
                                          "_blank"
                                        )
                                      }
                                    >
                                      <Visibility />
                                    </IconButton>
                                    <IconButton
                                      onClick={handleStartAddNewChallenge}
                                    >
                                      <Comment />
                                    </IconButton>
                                  </span>
                                ) : undefined}
                              </div>
                            </div>
                          ) : isExpired ? (
                            <div className={classes.button_icon}>
                              <Button
                                // onClick={handleNavigateApply}
                                disabled={true}
                                sx={{
                                  mt: 3,
                                  width: "90%",
                                  backgroundColor: "#b0b0b0",
                                  borderColor: "#b0b0b0",
                                  color: "#fff",
                                  borderRadius: "4px",
                                  fontSize: "16px",
                                  fontWeight: "bold",
                                  padding: "11px 24px",
                                  fontFamily: "Lexend, sans-serif",
                                  "&:hover": {
                                    // backgroundColor: "#C82222",
                                    backgroundColor: "#b0b0b0",

                                    color: "white",
                                  },
                                }}
                              >
                                application deadline
                              </Button>
                            </div>
                          ) : (
                            <div className={classes.button_icon}>
                              <Button
                                onClick={handleApplyClick}
                                sx={{
                                  mt: 3,
                                  width: "90%",
                                  backgroundColor: "#3cbc8c",
                                  borderColor: "#ed1b2f",
                                  color: "black",
                                  borderRadius: "4px",
                                  fontSize: "18px",
                                  fontWeight: "bold",
                                  padding: "11px 24px",
                                  fontFamily: "Lexend, sans-serif",
                                  "&:hover": {
                                    backgroundColor: "#3ca666",

                                    color: "white",
                                  },
                                }}
                              >
                                Apply now
                              </Button>
                              {haveFavorite ? (
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={handleUnFollow}
                                >
                                  <FavoriteIcon
                                    fontSize="large"
                                    sx={{
                                      color: "#3cbc8c !important",
                                      marginTop: "20px",
                                      mr: 2,
                                    }}
                                  />
                                </div>
                              ) : (
                                <div
                                  style={{ cursor: "pointer" }}
                                  onClick={handleSaveJob}
                                >
                                  <FavoriteBorderOutlinedIcon
                                    fontSize="large"
                                    sx={{
                                      color: "#3cbc8c !important",

                                      marginTop: "20px",
                                      mr: 2,
                                    }}
                                  />
                                </div>
                              )}
                            </div>
                          )}
                        </div>
                        <hr
                          style={{
                            height: "1px",
                            marginLeft: "24px",
                            marginRight: "24px",
                            marginTop: "0px",
                            marginBottom: "0px",
                            color: "#dedede",
                            backgroundColor: "currentcolor",
                            border: 0,
                            opacity: 1,
                          }}
                        />
                        <div className={classes.morecontent}>
                          <div className={classes.morecontent1}>
                            <div className={classes.morecontent2}>
                              {jobDetails.jobLocationAddressDetail.length >
                              0 ? (
                                jobDetails.jobLocationAddressDetail.map(
                                  (item, index) => (
                                    <div
                                      key={index}
                                      className={classes.location}
                                    >
                                      <LocationOnOutlinedIcon
                                        fontSize="large"
                                        sx={{
                                          width: "16px",
                                          height: "16px",
                                          color: "#a6a6a6",
                                          mt: "10px",
                                          fontFamily: "Lexend, sans-serif",
                                        }}
                                      />
                                      <Typography
                                        variant="h5"
                                        gutterBottom
                                        sx={{
                                          alignItems: "start",
                                          fontWeight: 500,
                                          mt: "7px",
                                          color: "#414042",
                                          fontSize: "16px",
                                          fontFamily: "Lexend, sans-serif",
                                        }}
                                      >
                                        {item}
                                      </Typography>
                                    </div>
                                  )
                                )
                              ) : (
                                <div className={classes.location}>
                                  <LocationOnOutlinedIcon
                                    fontSize="large"
                                    sx={{
                                      width: "16px",
                                      height: "16px",
                                      color: "#a6a6a6",
                                      mt: "10px",
                                      fontFamily: "Lexend, sans-serif",
                                    }}
                                  />
                                  <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                      alignItems: "start",
                                      fontWeight: 500,
                                      mt: "7px",
                                      color: "#414042",
                                      fontSize: "16px",
                                      fontFamily: "Lexend, sans-serif",
                                    }}
                                  >
                                    {detailsCompany.address}
                                    {" in "}
                                    {detailsCompany.city}
                                  </Typography>
                                </div>
                              )}
                              <div className={classes.time}>
                                <AccessTimeOutlinedIcon
                                  fontSize="large"
                                  sx={{
                                    width: "16px",
                                    height: "16px",
                                    color: "#a6a6a6",
                                    mt: "10px",
                                    fontFamily: "Lexend, sans-serif",
                                  }}
                                />
                                <Typography
                                  variant="h5"
                                  gutterBottom
                                  sx={{
                                    alignItems: "start",
                                    fontWeight: 500,
                                    mt: "7px",
                                    color: " #414042 ",
                                    fontSize: "16px",
                                    fontFamily: "Lexend, sans-serif",
                                  }}
                                >
                                  From{" "}
                                  {moment(jobDetails?.postingDate).format(
                                    "DD-MM-YYYY"
                                  )}{" "}
                                  To{" "}
                                  {moment(jobDetails?.expiryDate).format(
                                    "DD-MM-YYYY"
                                  )}
                                </Typography>
                              </div>
                              <div className={classes.skill}>
                                <Typography
                                  variant="h5"
                                  gutterBottom
                                  sx={{
                                    alignItems: "start",
                                    fontWeight: 500,
                                    mt: "7px",
                                    color: " #414042 ",
                                    fontSize: "16px",
                                    fontFamily: "Lexend, sans-serif",
                                  }}
                                >
                                  Skill :
                                </Typography>
                                {jobDetails?.skillSets.map((item, index) => (
                                  <button
                                    style={{ fontFamily: "Lexend, sans-serif" }}
                                    key={index}
                                    className={classes.button}
                                  >
                                    {item}
                                  </button>
                                ))}
                                {/* <button className={classes.button}>Java</button>
                              <button className={classes.button}>PHP</button>
                              <button className={classes.button}>GoLang</button> */}
                              </div>
                              <div className={classes.skill}>
                                <Typography
                                  variant="h5"
                                  gutterBottom
                                  sx={{
                                    alignItems: "start",
                                    fontWeight: 500,
                                    mt: "7px",
                                    color: " #414042 ",
                                    fontSize: "16px",
                                    fontFamily: "Lexend, sans-serif",
                                  }}
                                >
                                  Benefits :
                                </Typography>

                                {jobDetails?.benefitObjects &&
                                jobDetails.benefitObjects.length > 0 ? (
                                  jobDetails?.benefitObjects.map((item) => (
                                    <button
                                      style={{
                                        fontFamily: "Lexend, sans-serif",
                                      }}
                                      key={item.id}
                                      className={classes.button}
                                    >
                                      {item.name}
                                    </button>
                                  ))
                                ) : (
                                  <Typography
                                    variant="h5"
                                    gutterBottom
                                    sx={{
                                      alignItems: "start",
                                      fontWeight: 500,
                                      mt: "7px",
                                      color: " #414042 ",
                                      fontSize: "16px",
                                      fontFamily: "Lexend, sans-serif",
                                    }}
                                  >
                                    {" "}
                                    No Benefits yet
                                  </Typography>
                                )}
                                {/* <button className={classes.button}>Java</button>
                              <button className={classes.button}>PHP</button>
                              <button className={classes.button}>GoLang</button> */}
                              </div>
                            </div>
                          </div>
                          <div className={classes.line}></div>

                          <Content
                            title="Top 3 reasons to join us"
                            arraylist={[
                              "Mức lương cạnh tranh, hấp dẫn",
                              "Môi trường làm việc chuyên nghiệp, thân thiện",
                              "Được làm việc với các hệ thống hiện đại, tiên tiến",
                              "Lập trình, phát triển các ứng dụng của Ngân hàng",
                            ]}
                          />
                          <div className={classes.line}></div>
                          <div className={classes.morecontent1}>
                            <Typography
                              variant="h2"
                              sx={{
                                color: "#121212",
                                lineHeight: 1.5,
                                fontSize: "22px",
                                fontWeight: 700,
                                mt: 0,
                                mb: 0,
                              }}
                            >
                              Job Description
                            </Typography>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: 1.8,
                                marginTop: ".5rem",
                                marginBottom: ".5rem",
                                paddingLeft: "18px",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: jobDetails.jobDescription,
                                }}
                              />
                            </div>
                          </div>
                          {/* <Content
                            title="Job description"
                            arraylist={[jobDetails?.jobDescription]}
                          /> */}
                          <div className={classes.line}></div>
                          {/* <Content
                            title="Your skills and experience"
                            arraylist={[
                              `Yêu cầu kinh nghiệm  ${jobDetails?.experienceRequired}`,
                              jobDetails?.jobDescription,
                            ]}
                          /> */}
                          <div className={classes.morecontent1}>
                            <Typography
                              variant="h2"
                              sx={{
                                color: "#121212",
                                lineHeight: 1.5,
                                fontSize: "22px",
                                fontWeight: 700,
                                mt: 0,
                                mb: 0,
                              }}
                            >
                              Your Skill and Experience
                            </Typography>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: 1.8,
                                marginTop: ".5rem",
                                marginBottom: ".5rem",
                                paddingLeft: "18px",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: jobDetails.qualificationRequired,
                                }}
                              />
                            </div>
                          </div>
                          <div className={classes.line}></div>
                          <div className={classes.morecontent1}>
                            <Typography
                              variant="h2"
                              sx={{
                                color: "#121212",
                                lineHeight: 1.5,
                                fontSize: "22px",
                                fontWeight: 700,
                                mt: 0,
                                mb: 0,
                              }}
                            >
                              Benefits
                            </Typography>
                            <div
                              style={{
                                fontSize: "16px",
                                fontWeight: 400,
                                lineHeight: 1.8,
                                marginTop: ".5rem",
                                marginBottom: ".5rem",
                                paddingLeft: "18px",
                              }}
                            >
                              <div
                                dangerouslySetInnerHTML={{
                                  __html: jobDetails.benefits,
                                }}
                              />
                            </div>
                          </div>
                          <hr
                            style={{
                              height: "1px",
                              marginLeft: "24px",
                              marginRight: "24px",
                              marginTop: "0px",
                              marginBottom: "0px",
                              color: "#dedede",
                              backgroundColor: "currentcolor",
                              border: 0,
                              opacity: 1,
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  ) : (
                    <></>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

interface ContentProps {
  title: string;
  arraylist: string[] | number[] | (string | number)[];
}

const Content = ({ title, arraylist }: ContentProps) => {
  return (
    <div className={classes.morecontent1}>
      <Typography
        variant="h2"
        sx={{
          color: "#121212",
          lineHeight: 1.5,
          fontSize: "22px",
          fontWeight: 700,
          mt: 0,
          mb: 0,
        }}
      >
        {title}
      </Typography>
      <ul
        style={{
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: 1.8,
          marginTop: ".5rem",
          marginBottom: ".5rem",
          paddingLeft: "18px",
        }}
      >
        {arraylist.map((value, index) => (
          <li
            key={index}
            style={{
              paddingTop: "4px",
              padding: "4px",
              fontSize: "16px",
              fontWeight: 400,
              lineHeight: 1.8,
            }}
          >
            {value}
          </li>
        ))}
      </ul>
    </div>
  );
};
export default FilterJobbySkill;
