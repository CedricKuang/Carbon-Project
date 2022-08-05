import { hot } from "react-hot-loader/root";
import React from "react";
import { Switch, Route, Link } from "react-router-dom";
import axios from "axios";

//import material ui stuffes
import { Box, Grid, Paper } from "@mui/material";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";

//import AdminPage from "./components/Admin";
import GroupWorkIcon from "@mui/icons-material/GroupWork";
import PeopleIcon from "@mui/icons-material/People";
import WebIcon from "@mui/icons-material/Web";
import AdminProjects from "./adminProjects";
import AdminUsers from "./adminUsers";

import config from "../../config";
import AdminSection from "./adminSections";

const AdminPage = () => {
  const [adminTabIndex, setAdminTabIndex] = React.useState(
    localStorage.getItem("adminTab") !== null
      ? parseInt(localStorage.getItem("adminTab"))
      : 0
  );
  const [isAdmin, setIsAdmin] = React.useState(0);

  const handleAdminTabIndexChange = (event, newIndex) => {
    localStorage.setItem("adminTab", newIndex);
    setAdminTabIndex(newIndex);
  };

  axios.get(config.SERVER_URL + `/api/admin/is_admin`).then((res) => {
    if (res.data.isAdmin) {
      setIsAdmin(1);
    }
    console.log("is admin: ", isAdmin);
  });

  console.log(adminTabIndex);

  return (
    <div className="AdminPage">
      <Grid container direction="row" justify="center" alignItems="stretch">
        <Grid Item xs={12}>
          <Route path="/">
            {isAdmin ? (
              <Tabs
                value={adminTabIndex}
                onChange={handleAdminTabIndexChange}
                centered
              >
                <Tab
                  icon={<WebIcon />}
                  label="Manage Projects"
                  component={Link}
                  to="/admin/adminProjects"
                />
                <Tab
                  icon={<PeopleIcon />}
                  label="Manage Users"
                  component={Link}
                  to="/admin/adminUsers"
                />
                <Tab
                  icon={<GroupWorkIcon />}
                  label="Manage Sections"
                  component={Link}
                  to="/admin/adminSections"
                />
              </Tabs>
            ) : null}
          </Route>
        </Grid>
        <Grid item xs={12}>
          <Switch>
            {/* <Route exact path="/" component={AdminPage} /> */}
            <Route path="/admin/adminProjects" component={AdminProjects} />
            <Route path="/admin/adminUsers" component={AdminUsers} />
            <Route path="/admin/adminSections" component={AdminSection} />
          </Switch>
        </Grid>
      </Grid>
    </div>
  );
};

export default hot(AdminPage);
