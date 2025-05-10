import { useState } from "react";
import { Link } from "react-router-dom";
import List from "@mui/material/List";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Collapse from "@mui/material/Collapse";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import PersonIcon from "@mui/icons-material/Person";
import AutoStoriesIcon from "@mui/icons-material/AutoStories";
import { ListSubheader } from "@mui/material";
import EmailIcon from "@mui/icons-material/Email";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";

export default function SideNav({ courses, toggleSidebar }) {
  const [open, setOpen] = useState(true);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <List
      sx={{
        width: "100%",
        background: "#FAFAFA",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "flex-start",
        gap: "1rem",
      }}
      component="nav"
      aria-labelledby="nested-list-subheader"
    >
      <Link to="/profile/dashboard" style={{ width: "100%" }}>
        <ListItemButton
          sx={{
            width: "100%",
            pl: 5,
          }}
        >
          <ListItemIcon>
            <PersonIcon />
          </ListItemIcon>
          <ListItemText
            primary="Profile"
            sx={{
              fontSize: "1.2em",
              color: "#737373",
            }}
          />
        </ListItemButton>
      </Link>
      <Link to="/wallet" style={{ width: "100%" }}>
        <ListItemButton
          sx={{
            width: "100%",
            pl: 5,
          }}
        >
          <ListItemIcon>
            <AccountBalanceWalletIcon />
          </ListItemIcon>
          <ListItemText
            primary="Wallet"
            sx={{
              fontSize: "1.2em",
              color: "#737373",
            }}
          />
        </ListItemButton>
      </Link>
      <ListItemButton
        sx={{
          width: "100%",
          pl: 5,
        }}
        onClick={() => {
          const contactSection = document.getElementById("contact-section");
          if (contactSection) {
            contactSection.scrollIntoView({ behavior: "smooth" });
            toggleSidebar(false);
          }
        }}
      >
        <ListItemIcon>
          <EmailIcon />
        </ListItemIcon>
        <ListItemText
          primary="Contact Us"
          sx={{
            fontSize: "1.2em",
            color: "#737373",
          }}
        />
      </ListItemButton>
      <ListItemButton
        onClick={handleClick}
        sx={{
          width: "100%",
          pl: 5,
        }}
      >
        <ListItemIcon>
          <AutoStoriesIcon />
        </ListItemIcon>
        <ListItemText
          primary="Subjects"
          sx={{
            fontSize: "1.2em",
            color: "#737373",
          }}
        />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List
          component="div"
          disablePadding
          sx={{
            width: "100%",
            pl: 8,
          }}
        >
          {Object.entries(courses).map(([type, subjects]) => (
            <div key={type}>
              <ListSubheader
                sx={{
                  color: "#1A1A80",
                  fontSize: "1.5rem",
                  fontWeight: "600",
                  backgroundColor: "#FAFAFA",
                }}
              >
                {type}
              </ListSubheader>
              {subjects.map((subject) => (
                <Link
                  key={subject._id}
                  to={`/subject/${subject._id}`}
                  style={{ width: "100%" }}
                >
                  <ListItemButton sx={{ width: "100%" }}>
                    <ListItemText
                      primary={subject.title}
                      sx={{
                        color: "#151515",
                        fontSize: "1.2rem",
                        pl: 3,
                      }}
                    />
                  </ListItemButton>
                </Link>
              ))}
            </div>
          ))}
        </List>
      </Collapse>
    </List>
  );
}
