import React, { useState } from "react";
import Modal from "./Modal";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import CameraAltOutlinedIcon from "@mui/icons-material/CameraAltOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import classes from "./ModalChildren.module.css";
import Image from "./../assets/image/minh.jpg";


interface Props {
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

const cities = [
  "Tp Hồ Chí Minh",
  "Hà Nội",
  "Đà Nẵng",
  "Hải Phòng",
  "Cần Thơ",
  "An Giang",
  "Hải Phòng",
  "Bà Rịa-Vũng Tàu",
  "Bạc Liêu",
  "Thái Bình",
];

export default function ModalChildren({ onDone }: Props) {
  const [age, setAge] = useState<string>("");
  const [personName, setPersonName] = useState<string[]>([]);
  const theme = useTheme();

  const handleChangeGender = (event: SelectChangeEvent) => {
    setAge(event.target.value as string);
  };

  const handleChangeCity = (event: SelectChangeEvent<typeof personName>) => {
    const {
      target: { value },
    } = event;
    setPersonName(typeof value === "string" ? value.split(",") : value);
  };

  const getStyles = (name: string) => {
    return {
      fontWeight:
        personName.indexOf(name) === -1
          ? theme.typography.fontWeightRegular
          : theme.typography.fontWeightMedium,
    };
  };



  return (
    <Modal title="Personal Details" onClose={onDone}>
      <Box component="form" noValidate autoComplete="off">
        <div className={classes.image}>
          <img src={Image} alt="profile" className={classes.profileImage} />
          <div className={classes.formButton}>
            <div className={classes.buttonGroup}>
              <CameraAltOutlinedIcon sx={{ color: "#ed1b2f" }} />
              <Typography
                variant="body2"
                sx={{ color: "#ed1b2f", marginLeft: ".25rem" }}
              >
                Edit
              </Typography>
            </div>
            <div
              className={`${classes.buttonGroup}`}
              style={{ paddingLeft: "24px" }}
            >
              <DeleteForeverOutlinedIcon sx={{ color: "#414042" }} />
              <Typography
                variant="body2"
                sx={{ color: "#414042", marginLeft: ".25rem" }}
              >
                Delete
              </Typography>
            </div>
          </div>
        </div>

        <div className={classes.formInput}>
          <TextField
            label="Full Name"
            variant="outlined"
            className={classes.inputGroup}
          />
          <TextField
            label="Title"
            variant="outlined"
            className={classes.inputGroup}
          />
          <div className={classes.form}>
            <TextField
              label="Email address"
              type="email"
              variant="outlined"
              required
              className={classes.halfInputGroup}
            />
            <TextField
              label="Phone number"
              type="number"
              variant="outlined"
              required
              className={classes.halfInputGroup}
            />
          </div>
          <div className={classes.form}>
            <TextField
              label="Date of birth"
              type="date"
              variant="outlined"
              required
              InputLabelProps={{
                shrink: true, // Ensures the label does not overlap with the input
              }}
              className={classes.halfInputGroup}
            />

            <FormControl className={classes.halfInputGroup}>
              <InputLabel>Gender</InputLabel>
              <Select value={age} label="Gender" onChange={handleChangeGender}>
                <MenuItem value="Male">Male</MenuItem>
                <MenuItem value="Female">Female</MenuItem>
                <MenuItem value="Others">Others</MenuItem>
              </Select>
            </FormControl>
          </div>
          <div className={classes.form}>
            <FormControl className={classes.halfInputGroup}>
              <InputLabel>Current province/city</InputLabel>
              <Select
                multiple
                value={personName}
                onChange={handleChangeCity}
                input={<OutlinedInput label="City" />}
                MenuProps={MenuProps}
              >
                {cities.map((name) => (
                  <MenuItem key={name} value={name} style={getStyles(name)}>
                    {name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              label="Address (Street, district, ...)"
              variant="outlined"
              required
              className={classes.halfInputGroup}
            />
          </div>
          <TextField
            label="Personal Link"
            variant="outlined"
            className={classes.inputGroup}
          />
        </div>
      </Box>
    </Modal>
  );
}
