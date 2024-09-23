import React, { useState } from "react";
import classes from "./Applied.module.css";
import FormSearch from "../../components/Employer/FormSearch";
import FormSelect from "../../components/Employer/FormSelect";

const Data = ["Show All Cv", "Show only unseen CVs"];
export default function AppliedCV() {
  const [selectedValue, setSelectedValue] = useState<string>("");
 const Height =37.3;

  return (
    <div className={classes.main1}>
      <div className={classes.main2}>
        <div className={classes.main3}>
          <div className={classes.main4}>
            <div className={classes.main5}>
              <FormSearch placeholder="Find" />
            </div>
            <div className={classes.main5}>
              <FormSelect selectedValue={selectedValue}  setSelectedValue={setSelectedValue} data={Data} height={Height} placeholder="Show All Cv" />
            </div>
          </div>
          <div className={classes.main6}>
            <button className={classes.button}>
                Import CV List
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
