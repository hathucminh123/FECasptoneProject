import React from "react";
import classes from "./ChooseCompany.module.css";
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";
import CompanyCard from "../../components/Employer/CompanyCard";
import { fetchCompanies } from "../../Services/CompanyService/GetCompanies";
import { useMutation, useQuery } from "@tanstack/react-query";
import { PostUserCompanyService } from "../../Services/UserCompanyService/UserCompanyService";
import { message } from "antd";
import { useNavigate } from "react-router-dom";
export default function ChooseCompany() {
  const CompanyId = localStorage.getItem("CompanyId")
  const { data: Company } = useQuery({
    queryKey: ["Company"],
    queryFn: ({ signal }) => fetchCompanies({ signal: signal }),
    staleTime: 5000,
  });
  const Companiesdata = Company?.Companies;
const navigate =useNavigate()
  const { mutate } = useMutation({
    mutationFn: PostUserCompanyService,
    onSuccess: () => {  
      // Invalidate and refetch the cache to ensure the UI is updated immediately
      // queryClient.invalidateQueries({
      //   queryKey: ["SkillSetDetails"],
      //   refetchType: "active", // Ensure an active refetch
      // });
      message.success("Choose Company Successfully");
      if(CompanyId !=="null"){
        navigate('/employer-verify/jobs/account/company')
      }
     
    },
    onError: () => {
      message.error("Failed to Choose the Company");
    },
  });
  const handleOnChooseCompanyUser = (id: number) => {
    mutate({ data: { companyId: id } });
  };
  return (
    <div className={classes.main}>
      <div className={classes.main1}>
        <form action="">
          {" "}
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
              <>
                <div className={classes.main5}>
                  <CompanyCard
                    company={item}
                    onChoose={() => handleOnChooseCompanyUser(item?.id)}
                  />
                </div>
              </>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
