import React, { useRef, useState } from "react";
import classes from "./CreateCompanyEmployer.module.css";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import Input from "../../components/Employer/Input";
import FormSelect from "../../components/Employer/FormSelect";
import RequiredText from "../../components/Employer/RequiredText";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { queryClient } from "../../Services/mainService";
import { PostCompanies } from "../../Services/CompanyService/PostCompanies";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostBusinessStream } from "../../Services/BusinessStreamService/PostBusinessStream";
import { GetBusinessStream } from "../../Services/BusinessStreamService/GetBusinessStream";
import FormSelectBusinessStream from "../../components/Employer/FormSelectBusinessStream";
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/config";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

interface BusinessStreamprops {
  id: number;
  businessStreamName: string;
  description: string;
}

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
  const [description, setDescription] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [website, setWebsite] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [establishedYear, setEstablishedYear] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [selectbusinessStream, setSelectBusinessStream] =
    useState<BusinessStreamprops | null>(null);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [businessStreamName, setBusinessStreamName] = useState<string>("");
  const [descriptionBusiness, setDescriptionBusiness] = useState<string>("");
  const [fileUrl, setFileUrl] = useState<string>();

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

  const { data: BusinessStream } = useQuery({
    queryKey: ["BusinessStream"],
    queryFn: ({ signal }) => GetBusinessStream({ signal }),
    staleTime: 5000,
  });

  const BusinessStreamData = BusinessStream?.BusinessStreams;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!companyName) newErrors.companyName = "Company Name is required";
    if (!selectSize) newErrors.selectSize = "Company Size is required";
    if (!address) newErrors.address = "Address is required";
    if (!description) newErrors.description = "Description is required";
    if (!establishedYear)
      newErrors.establishedYear = "Established Year is required";
    if (!country) newErrors.country = "Country is required";
    if (!city) newErrors.city = "City is required";
    if (!selectbusinessStream)
      newErrors.businessStreamId = "Business stream is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (validateForm()) {
      try {
        if (!selectedFile) {
          console.error("No file selected");
          message.warning("Please select a file to upload.");
          return;
        }

        const fileName = `${uuidv4()}-${selectedFile.name}`;
        const fileRef = ref(storage, fileName);

        await uploadBytes(fileRef, selectedFile);

        const fileUrl = await getDownloadURL(fileRef);

        const formData = {
          companyName,
          companyDescription: description,
          websiteURL: website,
          establishedYear: parseInt(establishedYear),
          country,
          city,
          address,
          numberOfEmployees: parseInt(selectSize.replace(/[^0-9]/g, "")) || 0,
          businessStreamId: selectbusinessStream?.id,
          imageUrl: fileUrl,
        };

     
        mutate({ data: formData });

        console.log("Form submitted successfully");
      } catch (error) {
        console.error("Error during file upload or form submission:", error);
        message.error("Failed to upload file or submit form.");
      }
    }
  };
  const validateBusinessStreamForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!businessStreamName)
      newErrors.businessStreamName = "Business Stream Name is required";
    if (!descriptionBusiness)
      newErrors.descriptionBusiness =
        "Description for Business Stream is required";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitBusinessStream = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateBusinessStreamForm()) {
      MutateBusinessStream({
        data: {
          businessStreamName,
          description: descriptionBusiness,
        },
      });
    }
  };

  const handleCancel = () => {
    setCompanyName("");
    setWebsite("");
    setSelectSize("");
    setAddress("");
    setDescription("");
    setEstablishedYear("");
    setCountry("");
    setCity("");
    setSelectBusinessStream(null);
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
                  src={fileUrl || ""}
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
              <div>
                <RequiredText text="Create Business Stream ID" />
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-start",
                  }}
                >
                  <div style={{ paddingRight: 5 }}>
                    <Input
                      placeholder="businessStreamName"
                      value={businessStreamName}
                      onChange={(e) => setBusinessStreamName(e.target.value)}
                    />
                    {errors.businessStreamName && (
                      <p className={classes.error}>
                        {errors.businessStreamName}
                      </p>
                    )}
                  </div>
                  <div style={{ paddingLeft: 5 }}>
                    <Input
                      placeholder="description"
                      value={descriptionBusiness}
                      onChange={(e) => setDescriptionBusiness(e.target.value)}
                    />
                    {errors.descriptionBusiness && (
                      <p className={classes.error}>
                        {errors.descriptionBusiness}
                      </p>
                    )}
                  </div>
                </div>
                <div style={{ textAlign: "end", marginTop: 10 }}>
                  {Pedingbusiness ? (
                    <>Wait a minute</>
                  ) : (
                    <button
                      onClick={(e) => handleSubmitBusinessStream(e)}
                      className={classes.button2}
                    >
                      Save BusinessStream
                    </button>
                  )}
                </div>
              </div>
              <div className={classes.div8}>
                <label className={classes.label}>Business Stream ID *</label>
                <FormSelectBusinessStream
                  selectedValue={selectbusinessStream}
                  setSelectedValue={setSelectBusinessStream}
                  data={BusinessStreamData}
                  placeholder="Select Business Stream"
                />
                {errors.businessStreamId && (
                  <p className={classes.error}>{errors.businessStreamId}</p>
                )}
              </div>
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
