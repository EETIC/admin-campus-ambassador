import { useEffect, useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

const Sidebar = () => {
  const [sidebar, setSidebar] = useState(true);
  const [state, setState] = useState(false);
  // const

  // if screen width is less than 900px, sidebar will be hidden
  useEffect(() => {
    if (window.innerWidth < 900) {
      setSidebar(false);
      // console.log(sidebar)
      // console.log("Sidebar is hidden")
    } else {
      setSidebar(true);
    }
  }, []);

  const showSidebar = () => {
    setSidebar(!sidebar);
    // sidebar ? console.log("Sidebar is hidden") : console.log("Sidebar is shown")
  };

  return (
    <div className="flex">
      <div className="flex p-4 rounded-4 max-h-14 drop-shadow-lg">
        <GiHamburgerMenu
          size={50}
          onClick={() => {
            setState(!state);
          }}
        />
      </div>

      <Drawer anchor={"left"} open={state} onClose={() => setState(false)}>
        <Box
          sx={{ width: 250 }}
          role="presentation"
          onClick={() => setState(false)}
          className="sidebar w-72 bg-blue-700 flex flex-col min-h-screen h-full"
        >
          <List>
            <ListItem
              key="Dashboard"
              disablePadding
              className="sidebar__links flex flex-col mt-6"
            >
              <ListItemButton>
                <a
                  href="/"
                  className="p-3 text-xl text-slate-100 font-bold hover:bg-blue-400"
                >
                  Dashboard
                </a>
              </ListItemButton>
            </ListItem>

            <ListItem
              key="Manage CA"
              disablePadding
              className="sidebar__links flex flex-col mt-6"
            >
              <ListItemButton>
                <a
                  href="/list"
                  className="p-3 text-xl text-slate-100 font-bold hover:bg-blue-400"
                >
                  Manage CA
                </a>
              </ListItemButton>
            </ListItem>

            <ListItem
              key="Profile"
              disablePadding
              className="sidebar__links flex flex-col mt-6"
            >
              <ListItemButton>
                <a
                  href="/profile"
                  className="p-3 text-xl text-slate-100 font-bold hover:bg-blue-400"
                >
                  Profile
                </a>
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
    </div>
  );
};

export default Sidebar;
