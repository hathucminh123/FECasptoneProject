import React from "react";
import classes from "./ChooseCompany.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CompanyCard from "../../components/Employer/CompanyCard";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostUserCompanyService } from "../../Services/UserCompanyService/UserCompanyService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
import { queryClient } from "../../Services/mainService";

export default function ChooseCompany() {
  const navigate = useNavigate();
  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;
  // const { mutate } = useMutation({
  //   mutationFn: PostUserCompanyService,
  //   onSuccess: () => {
  //     message.success("Choose Company Successfully");
  //     const redirectPath = localStorage.getItem("redirectAfterLogin") || "/employer-verify/jobs/account/company";
  //     navigate(redirectPath);
  //     localStorage.removeItem("redirectAfterLogin");
  //   },
  //   onError: () => {
  //     message.error("Failed to Choose the Company");
  //   },
  // });
  const { mutate } = useMutation({
    mutationFn: PostUserCompanyService,
    onSuccess: () => {
      message.success("Choose Company Successfully");
      const redirectPath =
        // localStorage.getItem("redirectAfterLogin") ||
        "/employer-verify/jobs/account/company";
      // localStorage.removeItem("redirectAfterLogin");

      // Invalidate and refetch the company data
      // queryClient.invalidateQueries({"Company"});
      queryClient.invalidateQueries({
        queryKey: ["Company"],
        refetchType: "active", // Ensure an active refetch
      });
       
      navigate(redirectPath);
      window.location.reload()
    },
    onError: () => {
      message.error("Failed to Choose the Company");
    },
  });

  const handleOnChooseCompanyUser = (id: number) => {
    mutate({ data: { companyId: id } });
    localStorage.setItem("CompanyId", id.toString());
  };

  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <form>
          <div className={classes.main2}>
            <div className={classes.main3}>
              <span className={classes.span}>
                <SearchOutlinedIcon fontSize="small" />
              </span>
              <input
                className={classes.input}
                autoComplete="off"
                placeholder="Company Name"
                type="text"
              />
            </div>
            <span className={classes.span1}>
              <button type="submit" className={classes.button}>
                Find
              </button>
            </span>
          </div>
        </form>
        <p className={classes.p}>New company created</p>
        <div style={{ display: "block", boxSizing: "border-box" }}>
          <div className={classes.main4}>
            {Companiesdata?.map((item) => (
              <div className={classes.main5} key={item.id}>
                <CompanyCard
                  company={item}
                  onChoose={() => handleOnChooseCompanyUser(item?.id)}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
