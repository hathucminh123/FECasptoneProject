import React, { useRef, useState } from "react";
import classes from "./CreateCompanyEmployer.module.css";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Input from "../../components/Employer/Input";
import FormSelect from "../../components/Employer/FormSelect";
import RequiredText from "../../components/Employer/RequiredText";
// import MultipleSelect from "../../components/Employer/MultipleSelect";
// import { jobSkills } from "../../assets/data/SkillData";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { queryClient } from "../../Services/mainService";
import { PostCompanies } from "../../Services/CompanyService/PostCompanies";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useMutation } from "@tanstack/react-query";

const dataCompanySize: string[] = [
  "100-500",
  "500-1000",
  "1000+",
  "3000+",
  "5000+",
];

export default function CreateCompanyEmployer() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectSize, setSelectSize] = useState<string>("");
  //   const [skills, setSkills] = useState<string[]>([]);
  const [description, setDescription] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  //   const [email, setEmail] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  //   const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [establishedYear, setEstablishedYear] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [businessStreamId, setBusinessStreamId] = useState<string>("");
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: PostCompanies,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["Company"] });
      navigate("/employer-verify/jobs/account/Choosecompany");
      message.success("Company details updated successfully.");
    },
    onError: () => {
      message.error("Failed to update company details.");
    },
  });

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
    // if (!email || !email.includes("@"))
    //   newErrors.email = "A valid email is required";
    if (!selectSize) newErrors.selectSize = "Company Size is required";
    // if (!phoneNumber) newErrors.phoneNumber = "Phone Number is required";
    if (!address) newErrors.address = "Address is required";
    if (!description) newErrors.description = "Description is required";
    if (!establishedYear)
      newErrors.establishedYear = "Established Year is required";
    if (!country) newErrors.country = "Country is required";
    if (!city) newErrors.city = "City is required";
    if (!businessStreamId)
      newErrors.businessStreamId = "Business Stream ID is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      const formData = {
        companyName,
        companyDescription: description,
        websiteURL: website,
        establishedYear: parseInt(establishedYear),
        country,
        city,
        address,
        numberOfEmployees: parseInt(selectSize.replace(/[^0-9]/g, "")) || 0,
        businessStreamId: parseInt(businessStreamId),
        imageUrl: selectedFile ? URL.createObjectURL(selectedFile) : "",
      };
      mutate({ data: formData });
    }
  };

  const handleCancel = () => {
    setCompanyName("");
    // setEmail("");
    setWebsite("");
    setSelectSize("");
    // setSkills([]);
    // setPhoneNumber("");
    setAddress("");
    setDescription("");
    setEstablishedYear("");
    setCountry("");
    setCity("");
    setBusinessStreamId("");
    setSelectedFile(null);
    setErrors({});
  };

  return (
    <div className={classes.div2}>
      <form onSubmit={handleSubmit}>
        <div className={classes.div3}>
          <div className={classes.div4}>
            <div className={classes.img}>
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
                <label className={classes.label}>Website Company</label>
                <Input
                  placeholder="https://"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </div>
              <div className={classes.div8}>
                <label className={classes.label}>Company Size *</label>
                <FormSelect
                  selectedValue={selectSize}
                  setSelectedValue={setSelectSize}
                  data={dataCompanySize}
                  placeholder="Select Company Size"
                />
                {errors.selectSize && (
                  <p className={classes.error}>{errors.selectSize}</p>
                )}
              </div>
              {/* <div className={classes.div8}>
                <label className={classes.label}>Email *</label>
                <Input
                  placeholder="Input Email Company"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                {errors.email && <p className={classes.error}>{errors.email}</p>}
              </div> */}
              <div className={classes.div8}>
                <RequiredText text="Company Name" />
                <Input
                  placeholder="Input Company name"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                />
                {errors.companyName && (
                  <p className={classes.error}>{errors.companyName}</p>
                )}
              </div>
              <div className={classes.dov8}>
                <RequiredText text="Company Address" />
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
            <div className={classes.div7}>
              {/* <RequiredText text="Field of operation" />
              <MultipleSelect
                options={jobSkills}
                placeholder="Select Field of operation."
                skills={skills}
                setSkills={setSkills}
              /> */}

              {/* <RequiredText text="Company Phone Number" />
              <Input
                placeholder="Input Company Phone Number"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
              {errors.phoneNumber && (
                <p className={classes.error}>{errors.phoneNumber}</p>
              )} */}
              <RequiredText text="Established Year" />
              <Input
                placeholder="Input Established Year"
                value={establishedYear}
                onChange={(e) => setEstablishedYear(e.target.value)}
              />
              {errors.establishedYear && (
                <p className={classes.error}>{errors.establishedYear}</p>
              )}
              <RequiredText text="Country" />
              <Input
                placeholder="Input Country"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              />
              {errors.country && (
                <p className={classes.error}>{errors.country}</p>
              )}
              <RequiredText text="City" />
              <Input
                placeholder="Input City"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
              {errors.city && <p className={classes.error}>{errors.city}</p>}
              <RequiredText text="Business Stream ID" />
              <Input
                placeholder="Input Business Stream ID"
                value={businessStreamId}
                onChange={(e) => setBusinessStreamId(e.target.value)}
              />
              {errors.businessStreamId && (
                <p className={classes.error}>{errors.businessStreamId}</p>
              )}
            </div>

            <div className={classes.div33}>
              <RequiredText text="Company Description" />
              <ReactQuill
                value={description}
                onChange={setDescription}
                placeholder="Enter your summary"
              />
              {errors.description && (
                <p className={classes.error}>{errors.description}</p>
              )}
            </div>
            <div className={classes.div12}>
              <button
                type="button"
                className={classes.button1}
                onClick={handleCancel}
              >
                Cancel
              </button>
              {isPending ? (
                <>Wait a minute</>
              ) : (
                <button type="submit" className={classes.button2}>
                  Save
                </button>
              )}
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
