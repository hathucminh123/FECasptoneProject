import React, { useRef, useState } from "react";
import classes from "./CompanyInfo.module.css";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Input from "../../components/Employer/Input";
import FormSelect from "../../components/Employer/FormSelect";
import RequiredText from "../../components/Employer/RequiredText";
import MultipleSelect from "../../components/Employer/MultipleSelect";
import { jobSkills } from "../../assets/data/SkillData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { useQuery } from "@tanstack/react-query";

const dataCompanySize: string[] = [
  "100-500",
  "500-1000",
  "1000+",
  "3000+",
  "5000+",
];

export default function CompanyInfo() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectSize, setSelectSize] = useState<string>("");
  const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [update, setUpdate] = useState<boolean>(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const CompanyId = localStorage.getItem("CompanyId");

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
  const CompanyEmployer = Companiesdata?.find(
    (company) => company.id === Number(CompanyId)
  );
  console.log("quao", CompanyEmployer);
  const handleOpenUpdate = () => {
    setUpdate(!update);
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);
  };

  const handleUploadClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!companyName) newErrors.companyName = "Company Name is required";
    if (!email || !email.includes("@"))
      newErrors.email = "A valid email is required";
    if (!selectSize) newErrors.selectSize = "Company Size is required";
    if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!address) newErrors.address = "Address is required";
    if (!description) newErrors.description = "Description is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      // Submit form or trigger update logic
      console.log({
        companyName,
        email,
        selectSize,
        skills,
        website,
        phoneNumber,
        address,
        description,
        selectedFile,
      });
      // Simulate a save, then close edit mode
      setUpdate(false);
    }
  };

  const handleCancel = () => {
    // Reset all fields and exit update mode
    setCompanyName("");
    setEmail("");
    setWebsite("");
    setSelectSize("");
    setSkills([]);
    setPhoneNumber("");
    setAddress("");
    setDescription("");
    setSelectedFile(null);
    setErrors({});
    setUpdate(false);
  };

  return (
    <div className={classes.main1}>
      <form onSubmit={handleSubmit} className={classes.form}>
        {update ? (
          <div className={classes.div}>
            <div className={classes.div1}>Update Company Info</div>
            <div className={classes.div2}>
              <div className={classes.div3}>
                <div className={classes.div4}>
                  <div className={classes.img}>
                    {/* Display preview of selected file if available */}
                    {selectedFile && (
                      <img
                        src={URL.createObjectURL(selectedFile)}
                        alt="Company logo"
                        className={classes.img}
                      />
                    )}
                  </div>
                  <div className={classes.img1} onClick={handleUploadClick}>
                    <input
                      ref={fileInputRef}
                      className={classes.inputup}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple={false}
                      onChange={handleFileChange}
                      hidden
                    />
                    <button type="button" className={classes.button}>
                      <CameraAltOutlinedIcon
                        sx={{ transform: "translateY(-7px)", color: "white" }}
                      />
                    </button>
                  </div>
                </div>
                <div className={classes.div5}>
                  <p className={classes.p}>Logo Company</p>
                </div>
                <div className={classes.div6}>
                  <div className={classes.div7}>
                    <div className={classes.div8}>
                      <label htmlFor="" className={classes.label}>
                        Website Company
                      </label>
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <Input
                            placeholder="https://"
                            value={website}
                            onChange={(e) => setWebsite(e.target.value)}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.div8}>
                      <label htmlFor="" className={classes.label}>
                        Company size
                        <span className={classes.span}>*</span>
                      </label>
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <FormSelect
                            selectedValue={selectSize}
                            setSelectedValue={setSelectSize}
                            data={dataCompanySize}
                            placeholder="Select Company Size"
                            text="Employees"
                          />
                          {errors.selectSize && (
                            <p className={classes.error}>{errors.selectSize}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={classes.div8}>
                      <label htmlFor="" className={classes.label}>
                        Email
                        <span className={classes.span}>*</span>
                      </label>
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <Input
                            placeholder="Input Email Company"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                          />
                          {errors.email && (
                            <p className={classes.error}>{errors.email}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.div7}>
                    <div className={classes.div8}>
                      <RequiredText text="Company Name" />
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <Input
                            placeholder="Input Company name"
                            value={companyName}
                            onChange={(e) => setCompanyName(e.target.value)}
                          />
                          {errors.companyName && (
                            <p className={classes.error}>
                              {errors.companyName}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={classes.div8}>
                      <RequiredText text="Field of operation" />
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <MultipleSelect
                            options={jobSkills}
                            placeholder="Select Field of operation."
                            skills={skills}
                            setSkills={setSkills}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={classes.div8}>
                      <RequiredText text="Company Address" />
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <Input
                            placeholder="Input Company Address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                          />
                          {errors.address && (
                            <p className={classes.error}>{errors.address}</p>
                          )}
                        </div>
                      </div>
                    </div>
                    <div className={classes.div8}>
                      <RequiredText text="Company Phone Number" />
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <Input
                            placeholder="Input Company Phone Number"
                            value={phoneNumber}
                            onChange={(e) => setPhoneNumber(e.target.value)}
                          />
                          {errors.phoneNumber && (
                            <p className={classes.error}>
                              {errors.phoneNumber}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.div11}>
                    <div className={classes.div8}>
                      <RequiredText text="Company Description" />
                      <div className={classes.div9}>
                        <div className={classes.div10}>
                          <ReactQuill
                            value={description}
                            onChange={setDescription}
                            placeholder="Enter your summary"
                          />
                          {errors.description && (
                            <p className={classes.error}>
                              {errors.description}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={classes.div12}>
                    <button
                      type="button"
                      className={classes.button1}
                      onClick={handleCancel}
                    >
                      Cancel
                    </button>
                    <button type="submit" className={classes.button2}>
                      Save
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.div}>
            <div className={classes.div1}>Company Information</div>
            <div className={classes.div13}>
              {/* Display company info */}
              <div className={classes.div14}>
                <div className={classes.div15}>
                  <div className={classes.div14}>
                    <div className={classes.div16}>
                      Update company Infomation
                    </div>
                  </div>
                  <div className={classes.div17} onClick={handleOpenUpdate}>
                    Update
                  </div>
                </div>
                <div className={classes.div18}>
                  <div className={classes.div19}>
                    <div className={classes.div20}>
                      <div className={classes.img2}></div>
                      <div className={classes.div21}>
                        <p className={classes.p1}>{CompanyEmployer?.companyName}</p>
                        <p className={classes.p2}>
                          {CompanyEmployer?.address}, {" "} {CompanyEmployer?.city} | {CompanyEmployer?.numberOfEmployees} employees
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className={classes.div22}>
                    <div className={classes.div23}>
                      <div className={classes.div24}>
                        <div className={classes.div25}>
                          <div className={classes.div26}>
                            Field of operation:
                          </div>
                          <div className={classes.div27}>reactjs/.net/AI</div>
                        </div>
                        <div className={classes.div25}>
                          <div className={classes.div26}>Email Company:</div>
                          <div className={classes.div27}>
                            hathucminh456@gmail.com
                          </div>
                        </div>
                      </div>
                      <div className={classes.div24}>
                        <div className={classes.div25}>
                          <div className={classes.div26}>Website Company:</div>
                          <div className={classes.div27}>
                            {CompanyEmployer?.websiteURL}
                          </div>
                        </div>
                        <div className={classes.div25}>
                          <div className={classes.div26}>Company Size:</div>
                          <div className={classes.div27}>
                            {CompanyEmployer?.numberOfEmployees} employees
                          </div>
                        </div>
                        <div className={classes.div25}>
                          <div className={classes.div26}>Phone Number:</div>
                          <div className={classes.div27}>123123123</div>
                        </div>
                      </div>
                    </div>
                    <div className={classes.div28}>
                      <div className={classes.div29}>
                        <div className={classes.div30}>
                          <div className={classes.div31}>Company Address:</div>
                          <div className={classes.div32}>
                             {CompanyEmployer?.address}, {" "}   {CompanyEmployer?.city}
                          </div>
                        </div>
                        <div className={classes.div30}>
                          <div className={classes.div31}>
                            Company Description:
                          </div>
                          <div className={classes.div32}>
                           {CompanyEmployer?.companyDescription}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}
