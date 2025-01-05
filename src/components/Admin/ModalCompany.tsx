import { createPortal } from "react-dom";
import classes from "./ModalCompany.module.css";
import React, { useState } from "react";

import CloseIcon from "@mui/icons-material/Close";
import IconButton from "@mui/material/IconButton";
import { motion } from "framer-motion";
import { useMutation, useQuery } from "@tanstack/react-query";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";
import { Image, message } from "antd";
import { TaxCode } from "../../Services/TaxCode/TaxCode";
import { PutCompaniesStatus } from "../../Services/CompanyService/PutCompanyStatus";
import { queryClient } from "../../Services/mainService";
import EmailModal from "./EmailModal";
import { CustomEmailReject } from "../../Services/CustomEmail/CustomEmailReject";
interface props {
  onClose?: () => void;
  // onConfirm?: () => void;
  companyId?: number | null;
}

const ModalCompany: React.FC<props> = ({ onClose, companyId }) => {
  const [emailModalVisible, setEmailModalVisible] = useState(false);

  const handleEmailClick = () => {
    setEmailModalVisible(true);
  };

    const { mutate, } = useMutation({
      mutationFn: CustomEmailReject,
      onSuccess: () => {
        // queryClient.invalidateQueries({
        //   queryKey: ["JobPostActivity"],
        //   refetchType: "active", // Ensure an active refetch
        // });
        message.success(`Send Email successfully!`);
        // navigate(`/thankyou/${job?.id}`);
      },
      onError: () => {
        message.error("Failed to Send Email.");
      },
    });
    const handleSendEmail = (emailData: { email: string; body: string }) => {
      mutate({
        data: {
          companyEmail: emailData.email,
          emailContent: emailData.body,
        
        },
      });
    };

  const stripHtmlTags = (html: string) => {
    const parser = new DOMParser();
    const parsedHtml = parser.parseFromString(html, "text/html");
    return parsedHtml.body.innerText || ""; // Extract plain text
  };

  const { data: CompanyDa } = useQuery({
    queryKey: ["Company-details", companyId],
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });
  const companyDataa = CompanyDa?.Companies;
  const { data: TaxCodedata } = useQuery({
    queryKey: ["TaxCode", companyDataa?.taxCode],
    queryFn: ({ signal }) => TaxCode({ signal, code: companyDataa?.taxCode }),
    enabled: !!companyDataa?.taxCode,
  });
  const Taxdata = TaxCodedata?.company;

  const { mutate: Putstatus } = useMutation({
    mutationFn: PutCompaniesStatus,
    onSuccess: async () => {
      // console.log("ok chua ta ", data);
      await queryClient.invalidateQueries({
        queryKey: ["Company-details"],
        refetchType: "active",
      });
      await queryClient.invalidateQueries({
        queryKey: ["Company"],
        refetchType: "active",
      });
      // queryClient.invalidateQueries({
      //   queryKey: ["Company"],
      //   refetchType: "active", // Ensure an active refetch
      // });
      onClose?.();
      message.success(`Update status successfully!`);
      // navigate(`/thankyou/${job?.id}`);
    },

    onError: () => {
      message.error("Failed to Update Status");
    },
  });

  const handleReject = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Putstatus({
      data: {
        companyId: companyDataa?.id,
        companyStatus: 1,
      },
    });
  };

  const handleApproved = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    Putstatus({
      data: {
        companyId: companyDataa?.id,
        companyStatus: 2,
      },
    });
  };

  const modalRoot = document.getElementById("modalCompany");
  if (!modalRoot) {
    return null;
  }

  return createPortal(
    <div className={classes.main}>
      <motion.div
        onClick={(e) => e.stopPropagation()}
        variants={{
          hidden: { opacity: 0, y: 10 },
          visible: { opacity: 1, y: 0 },
        }}
        // initial={{ opacity: 0, y: 30 }}
        // animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        initial="hidden"
        animate="visible"
        // exit="hidden"
        // whileHover="hidden"

        // className={classes.modall}
      >
        <div className={classes.main1}>
          <div className={classes.main2}>
            <div className={classes.main3}>
              {/* <div className={classes.main4}>
             
            </div> */}
              {/* <button className={classes.button} type="button">
            <CloseIcon  sx={{padding:'.'}}/>
            </button> */}
              <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                  cursor: "pointer",
                  marginRight: "20px !important",
                  marginTop: "20px !important",
                  boxSizing: "content-box",
                  width: "1em",
                  height: "1em",
                  padding: ".25em .25em",
                  color: "#000",
                  WebkitAppearance: "button",
                  textTransform: "none",
                  border: 0,
                  borderRadius: ".25rem",
                  opacity: 0.5,
                  margin: 0,
                  fontFamily: "inherit",
                  fontSize: "inherit",
                  lineHeight: "inherit",
                }}
              >
                <CloseIcon />
              </IconButton>
            </div>
            <header className={classes.header}>
              <div>Company Info</div>
              <div className={classes.main2}>
                Here is the place to include company info (size, location,..).
              </div>
            </header>
            <form
              className={classes.form}
              // onSubmit={handleSubmit}
            >
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
                          value={companyDataa?.companyName}
                          disabled={true}
                          //   onChange={(e) => setCompanyName(e.target.value)}
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
                          value={stripHtmlTags(
                            companyDataa?.companyDescription ?? ""
                          )}
                          disabled={true}
                          //   onChange={(e) =>
                          //     setCompanyDescription(e.target.value)
                          //   }
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
                              src={companyDataa?.imageUrl || ""}
                              className={classes.img}
                              alt="Logo"
                            />
                          </div>
                          {/* <span
                            className={classes.span1}
                            onClick={handleUploadClick}
                          >
                            Upload New Image
                          </span> */}
                        </div>
                        {/* <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpg,image/jpeg"
                          className={classes.input1}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files?.[0];
                              setSelectedFile(file);
                              const url = URL.createObjectURL(
                                e.target.files[0]
                              );
                              setImageUrl(url);
                            }
                          }}
                        /> */}
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
                          type="text"
                          className={classes.input}
                          disabled={true}
                          value={
                            companyDataa?.numberOfEmployees ||
                            "No update number of Employees yet"
                          }
                          //   onChange={(e) =>
                          //     setCompanySize(
                          //       parseInt(e.target.value, 10) || undefined
                          //     )
                          //   }
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
                          value={
                            companyDataa?.websiteURL ||
                            "no website URL update yet "
                          }
                          disabled={true}
                          //   onChange={(e) => setWebsite(e.target.value)}
                        />
                      </div>
                    </label>
                  </div>
                </div>
                {/* <div className={classes.main15}>
            
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
                          value={companyDataa?.address}
                          disabled={true}
                          // onChange={(e) => setAddress(e.target.value)}
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
                          value={companyDataa?.city}
                          disabled={true}
                          //   onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                    </label>
                  </div>
                </div> */}
                <div className={classes.label1}>
                  <div className={classes.label2}>
                    Location
                    <span className={classes.span1}>*</span>
                  </div>
                </div>
                <div className={classes.main15}>
                  <div
                    className={classes.locationsSection}
                    style={{ marginTop: "10px", width: "100%" }}
                  >
                    {/* <h3>Locations</h3> */}
                    {companyDataa?.companyLocations &&
                    companyDataa?.companyLocations?.length > 0 ? (
                      companyDataa.companyLocations.map((location, index) => (
                        <div key={index} className={classes.locationCard}>
                          <div className={classes.locationRow}>
                            <span className={classes.locationLabel}>City:</span>
                            <span className={classes.locationValue}>
                              {location.city}
                            </span>
                          </div>
                          <div className={classes.locationRow}>
                            <span className={classes.locationLabel}>
                              Address:{" "}
                            </span>
                            <span className={classes.locationValue}>
                              {location.stressAddressDetail}
                            </span>
                          </div>
                          {/* <div className={classes.locationRow}>
                    <span className={classes.locationLabel}>Location ID:</span>
                    <span className={classes.locationValue}>{location.locationId}</span>
                  </div> */}
                        </div>
                      ))
                    ) : (
                      <p>No locations available</p>
                    )}
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

                    {companyDataa?.country ? (
                      <div className={classes.input13}>
                        <span className={classes.selectcountry}>
                          {companyDataa?.country}{" "}
                          {/* <span
                            className={classes.spanicon}
                            onClick={() => setSelectedCountry(null)}
                          >
                            <CloseIcon />
                          </span> */}
                        </span>
                      </div>
                    ) : (
                      <div> no Country avalable</div>
                    )}

                    <div className={classes.input9}>
                      <div className={classes.input10}>
                        <div className={classes.input11}>
                          <input
                            type="text"
                            className={classes.input12}
                            value={
                              companyDataa?.country ||
                              "Not Update Company Country Yet"
                            }
                            disabled={true}
                            //   onChange={handleChangeLocation}
                            //   onFocus={() => setDropdownOpenLocation(true)}
                          />
                          <div className={classes.search}>
                            {/* <SearchIcon /> */}
                          </div>
                        </div>
                      </div>
                    </div>
                  </label>
                </div>
                <div className={classes.main4}>
                  <div className={classes.main5}>
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
                          value={companyDataa?.establishedYear || ""}
                          disabled={true}
                          //   onChange={(e) =>
                          //     setEstablishedYear(
                          //       parseInt(e.target.value, 10) || undefined
                          //     )
                          //   }
                        />
                      </div>
                    </label>
                    <label htmlFor="" className={classes.label}>
                      <div className={classes.label1}>
                        <div className={classes.label2}>
                          Tax Code
                          <span className={classes.span1}>*</span>
                        </div>
                      </div>
                      <div className={classes.input4}>
                        <input
                          type="number"
                          className={classes.input5}
                          value={companyDataa?.taxCode || ""}
                          disabled={true}
                          //   onChange={(e) =>
                          //     setEstablishedYear(
                          //       parseInt(e.target.value, 10) || undefined
                          //     )
                          //   }
                        />
                        <div
                          className={
                            Taxdata
                              ? classes.taxStatusAvailable
                              : classes.taxStatusNotFound
                          }
                        >
                          {Taxdata ? "Tax available" : "Tax not Avalable"}
                        </div>
                      </div>
                    </label>
                  </div>

                  <div className={classes.main9}>
                    <label htmlFor="" className={classes.label}>
                      <div className={classes.main10}>
                        <div className={classes.main11}>Evidence</div>
                      </div>
                      <div className={classes.main12}>
                        <div className={classes.main13}>
                          <div className={classes.main14}>
                            <Image.PreviewGroup
                              preview={{
                                getContainer: () => document.body, // Đảm bảo hiển thị trên toàn bộ trang
                                zIndex: 4000, // Z-index cao hơn modal
                              }}
                            >
                              <Image
                                src={companyDataa?.evidence || ""}
                                className={classes.img}
                                alt="Logo"
                                preview={true}
                              />
                            </Image.PreviewGroup>
                          </div>
                          {/* <span
                            className={classes.span1}
                            onClick={handleUploadClick}
                          >
                            Upload New Image
                          </span> */}
                        </div>
                        {/* <input
                          ref={fileInputRef}
                          type="file"
                          accept="image/png,image/jpg,image/jpeg"
                          className={classes.input1}
                          onChange={(e) => {
                            if (e.target.files?.[0]) {
                              const file = e.target.files?.[0];
                              setSelectedFile(file);
                              const url = URL.createObjectURL(
                                e.target.files[0]
                              );
                              setImageUrl(url);
                            }
                          }}
                        /> */}
                      </div>
                    </label>
                  </div>
                </div>
              </div>
              <div className={classes.formbtn}>
                <div className={classes.formbtn1}></div>
                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    className={classes.btn}
                    onClick={handleReject}
                    aria-label="Reject the company"
                  >
                    Reject
                  </button>
                  <button
                    className={classes.btnEmail}
                    onClick={handleEmailClick}
                    type="button"
                    aria-label="Reason the company"
                  >
                    Email
                  </button>
                  <EmailModal
                    visible={emailModalVisible}
                    onClose={() => setEmailModalVisible(false)}
                    onSend={handleSendEmail}
                    companyDataa={companyDataa}
                  />
                </div>

                <button
                  className={classes.button}
                  onClick={handleApproved}
                  aria-label="Approve the company"
                >
                  Approve
                </button>
              </div>
            </form>
          </div>
        </div>
      </motion.div>
    </div>,
    modalRoot
  );
};

export default ModalCompany;
