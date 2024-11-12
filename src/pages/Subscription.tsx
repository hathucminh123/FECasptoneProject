import React, { useEffect, useRef, useState } from "react";
import classes from "./Subscription.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";
import { Link } from "react-router-dom";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompanies } from "../Services/CompanyService/GetCompanies";

import { queryClient } from "../Services/mainService";
import { message } from "antd";

import { PostFollowCompany } from "../Services/FollowCompany/PostFollowCompany";
import { DeleteFollowCompany } from "../Services/FollowCompany/DeleteFollowCompany";
import { GetFollowCompany } from "../Services/FollowCompany/GetFollowCompany";
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
export default function Subscription() {
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
  const [filteredCompanies, setFilteredCompanies] = useState(Companiesdata);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [company, setCompany] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [selectCompany, setSelectCompany] = useState<Company | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [hovered, setHovered] = useState<null | number>(null);

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

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownOpen(false);
    }
  };

  useEffect(() => {
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

  const { mutate } = useMutation({
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
  const { mutate: Unfollow } = useMutation({
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
  const handleSaveCompany = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({
      data: {
        companyId: Number(companyId),
      },
    });
  };

  const handleUnFollow = (id: number) => {
    Unfollow({ id: Number(id) });
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
                    Company you subscribed (length)
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
                                onFocus={() => setDropdownOpen(true)}
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
                        <button
                          className={classes.button}
                          type="submit"
                          //   style={{ fontWeight: 1000 }}
                        >
                          Follow
                        </button>
                      </div>
                    </form>
                  </div>
                  {FollowCompanydata?.map((item) => (
                    <div className={classes.main21}>
                      <div className={classes.main22}>
                        <div className={classes.main23}>
                          <span className={classes.span1}>
                            <Link to="" className={classes.link1}>
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
