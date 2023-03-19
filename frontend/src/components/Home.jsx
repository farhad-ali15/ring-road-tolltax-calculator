import React from "react";
import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Grid } from "@mui/material";
import { Typography } from "@mui/material";
import axios from "axios";

const Home = () => {
  const [tollTax, setTollTax] = useState(0);
  const validationSchema = Yup.object().shape({
    entryPoint: Yup.string().required("Entry point is required"),
    exitPoint: Yup.string().required("Exit point is required"),
    dayOfWeek: Yup.string().required("Day of week is required"),
    numberPlate: Yup.string()
      .matches(
        /^[A-Za-z]{3}-[0-9]{3}$/,
        "Invalid number plate format. Please enter in the format (LLL-NNN)"
      )
      .required("Number plate is required"),
  });

  const formik = useFormik({
    initialValues: {
      entryPoint: "",
      exitPoint: "",
      dayOfWeek: "",
      numberPlate: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values, { setSubmitting, setStatus }) => {
      const obj = {
        entryPoint: formik.values.entryPoint,
        exitPoint: formik.values.exitPoint,
        dayOfWeek: formik.values.dayOfWeek,
        numberPlate: formik.values.numberPlate,
      };
      try {
        const response = await axios.post(
          "http://localhost:8000/calculate-toll",
          obj
        );

        setTollTax(response.data.tollTax);

        // alert(`Toll tax is ${tollTax}`); // display the toll amount in an alert message
        setStatus({
          success: true,
          message: "Toll tax calculated successfully",
        });
      } catch (error) {
        setStatus({ success: false, message: "Error calculating toll tax" });
        console.error(error);
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div>
      <form onSubmit={formik.handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Typography variant="h4" component="h4" align="center">
              Lahore Ring Road Toll Calculator
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="entryPoint"
              name="entryPoint"
              label="Entry Point Booth"
              variant="outlined"
              value={formik.values.entryPoint}
              onChange={formik.handleChange}
              error={
                formik.touched.entryPoint && Boolean(formik.errors.entryPoint)
              }
              helperText={formik.touched.entryPoint && formik.errors.entryPoint}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="exitPoint"
              name="exitPoint"
              label="Exit Point Booth"
              variant="outlined"
              value={formik.values.exitPoint}
              onChange={formik.handleChange}
              error={
                formik.touched.exitPoint && Boolean(formik.errors.exitPoint)
              }
              helperText={formik.touched.exitPoint && formik.errors.exitPoint}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="dayOfWeek"
              name="dayOfWeek"
              label="Day of Week"
              variant="outlined"
              value={formik.values.dayOfWeek}
              onChange={formik.handleChange}
              error={
                formik.touched.dayOfWeek && Boolean(formik.errors.dayOfWeek)
              }
              helperText={formik.touched.dayOfWeek && formik.errors.dayOfWeek}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="numberPlate"
              name="numberPlate"
              label="Number Plate (LLL-NNN)"
              variant="outlined"
              value={formik.values.numberPlate}
              onChange={formik.handleChange}
              error={
                formik.touched.numberPlate && Boolean(formik.errors.numberPlate)
              }
              helperText={
                formik.touched.numberPlate && formik.errors.numberPlate
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Calculate Toll
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>{tollTax !== 0 ? `Your toll tax is ${tollTax}` : 0}</div>
    </div>
  );
};

export default Home;
