import Panel_css from "./Panel.module.css";

import SideBar from "./Component/SideBar";
import Container from "./Component/ContentCard";

import Grid from "@mui/material/Unstable_Grid2"; // Grid version 2

const Panel = () => {
  return (
    <div>
      <div className={Panel_css.content}>
        <div className={Panel_css.container}>
          <div className={Panel_css.body}>
            <Grid
              container
              spacing={2}
              columns={16}
              sx={{ margin: "0" }}
              className={Panel_css.containerGrid}
            >
              <Grid xs={4} className={Panel_css.sideBarGrid}>
                <SideBar />
              </Grid>
              <Grid xs={12}>
                <Container />
              </Grid>
            </Grid>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Panel;
