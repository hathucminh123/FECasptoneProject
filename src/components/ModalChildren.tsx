// import React, { useEffect, useRef } from "react";
import Modal from "./Modal";

// import { useAnimate } from "framer-motion";
// import ReactQuill from "react-quill";
// import { Box, FormControl, InputLabel, MenuItem,  OutlinedInput,  Select, SelectChangeEvent, TextField,  Typography,  } from "@mui/material";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import Select, { SelectChangeEvent } from "@mui/material/Select";

import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import classes from "./ModalChildren.module.css";
import Image from "./../assets/image/minh.jpg";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import React, { useState } from "react";
import { Theme, useTheme } from '@mui/material/styles';


interface props {
  onDone?: () => void;
}
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const city = [
  'Tp Hồ Chí Minh',
  'Hà Nội',
  'Đà Nẵng',
  'Hải Phòng',
  'Cần Thơ',
  'An Giang',
  'Hải Phòng',
  'Bà Rịa-Vũng Tàu',
  'Bạc liêu',
  'Thái Bình',
];

function getStyles(name: string, personName: string[], theme: Theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium,
  };
}

export default function ModalChildren({ onDone }: props) {
  // const titleRef = useRef<HTMLHeadingElement | null>(null);
  // const description = useRef();
  // const deadline = useRef();
  // const [scope, animate] = useAnimate();
  //     useEffect(() => {
  //         if (titleRef.current) {
  //             titleRef.current.focus(); // Focus vào input khi component được mount
  //         }
  //       }, []);
  const [age, setAge] = useState<string>("");

  const handleChangeGender = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };
  const theme = useTheme();
  const [personName, setPersonName] = React.useState<string[]>([]);

  const handleChangeCity = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };
  return (
    <Modal title="Personal details" onClose={onDone}>
      <Box
        component="form"
        sx={{ marginTop: "24px", display: "block" }}
        noValidate
        autoComplete="off"
      >
        <div className={classes.image}>
          <img
            src={Image}
            alt=""
            style={{
              borderRadius: "50%",
              objectFit: "cover",
              imageRendering: "auto",
              width: "120px",
              height: "120px",
              aspectRatio: "auto 120/120",
              verticalAlign: "middle",
            }}
          />
          <div className={classes.formbutton}>
            <div style={{ display: "inline-block" }}>
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                }}
              >
                <CameraAltOutlinedIcon
                  sx={{ width: "16px", height: "16px", color: "#ed1b2f" }}
                />
                <Typography
                  variant="body2"
                  style={{
                    cursor: "pointer",
                    color: "#ed1b2f",
                    marginLeft: ".25rem",
                  }}
                >
                  Edit
                </Typography>
              </div>
            </div>
            <div style={{ display: "inline-block" }}>
              <div
                style={{
                  display: "flex",
                  cursor: "pointer",
                  alignItems: "center",
                  paddingLeft: "24px",
                  textAlign: "center",
                }}
              >
                <DeleteForeverOutlinedIcon
                  sx={{ width: "16px", height: "16px", color: "#414042" }}
                />
                <Typography
                  variant="body2"
                  style={{
                    cursor: "pointer",
                    color: "#414042",
                    marginLeft: ".25rem",
                  }}
                >
                  Delete
                </Typography>
              </div>
            </div>
          </div>
        </div>
        <div className={classes.forminput}>
          <div className={classes.forminput1}>
            <TextField
              id="outlined-email-input"
              label="Full Name"
              type="text"
              // required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>
          <div className={classes.forminput2}>
            <TextField
              id="outlined-email-input"
              label="Title"
              type="text"
              // required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>
          <div className={classes.forminput3}>
            <TextField
              id="outlined-email-input"
              label="Email address"
              type="email"
              required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>  
          <div className={classes.forminput4}>
            <TextField
              id="outlined-email-input"
              label="Phone number"
              type="number"
              required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div> 
          <div className={classes.forminput3}>
            <TextField
              id="outlined-email-input"
              label="Date of birth"
              type="date"
              required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div> 
          <div className={classes.forminput4}>
          <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Gender</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={age}
          label="Gender"
          onChange={handleChangeGender}
        >
          <MenuItem value="Male">Male</MenuItem>
          <MenuItem value="Female">Female</MenuItem>
          <MenuItem value="Others">Others</MenuItem>
        </Select>
      </FormControl>
          </div> 
          <div className={classes.forminput3}>
          <FormControl fullWidth sx={{ }}>
            <InputLabel>Current province/city</InputLabel>
            <Select
              multiple
              value={personName}
              onChange={handleChangeCity}
              input={<OutlinedInput label="City" />}
              MenuProps={MenuProps}
            >
              {city.map((name) => (
                <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
                  {name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          </div> 
          <div className={classes.forminput4}>
            <TextField
              id="outlined-email-input"
              label="Address(Street,district,..)"
              type="text"
              required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div> 
          <div className={classes.forminput2}>
            <TextField
              id="outlined-email-input"
              label="Personal Link"
              type="text"
              // required
              autoComplete=""
              variant="outlined"
              sx={{ width: "100%" }}
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
}

// import Modal from "./Modal";
// import { FormControl, InputLabel, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField, Typography } from "@mui/material";
// import classes from "./ModalChildren.module.css";
// import Image from "./../assets/image/minh.jpg";
// import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
// import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
// import React, { useState } from "react";
// import { Theme, useTheme } from '@mui/material/styles';


// import Box from '@mui/material/Box';
// interface props {
//   onDone?: () => void;
// }

// const ITEM_HEIGHT = 48;
// const ITEM_PADDING_TOP = 8;
// const MenuProps = {
//   PaperProps: {
//     style: {
//       maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
//       width: 250,
//     },
//   },
// };

// const city = [
//   'Tp Hồ Chí Minh',
//   'Hà Nội',
//   'Đà Nẵng',
//   'Hải Phòng',
//   'Cần Thơ',
//   'An Giang',
//   'Hải Phòng',
//   'Bà Rịa-Vũng Tàu',
//   'Bạc liêu',
//   'Thái Bình',
// ];

// function getStyles(name: string, personName: string[], theme: Theme) {
//   return {
//     fontWeight:
//       personName.indexOf(name) === -1
//         ? theme.typography.fontWeightRegular
//         : theme.typography.fontWeightMedium,
//   };
// }

// export default function ModalChildren({ onDone }: props) {
//   const [age, setAge] = useState<string>("");
//   const theme = useTheme();
//   const [personName, setPersonName] = useState<string[]>([]);

//   const handleChangeGender = (event: SelectChangeEvent) => {
//     setAge(event.target.value as string);
//   };

//   const handleChangeCity = (event: SelectChangeEvent<typeof personName>) => {
//     const { value } = event.target;
//     setPersonName(typeof value === "string" ? value.split(",") : value);
//   };

//   return (
//     <Modal title="Education" onClose={onDone}>
//       <Box component="form" sx={{ marginTop: "24px" }} noValidate autoComplete="off">
//         <div className={classes.image}>
//           <img
//             src={Image}
//             alt="profile"
//             className={classes.profileImage}
//           />
//           <div className={classes.formbutton}>
//             <div className={classes.buttonGroup}>
//               <CameraAltOutlinedIcon sx={{ color: "#ed1b2f" }} />
//               <Typography variant="body2" sx={{ color: "#ed1b2f", marginLeft: ".25rem" }}>
//                 Edit
//               </Typography>
//             </div>
//             <div className={classes.buttonGroup} style={{ paddingLeft: "24px" }}>
//               <DeleteForeverOutlinedIcon sx={{ color: "#414042" }} />
//               <Typography variant="body2" sx={{ color: "#414042", marginLeft: ".25rem" }}>
//                 Delete
//               </Typography>
//             </div>
//           </div>
//         </div>

//         <div className={classes.forminput}>
//           <TextField label="Full Name" variant="outlined" fullWidth />
//           <TextField label="Title" variant="outlined" fullWidth sx={{ marginTop: "24px" }} />
//           <TextField label="Email address" type="email" variant="outlined" fullWidth required sx={{ marginTop: "24px" }} />
//           <TextField label="Phone number" type="number" variant="outlined" fullWidth required sx={{ marginTop: "24px" }} />
//           <TextField label="Date of birth" type="date" variant="outlined" fullWidth required sx={{ marginTop: "24px" }} />

//           <FormControl fullWidth sx={{ marginTop: "24px" }}>
//             <InputLabel>Gender</InputLabel>
//             <Select value={age} label="Gender" onChange={handleChangeGender}>
//               <MenuItem value="Male">Male</MenuItem>
//               <MenuItem value="Female">Female</MenuItem>
//               <MenuItem value="Others">Others</MenuItem>
//             </Select>
//           </FormControl>

//           <FormControl fullWidth sx={{ marginTop: "24px" }}>
//             <InputLabel>Name</InputLabel>
//             <Select
//               multiple
//               value={personName}
//               onChange={handleChangeCity}
//               input={<OutlinedInput label="Name" />}
//               MenuProps={MenuProps}
//             >
//               {city.map((name) => (
//                 <MenuItem key={name} value={name} style={getStyles(name, personName, theme)}>
//                   {name}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         </div>
//       </Box>
//     </Modal>
//   );
// }

