import s from "../styles/My-Profile.module.css";
import { PencilIcon } from "@heroicons/react/16/solid";
import { useContext, useEffect, useState } from "react";
import config from "../../../configs/config";
import axiosInstance from "../../../authentication/AxiosInstance";
import { useOutletContext } from "react-router-dom";
import AuthContext from "../../../authentication/AuthContext";
import { State, City } from "country-state-city";
import { toTitleCase } from "../../../global/utilities/to-title-case";
import InputMask from "react-input-mask";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Snackbar from "@mui/material/Snackbar";
import CloseIcon from "@mui/icons-material/Close";

const gradeLevels = [
  "1st",
  "2nd",
  "3rd",
  "4th",
  "5th",
  "6th",
  "7th",
  "8th",
  "9th",
  "10th",
  "11th",
  "12th",
  "College",
  "Adult Learner",
];
const contactMethods = ["Call", "Text", "Email"];

export default function MyProfile() {
  const { userProfile } = useOutletContext();
  const { user, logout } = useContext(AuthContext);

  const [isLoading, setIsLoading] = useState(false);

  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");

  const handleSnackbar = (message) => {
    setSnackbarMessage(message);
    setOpen(true);
  };

  const handleClose = (event, reason) => {
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [errors, setErrors] = useState({});

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    address: { city: "", state: "" },
    birthDate: "",
    preferredContactMethod: "",
    guardianName: "",
    gradeLevel: "",
    schoolName: "",
  });

  useEffect(() => {
    const usStates = State.getStatesOfCountry("US");
    setStates(usStates);
  }, []);

  useEffect(() => {
    setIsLoading(true);

    if (user && userProfile) {
      setUserData({
        firstName: userProfile.firstName || "",
        lastName: userProfile.lastName || "",
        email: user.email || "",
        phoneNumber: user.phoneNumber || "",
        address: {
          city: userProfile.address?.city || "",
          state: userProfile.address?.state || "",
        },
        birthDate: userProfile.birthDate?.slice(0, 10) || "",
        preferredContactMethod: userProfile.preferredContactMethod || "",
        guardianName: userProfile.guardianName || "",
        gradeLevel: userProfile.gradeLevel || "",
        schoolName: userProfile.schoolName || "",
      });

      setIsLoading(false);
    }
  }, [user, userProfile]);

  useEffect(() => {
    if (userData.address.state) {
      const stateCities = City.getCitiesOfState("US", userData.address.state);
      setCities(stateCities.map((c) => c.name));
    } else {
      setCities([]);
    }
  }, [userData.address.state]);

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    if (name === "city" || name === "state") {
      setUserData((prev) => ({
        ...prev,
        address: { ...prev.address, [name]: value },
      }));
    } else {
      setUserData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const validateUserData = (userData) => {
    let newErrors = {};

    // Required fields
    if (!userData.firstName.trim())
      newErrors.firstName = "First name is required";
    if (!userData.lastName.trim()) newErrors.lastName = "Last name is required";
    if (!userData.email.trim()) newErrors.email = "Email is required";
    if (!userData.phoneNumber.trim())
      newErrors.phoneNumber = "Phone number is required";
    if (!userData.birthDate) newErrors.birthDate = "Birth date is required";
    if (!userData.preferredContactMethod)
      newErrors.preferredContactMethod = "Preferred contact method is required";
    if (!userData.gradeLevel) newErrors.gradeLevel = "Grade level is required";
    if (!userData.address.state) newErrors.state = "State is required";
    if (!userData.address.city) newErrors.city = "City is required";

    // Email format
    if (
      userData.email &&
      !/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userData.email)
    ) {
      newErrors.email = "Invalid email format";
    }

    // Phone format (simple US pattern)
    if (
      userData.phoneNumber &&
      !/^\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})$/.test(
        userData.phoneNumber
      )
    ) {
      newErrors.phoneNumber = "Invalid phone number";
    }

    // Guardian name if under 18
    const age =
      new Date().getFullYear() - new Date(userData.birthDate).getFullYear();
    if (age < 18 && !userData.guardianName.trim()) {
      newErrors.guardianName = "Guardian name is required for minors";
    }

    return newErrors;
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    const newErrors = validateUserData(userData);

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      setIsLoading(false);
      return;
    }

    const formattedUserData = {
      ...userData,
      firstName: toTitleCase(userData.firstName),
      lastName: toTitleCase(userData.lastName),
      guardianName: toTitleCase(userData.guardianName),
    };

    try {
      const response = await axiosInstance.patch(
        `${config.apis.auth.base}/${config.apis.auth.endpoints.updateUser}`,
        formattedUserData
      );
      if (response.status === 200) {
        if (
          user.email !== userData.email ||
          user.phoneNumber !== userData.phoneNumber
        ) {
          handleSnackbar("Please log in again to update your credentials.");

          setTimeout(() => {
            logout();
          }, 3000);
        } else {
          handleSnackbar("Profile updated successfully");
        }
      }
    } catch (error) {
      if (error.response.data.errorDetails.code === "USER_ALREADY_EXISTS") {
        handleSnackbar(
          "Failed to update profile. Email or Phone Number already exists."
        );
      } else {
        handleSnackbar("Internal server error. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
        message={snackbarMessage}
        action={action}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      />
      <div className={s.myProfileContainer}>
        <h2 className="titleFont">My Profile</h2>
        <form onSubmit={updateProfile} className={s.profileDetailsForm}>
          <div className={s.inputsWrapper}>
            <div className={s.leftInputs}>
              {[
                {
                  label: "First Name",
                  name: "firstName",
                  type: "text",
                  required: true,
                },
                {
                  label: "Last Name",
                  name: "lastName",
                  type: "text",
                  required: true,
                },
                {
                  label: "Email",
                  name: "email",
                  type: "email",
                  required: true,
                },
                {
                  label: "Phone",
                  name: "phoneNumber",
                  type: "masked",
                  required: true,
                },
                {
                  label: "Birth Date",
                  name: "birthDate",
                  type: "date",
                  required: true,
                },
                {
                  label: "Preferred Contact Method",
                  name: "preferredContactMethod",
                  type: "select",
                  options: contactMethods,
                  required: true,
                },
              ].map(({ label, name, type, options, required }) => (
                <div key={name} className={s.inputContainer}>
                  <label className="titleFont">
                    {label} {required && <small>*</small>}
                  </label>
                  {errors[name] && (
                    <small className={s.errorText}>{errors[name]}</small>
                  )}
                  <div className={s.inputLine}>
                    {type === "select" ? (
                      <select
                        name={name}
                        value={userData[name]}
                        onChange={handleOnChange}
                        required={required ?? false}
                      >
                        <option value="">Select {label}</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : type === "masked" ? (
                      <>
                        <InputMask
                          mask="(999) 999-9999"
                          maskChar=""
                          name={name}
                          value={userData[name]}
                          onChange={handleOnChange}
                          placeholder="(123) 456-7890"
                          required={required ?? false}
                        >
                          {(inputProps) => <input {...inputProps} type="tel" />}
                        </InputMask>
                        <PencilIcon className={s.inputIcon} />
                      </>
                    ) : (
                      <>
                        <input
                          type={type}
                          name={name}
                          placeholder={`Enter your ${label.toLowerCase()}`}
                          value={userData[name]}
                          onChange={handleOnChange}
                          required={required ?? false}
                        />
                        {name === "birthDate" ? null : (
                          <PencilIcon className={s.inputIcon} />
                        )}
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className={s.rightInputs}>
              {[
                {
                  label: "Guardian Name",
                  name: "guardianName",
                  type: "text",
                  required:
                    new Date().getFullYear() -
                      new Date(userData.birthDate).getFullYear() <
                    18,
                },
                {
                  label: "Grade Level",
                  name: "gradeLevel",
                  type: "select",
                  options: gradeLevels,
                  required: true,
                },
                { label: "School Name", name: "schoolName", type: "text" },
                {
                  label: "State",
                  name: "state",
                  type: "select",
                  options: states.map((s) => s.isoCode),
                  value: userData.address.state,
                  required: true,
                },
                {
                  label: "City",
                  name: "city",
                  type: "select",
                  options: cities,
                  value: userData.address.city,
                  required: true,
                },
              ].map(({ label, name, type, options, value, required }) => (
                <div key={name} className={s.inputContainer}>
                  <label className="titleFont">
                    {label} {required && <small>*</small>}
                  </label>
                  {errors[name] && (
                    <small className={s.errorText}>{errors[name]}</small>
                  )}
                  <div className={s.inputLine}>
                    {type === "select" ? (
                      <select
                        name={name}
                        value={
                          name === "city" || name === "state"
                            ? userData.address[name]
                            : userData[name]
                        }
                        onChange={handleOnChange}
                        required={required ?? false}
                      >
                        <option value="">Select {label}</option>
                        {options.map((opt) => (
                          <option key={opt} value={opt}>
                            {opt}
                          </option>
                        ))}
                      </select>
                    ) : (
                      <>
                        <input
                          type={type}
                          name={name}
                          value={userData[name]}
                          onChange={handleOnChange}
                          placeholder={`Enter your ${label.toLowerCase()}`}
                          required={required ?? false}
                        />
                        <PencilIcon className={s.inputIcon} />
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button type="submit">Update Profile</button>
        </form>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </>
  );
}
