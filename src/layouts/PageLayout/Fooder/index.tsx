import React from "react";
import { AppBar, Box } from "@mui/material";
import appColor from "@/theme/appColor";
import { TextWiget } from "@/components/typographys";

function FooterPage() {
  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: appColor.white,
        boxShadow: "none",
        top: "auto",
        bottom: 0,
      }}
    >
      <Box
        sx={{
          background: appColor.white,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 3,
          py: 1.5,
          flexWrap: "wrap",
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <img
            src="/static/cambodia.png"
            alt="Cambodia Flag"
            style={{ width: 24, height: "auto" }}
          />
          <TextWiget
            variant="body2"
            sx={{ fontWeight: 500, color: appColor.textblack }}
          >
            Cambodia
          </TextWiget>
        </Box>

        <TextWiget
          variant="body2"
          sx={{
            fontWeight: 400,
            color: appColor.textblack,
            textAlign: "center",
            flexGrow: 1,
          }}
        >
          ® 2025 SENG VICHET. All rights reserved.
        </TextWiget>
      </Box>
    </AppBar>
  );
}

export default FooterPage;
