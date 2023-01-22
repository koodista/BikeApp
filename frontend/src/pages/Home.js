import * as React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import DataTableMay from "../components/DataTableMay";
import DataTableJune from "../components/DataTableJune";
import DataTableJuly from "../components/DataTableJuly";
import DataTableStations from "../components/DataTableStations";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

export default function BasicTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={value}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label="Bike journeys May" {...a11yProps(0)} />
          <Tab label="Bike journeys June" {...a11yProps(1)} />
          <Tab label="Bike journeys July" {...a11yProps(2)} />
          <Tab label="Bike stations" {...a11yProps(3)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <DataTableMay />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <DataTableJune />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <DataTableJuly />
      </TabPanel>
      <TabPanel value={value} index={3}>
        <DataTableStations />
      </TabPanel>
    </Box>
  );
}
