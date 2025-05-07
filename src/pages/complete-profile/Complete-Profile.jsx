import { useContext, useState, useEffect } from "react";
import s from "./Complete-Profile.module.css";
import AuthContext from "../../authentication/AuthContext";
import ClipLoader from "react-spinners/ClipLoader";
import { State, City } from "country-state-city";
import { toTitleCase } from "../../global/utilities/to-title-case";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useNavigate } from "react-router-dom";

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

const subjects = [
  "Math",
  "English",
  "Science",
  "History",
  "SAT / ACT",
  "AP / IB Courses",
  "Homework Help",
  "Study Skills",
];

const learningGoals = [
  "Improve grades",
  "Build confidence",
  "Get ahead / enrichment",
  "Prepare for a test",
  "Learn at my own pace",
];

const learningStyles = [
  "I learn best through examples and practice",
  "I prefer visual aids (diagrams, videos)",
  "I like step-by-step breakdowns",
  "I prefer real-life applications or stories",
  "I enjoy fast-paced sessions",
  "I need someone very patient",
];

const personalityMatches = [
  "Friendly and energetic",
  "Calm and encouraging",
  "Funny and relatable",
  "Super focused and efficient",
  "Open to chat and build a relationship",
  "Doesn’t matter, just someone who explains clearly",
];

const schedulingPreferences = [
  "Morning",
  "Afternoon",
  "Night",
  "Weekdays",
  "Weekends",
];

