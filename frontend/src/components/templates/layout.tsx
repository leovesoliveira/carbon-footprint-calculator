import { Card, CardContent, Container, Typography } from "@mui/material";
import type { PropsWithChildren } from "react";

function Layout({ children }: PropsWithChildren) {
  return (
    <Container
      maxWidth="sm"
      className="w-full min-h-screen flex flex-col items-center justify-center gap-8 py-8"
    >
      <div className="flex flex-col items-center">
        <Typography
          variant="h4"
          component="h1"
          className="font-semibold leading-tight text-teal-600 text-center"
        >
          Carbon Footprint
        </Typography>

        <Typography
          variant="h5"
          component="h1"
          className="uppercase leading-tight tracking-[0.2em] text-slate-700"
        >
          Calculator
        </Typography>
      </div>

      <Card className="w-full">
        <CardContent>{children}</CardContent>
      </Card>
    </Container>
  );
}

export default Layout;
