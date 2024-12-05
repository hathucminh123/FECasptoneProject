import React, { useEffect, useRef, useState } from "react";
import classes from "./EditInfoCompany.module.css";
import CloseIcon from "@mui/icons-material/Close";
import SearchIcon from "@mui/icons-material/Search";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";
import { PutCompanies } from "../../Services/CompanyService/PutCompany";
import { queryClient } from "../../Services/mainService";
import { message } from "antd";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";

const data = ["Việt Nam", "Mỹ", "Lào"];
import { v4 as uuidv4 } from "uuid";
import { storage } from "../../firebase/config";
const EditInfoCompany: React.FC = () => {
  const [companyId, setCompanyId] = useState<string | null>(null);

  useEffect(() => {
    const CompanyId = localStorage.getItem("CompanyId");
    setCompanyId(CompanyId);
  }, []);

  const { data: CompanyDa } = useQuery({
    queryKey: ["Company-details", companyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });

  const companyDataa = CompanyDa?.Companies;
  const [fileUrl, setFileUrl] = useState<string>("");
  const [companyName, setCompanyName] = useState<string>("");
  const [companyDescription, setCompanyDescription] = useState<string>("");
  const [companySize, setCompanySize] = useState<number | undefined>();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [website, setWebsite] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [address, setAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [country, setCountry] = useState<string>("");
  const [establishedYear, setEstablishedYear] = useState<number | undefined>();
  const [selectedCountry, setSelectedCountry] = useState<string | null>(null);
  const [countrydata, setCountryData] = useState(data);
  const [dropdownOpenLocation, setDropdownOpenLocation] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const stripHtmlTags = (html: string) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, "text/html");
    return parsedHtml.body.innerText || ""; // Extract plain text
  };

  useEffect(() => {
    if (companyDataa) {
      setCompanyName(companyDataa.companyName || "");
      setCompanyDescription(
        stripHtmlTags(companyDataa.companyDescription || "")
      );
      setCompanySize(companyDataa.numberOfEmployees);
      setWebsite(companyDataa.websiteURL || "");
      setImageUrl(companyDataa.imageUrl || "");
      setAddress(companyDataa.address || "");
      setCity(companyDataa.city || "");
      setCountry(companyDataa.country || "");
      setEstablishedYear(companyDataa.establishedYear);
    }
  }, [companyDataa]);

  const handleChangeLocation = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setCountry(inputValue);
    if (inputValue) {
      setCountryData(
        data.filter((comp) =>
          comp.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
      setDropdownOpenLocation(true);
    } else {
      setCountryData([]);
      setDropdownOpenLocation(false);
    }
  };

  const handleSelectCountry = (country: string) => {
    setSelectedCountry(country);
    setCountry(country);
    setDropdownOpenLocation(false);
  };

  const { mutate: UpdateCompany } = useMutation({
    mutationFn: PutCompanies,
    onSuccess: () => {
      // console.log("ok chua ta ", data);
      queryClient.invalidateQueries({
        queryKey: ["Company-details"],
        refetchType: "active",
      });
      queryClient.invalidateQueries({
        queryKey: ["Company"],
        refetchType: "active",
      });
      message.success(`update Company details successfully!`);
      // navigate(`/thankyou/${job?.id}`);
    },

    onError: () => {
      message.error("Failed to Update CompanyDetails.");
    },
  });
  const handleUploadClick = (e: React.FormEvent) => {
    e.preventDefault();
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let uploadedFileUrl = imageUrl;

      if (selectedFile) {
        const fileName = `${uuidv4()}-${selectedFile.name}`;
        const fileRef = ref(storage, fileName);

        await uploadBytes(fileRef, selectedFile);

        uploadedFileUrl = await getDownloadURL(fileRef);
        setFileUrl(uploadedFileUrl);
      }

      // Prepare updated company data
      const updatedCompanyData = {
        id: Number(companyId),
        companyName,
        companyDescription,
        numberOfEmployees:companySize,
        websiteURL:website,
        imageUrl: fileUrl ? fileUrl : imageUrl,
        address,
        city,
        country: selectedCountry ? selectedCountry : country,
        establishedYear,
      };

      console.log("Updated Company Data:", updatedCompanyData);

      await UpdateCompany({ data: updatedCompanyData });

      // message.success("Company updated successfully!");
    } catch (error) {
      console.error("Error updating company:", error);
      message.error(
        "An error occurred while updating the company. Please try again."
      );
    }
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <div className={classes.main2}>
          <header className={classes.header}>
            <div>Settings</div>
            <div className={classes.main3}>
              Here is the place to include company info (size, location,..).
            </div>
          </header>
          <form className={classes.form} onSubmit={handleSubmit}>
            <div>
              <div className={classes.main4}>
                <div className={classes.main5}>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main6}>
                      <div className={classes.main7}>
                        Company Name
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main8}>
                      <input
                        type="text"
                        className={classes.input}
                        value={companyName}
                        onChange={(e) => setCompanyName(e.target.value)}
                      />
                    </div>
                  </label>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main6}>
                      <div className={classes.main7}>
                        Company Description
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main8}>
                      <input
                        type="text"
                        className={classes.input}
                        value={companyDescription}
                        onChange={(e) => setCompanyDescription(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
                <div className={classes.main9}>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main10}>
                      <div className={classes.main11}>Logo</div>
                    </div>
                    <div className={classes.main12}>
                      <div className={classes.main13}>
                        <div className={classes.main14}>
                          <img
                            src={imageUrl || ""}
                            className={classes.img}
                            alt="Logo"
                          />
                        </div>
                        <span
                          className={classes.span1}
                          onClick={handleUploadClick}
                        >
                          Upload New Image
                        </span>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/png,image/jpg,image/jpeg"
                        className={classes.input1}
                        onChange={(e) => {
                          if (e.target.files?.[0]) {
                            const file = e.target.files?.[0];
                            setSelectedFile(file);
                            const url = URL.createObjectURL(e.target.files[0]);
                            setImageUrl(url);
                          }
                        }}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className={classes.main15}>
                <div className={classes.main16}>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main6}>
                      <div className={classes.main7}>
                        Company Size
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main8}>
                      <input
                        type="number"
                        className={classes.input}
                        value={companySize || ""}
                        onChange={(e) =>
                          setCompanySize(
                            parseInt(e.target.value, 10) || undefined
                          )
                        }
                      />
                    </div>
                  </label>
                </div>
                <div className={classes.main17}>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main6}>
                      <div className={classes.main7}>
                        Website URL
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main8}>
                      <input
                        type="text"
                        className={classes.input}
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className={classes.main15}>
                <div className={classes.main16}>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main6}>
                      <div className={classes.main7}>
                        Address
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main8}>
                      <input
                        type="text"
                        className={classes.input}
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
                <div className={classes.main17}>
                  <label htmlFor="" className={classes.label}>
                    <div className={classes.main6}>
                      <div className={classes.main7}>
                        City
                        <span className={classes.span}>*</span>
                      </div>
                    </div>
                    <div className={classes.main8}>
                      <input
                        type="text"
                        className={classes.input}
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                      />
                    </div>
                  </label>
                </div>
              </div>
              <div className={classes.main15}>
                <label htmlFor="" className={classes.label}>
                  <div className={classes.label1}>
                    <div className={classes.label2}>
                      Country
                      <span className={classes.span1}>*</span>
                    </div>
                  </div>

                  {country ? (
                    <div className={classes.input13}>
                      <span className={classes.selectcountry}>
                        {country}{" "}
                        <span
                          className={classes.spanicon}
                          onClick={() => setSelectedCountry(null)}
                        >
                          <CloseIcon />
                        </span>
                      </span>
                    </div>
                  ) : (
                    selectedCountry && (
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
                    )
                  )}

                  <div className={classes.input9}>
                    <div className={classes.input10}>
                      <div className={classes.input11}>
                        <input
                          type="text"
                          className={classes.input12}
                          // value={country}
                          onChange={handleChangeLocation}
                          onFocus={() => setDropdownOpenLocation(true)}
                        />
                        <div className={classes.search}>
                          <SearchIcon />
                        </div>
                      </div>
                      {dropdownOpenLocation && (
                        <div className={classes.dropdown} ref={dropdownRef}>
                          {countrydata?.length > 0 ? (
                            countrydata.map((comp, index) => (
                              <div
                                key={index}
                                className={classes.dropdownItem}
                                onClick={() => handleSelectCountry(comp)}
                              >
                                {comp}
                              </div>
                            ))
                          ) : (
                            <div className={classes.createNewCompany}>
                              <span>Not found</span>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                </label>
              </div>
              <div className={classes.main15}>
                <label htmlFor="" className={classes.label}>
                  <div className={classes.label1}>
                    <div className={classes.label2}>
                      Established Year
                      <span className={classes.span1}>*</span>
                    </div>
                  </div>
                  <div className={classes.input4}>
                    <input
                      type="number"
                      className={classes.input5}
                      value={establishedYear || ""}
                      onChange={(e) =>
                        setEstablishedYear(
                          parseInt(e.target.value, 10) || undefined
                        )
                      }
                    />
                  </div>
                </label>
              </div>
            </div>
            <button className={classes.button} type="submit">
              Save changes
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditInfoCompany;
