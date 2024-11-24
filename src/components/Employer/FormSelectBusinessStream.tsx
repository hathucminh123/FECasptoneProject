import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from "react";
import classes from "./FormSelect.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

interface GetBusinessStream {
  id: number;
  businessStreamName: string;
  description: string;
}

interface Props {
  selectedValue: GetBusinessStream | null;
  setSelectedValue: Dispatch<SetStateAction<GetBusinessStream | null>>;
  data?: GetBusinessStream[];
  placeholder?: string;
  padding?: boolean;
  height?: number;
  width?: number;
  text?: string;
}

const FormSelectBusinessStream: React.FC<Props> = ({
  selectedValue,
  setSelectedValue,
  data = [],
  placeholder = "Select Region/ Province/ City",
  padding,
  height,
  text,
  width,
}) => {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const selectRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsSelectOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [selectRef]);

  const handleOpenSelect = () => {
    setIsSelectOpen(!isSelectOpen);
  };

  const handleLocation = (item: GetBusinessStream) => {
    setSelectedValue(item);
    setIsSelectOpen(false);
  };

  return (
    <div className={classes.div18} ref={selectRef}>
      {selectedValue && (
        <span className={classes.spande}>
          <i onClick={() => setSelectedValue(null)}>
            <HighlightOffOutlinedIcon fontSize="small" sx={{ color: "#868d94" }} />
          </i>
        </span>
      )}
      <div className={classes.div19}>
        <div className={classes.div20} onClick={handleOpenSelect}>
          <ArrowDropDownIcon />
        </div>
        <div
          className={classes.div21}
          style={{
            minHeight: height ? `${height}px` : undefined,
            width: width ? `${width}px` : undefined,
          }}
        >
          <input
            className={`${
              isSelectOpen && padding
                ? classes.inputlocationOpenPadding
                : isSelectOpen
                ? classes.inputlocationOpen
                : classes.inputlocation
            }`}
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            tabIndex={0}
            value={selectedValue?.businessStreamName || ""}
            readOnly
          />
          {!selectedValue && !isSelectOpen && (
            <span className={classes.spanlocation}>{placeholder}</span>
          )}
          {selectedValue && (
            <span className={`${padding ? classes.spanlocation1 : classes.spanlocation}`}>
              {selectedValue?.businessStreamName} {text}
            </span>
          )}
        </div>
        {isSelectOpen && (
          <div className={classes.divselect}>
            <ul className={classes.ul}>
              {data.length > 0 ? (
                data.map((item, index) => (
                  <li
                    onClick={() => handleLocation(item)}
                    key={index}
                    className={classes.li}
                  >
                    <span className={classes.spanselect}>
                      <span>{item.businessStreamName} {text}</span>
                    </span>
                  </li>
                ))
              ) : (
                <li className={classes.li}>
                  <span className={classes.spanselect}>
                    <span>No options found</span>
                  </span>
                </li>
              )}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}


export default FormSelectBusinessStream