export default function CompleteProfile() {
  const { completeProfile } = useContext(AuthContext);

  let Navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    address: {
      city: "",
      state: "",
    },
    guardianName: "",
    birthDate: "",
    preferredContactMethod: "Email",
    gradeLevel: "",
    schoolName: "",
    subjectsNeeded: [],
    learningGoals: [],
    learningStyles: [],
    preferredTutors: [],
    schedulingPreferences: [],
    otherSubjects: "",
    otherGoals: "",
    otherStyles: "",
    otherMatch: "",
  });

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

  useEffect(() => {
    const usStates = State.getStatesOfCountry("US");
    setStates(usStates);
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    if (type === "checkbox") {
      const listName = name.split("_")[0];
      setFormData((prev) => {
        const updatedList = checked
          ? [...prev[listName], value]
          : prev[listName].filter((item) => item !== value);
        return { ...prev, [listName]: updatedList };
      });
    } else if (name === "state") {
      const cities = City.getCitiesOfState("US", value);
      setCities(cities);
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, state: value, city: "" },
      }));
    } else if (name === "city") {
      setFormData((prev) => ({
        ...prev,
        address: { ...prev.address, city: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);

    const formattedData = {
      ...formData,
      firstName: toTitleCase(formData.firstName),
      lastName: toTitleCase(formData.lastName),
      guardianName: toTitleCase(formData.guardianName),
      subjectsNeeded: [
        ...formData.subjectsNeeded,
        ...(formData.otherSubjects ? [formData.otherSubjects] : []),
      ],
      learningGoals: [
        ...formData.learningGoals,
        ...(formData.otherGoals ? [formData.otherGoals] : []),
      ],
      learningStyles: [
        ...formData.learningStyles,
        ...(formData.otherStyles ? [formData.otherStyles] : []),
      ],
      preferredTutors: [
        ...formData.preferredTutors,
        ...(formData.otherMatch ? [formData.otherMatch] : []),
      ],
    };

    delete formattedData.otherSubjects;
    delete formattedData.otherGoals;
    delete formattedData.otherStyles;
    delete formattedData.otherMatch;

    try {
      const result = await completeProfile(formattedData);

      if (result.successful) {
        handleSnackbar(result.message);
        setTimeout(() => {
          setLoading(false);
          Navigate("/profile/dashboard");
        }, 2000);
      }
    } catch (error) {
      setLoading(false);
      handleSnackbar("Profile completion failed. Please try again.");
    }
  };

  const birthDate = new Date(formData.birthDate);
  const ageLimit = new Date();
  ageLimit.setFullYear(ageLimit.getFullYear() - 18);

  const isUnderage = birthDate > ageLimit;

  const isFormValid =
    formData.firstName &&
    formData.lastName &&
    formData.address.city &&
    formData.address.state &&
    formData.birthDate &&
    formData.gradeLevel &&
    (!isUnderage || formData.guardianName) &&
    formData.preferredContactMethod &&
    formData.subjectsNeeded.length > 0 &&
    formData.learningGoals.length > 0 &&
    formData.learningStyles.length > 0 &&
    formData.preferredTutors.length > 0 &&
    formData.schedulingPreferences.length > 0;

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
      <div className={s.completeProfileContainer}>
        <h2>Help us get to know you better!</h2>
        <form onSubmit={handleSubmit} className={s.completeProfileForm}>
          <div className={s.nameInputs}>
            <input
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
            <input
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>

          <select
            name="state"
            value={formData.address.state}
            onChange={handleChange}
            required
          >
            <option value="">Select State</option>
            {states.map((state) => (
              <option key={state.isoCode} value={state.isoCode}>
                {state.name}
              </option>
            ))}
          </select>

          <select
            name="city"
            value={formData.address.city}
            onChange={handleChange}
            required
            disabled={!formData.address.state}
          >
            <option value="">Select City</option>
            {cities.map((city) => (
              <option key={city.name} value={city.name}>
                {city.name}
              </option>
            ))}
          </select>

          <input
            name="guardianName"
            placeholder="Guardian Name (required if under 18)"
            value={formData.guardianName}
            onChange={handleChange}
            {...(formData.birthDate <
            new Date().setFullYear(new Date().getFullYear() - 18)
              ? { required: true }
              : {})}
          />
          <input
            name="schoolName"
            placeholder="School Name (optional)"
            value={formData.schoolName}
            onChange={handleChange}
          />
          <input
            name="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={handleChange}
            required
          />

          <div>
            <label className="flex-between">
              <h3>📞 Preferred Contact Method:</h3>
            </label>
            <div className={s.contactMethodContainer}>
              {contactMethods.map((method) => (
                <label key={method}>
                  <input
                    type="radio"
                    name="preferredContactMethod"
                    value={method}
                    checked={formData.preferredContactMethod === method}
                    onChange={handleChange}
                  />
                  {method}
                </label>
              ))}
            </div>
          </div>

          <div className={s.gradeLevelContainer}>
            <label className="flex-between">
              <h3>🎓 Grade Level:</h3>
            </label>
            <select
              name="gradeLevel"
              value={formData.gradeLevel}
              onChange={handleChange}
              required
              style={{ marginTop: "0.5rem", padding: "0.5rem" }}
            >
              <option value="">Select Grade Level</option>
              {gradeLevels.map((level) => (
                <option key={level} value={level}>
                  {level}
                </option>
              ))}
            </select>
          </div>

          <div className={s.checkboxGroup}>
            <label>
              <h3>📚 Subjects Needing Help With</h3>
            </label>
            {subjects.map((subject) => (
              <label key={subject} className={s.checkBoxInput}>
                <input
                  type="checkbox"
                  name="subjectsNeeded"
                  value={subject}
                  onChange={handleChange}
                />
                {subject}
              </label>
            ))}
            <input
              type="text"
              name="otherSubjects"
              placeholder="Other"
              className={s.otherInput}
              value={formData.otherSubjects}
              onChange={handleChange}
            />
          </div>

          <div className={s.checkboxGroup}>
            <label>
              <h3>🎯 Learning Goals</h3>
            </label>
            {learningGoals.map((goal) => (
              <label key={goal} className={s.checkBoxInput}>
                <input
                  type="checkbox"
                  name="learningGoals"
                  value={goal}
                  onChange={handleChange}
                />
                {goal}
              </label>
            ))}
            <input
              type="text"
              name="otherGoals"
              placeholder="Other"
              className={s.otherInput}
              value={formData.otherGoals}
              onChange={handleChange}
            />
          </div>

          <div className={s.checkboxGroup}>
            <label>
              <h3>📝 Preferred Learning Style</h3>
            </label>
            {learningStyles.map((style) => (
              <label key={style} className={s.checkBoxInput}>
                <input
                  type="checkbox"
                  name="learningStyles"
                  value={style}
                  onChange={handleChange}
                />
                {style}
              </label>
            ))}
            <input
              type="text"
              name="otherStyles"
              placeholder="Other"
              className={s.otherInput}
              value={formData.otherStyles}
              onChange={handleChange}
            />
          </div>

          <div className={s.checkboxGroup}>
            <label>
              <h3>🧠 Personality Match</h3>
            </label>
            {personalityMatches.map((match) => (
              <label key={match} className={s.checkBoxInput}>
                <input
                  type="checkbox"
                  name="preferredTutors"
                  value={match}
                  onChange={handleChange}
                />
                {match}
              </label>
            ))}
            <input
              type="text"
              name="otherMatch"
              placeholder="Other"
              className={s.otherInput}
              value={formData.otherMatch}
              onChange={handleChange}
            />
          </div>

          <div className={s.checkboxGroup}>
            <label>
              <h3>📅 Scheduling Preferences</h3>
            </label>
            {schedulingPreferences.map((preference) => (
              <label key={preference} className={s.checkBoxInput}>
                <input
                  type="checkbox"
                  name="schedulingPreferences"
                  value={preference}
                  onChange={handleChange}
                />
                {preference}
              </label>
            ))}
          </div>

          {loading ? (
            <ClipLoader
              color="#41246D"
              loading={loading}
              aria-label="Loading Spinner"
              data-testid="syncloader"
              className="clip-loader center"
            />
          ) : (
            <button type="submit" disabled={!isFormValid}>
              Submit
            </button>
          )}
        </form>
      </div>
    </>
  );
}
