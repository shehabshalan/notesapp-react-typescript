import { makeStyles } from "@material-ui/core";
import React from "react";

import {
  Typography,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Drawer,
  AppBar,
  Toolbar,
  Avatar,
} from "@material-ui/core";
import { AddCircleOutlined, SubjectOutlined } from "@material-ui/icons";
import { useHistory, useLocation } from "react-router-dom";
import { format } from "date-fns";
const drawerWidth = 240;
// List = ul
// ListItem = li

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: "#f9f9f9",
      width: "100%",
      padding: theme.spacing(3),
    },
    drawer: {
      width: drawerWidth,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    root: {
      display: "flex",
    },
    active: {
      background: "#f4f4f4",
    },
    title: {
      padding: theme.spacing(2),
      textAlign: "center",
    },
    appbar: {
      width: `calc(100% - ${drawerWidth}px)`,
    },
    toolbar: theme.mixins.toolbar,
    appname: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
    },
  };
});
const Layout = ({ children }: { children: any }) => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const menuItems = [
    {
      text: "My Notes",
      icon: <SubjectOutlined color="secondary" />,
      path: "/",
    },
    {
      text: "Create Notes",
      icon: <AddCircleOutlined color="secondary" />,
      path: "/create",
    },
  ];
  return (
    <div className={classes.root}>
      {/* app bar */}
      <AppBar className={classes.appbar} elevation={0}>
        <Toolbar>
          <Typography className={classes.appname}>
            Welcome to <b>NOTED</b> {/* {format(new Date(), 'do MMMM Y')} */}
          </Typography>
          <Typography>Shehab</Typography>
          <Avatar src="/original.jpg" className={classes.avatar} />
        </Toolbar>
      </AppBar>
      {/* side drawer */}
      <Drawer
        className={classes.drawer}
        variant="permanent"
        anchor="left"
        classes={{ paper: classes.drawerPaper }}
      >
        <div>
          <Typography variant="h5" className={classes.title}>
            NOTED
          </Typography>
        </div>

        {/* list / links */}

        <List>
          {menuItems.map((item: any) => (
            <ListItem
              key={item.text}
              button
              onClick={() => history.push(item.path)}
              className={location.pathname == item.path ? classes.active : ""}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>
      <div className={classes.page}>
        <div className={classes.toolbar}></div>
        {children}
      </div>
    </div>
  );
};

export default Layout;
