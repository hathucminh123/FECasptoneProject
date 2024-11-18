import React, { useState } from "react";
import classes from "./Emailform.module.css";
import { CustomEmail } from "../../Services/CustomEmail/CustomEmail";
import { useMutation, useQuery } from "@tanstack/react-query";
import { message } from "antd";
import { fetchCompaniesById } from "../../Services/CompanyService/GetCompanyById";
export default function Emailform() {
  const [emailForm, setEmailForm] = useState<string>("");
  const companyId = localStorage.getItem("CompanyId");
  const { mutate, isPending } = useMutation({
    mutationFn: CustomEmail,
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
  const {
    data: CompanyDa,    
    // isLoading,
    // error,
  } = useQuery({
    queryKey: ["Company-details", companyId], // Sửa lại tên key cho chính xác
    queryFn: ({ signal }) =>
      fetchCompaniesById({ id: Number(companyId), signal }),
    enabled: !!companyId,
  });
 
  // Dữ liệu công ty (nếu có)
  const companyDataa = CompanyDa?.Companies;

  const handleSendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailForm || emailForm.trim() === "") {
      console.error("Email content is required");
      return;
    }

    const formattedCompanyName = companyDataa?.companyName
      .replace(/\s{2,}/g, " ")
      .trim();

    mutate({
      data: {
        content: emailForm,
        companyName: formattedCompanyName,
        // companyName: "fpt",
        reciveUser: profile?.email,
      },
    });
  };
  return (
    <form action="" className={classes.form} onSubmit={handleSendEmail}>
      <div className={classes.main37}>
        <div className={classes.main38}>
          <div className={classes.main39}>
            <div className={classes.main40}>
              <button className={classes.main41}>Saved Templates ✦</button>
            </div>
          </div>
          <div className={classes.main42}></div>
        </div>
        <div className={classes.main50}>
          <div className={classes.main51}>
            <textarea
              name=""
              id=""
              className={classes.main52}
              placeholder="Start writing your Email...."
              onChange={(e) => setEmailForm(e.target.value)}
              value={emailForm}
            ></textarea>
          </div>
        </div>
      </div>
      <div className={classes.main53}>
        {isPending ? (
          <button className={classes.main54}>Wait a seconds</button>
        ) : (
          <button type="submit" className={classes.main54}>
            Send Request Email
          </button>
        )}
      </div>
    </form>
  );
}
