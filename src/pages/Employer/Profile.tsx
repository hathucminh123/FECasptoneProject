import React, { useRef, useState } from "react";
import classes from "./Profile.module.css";
import FormSelect from "../../components/Employer/FormSelect";
import Button from "../../components/Employer/Button";
import { useMutation } from "@tanstack/react-query";
import { message } from "antd"; // for notifications
import { PutUser } from "../../Services/UserJobPostActivity/PutUser";

const Gender: string[] = ["Man", "Female"];

// const updateUserDetails = async (userDetails: any) => {
//   const response = await fetch('/api/User', {
//     method: 'PUT',
//     headers: {
//       'Content-Type': 'application/json',
//     },
//     body: JSON.stringify(userDetails),
//   });
  
//   if (!response.ok) {
//     throw new Error('Failed to update user details');
//   }
  
//   return response.json();
// };

export default function Profile() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null); // State để lưu URL hình ảnh
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectGender, setSelectGender] = useState("");
  const [disabled, setDisabled] = useState<boolean>(true);
  const [formData, setFormData] = useState({
    userName: "currentUserName", 
    firstName: "",
    lastName: "",
    email: "hathucminh456@gmail.com", 
    phoneNumber: "0123123",
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    setSelectedFile(file);

    if (file) {
      const fileUrl = URL.createObjectURL(file); // Tạo URL tạm thời cho file
      setPreviewUrl(fileUrl); // Lưu URL để hiển thị hình ảnh
    }
  };

  const handleUploadClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // Ngăn chặn hành vi mặc định của form submit
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (selectedFile) {
      console.log("File selected:", selectedFile);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const { mutate: UpdateUser } = useMutation({
    mutationFn: PutUser,
    onSuccess: () => {
    
      // setFormData({
      //   currentPassword: "",
      //   newPassword: "",
      //   confirmPassword: "",
      // });

      message.success("Password updated successfully!");
    },
    onError: () => {
      message.error("Failed to update password.");
    },
  });
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    UpdateUser({data:{
      userName:formData.userName,
      firstName:formData.firstName,
      lastName:formData.lastName,
      email:formData.email,
      phoneNumber:formData.phoneNumber

    }});
  };

  return (
    <div className={classes.main1}>
      <form className={classes.form} onSubmit={handleSubmit}>
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
              <label htmlFor="email" className={classes.label1}>
                Email: {formData.email}
              </label>
            </div>
          </div>
          <div className={classes.div2}>
            <div className={classes.div3}>
              <label htmlFor="firstName" className={classes.label2}>
                First Name
              </label>
              <div className={classes.div8}>
                <div className={classes.div9}>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder="First Name"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    autoComplete="on"
                  />
                </div>
              </div>
            </div>
            <div className={classes.div3}>
              <label htmlFor="lastName" className={classes.label2}>
                Last Name
              </label>
              <div className={classes.div8}>
                <div className={classes.div9}>
                  <input
                    type="text"
                    className={classes.input}
                    placeholder="Last Name"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    autoComplete="on"
                  />
                </div>
              </div>
            </div>
            <div className={classes.div3}>
              <label htmlFor="gender" className={classes.label2}>
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
                <label htmlFor="phoneNumber" className={classes.label2}>
                  Phone Number
                </label>
                <label
                  htmlFor="phoneNumber"
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
                    placeholder="Phone Number"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    autoComplete="on"
                    disabled={disabled}
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
          <hr className={classes.hr} />
          <div className={classes.div11}>
            <Button text="Save"  />
          </div>
        </div>
      </form>
    </div>
  );
}
