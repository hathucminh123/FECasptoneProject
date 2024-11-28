import React, { useState, useRef, useEffect } from "react";
import classes from "./verifiCompany.module.css";
import Typography from "@mui/material/Typography";
import SearchIcon from "@mui/icons-material/Search";

import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { useMutation, useQuery } from "@tanstack/react-query";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import {
  Link,
  useNavigate,
  useOutletContext,
  useSearchParams,
} from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { GetBusinessStream } from "../../Services/BusinessStreamService/GetBusinessStream";
import { PostBusinessStream } from "../../Services/BusinessStreamService/PostBusinessStream";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { PostCompanies } from "../../Services/CompanyService/PostCompanies";
import { PostUserCompanyService } from "../../Services/UserCompanyService/UserCompanyService";
import { SelectCompany } from "../../Services/AuthService/SelectCompanyService";

interface BusinessStreamprops {
  id: number;
  businessStreamName: string;
  description: string;
}
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

const data = ["Việt Nam", "Mỹ", "Lào"];

const employees = ["1-10", "11-50", "51-200", "201-500", "501-1000"];

type OutletContextType = {
  nextStep: boolean;
  setNextStep: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function VerifiCompany() {
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
  const [company, setCompany] = useState<string>("");
  const [websiteURL, setWebsiteURL] = useState<string>("");
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [fileUrl, setFileUrl] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [establishedYear, setEstablishedYear] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [numberOfEmployees, setNumberOfEmployees] = useState<string>("");

  const [filteredCompanies, setFilteredCompanies] = useState(Companiesdata);

  const [country, setCountry] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [selectedEm, setSelectedEm] = useState<string | null>(null);
  const [selectedBu, setSelectedBu] = useState<BusinessStreamprops | null>(
    null
  );
  const [countrydata, setCountryData] = useState(data);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState(false);
  const [dropdownOpenEm, setDropdownOpenEm] = useState<boolean>(false);
  const [dropdownOpenBu, setDropdownOpenBu] = useState<boolean>(false);

  const [selectCompany, setSelectCompany] = useState<Company | null>(null);
  const [companyId, setCompanyId] = useState<number | null>(null);
  const [openRegister, setOpenRegister] = useState<boolean>(false);
  const [businessStreamName, setBusinessStreamName] = useState<string>("");
  const [descriptionBusiness, setDescriptionBusiness] = useState<string>("");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [searchParams] = useSearchParams();
  const isVerification = searchParams.get("mode") === "verification";
  const userId = localStorage.getItem("userId");
  const [verificationCode, setVerificationCode] = useState<string>("");
  const { setNextStep } = useOutletContext<OutletContextType>();

  const { data: BusinessStream } = useQuery({
    queryKey: ["BusinessStream"],
    queryFn: ({ signal }) => GetBusinessStream({ signal }),
    staleTime: 5000,
  });

  const BusinessStreamData = BusinessStream?.BusinessStreams;

  const { mutate: MutateBusinessStream, isPending: Pedingbusiness } =
    useMutation({
      mutationFn: PostBusinessStream,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["BusinessStream"] });
        message.success("Post BusinessStream successfully.");
        setBusinessStreamName("");
        setDescriptionBusiness("");
      },
      onError: () => {
        message.error("Failed to Post BusinessStream details.");
      },
    });

  const handleSubmitBusinessStream = (e: React.FormEvent) => {
    e.preventDefault();

    MutateBusinessStream({
      data: {
        businessStreamName,
        description: descriptionBusiness,
      },
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.target.files?.[0] || null;
    if (file) {
      setSelectedFile(file);

      const previewUrl = URL.createObjectURL(file);
      setFileUrl(previewUrl);
    }
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCompany(inputValue);
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

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCountry(inputValue);
    if (inputValue) {
      setCountryData(
        data?.filter((comp) =>
          comp.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenLocation(true);
    } else {
      setCountryData([]);
      setDropdownOpenLocation(false);
    }
  };

  const handleOpenRegister = () => {
    setOpenRegister(true);
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

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setDropdownOpenLocation(false);
  };
  const handleSelectEm = (employees: string) => {
    setSelectedEm(employees);
    setDropdownOpenEm(false);
  };
  const handleSelectBu = (Business: BusinessStreamprops) => {
    setSelectedBu(Business);
    setDropdownOpenBu(false);
  };

  // const navigate = useNavigate();

  const { mutate: PutIdCompany } = useMutation({
    mutationFn: PostUserCompanyService,
    onSuccess: () => {
      message.success("Choose Company Successfully");
      // const redirectPath = "/employer-verify/jobs/account/company";

      queryClient.invalidateQueries({
        queryKey: ["Company"],
        refetchType: "active",
      });

      // navigate(redirectPath);
      // window.location.reload();
    },
    onError: () => {
      message.error("Failed to Choose the Company");
    },
  });
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: PostCompanies,
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["Company"] });
      localStorage.setItem("CompanyId", data.result.toString());
      PutIdCompany({
        data: {
          companyId: Number(data.result),
        },
      });
      // navigate("/onboarding/recruit/inviteYourTeam");
      navigate("/onboarding/recruit/Complete");
      setNextStep(true);
    },
    onError: () => {
      message.error("Failed to update company details.");
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // if (validateForm()) {
    try {
      if (!selectedFile) {
        console.error("No file selected");
        // message.warning("Please select a file to upload.");
        return;
      }

      const fileName = `${uuidv4()}-${selectedFile.name}`;
      const fileRef = ref(storage, fileName);

      await uploadBytes(fileRef, selectedFile);

      const fileUrl = await getDownloadURL(fileRef);

      const formData = {
        companyName: company,
        companyDescription: description,
        websiteURL: websiteURL,
        establishedYear: parseInt(establishedYear),
        country: selectedCountry ? selectedCountry : country,
        city,
        address,
        numberOfEmployees: selectedEm
          ? parseInt(selectedEm?.replace(/[^0-9]/g, "") || "0", 10)
          : parseInt(numberOfEmployees),

        businessStreamId: selectedBu?.id,
        imageUrl: fileUrl,
      };

      mutate({ data: formData });

      console.log("Form submitted successfully");
    } catch (error) {
      console.error("Error during file upload or form submission:", error);
      message.error("Failed to upload file or submit form.");
    }
    // }
  };

  const { mutate: verifi,  isPending:IsVerifi } = useMutation({
    mutationFn: SelectCompany,
    onSuccess: () => {
      message.success("Choose Company Successfully");
      localStorage.setItem("CompanyId", companyId?.toString() || "");
      queryClient.invalidateQueries({
        queryKey: ["Company"],
        refetchType: "active",
      });

   
      navigate("/onboarding/recruit/Complete");
      setNextStep(true);

  
      // window.location.reload();
    },
    onError: () => {
      message.error("Failed to Choose the Company");
    },
  });

  const handleSubmitVerification = (e: React.FormEvent) => {
    e.preventDefault();
    if (companyId) {
      verifi({
        data: {
          companyId: companyId,
          employeeId: Number(userId),
          verificationCode: verificationCode,
        },
      });

      // setOpen(false);
    }
  };

  return isVerification ? (
    <section className={classes.section}>
      <div
        style={{
          boxSizing: "border-box",
          borderWidth: 0,
          borderStyle: "solid",
        }}
      >
        <Typography
          variant="h3"
          sx={{
            fontWeight: 500,
            fontSize: "24px",
            lineHeight: "30px",
            marginBottom: ".75rem",
            // margin: 0,
            padding: 0,
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "none",
          }}
        >
          Next, let’s verify you work at {selectCompany?.companyName}
        </Typography>
        <p className={classes.p}>
          Please Enter your code verification of company to confirm you’re an
          employee, and if any coworkers are also recruiting on Wellfound, we will
          let them know you’re set up.
        </p>
        <div className={classes.verify}>
          <form action="" className={classes.form}>
            <div className={classes.form1}>
              <div className={classes.input1}>
                <div className={classes.input2}>
                  <input
                    type="text"
                    placeholder="Enter Your code Verification"
                    className={classes.input3}
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                  />
                </div>
              </div>
              {/* <button className={classes.btn1}>Enter Code Verification</button> */}
            </div>
          </form>
        </div>
        <div className={classes.back}>
          <Link to="/onboarding/recruit" className={classes.btn2}>
            Back
          </Link>
          {IsVerifi ? (
            <button
              className={classes.btn3}
            
            >
              Wait a seconds
            </button>
          ) : (
            <button
              className={classes.btn3}
              onClick={(e) => handleSubmitVerification(e)}
            >
              Continue
            </button>
          )}
        </div>
      </div>
    </section>
  ) : openRegister ? (
    <section className={classes.section}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "30px",
          marginBottom: "16px",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          borderWidth: 0,
          borderStyle: "none",
        }}
      >
        Let  Create Your Account
      </Typography>

      <form action="" className={classes.form} onSubmit={handleSubmit}>
        <div className={classes.create}>About your Company</div>
        <div className={classes.create1}>
          Keep in mind you can always update this later
        </div>
        <div className={classes.create2}>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                Company Name
                <span className={classes.span1}>*</span>
              </div>
            </div>
            <div className={classes.input4}>
              <input
                type="text"
                className={classes.input5}
                value={company}
                onChange={handleChange}
              />
            </div>
          </label>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                Logo Image
                <span className={classes.span1}>*</span>
              </div>
            </div>
            <div className={classes.input6}>
              <div className={classes.input7}>
                {selectedFile ? (
                  <>
                    <div className={classes.img1}>
                      <img
                        src={fileUrl}
                        alt={selectedFile.name}
                        className={classes.img2}
                      />
                    </div>
                    <span className={classes.spanimg}>
                      {selectedFile.name}
                      <button
                        className={classes.clear}
                        onClick={() => setSelectedFile(null)}
                      >
                        (Clear)
                      </button>
                    </span>

                    <div onClick={() => setSelectedFile(null)}>
                      <CloseIcon
                        sx={{
                          position: "absolute",
                          top: "-8px",
                          right: 0,
                          width: "16px",
                          boxSizing: "border-box",
                          borderWidth: 0,
                          borderStyle: "solid",
                        }}
                      />
                    </div>
                  </>
                ) : (
                  <button
                    className={classes.input8}
                    onClick={handleUploadClick}
                  >
                    <CloudUploadIcon />
                    Upload Logo/Image
                  </button>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpg,image/jpeg"
                className={classes.upload}
                onChange={handleFileChange}
                hidden
              />
            </div>
          </label>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                Website
                <span className={classes.span1}>*</span>
              </div>
            </div>
            <div className={classes.input4}>
              <input
                type="text"
                className={classes.input5}
                value={websiteURL}
                onChange={(e) => setWebsiteURL(e.target.value)}
              />
            </div>
          </label>
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <label
              htmlFor=""
              className={classes.label}
              style={{ width: "50%" }}
            >
              <div className={classes.label1}>
                <div className={classes.label2}>
                  Address
                  <span className={classes.span1}>*</span>
                </div>
              </div>
              <div className={classes.input4}>
                <input
                  type="text"
                  className={classes.input5}
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </label>
            <label
              htmlFor=""
              className={classes.label}
              style={{ width: "50%" }}
            >
              <div className={classes.label1}>
                <div className={classes.label2}>
                  city
                  <span className={classes.span1}>*</span>
                </div>
              </div>
              <div className={classes.input4}>
                <input
                  type="text"
                  className={classes.input5}
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
              </div>
            </label>
          </div>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                country
                <span className={classes.span1}>*</span>
              </div>
            </div>
            {selectedCountry && (
              <div className={classes.input13}>
                <span className={classes.selectcountry}>
                  {selectedCountry}{" "}
                  <span
                    className={classes.spanicon}
                    onClick={() => setSelectedCountry(null)}
                  >
                    <CloseIcon />
                  </span>
                </span>
              </div>
            )}

            <div className={classes.input9}>
              <div className={classes.input10}>
                <div className={classes.input11}>
                  <input
                    type="text"
                    className={classes.input12}
                    aria-autocomplete="list"
                    autoComplete="off"
                    onChange={handleChangeLocation}
                    onFocus={() => setDropdownOpenLocation(true)}
                  />
                  <div className={classes.search}>
                    <SearchIcon />
                  </div>
                </div>

                {dropdownOpenLocation && (
                  <div className={classes.dropdown} ref={dropdownRef}>
                    {countrydata?.length && countrydata?.length > 0 ? (
                      countrydata?.map((comp, index) => (
                        <div
                          key={index}
                          className={classes.dropdownItem}
                          onClick={() => handleSelectCountry(comp)}
                        >
                          {/* <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        /> */}
                          <span className={classes.companyName}>{comp}</span>
                          {/* <span className={classes.companyUrl}>
                          {comp.websiteURL}
                        </span> */}
                        </div>
                      ))
                    ) : (
                      <div
                        className={classes.createNewCompany}
                        onClick={handleOpenRegister}
                      >
                        <span>Not found</span>
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </label>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                establishedYear
                <span className={classes.span1}>*</span>
              </div>
            </div>
            <div className={classes.input4}>
              <input
                type="number"
                className={classes.input5}
                value={establishedYear}
                onChange={(e) => {
                  const value = e.target.value;

                  // const numberValue = value ? parseInt(value, 10) : undefined;
                  setEstablishedYear(value);
                }}
              />
            </div>
          </label>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                Number of employees
                <span className={classes.span1}>*</span>
              </div>
            </div>
            {selectedEm && (
              <div className={classes.input13}>
                <span className={classes.selectcountry}>
                  {selectedEm}{" "}
                  <span
                    className={classes.spanicon}
                    onClick={() => setSelectedEm(null)}
                  >
                    <CloseIcon />
                  </span>
                </span>
              </div>
            )}
            <div className={classes.em}>
              <div className={classes.em1}>
                <div className={classes.em2}>
                  <div className={classes.em3}>-</div>
                  <div className={classes.em4}>
                    <div className={classes.em5}>
                      <input
                        type="text"
                        className={classes.em6}
                        // placeholder="asd"
                        value={numberOfEmployees}
                        onChange={(e) => setNumberOfEmployees(e.target.value)}
                        aria-autocomplete="list"
                        autoComplete="off"
                        onFocus={() => setDropdownOpenEm(true)}
                      />
                      <div className={classes.em7}></div>
                    </div>
                  </div>
                </div>
                <div className={classes.em8}>
                  <span className={classes.em9}></span>
                  <div className={classes.em10}>
                    <ExpandMoreIcon />
                  </div>
                </div>
                {dropdownOpenEm && (
                  <div className={classes.dropdown} ref={dropdownRef}>
                    {employees?.length && employees?.length > 0 ? (
                      employees?.map((comp, index) => (
                        <div
                          key={index}
                          className={classes.dropdownItem}
                          onClick={() => handleSelectEm(comp)}
                        >
                          {/* <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        /> */}
                          <span className={classes.companyName}>{comp}</span>
                          {/* <span className={classes.companyUrl}>
                          {comp.websiteURL}
                        </span> */}
                        </div>
                      ))
                    ) : (
                      <div
                        className={classes.createNewCompany}
                        onClick={handleOpenRegister}
                      >
                        <span>Create new company {company}</span>
                      </div>
                    )}
                  </div>
                )}
                <input type="text" hidden />
              </div>
            </div>
          </label>
          <div style={{ display: "flex", gap: 10, width: "100%" }}>
            <label
              htmlFor=""
              className={classes.label}
              style={{ width: "50%" }}
            >
              <div className={classes.label1}>
                <div className={classes.label2}>
                  businessStreamName
                  <span className={classes.span1}>*</span>
                </div>
              </div>
              <div className={classes.input4}>
                <input
                  type="text"
                  className={classes.input5}
                  value={businessStreamName}
                  onChange={(e) => setBusinessStreamName(e.target.value)}
                />
              </div>
            </label>
            <label
              htmlFor=""
              className={classes.label}
              style={{ width: "50%" }}
            >
              <div className={classes.label1}>
                <div className={classes.label2}>
                  Business description
                  <span className={classes.span1}>*</span>
                </div>
              </div>
              <div className={classes.input4}>
                <input
                  type="text"
                  className={classes.input5}
                  value={descriptionBusiness}
                  onChange={(e) => setDescriptionBusiness(e.target.value)}
                />
              </div>
            </label>
          </div>
          {Pedingbusiness ? (
            <button
              className={classes.btn1}
              style={{ marginBottom: 20 }}
              // onClick={(e) => handleSubmitBusinessStream(e)}
            >
              Wait A seconds
            </button>
          ) : (
            <button
              className={classes.btn1}
              style={{ marginBottom: 20 }}
              onClick={(e) => handleSubmitBusinessStream(e)}
            >
              Create Bussiness Stream
            </button>
          )}

          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                Select Business Stream
                <span className={classes.span1}>*</span>
              </div>
            </div>
            {selectedBu && (
              <div className={classes.input13}>
                <span className={classes.selectcountry}>
                  {selectedBu.businessStreamName}{" "}
                  <span
                    className={classes.spanicon}
                    onClick={() => setSelectedEm(null)}
                  >
                    <CloseIcon />
                  </span>
                </span>
              </div>
            )}
            <div className={classes.em}>
              <div className={classes.em1}>
                <div className={classes.em2}>
                  <div className={classes.em3}>-</div>
                  <div className={classes.em4}>
                    <div className={classes.em5}>
                      <input
                        type="text"
                        className={classes.em6}
                        // placeholder="asd"
                        aria-autocomplete="list"
                        autoComplete="off"
                        onFocus={() => setDropdownOpenBu(true)}
                      />
                      <div className={classes.em7}></div>
                    </div>
                  </div>
                </div>
                <div className={classes.em8}>
                  <span className={classes.em9}></span>
                  <div className={classes.em10}>
                    <ExpandMoreIcon />
                  </div>
                </div>
                {dropdownOpenBu && (
                  <div className={classes.dropdown} ref={dropdownRef}>
                    {BusinessStreamData?.length && employees?.length > 0 ? (
                      BusinessStreamData?.map((comp, index) => (
                        <div
                          key={index}
                          className={classes.dropdownItem}
                          onClick={() => handleSelectBu(comp)}
                        >
                          {/* <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        /> */}
                          <span className={classes.companyName}>
                            {comp.businessStreamName}
                          </span>
                          {/* <span className={classes.companyUrl}>
                          {comp.websiteURL}
                        </span> */}
                        </div>
                      ))
                    ) : (
                      <div
                        className={classes.createNewCompany}
                        onClick={handleOpenRegister}
                      >
                        <span>Create new company company</span>
                      </div>
                    )}
                  </div>
                )}
                <input type="text" hidden />
              </div>
            </div>
          </label>
          <label htmlFor="" className={classes.label}>
            <div className={classes.label1}>
              <div className={classes.label2}>
                Company Description
                <span className={classes.span1}>*</span>
              </div>
            </div>
            <div className={classes.input4}>
              {/* <input
                  type="text"
                  className={classes.input5}
                  value={businessStreamName}
                  onChange={(e) => setBusinessStreamName(e.target.value)}
                /> */}
              <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Enter your summary"
              />
            </div>
          </label>
          <div className={classes.button}>
            <button
              className={classes.btn2}
              onClick={() => setOpenRegister(false)}
            >
              Back
            </button>
            {isPending ? (
              <button
                className={classes.btn1}
                style={{ marginLeft: 10 }}
                // type="submit"
              >
                Wait a seconds
              </button>
            ) : (
              <button
                className={classes.btn1}
                style={{ marginLeft: 10 }}
                type="submit"
              >
                Next up: Post Jobs
              </button>
            )}
          </div>
        </div>
      </form>
      {selectCompany && (
        <form
          action=""
          style={{
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "solid",
          }}
        >
          <Link
            to="/onboarding/recruit?mode=verification"
            className={classes.button}
          >
            <button className={classes.btn1}>
              Next up: Get recruiter access
            </button>
          </Link>
        </form>
      )}
    </section>
  ) : (
    <section className={classes.section}>
      <Typography
        variant="h3"
        sx={{
          fontWeight: 500,
          fontSize: "24px",
          lineHeight: "30px",
          marginBottom: "16px",
          margin: 0,
          padding: 0,
          boxSizing: "border-box",
          borderWidth: 0,
          borderStyle: "none",
        }}
      >
        Let create your Company
      </Typography>
      <p className={classes.p}>
      You can manage your jobs post .Our platform ensures that you find the right candidates efficiently 
      </p>
      <form action="" className={classes.form}>
        <div className={classes.div1} aria-expanded="false">
          <div className={company ? classes.divne : classes.div2}>
            <div className={classes.div3}>
              {selectCompany ? (
                <div className={classes.select}>
                  <div className={classes.select1}>
                    <div className={classes.select2}>
                      <img
                        className={classes.select2}
                        src={selectCompany?.imageUrl}
                        alt={selectCompany?.companyName}
                      />
                    </div>
                    <span className={classes.span}>
                      {selectCompany?.companyName}
                    </span>
                    <span className={classes.spanurl}>
                      {selectCompany?.websiteURL}
                    </span>
                    <span
                      className={classes.spanchange}
                      onClick={() => setSelectCompany(null)}
                    >
                      Change
                    </span>
                  </div>
                </div>
              ) : (
                <div className={classes.div4}>
                  <div className={classes.icon}>
                    <SearchIcon />
                  </div>
                  <input
                    value={company}
                    onChange={handleChange}
                    className={classes.input}
                    type="text"
                    placeholder="Enter Company Name"
                    aria-autocomplete="list"
                    autoComplete="off"
                    onFocus={() => setDropdownOpen(true)}
                  />
                </div>
              )}
              {
                dropdownOpen && (
                  <div
                  ref={dropdownRef}
                  className={classes.createNewCompany}
                  onClick={handleOpenRegister}
                >
                  <span>Create new company: {company}</span>
                </div>
                )
              }
              {/* {dropdownOpen && (
                <div className={classes.dropdown} ref={dropdownRef}>
                  {filteredCompanies?.length &&
                  filteredCompanies?.length > 0 ? (
                    filteredCompanies?.map((comp, index) => (
                      <div
                        key={index}
                        className={classes.dropdownItem}
                        onClick={() => handleSelect(comp)}
                      >
                        <img
                          src={comp.imageUrl}
                          alt={comp.companyName}
                          className={classes.logo}
                        />
                        <span className={classes.companyName}>
                          {comp.companyName}
                        </span>
                        <span className={classes.companyUrl}>
                          {comp.websiteURL}
                        </span>
                      </div>
                    ))
                  ) : (
                    <div
                      className={classes.createNewCompany}
                      onClick={handleOpenRegister}
                    >
                      <span>Create new company {company}</span>
                    </div>
                  )}
                </div>
              )} */}
            </div>
          </div>
        </div>
      </form>
      {/* {selectCompany && (
        <form
          action=""
          style={{
            boxSizing: "border-box",
            borderWidth: 0,
            borderStyle: "solid",
          }}
        >
          <Link
            to="/onboarding/recruit?mode=verification"
            className={classes.button}
          >
            <button className={classes.btn1}>
              Next up: Get recruiter access
            </button>
          </Link>
        </form>
      )} */}
    </section>
  );
}
