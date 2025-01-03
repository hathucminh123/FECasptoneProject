import React, { useEffect, useState } from "react";
import classes from "./OverViewDetails.module.css";
import Typography from "@mui/material/Typography";
import { Link, useParams } from "react-router-dom";
// import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// import Modal from "@mui/material/Modal";
// import Box from "@mui/material/Box";
// import Select, { SelectChangeEvent } from "@mui/material/Select";
// import MenuItem from "@mui/material/MenuItem";
// import TextField from "@mui/material/TextField";
// import Button from "@mui/material/Button";
import { useQuery } from "@tanstack/react-query";
// import { PostJobLcation } from "../../Services/JobPostLocation/PostJobLcation";
// import { queryClient } from "../../Services/mainService";
// import { message } from "antd";
import { GetJobPostById } from "../../Services/JobsPost/GetJobPostById";
import moment from "moment";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
// import { GetLocationService } from "../../Services/Location/GetLocationService";
const OverViewDetails: React.FC = () => {
  const { id } = useParams();
  const JobId = Number(id);
  const [companyId, setCompanyId] = useState<string | null>(
    localStorage.getItem("CompanyId")
  );
  const {
    data: Company,
    refetch: refetchCompanies,
    // isLoading: isCompanyLoading,
    // isError: isCompanyError,
  } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });

  useEffect(() => {
    // Sync companyId from localStorage if it changes
    const storedCompanyId = localStorage.getItem("CompanyId");
    setCompanyId(storedCompanyId);
    refetchCompanies();
  }, [companyId, refetchCompanies]);

  const Companiesdata = Company?.Companies;
  const CompanyEmployer = Companiesdata?.find(
    (company) => company.id === Number(companyId)
  );
  //   const { data: LocationData } = useQuery({
  //     queryKey: ["Locations"],
  //     queryFn: ({ signal }) => GetLocationService({ signal }),
  //     staleTime: 5000,
  //   });
  //   const Locationsdataa = LocationData?.Locations;

  // const [openModal, setOpenModal] = useState<boolean>(false);
  // // const [selectJobId, setselectJobId] = useState<number>();
  // const [stressAddressDetail, setStressAddressDetail] = useState<string>("");
  // const [selectedStatus, setSelectedStatus] = useState<string>("1");
  const { data: jobData } = useQuery({
    queryKey: ["Job-details", JobId],
    queryFn: ({ signal }) => GetJobPostById({ id: Number(JobId), signal }),
    enabled: !!JobId,
  });
  const job = jobData?.JobPosts;

  const city = job?.jobLocationCities;
  const flattenedArrayCity = city?.flat();

  const uniqueArrayCity = [...new Set(flattenedArrayCity)];

  const cityColumn = uniqueArrayCity;

  // const handleStatusChange = (event: SelectChangeEvent) => {
  //   setSelectedStatus(event.target.value as string);
  // };

  // const handleEditClick = (id: number | undefined) => {
  //   setselectJobId(id);
  //   setOpenModal(true);
  // };

  // const { mutate } = useMutation({
  //   mutationFn: PostJobLcation,
  //   onSuccess: () => {
  //     queryClient.invalidateQueries({
  //       queryKey: ["Job-details"],
  //       refetchType: "active",
  //     });
  //     message.success("Add Job location Successfully");
  //     setOpenModal(false);
  //   },
  //   onError: () => {
  //     message.error("Failed to Add job location set");
  //   },
  // });
  // const handleSave = () => {
  //   if (selectJobId) {
  //     mutate({
  //       data: {
  //         locationId: Number(selectedStatus),
  //         jobPostId: selectJobId,
  //         stressAddressDetail: stressAddressDetail,
  //       },
  //     });
  //   }
  // };
  return (
    <div className={classes.main}>
      <section className={classes.section}>
        <header className={classes.header}>
          <Typography
            variant="h2"
            sx={{
              fontSize: "20px",
              lineHeight: "24px",
              fontWeight: 500,
              marginBottom: 0,
            }}
          >
            Live Job
          </Typography>
          <div className={classes.main1}>
            <Link
              to={`/EmployerJob/FindTalents/talent/${job?.id}`}
              className={classes.link1}
            >
              <svg fill="none" height={20} width={20} viewBox="0 0 24 24">
                <path
                  d="M6 21V19C6 17.9391 6.42143 16.9217 7.17157 16.1716C7.92172 15.4214 8.93913 15 10 15H11.5M20.2 20.2002L22 22.0002M8 7C8 8.06087 8.42143 9.07828 9.17157 9.82843C9.92172 10.5786 10.9391 11 12 11C13.0609 11 14.0783 10.5786 14.8284 9.82843C15.5786 9.07828 16 8.06087 16 7C16 5.93913 15.5786 4.92172 14.8284 4.17157C14.0783 3.42143 13.0609 3 12 3C10.9391 3 9.92172 3.42143 9.17157 4.17157C8.42143 4.92172 8 5.93913 8 7ZM15 18C15 18.7956 15.3161 19.5587 15.8787 20.1213C16.4413 20.6839 17.2044 21 18 21C18.7956 21 19.5587 20.6839 20.1213 20.1213C20.6839 19.5587 21 18.7956 21 18C21 17.2044 20.6839 16.4413 20.1213 15.8787C19.5587 15.3161 18.7956 15 18 15C17.2044 15 16.4413 15.3161 15.8787 15.8787C15.3161 16.4413 15 17.2044 15 18Z"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                ></path>
              </svg>
              Find Talent
            </Link>
          </div>
        </header>
        <main className={classes.main2}>
          <div
            className={classes.main3}
            style={{ justifyContent: "space-between" }}
          >
            <Typography
              variant="h3"
              sx={{
                fontSize: "20px",
                lineHeight: "24px",
                fontWeight: 700,
                marginBottom: "8px",
                boxSizing: "border-box",
                fontFamily: "Lexend, sans-serif",
              }}
            >
              Job name: {job?.jobTitle}
            </Typography>
            <img
              style={{ width: "140px", height: "100px", marginRight: "50px" ,borderColor: "#ddd ",borderWidth: "0.5px",borderStyle: "solid"}}
              src={CompanyEmployer?.imageUrl}
              alt="Companylogo"
            />
          </div>

          <p className={classes.p}>
            Salary:{" "}
            {/* {`${job?.minsalary} - ${job?.salary} VNĐ`} */}
            {job?.minsalary && job?.salary
              ? `${
                  job.minsalary >= 1000000
                    ? job.minsalary / 1000000
                    : job.minsalary
                } ${job.minsalary >= 1000000 ? "triệu" : "VNĐ"} - ${
                  job.salary >= 1000000 ? job.salary / 1000000 : job.salary
                } ${job.salary >= 1000000 ? "triệu" : "VNĐ"}`
              : "Salary not specified"}
          </p>
          <div className={classes.main3}>
            <div className={classes.main4}>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  fontFamily: "Lexend, sans-serif",
                  marginBottom: "2px",
                  boxSizing: "border-box",
                }}
              >
                Job Description:
              </Typography>
              <p className={classes.p1}>
                {" "}
                {job && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job?.jobDescription,
                    }}
                  />
                )}
              </p>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontFamily: "Lexend, sans-serif",
                  fontWeight: 700,
                  marginBottom: "2px",
                  boxSizing: "border-box",
                }}
              >
                Job benefits:
              </Typography>
              <p className={classes.p1}>
                {" "}
                {job && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job?.benefits,
                    }}
                  />
                )}
              </p>
              <Typography
                variant="h3"
                sx={{
                  fontSize: "20px",
                  lineHeight: "24px",
                  fontWeight: 700,
                  marginBottom: "2px",
                  boxSizing: "border-box",
                }}
              >
                Job Requirements
              </Typography>
              <p className={classes.p1}>
                {job && (
                  <div
                    dangerouslySetInnerHTML={{
                      __html: job?.qualificationRequired,
                    }}
                  />
                )}
              </p>
            </div>
            <div className={classes.main5}>
              <dl className={classes.main6}>
                <div className={classes.main7}>
                  <dt className={classes.main8}>Expired Date</dt>
                  <dt className={classes.main9}>
                    {" "}
                    From:{" "}
                    {moment(job?.postingDate.slice(0, 10)).format(
                      "DD-MM-YYYY"
                    )}{" "}
                    - To:{" "}
                    {moment(job?.expiryDate.slice(0, 10)).format("DD-MM-YYYY")}
                  </dt>
                </div>
              </dl>
              <dl className={classes.main6}>
                <div className={classes.main7}>
                  <dt className={classes.main8}> Location:</dt>
                  <dt className={classes.main9}>
                    City: {cityColumn.join(", ")}
                  </dt>
                  <dt className={classes.main9}>Address:</dt>
                  {job?.jobLocationAddressDetail.map((item, index) => (
                    <dt className={classes.main9} key={index}>
                      {" "}
                      {item}
                    </dt>
                  ))}

                  {/* <dt className={classes.main9}>
                    <Link
                      to=""
                      className={classes.link2}
                      onClick={() => handleEditClick(JobId)}
                    >
                      <AddCircleOutlineIcon />
                      Add Location
                    </Link>
                  </dt> */}
                </div>
              </dl>
              <dl className={classes.main6}>
                <div className={classes.main7}>
                  <dt className={classes.main8}>Job Type</dt>
                  <dt className={classes.main9}>{job?.jobType.name}</dt>
                </div>
              </dl>
              <dl className={classes.main6}>
                <div className={classes.main7}>
                  <dt className={classes.main8}>Experience</dt>
                  <dt className={classes.main9}>
                    {job?.experienceRequired} years
                  </dt>
                </div>
              </dl>
              <dl className={classes.main6}>
                <div className={classes.main7}>
                  <dt className={classes.main8}>skills</dt>
                  <dt className={classes.main9}>
                    {job?.skillSets.map((item, index) => (
                      <span className={classes.span} key={index}>
                        {item}
                      </span>
                    ))}
                    {/* <span className={classes.span}>sdf</span>{" "}
                    <span className={classes.span}>sdf</span> */}
                  </dt>
                </div>
              </dl>

              <dl className={classes.main6}>
                <div className={classes.main7}>
                  <dt className={classes.main8}>Benefits</dt>
                  <dt className={classes.main9}>
                    {job?.benefitObjects && job?.benefitObjects.length > 0 ? (
                      job?.benefitObjects.map((item, index) => (
                        <span className={classes.span} key={index}>
                          {item.name}
                        </span>
                      ))
                    ) : (
                      <dt className={classes.main9}>No Benefit Yet</dt>
                    )}

                    {/* <span className={classes.span}>sdf</span>{" "}
                    <span className={classes.span}>sdf</span> */}
                  </dt>
                </div>
              </dl>
            </div>
          </div>
        </main>
      </section>
      {/* <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <Box className={classes.modalBox}>
          <Typography variant="h6" component="h2">
            Update Status
          </Typography>
          <Select
            value={selectedStatus}
            onChange={handleStatusChange}
            fullWidth
          >
            {
              Locationsdataa?.map((item) => (
                <MenuItem value={item.id} key={item.id}>
                  {item.city}
                </MenuItem>
              ))
            }
          
          </Select>
          <TextField
            fullWidth
            sx={{ marginTop: 2 }}
            label="stressAddressDetail"
            placeholder="Input your address"
            value={stressAddressDetail}
            onChange={(e) => setStressAddressDetail(e.target.value)}
          />
          <Button
            variant="contained"
            onClick={handleSave}
            style={{ marginTop: 16 }}
          >
            Save
          </Button>
          <Button
            variant="outlined"
            onClick={() => setOpenModal(false)}
            style={{ marginTop: 16 }}
          >
            Cancel
          </Button>
        </Box>
      </Modal> */}
    </div>
  );
};
export default OverViewDetails;
