import Panel_css from "../Panel.module.css";
import { Typography, TextField, Card, CardContent } from "@mui/material";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemIcon from "@mui/material/ListItemIcon";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SportsGymnasticsIcon from "@mui/icons-material/SportsGymnastics";
import MessageIcon from "@mui/icons-material/Message";
import { useEffect, useState } from "react";

const SideBar = () => {
  return (
    <div className={Panel_css.sideBarContainer}>
      <Card className={Panel_css.sideBarCard}>
        <CardContent className={Panel_css.cardContent}>
          <List>
            <ListItem
              button
              style={{
                marginTop: "30px",
                borderRadius: "8px",
              }}
              className={Panel_css.listItem}
            >
              <ListItemIcon className={Panel_css.listIcon}>
                <HomeIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Customize Home Page"
                style={{
                  color: "white",
                  fontSize: "18px",
                  textAlign: "justify",
                }}
              />
            </ListItem>

            <ListItem
              button
              style={{
                marginTop: "30px",
                borderRadius: "8px",
              }}
              className={Panel_css.listItem}
            >
              <ListItemIcon className={Panel_css.listIcon}>
                <PeopleIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Manage Users"
                style={{
                  color: "white",
                  fontSize: "18px",
                  textAlign: "justify",
                }}
              />
            </ListItem>

            <ListItem
              button
              style={{
                marginTop: "30px",
                borderRadius: "8px",
              }}
              className={Panel_css.listItem}
            >
              <ListItemIcon className={Panel_css.listIcon}>
                <SportsGymnasticsIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Manage Facility"
                style={{
                  color: "white",
                  fontSize: "18px",
                  textAlign: "justify",
                }}
              />
            </ListItem>

            <ListItem
              button
              style={{
                marginTop: "30px",
                borderRadius: "8px",
              }}
              className={Panel_css.listItem}
            >
              <ListItemIcon className={Panel_css.listIcon}>
                <MessageIcon />
              </ListItemIcon>
              <ListItemText
                secondary="Manage Requests"
                style={{
                  color: "white",
                  fontSize: "18px",
                  textAlign: "justify",
                }}
              />
            </ListItem>
          </List>
        </CardContent>
      </Card>
    </div>
  );
};

export default SideBar;
