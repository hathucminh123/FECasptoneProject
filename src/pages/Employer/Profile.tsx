import React, { useRef, useState } from "react";
import classes from "./Profile.module.css";
import FormSelect from "../../components/Employer/FormSelect";
import Button from "../../components/Employer/Button";

const Gender: string[] = ["Man", "Female"];

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State để lưu URL hình ảnh
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectGender, setSelectGender] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho file
      setPreviewUrl(fileUrl); // Lưu URL để hiển thị hình ảnh
      console.log("File selected:", file);
    }
  };

  const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form submit
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (selectedFile) {
      console.log("ok", selectedFile);
    }
  };

  return (
    <div className={classes.main1}>
      <form className={classes.form}>
        <div className={classes.div}>
          <div className={classes.div1}>Update Personal Information</div>
          <div className={classes.div2}>
            <div className={classes.div3}>
              <div className={classes.div4}>
                <label htmlFor="" className={classes.label}>
                  Avatar
                </label>
                <div className={classes.img}>
                  {previewUrl && (
                    <img
                      src={previewUrl}
                      alt="Avatar Preview"
                      className={classes.img}
                    />
                  )}
                </div>
                <div className={classes.div5}>
                  <div className={classes.div6}>
                    <button
                      className={classes.button}
                      onClick={handleUploadClick}
                    >
                      Change Avatar
                    </button>
                    <input
                      ref={fileInputRef}
                      className={classes.inputup}
                      type="file"
                      accept="image/png, image/jpeg, image/jpg"
                      multiple={false}
                      onChange={handleFileChange}
                      hidden
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className={classes.div7}>
              <label htmlFor="" className={classes.label1}>
                Email: Hathucminh456@gmail.com
              </label>
            </div>
          </div>
          <div className={classes.div2}>
            <div className={classes.div3}>
              <label htmlFor="" className={classes.label2}>
                FullName
              </label>
              <div className={classes.div8}>
                <div className={classes.div9}>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder="FullName"
                    autoComplete="on"
                  />
                </div>
              </div>
            </div>
            <div className={classes.div3}>
              <label htmlFor="" className={classes.label2}>
                Gender
              </label>
              <div className={classes.div8}>
                <div className={classes.div9}>
                  <FormSelect
                    selectedValue={selectGender}
                    setSelectedValue={setSelectGender}
                    placeholder="Gender"
                    data={Gender}
                  />
                </div>
              </div>
            </div>
          </div>
          <div className={classes.div2}>
            <div className={classes.div3}>
              <div className={classes.div10}>
                <label htmlFor="" className={classes.label2}>
                  Phone Number
                </label>
                <label
                  htmlFor=""
                  className={classes.label2}
                  onClick={() => setDisabled(!disabled)}
                >
                  Update Phone Number
                </label>
              </div>

              <div className={classes.div8}>
                <div className={classes.div9}>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder="phone Number"
                    value="0123123"
                    autoComplete="on"
                    disabled={disabled ? true : false}
                    style={
                      disabled
                        ? {
                            color: "#52759b",
                            border: "1px solid #d7dee4",
                            background: "#e8edf2",
                          }
                        : undefined
                    }
                  />
                </div>
              </div>
            </div>
          </div>
          <hr className={classes.hr}/>
          <div className={classes.div11}>
            <Button text="Save" />
          </div>
        </div>
      </form>
    </div>
  );
}
