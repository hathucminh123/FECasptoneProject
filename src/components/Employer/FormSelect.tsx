import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";
import classes from "./FormSelect.module.css";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import HighlightOffOutlinedIcon from "@mui/icons-material/HighlightOffOutlined";

interface Props {
  selectedValue: string; // Remove optional for controlled component
  setSelectedValue: Dispatch<SetStateAction<string>>; // Also required
  data?: string[];
  placeholder?: string;
  padding?: boolean;
  height?: number;
  width?: number;
  text?:string
}

export default function FormSelect({
  selectedValue = "", // Ensure a default value
  setSelectedValue,
  data = [],
  placeholder = "Select Region/ Province/ City",
  padding,
  height,
  text,
  width, // Set default for clarity
}: Props) {
  const [isSelectOpen, setIsSelectOpen] = useState<boolean>(false);
  const [filteredData, setFilteredData] = useState<string[]>(data);
  const selectRef = useRef<HTMLDivElement>(null);

  // Handle dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        selectRef.current &&
        !selectRef.current.contains(event.target as Node)
      ) {
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

  const handleLocation = (data: string) => {
    setSelectedValue(data);
    setIsSelectOpen(false);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSelectedValue(value);
    // Filter the data based on the input value
    const filtered = data.filter((item) =>
      item.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredData(filtered);
    setIsSelectOpen(true); // Keep the dropdown open while typing
  };

  return (
    <div className={classes.div18} ref={selectRef}>
      {selectedValue && (
        <span className={classes.spande}>
          <i onClick={() => setSelectedValue("")}>
            <HighlightOffOutlinedIcon
              fontSize="small"
              sx={{ color: "#868d94" }}
            />
          </i>
        </span>
      )}

      <div className={classes.div19}>
        <div className={classes.div20} onClick={handleOpenSelect}>
          <ArrowDropDownIcon />
        </div>
        <div
          className={classes.div21}
          style={
            height
              ? { minHeight: `${height}px` }
              : width
              ? { width: `${width}px` }
              : height && width
              ? { minHeight: `${height}px`, width: `${width}px` }
              : undefined
          }
        >
          <div className={classes.div22}></div>
          <div className={classes.div23}></div>
          <input
            className={`${
              isSelectOpen && padding
                ? classes.inputlocationOpenPadding
                : isSelectOpen
                ? classes.inputlocationOpen
                : classes.inputlocation
            }`}
            style={isSelectOpen ? { width: "100%" } : undefined}
            type="text"
            autoComplete="off"
            placeholder={placeholder}
            tabIndex={0}
            value={selectedValue}
            onChange={handleInputChange}
          />
          {!selectedValue && !isSelectOpen ? (
            <span className={classes.spanlocation}>{placeholder}</span>
          ) : (
            <span
              className={`${
                padding ? classes.spanlocation1 : classes.spanlocation
              }`}
            >
              {selectedValue}  {text}
            </span>
          )}
          {/* {selectedValue ? (
            <span className={classes.spanlocation}>{selectedValue}</span>
          ) : (
            !isSelectOpen && (
              <span className={classes.spanlocation}>
                {placeholder || "Select Region/ Province/ City"}
              </span>
            )
          )} */}
        </div>
        {isSelectOpen && (
          <div className={classes.divselect}>
            <ul className={classes.ul}>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <li
                    onClick={() => handleLocation(item)}
                    key={index}
                    className={classes.li}
                  >
                    <span className={classes.spanselect}>
                      <span>{item} {text}</span>
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
