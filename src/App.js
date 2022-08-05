import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";
import Collapse from "@mui/material/Collapse";

//import material ui stuffes
import AppBar from "@mui/material/AppBar";
import { Box, Grid, Paper } from "@mui/material";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import { Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { UserProfile } from "./components/UserProfile";

import Dashboard from "./components/Dashboard";
import GrapesJsEditor from "./components/GraphJsEditor";
import AdminPage from "./components/Admin";

import config from "./config";

import Create from "./components/Dashboard/Create";

const App = () => {
  const [tabIndex, setTabIndex] = React.useState(
    localStorage.getItem("tabIndex") !== null
      ? parseInt(localStorage.getItem("tabIndex"))
      : 0
  );
  const [collapseNavbar, setcollapseNavbar] = React.useState(false);
  const [isAdmin, setIsAdmin] = React.useState(0);

  const handleTabIndexChange = (event, newIndex) => {
    localStorage.setItem("tabIndex", newIndex);
    setTabIndex(newIndex);
  };

  axios.get(config.SERVER_URL + `/api/admin/is_admin`).then((res) => {
    if (res.data.isAdmin) {
      setIsAdmin(1);
    }
    console.log("is admin: ", isAdmin);
  });

  return (
    <div className="App">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" sx={{ flexGrow: 1, minHeight: 80 }}>
          {" "}
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
              onClick={() => {
                setcollapseNavbar(!collapseNavbar);
                console.log("icon clicked!");
              }}
            >
              <MenuIcon />
            </IconButton>

            <Typography
              //   onClick={handleClickOpen}
              variant="h5"
              component="div"
              // component={Link}
              to="/"
              noWrap
              sx={{
                mr: 2,
                display: { xs: "none", md: "flex" },
                fontFamily: "monospace",
                fontWeight: 800,
                color: "inherit",
                textDecoration: "none",
              }}
            >
              Carbon Project
            </Typography>
            <IconButton
              component={Link}
              to="/user"
              style={{ margin: "20px", marginLeft: "70%" }}
            >
              <AccountCircleIcon
                style={{
                  margin: "-13px",
                  width: "60px",
                  height: "60px",
                }}
              >
                User
              </AccountCircleIcon>
            </IconButton>
            {/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography
            variant="h6"
            sx={{
              color: "white",
            }}
          >
            {" "}
            ad
          </Typography>
        </Grid>
        {collapseNavbar ? null : (
          <Route path="/">
            <Grid item xs={2}>
              <Tabs
                value={tabIndex}
                onChange={handleTabIndexChange}
                orientation="vertical"
              >
                <Grid container justifyContent="center">
                  <Create />
                </Grid>
                <Tab
                  icon={<DashboardIcon />}
                  label="Dashboard"
                  component={Link}
                  to="/"
                />
                {isAdmin ? (
                  <Tab
                    icon={<AdminPanelSettingsIcon />}
                    label="Administrator"
                    component={Link}
                    to="/admin/adminProjects"
                  />
                ) : null}
              </Tabs>
            </Grid>
          </Route>
        )}

        <Grid item xs={9}>
          <Switch>
            <Route exact path="/" component={Dashboard} />
            <Route path="/edit/:id" component={GrapesJsEditor} />
            <Route path="/admin" component={AdminPage} />
            <Route path="/user" component={UserProfile} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default hot(App);
