import React, { useEffect, useRef, useState } from "react";
import classes from "./Subscription.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Link, useNavigate } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";

import { queryClient } from "../Services/mainService";
import { message } from "antd";

import WorkOutlineIcon from "@mui/icons-material/WorkOutline";

import { PostFollowCompany } from "../Services/FollowCompany/PostFollowCompany";
import { DeleteFollowCompany } from "../Services/FollowCompany/DeleteFollowCompany";
import { GetFollowCompany } from "../Services/FollowCompany/GetFollowCompany";
import { GetSkillSets } from "../Services/SkillSet/GetSkillSet";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { GetUserJobAlertCriteria } from "../Services/UserJobAlertCriteriaService/GetUserJobAlertCriteria";
import { PostUserJobAlertCriteria } from "../Services/UserJobAlertCriteriaService/PostUserJobAlertCriteria ";
import { DeleteUserJobAlertCriteria } from "../Services/UserJobAlertCriteriaService/DeleteUserJobAlertCriteria";
import { GetJobType } from "../Services/JobTypeService/GetJobType";
import { GetJobSearch } from "../Services/JobSearchService/JobSearchService";
// interface BusinessStreamprops {
//   id: number;
//   businessStreamName: string;
//   description: string;
// }
interface BusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}
interface JobType {
  id: number;
  name: string;
  description: string;
}
interface JobType {
  id: number;
  name: string;
  description: string;
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
  jobType: JobType; // jobType là đối tượng JobType
  jobLocationCities: string[];
  jobLocationAddressDetail: string[];
  skillSets: string[]; // Array of skill sets, có thể là array rỗng
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
interface SkillSet {
  id: number;
  name: string;
  shorthand: string;
  description: string;
}

interface Location {
  Id: number;
  City: string;
}

const locationsData = [
  { City: "HO CHI MINH", Id: 1 },
  { City: "HA NOI", Id: 2 },
  { City: "DA NANG", Id: 3 },
  { City: "HAI PHONG", Id: 4 },
  { City: "CAN THO", Id: 5 },
  { City: "NHA TRANG", Id: 6 },
];

export default function Subscription() {
  const UserId = localStorage.getItem("userId");
  const {
    data: Company,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;

  const { data: SkillSetdata } = useQuery({
    queryKey: ["SkillSet"],
    queryFn: ({ signal }) => GetSkillSets({ signal }),
    staleTime: 5000,
  });
  const SkillSetdataa = SkillSetdata?.SkillSets;
  const { data: JobTypedata } = useQuery({
    queryKey: ["JobType"],
    queryFn: ({ signal }) => GetJobType({ signal }),
    staleTime: 5000,
  });

  const JobTypeDatas = JobTypedata?.JobTypes;

  const { mutate: PostAlert, isPending: AlertPending } = useMutation({
    mutationFn: PostUserJobAlertCriteria,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UserJobAlertCriteria"],
        refetchType: "active", // Ensure an active refetch
      });
      message.success("Subscribe");
    },

    onError: () => {
      message.error("Failed to Alert .");
    },
  });

  const { mutate: DeleteUserAlert, isPending: PendingAlert } = useMutation({
    mutationFn: DeleteUserJobAlertCriteria,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["UserJobAlertCriteria"],
        refetchType: "active", // Ensure an active refetch
      });
      message.success("UnSubscribe sucessfully");
    },

    onError: () => {
      message.error("Failed to Alert .");
    },
  });

  const { data: Alert } = useQuery({
    queryKey: ["UserJobAlertCriteria"],
    queryFn: ({ signal }) =>
      GetUserJobAlertCriteria({ signal, id: Number(UserId) }),
    staleTime: 5000,
    enabled: !!UserId,
  });
  const AlertData = Alert?.Criteria;

  const navigate = useNavigate();
  const [jobSearch, setJobSearch] = useState<JobPost[]>([]);
  const [text, setText] = useState<string>("");
  console.log("data", jobSearch);
  const { mutateAsync } = useMutation({
    mutationFn: GetJobSearch,
    onSuccess: (data) => {
      console.log("Search result:", data);

      if (data && data.result && data.result.items.length > 0) {
        const jobSearchResults = data.result.items;
        setJobSearch(data.result.items);
        navigate("/it_jobs", {
          state: {
            jobSearch: jobSearchResults,
            textt: text,
            // location: location,
          },
        });
      } else {
        navigate("/it_jobs", { state: { textt: text, jobSearch: [] } });
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
  const handleNavigateSkill = async (item: string) => {
    setText(item);
    interface JobSearchResponse {
      result: {
        items: JobPost[];
      };
    }

    const searchDataArray = [
      // { companyName: text ,pageSize: 9},
      // { skillSet: item, pageSize: 9 },
      { keyword: item, pageSize: 9 },
      // { location: text ,pageSize: 9 },
      // { experience: text ,pageSize: 9},
      // { jobType: text ,pageSize: 9},
    ];

    for (let i = 0; i < searchDataArray.length; i++) {
      try {
        console.log("Searching with:", searchDataArray[i]);

        const result: JobSearchResponse = await mutateAsync({
          data: searchDataArray[i],
        });

        if (result && result.result && result.result.items.length > 0) {
          setJobSearch(result.result.items);

          break;
        }
      } catch (error) {
        console.error("Error during job search:", error);
      }
    }
  };

  const [filteredCompanies, setFilteredCompanies] = useState(Companiesdata);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [company, setCompany] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectCompany, setSelectCompany] = useState<Company | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  console.log("ok", companyId);
  //skills
  const [selectSkills, setSelectSkills] = useState<SkillSet | null>(null);
  const [skills, setSkills] = useState<string>("");
  const [filteredSkills, setFilteredSkills] = useState(SkillSetdataa);
  const [SkillId, setSkillId] = useState<number | null>(null);
  const [dropdownOpenSkills, setDropdownOpenSkills] = useState<boolean>(false);

  //location
  const [dropdownOpenLocation, setDropdownOpenLocation] =
    useState<boolean>(false);
  const [selectLocation, setSelectLocation] = useState<Location | null>(null);
  const [location, setLocation] = useState<string>("");
  const [filteredLocation, setFilteredLocation] = useState(locationsData);
  const [locationId, setLocationId] = useState<number | null>(null);

  //JobType
  const [dropdownOpenJobType, setDropdownOpenJobType] =
    useState<boolean>(false);
  const [selectJobType, setSelectJobType] = useState<JobType | null>(null);
  const [jobType, setJobType] = useState<string>("");
  const [filteredJobType, setFilteredJobType] = useState(JobTypeDatas);
  const [jobTypeId, setJobTypeId] = useState<number | null>(null);

  const [hovered, setHovered] = useState<null | number>(null);

  const handleAlert = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Kiểm tra nếu SkillId hoặc selectSkills.name không có giá trị
    if (!SkillId || !selectSkills?.name) {
      message.error("Please select a valid skill ");
      return;
    }

    PostAlert({
      data: {
        jobTitle: selectSkills?.name,
        locationId: locationId,
        skillSetId: SkillId,
        userId: Number(UserId),
        jobTypeId: jobTypeId,
      },
    });
  };

  const handleMouseEnter = (id: number) => {
    setHovered(id || null);
  };

  const handleMouseLeave = () => {
    setHovered(null);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCompany(inputValue);
    setSelectCompany(null);
    setCompanyId(null);

    if (inputValue) {
      setFilteredCompanies(
        Companiesdata?.filter((comp) =>
          comp.companyName.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpen(true);
    } else {
      setFilteredCompanies([]);
      setDropdownOpen(false);
    }
  };
  const handleChangeSkills = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setSkills(inputValue);
    setSelectSkills(null);
    setSkillId(null);

    if (inputValue) {
      setDropdownOpenSkills(true);
      setFilteredSkills(
        SkillSetdataa?.filter((comp) =>
          comp.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    } else {
      setFilteredSkills([]);
      setDropdownOpenSkills(false);
    }
  };
  const handleChangeJobType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setJobType(inputValue);
    setSelectJobType(null);
    setJobTypeId(null);

    if (inputValue) {
      setFilteredJobType(
        JobTypeDatas?.filter((comp) =>
          comp.name.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenJobType(true);
    } else {
      setFilteredJobType([]);
      setDropdownOpenJobType(false);
    }
  };
  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setLocation(inputValue);
    setSelectLocation(null);
    setLocationId(null);

    if (inputValue) {
      setFilteredLocation(
        locationsData?.filter((comp) =>
          comp.City.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenLocation(true);
    } else {
      setFilteredLocation([]);
      setDropdownOpenLocation(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSelect = (comp: Company) => {
    setCompanyId(comp.id);
    setSelectCompany(comp);
    setDropdownOpen(false);
  };
  const handleSelectSkills = (comp: SkillSet) => {
    setSkillId(comp.id);
    setSelectSkills(comp);
    setDropdownOpenSkills(false);
  };
  const handleSelectLocation = (comp: Location) => {
    setLocationId(comp.Id);
    setSelectLocation(comp);
    setDropdownOpenLocation(false);
  };

  const handleSelectJobType = (comp: JobType) => {
    setJobTypeId(comp.id);
    setSelectJobType(comp);
    setDropdownOpenJobType(false);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: PostFollowCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FollowCompany"],
        refetchType: "active",
      });
      // setFavorite(true)
      //   setShowAlert(true);
      message.success(`Save ${selectCompany?.companyName} Successfully`);
    },
    onError: () => {
      message.error(`Failed to Follow ${selectCompany?.companyName} `);
    },
  });
  const { mutate: Unfollow, isPending: pendingunfollow } = useMutation({
    mutationFn: DeleteFollowCompany,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["FollowCompany"],
        refetchType: "active",
      });
      // setFavorite(false)
      message.success(`Unfollow ${selectCompany?.companyName} Successfully`);
    },
    onError: () => {
      message.error(`Failed to UnFollow ${selectCompany?.companyName} `);
    },
  });
  // const handleSaveCompany = (e: React.FormEvent<HTMLFormElement>) => {
  //   e.preventDefault();
  //   mutate({
  //     data: {
  //       companyId: Number(companyId),
  //     },
  //   });
  // };
  const handleSaveCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!companyId || isNaN(Number(companyId))) {
      message.error("Please select a valid Company !");
      return;
    }

    mutate({
      data: {
        companyId: Number(companyId),
      },
    });
  };

  const handleUnFollow = (id: number) => {
    Unfollow({ id: Number(id) });
  };

  const handleUnSubscide = (id: number) => {
    DeleteUserAlert({ id: Number(id) });
  };
  const { data: FollowCompany } = useQuery({
    queryKey: ["FollowCompany"],
    queryFn: ({ signal }) => GetFollowCompany({ signal }),
    staleTime: 5000,
  });
  const FollowCompanydata = FollowCompany?.Companies;
  return (
    <div className={classes.main}>
      <div className={classes.main2}>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <div className={classes.main5}>
              <Typography
                variant="h2"
                sx={{
                  marginTop: ".5rem",
                  lineHeight: 1.5,
                  fontSize: "22px",
                  fontWeight: 700,
                  boxSizing: "border-box",
                }}
              >
                Subscribe to Amazing Job for new jobs of company
              </Typography>
              <div className={classes.main6}>
                By subscribing, Amazing Job will suggest in-demand new jobs that
                match your skill via email
              </div>
              <hr className={classes.main7} />
              <div className={classes.main30}>
                <div className={classes.main31}>
                  <Typography
                    variant="h3"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "18px",
                      fontWeight: 700,
                      boxSizing: "border-box",
                    }}
                  >
                    Skills you subscribed ({AlertData?.length})
                  </Typography>
                  <div className={classes.main32}>
                    <form
                      action=""
                      className={classes.form}
                      onSubmit={handleAlert}
                    >
                      <div className={classes.main33}>
                        <div className={classes.main13}>
                          <span className={classes.span}>
                            <div className={classes.main14}>
                              <svg
                                height={16}
                                width={16}
                                className={classes.svg}
                              >
                                <SearchIcon />
                              </svg>
                            </div>
                          </span>
                          {/* <select name="" id="" ></select> */}
                          <div className={classes.main15}>
                            <div
                              className={
                                dropdownOpenSkills
                                  ? classes.main16
                                  : classes.mainactive
                              }
                            >
                              <input
                                value={
                                  selectSkills ? selectSkills?.name : skills
                                }
                                onChange={handleChangeSkills}
                                // onFocus={() => setDropdownOpenSkills(true)}
                                type="text"
                                className={classes.input}
                                autoComplete="off"
                                placeholder="Skills, JobTitle"
                                size={1}
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                tabIndex={0}
                              />
                            </div>

                            {dropdownOpenSkills && (
                              <div className={classes.main17} ref={dropdownRef}>
                                <div className={classes.main18}>
                                  {filteredSkills?.length &&
                                  filteredSkills.length > 0 ? (
                                    filteredSkills.map((item) => (
                                      <div
                                        key={item.id}
                                        onMouseEnter={() =>
                                          handleMouseEnter(item.id)
                                        }
                                        onMouseLeave={() => handleMouseLeave}
                                        className={
                                          hovered === item.id
                                            ? classes.mainactive1
                                            : classes.main19
                                        }
                                        onClick={() => handleSelectSkills(item)}
                                      >
                                        {item.name}
                                      </div>
                                    ))
                                  ) : (
                                    <div className={classes.main19}>
                                      Not Found
                                    </div>
                                  )}
                                  {/*                                  
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={classes.main34}>
                        <div className={classes.main13}>
                          <span className={classes.span}>
                            <div className={classes.main14}>
                              <svg
                                height={16}
                                width={16}
                                className={classes.svg}
                              >
                                <LocationOnIcon />
                              </svg>
                            </div>
                          </span>
                          {/* <select name="" id="" ></select> */}
                          <div className={classes.main15}>
                            <div
                              className={
                                dropdownOpenLocation
                                  ? classes.main16
                                  : classes.mainactive
                              }
                            >
                              <input
                                value={
                                  selectLocation
                                    ? selectLocation?.City
                                    : location
                                }
                                onChange={handleChangeLocation}
                                // onFocus={() => setDropdownOpenLocation(true)}
                                type="text"
                                className={classes.input}
                                autoComplete="off"
                                placeholder="Location"
                                size={1}
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                tabIndex={0}
                              />
                            </div>

                            {dropdownOpenLocation && (
                              <div className={classes.main17} ref={dropdownRef}>
                                <div className={classes.main18}>
                                  {filteredLocation?.length &&
                                  filteredLocation.length > 0 ? (
                                    filteredLocation.map((item) => (
                                      <div
                                        key={item.Id}
                                        onMouseEnter={() =>
                                          handleMouseEnter(item.Id)
                                        }
                                        onMouseLeave={() => handleMouseLeave}
                                        className={
                                          hovered === item.Id
                                            ? classes.mainactive1
                                            : classes.main19
                                        }
                                        onClick={() =>
                                          handleSelectLocation(item)
                                        }
                                      >
                                        {item.City}
                                      </div>
                                    ))
                                  ) : (
                                    <div className={classes.main19}>
                                      Not Found
                                    </div>
                                  )}
                                  {/*                                  
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={classes.main34}>
                        <div className={classes.main13}>
                          <span className={classes.span}>
                            <div className={classes.main14}>
                              <svg
                                height={16}
                                width={16}
                                className={classes.svg}
                              >
                                <WorkOutlineIcon />
                              </svg>
                            </div>
                          </span>
                          {/* <select name="" id="" ></select> */}
                          <div className={classes.main15}>
                            <div
                              className={
                                dropdownOpenJobType
                                  ? classes.main16
                                  : classes.mainactive
                              }
                            >
                              <input
                                value={
                                  selectJobType ? selectJobType?.name : jobType
                                }
                                onChange={handleChangeJobType}
                                // onFocus={() => setDropdownOpenJobType(true)}
                                type="text"
                                className={classes.input}
                                autoComplete="off"
                                placeholder="Job Type"
                                size={1}
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                tabIndex={0}
                              />
                            </div>

                            {dropdownOpenJobType && (
                              <div className={classes.main17} ref={dropdownRef}>
                                <div className={classes.main18}>
                                  {filteredJobType?.length &&
                                  filteredJobType.length > 0 ? (
                                    filteredJobType.map((item) => (
                                      <div
                                        key={item.id}
                                        onMouseEnter={() =>
                                          handleMouseEnter(item.id)
                                        }
                                        onMouseLeave={() => handleMouseLeave}
                                        className={
                                          hovered === item.id
                                            ? classes.mainactive1
                                            : classes.main19
                                        }
                                        onClick={() =>
                                          handleSelectJobType(item)
                                        }
                                      >
                                        {item.name}
                                      </div>
                                    ))
                                  ) : (
                                    <div className={classes.main19}>
                                      Not Found
                                    </div>
                                  )}
                                  {/*                                
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                      <div className={classes.main35}>
                        {AlertPending ? (
                          <button
                            className={classes.button}
                            // type="button"
                            disabled={true}
                            //   style={{ fontWeight: 1000 }}
                          >
                            Wait a seconds
                          </button>
                        ) : (
                          <button
                            className={classes.button}
                            type="submit"
                            //   style={{ fontWeight: 1000 }}
                          >
                            Subscribe
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  {AlertData?.map((item) => (
                    <div className={classes.main21} key={item.id}>
                      <div className={classes.main22}>
                        <div className={classes.main23}>
                          <span className={classes.span1}>
                            <Link
                              // to={`/company/detail/${item.id}`}
                              to=""
                              className={classes.link1}
                              onClick={() =>
                                handleNavigateSkill(item.skillSet?.name)
                              }
                            >
                              {item.skillSet?.name ?? "No Skill Name"}
                            </Link>
                          </span>
                        </div>
                        <div className={classes.main23}>
                          <span className={classes.span1}>
                            <Link
                              // to={`/company/detail/${item.id}`}
                              to=""
                              className={classes.link1}
                              style={{ textDecoration: "none" }}
                            >
                              {item.location?.city ?? "No City"}
                            </Link>
                          </span>
                        </div>
                        <div className={classes.main23}>
                          <span className={classes.span1}>
                            <Link
                              // to={`/company/detail/${item.id}`}
                              to=""
                              className={classes.link1}
                              style={{ textDecoration: "none" }}
                            >
                              {item.jobType?.name ?? "No JobType"}
                            </Link>
                          </span>
                        </div>
                      </div>

                      <div className={classes.main24}></div>
                      <div className={classes.main25}>
                        <div className={classes.main26}>
                          <span className={classes.span2}>Subscribed</span>
                        </div>
                        {PendingAlert ? (
                          <div className={classes.main27}>
                            <div className={classes.main28}>
                              <Link
                                to=""
                                className={classes.link2}
                                // onClick={() => handleUnSubscide(item?.id)}
                              >
                                <span>
                                  <div className={classes.main29}>
                                    {/* <svg className={classes.svg1}> */}
                                    {/* <DeleteOutlineIcon /> */} wait a seconds
                                    {/* </svg> */}
                                  </div>
                                </span>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className={classes.main27}>
                            <div className={classes.main28}>
                              <Link
                                to=""
                                className={classes.link2}
                                onClick={() => handleUnSubscide(item?.id)}
                              >
                                <span>
                                  <div className={classes.main29}>
                                    <svg className={classes.svg1}>
                                      <DeleteOutlineIcon />
                                    </svg>
                                  </div>
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <hr className={classes.main7} />
              <div className={classes.main8}>
                <div className={classes.main9}>
                  <Typography
                    variant="h3"
                    sx={{
                      lineHeight: 1.5,
                      fontSize: "18px",
                      fontWeight: 700,
                      boxSizing: "border-box",
                    }}
                  >
                    Company you subscribed ({FollowCompanydata?.length})
                  </Typography>
                  <div className={classes.main10}>
                    <form
                      action=""
                      className={classes.main11}
                      onSubmit={handleSaveCompany}
                    >
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          <span className={classes.span}>
                            <div className={classes.main14}>
                              <svg
                                height={16}
                                width={16}
                                className={classes.svg}
                              >
                                <SearchIcon />
                              </svg>
                            </div>
                          </span>
                          {/* <select name="" id="" ></select> */}
                          <div className={classes.main15}>
                            <div
                              className={
                                dropdownOpen
                                  ? classes.main16
                                  : classes.mainactive
                              }
                            >
                              <input
                                value={
                                  selectCompany
                                    ? selectCompany?.companyName
                                    : company
                                }
                                onChange={handleChange}
                                // onFocus={() => setDropdownOpen(true)}
                                type="text"
                                className={classes.input}
                                autoComplete="off"
                                placeholder="company"
                                size={1}
                                aria-haspopup="listbox"
                                aria-expanded="false"
                                tabIndex={0}
                              />
                            </div>

                            {dropdownOpen && (
                              <div className={classes.main17} ref={dropdownRef}>
                                <div className={classes.main18}>
                                  {filteredCompanies?.length &&
                                  filteredCompanies.length > 0 ? (
                                    filteredCompanies.map((item) => (
                                      <div
                                        key={item.id}
                                        onMouseEnter={() =>
                                          handleMouseEnter(item.id)
                                        }
                                        onMouseLeave={() => handleMouseLeave}
                                        className={
                                          hovered === item.id
                                            ? classes.mainactive1
                                            : classes.main19
                                        }
                                        onClick={() => handleSelect(item)}
                                      >
                                        {item.companyName}
                                      </div>
                                    ))
                                  ) : (
                                    <div className={classes.main19}>
                                      Not Found
                                    </div>
                                  )}
                                  {/*                                  
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div>
                                  <div className={classes.main19}>
                                    FPT SOFWARE
                                  </div> */}
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className={classes.main20}>
                        {isPending ? (
                          <button
                            className={classes.button2}
                            // type="button"
                            disabled={true}
                            //   style={{ fontWeight: 1000 }}
                          >
                            wait a seconds
                          </button>
                        ) : (
                          <button
                            className={classes.button2}
                            type="submit"
                            //   style={{ fontWeight: 1000 }}
                          >
                            Follow
                          </button>
                        )}
                      </div>
                    </form>
                  </div>
                  {FollowCompanydata?.map((item) => (
                    <div className={classes.main21} key={item.id}>
                      <div className={classes.main22}>
                        <div className={classes.main23}>
                          <span className={classes.span1}>
                            <Link
                              to={`/company/detail/${item.id}`}
                              className={classes.link1}
                            >
                              {item.companyName}
                            </Link>
                          </span>
                        </div>
                      </div>
                      <div className={classes.main24}></div>
                      <div className={classes.main25}>
                        <div className={classes.main26}>
                          <span className={classes.span2}>Followed</span>
                        </div>
                        {pendingunfollow ? (
                          <div className={classes.main27}>
                            <div className={classes.main28}>
                              <Link
                                to=""
                                className={classes.link2}
                                // onClick={() => handleUnFollow(item.id)}
                              >
                                <span>
                                  <div className={classes.main29}>
                                    {/* <svg className={classes.svg1}>
                                    <DeleteOutlineIcon />
                                  </svg> */}
                                    wait a seconds
                                  </div>
                                </span>
                              </Link>
                            </div>
                          </div>
                        ) : (
                          <div className={classes.main27}>
                            <div className={classes.main28}>
                              <Link
                                to=""
                                className={classes.link2}
                                onClick={() => handleUnFollow(item.id)}
                              >
                                <span>
                                  <div className={classes.main29}>
                                    <svg className={classes.svg1}>
                                      <DeleteOutlineIcon />
                                    </svg>
                                  </div>
                                </span>
                              </Link>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
