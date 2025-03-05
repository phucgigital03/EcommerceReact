import { Alert, AlertTitle } from "@mui/material";

function Payment({ title,description }) {
  return (
    <div className="h-96 flex justify-center items-center">
      <Alert severity="warning" variant="filled" style={{ maxWidth: "400px" }}>
        <AlertTitle>{title}</AlertTitle>
        {description}
      </Alert>
    </div>
  );
}

export default Payment;
