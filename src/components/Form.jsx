/* eslint-disable no-unused-vars */
import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import {
    Select,
    TextField,
    FormLabel,
    FormControl,
    InputLabel,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
} from "@mui/material";
import { TextareaAutosize } from '@mui/base/TextareaAutosize';
import dayjs from "dayjs";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

// import "./form.css";
export default function AlignForm() {
    const [color, setColor] = useState("#d63c3c");
    const [portfolioAsk, setPortfolioAsk] = useState(dayjs());
    const [start, setStart] = useState(dayjs());
    const [targetCompletion, setTargetCompletion] = useState(dayjs());

    const validationSchema = yup.object({
        title: yup.string(),
        state: yup.number(),
        description: yup.string(),
        priority: yup
            .number()
            .min(1, "Priority must be between 1 and 5")
            .max(5, "Priority must be between 1 and 5"),
        ppa: yup.number(),
    });

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } =
        useFormik({
            initialValues: {
                title: "",
                state: 0,
                type: 1,
                mmf: false,
                blocked: false,
                ppa: 1,
                qeplan: 1,
                release: 1,
                tShirt: 1,
                bu: 1,
                associatedTicket: "",
                priority: 1,
            },
            validationSchema,
            async onSubmit(values) {
                let errormsg = ""
                if (values.title == "")
                    errormsg += "title";
                if (values.description == "")
                    errormsg += "description"

                if (errormsg !== "") {
                    errormsg += "not selected";
                    toast.error(errormsg, {
                        position: "top-left",
                        autoClose: 5000,
                        hideProgressBar: false,
                        closeOnClick: true,
                        pauseOnHover: true,
                        draggable: true,
                        progress: undefined,
                    });
                    return;
                }
                console.log(values);
                const formattedStart = start.format("YYYY-MM-DD");
                const formattedPortfolioAsk = portfolioAsk.format("YYYY-MM-DD");
                const formattedTargetCompletion = targetCompletion.format("YYYY-MM-DD");
                const formdata = new FormData();
                formdata.append("title", values.title);
                formdata.append("state", values.state);
                formdata.append("description", values.description);
                formdata.append("type", values.type);
                formdata.append("mmf", values.mmf);
                formdata.append("blocked", values.blocked);
                formdata.append("ppa", values.ppa);
                formdata.append("pe", values.pe);
                formdata.append("qeplan", values.qeplan);
                formdata.append("release", values.release);
                formdata.append("tShirt", values.tShirt);
                formdata.append("color", color);
                formdata.append("affectedCountries", values.affectedCountries);
                formdata.append("bu", values.bu);
                formdata.append("associatedTicket", values.associatedTicket);
                formdata.append("test", values.test);
                formdata.append("portfolioAsk", formattedPortfolioAsk);
                formdata.append("start", formattedStart);
                formdata.append("targetCompletion", formattedTargetCompletion);
                formdata.append("priority", values.priority);
                console.log(formdata);
                console.log(formdata.get("title"));
            },
        });

    return (
        <div className="p-10 m-10">
            <ToastContainer
                position="bottom-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
            <div className="mb-10 text-[#0747a6] text-3xl">
                <h3>Feature (Jira Cloud Epic)</h3>
            </div>
            <form className="d-flex flex-column w-3/5" onSubmit={handleSubmit}>
                <FormLabel htmlFor="title">
                    <span className="text-red-600">*</span>Title
                </FormLabel>
                <TextField
                    sx={{ margin: "10px 0" }}
                    id="title"
                    name="title"
                    type="text"
                    placeholder=""
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />
                <InputLabel id="demo-simple-select-label" sx={{ margin: "10px 0" }}>
                    <span className="text-red-600">*</span>State
                </InputLabel>
                <FormControl fullWidth sx={{ margin: "10px 0" }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.state}
                        onChange={handleChange}
                        name="state"
                    >
                        <MenuItem value={0}>0 - Pending Approval</MenuItem>
                        <MenuItem value={1}>1 - Ready To Start</MenuItem>
                        <MenuItem value={2}>2 - In Progress</MenuItem>
                        <MenuItem value={3}>3 - Dev Complete</MenuItem>
                        <MenuItem value={4}>4 - Test Complete</MenuItem>
                        <MenuItem value={5}>5 - Accepted</MenuItem>
                    </Select>
                </FormControl>

                <FormLabel htmlFor="title" sx={{ margin: "10px 0" }}>
                    <span className="text-red-600">*</span>Description
                </FormLabel>
                <TextareaAutosize
                    sx={{ margin: "10px 0", width: "100%", minHeight: "100px" }}
                    id="description"
                    name="description"
                    type="text"
                    placeholder=""
                    minRows={2}
                    maxRows={4}
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description} />

                <FormLabel htmlFor="title" sx={{ margin: "10px 0" }}>
                    <span className="text-red-600">*</span>Priority
                </FormLabel>
                <FormControl fullWidth>
                    <Select
                        sx={{ margin: "10px 0" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.priority}
                        onChange={handleChange}
                        name="priority"
                    >
                        <MenuItem value={1}>1</MenuItem>
                        <MenuItem value={2}>2</MenuItem>
                        <MenuItem value={3}>3</MenuItem>
                        <MenuItem value={4}>4</MenuItem>
                        <MenuItem value={5}>5</MenuItem>
                    </Select>
                </FormControl>

                <div style={{ margin: "10px 0" }} className="d-flex flex-row sel">
                    <div style={{ width: "30%", marginRight: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.type}
                                onChange={handleChange}
                                name="type"
                            >
                                <MenuItem value={1}>Not Set</MenuItem>
                                <MenuItem value={2}>Business</MenuItem>
                                <MenuItem value={3}>Enabler</MenuItem>
                                <MenuItem value={4}>Non Functional</MenuItem>
                                <MenuItem value={5}>Architecural</MenuItem>
                                <MenuItem value={6}>Supporting</MenuItem>
                                <MenuItem value={7}>Dept</MenuItem>
                                <MenuItem value={8}>Defect</MenuItem>
                                <MenuItem value={9}>Risk</MenuItem>
                            </Select>
                        </FormControl>
                    </div>

                    <div style={{ width: "30%", margin: "0 20px" }}>
                        <InputLabel id="demo-simple-select-label">MMF</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.mmf}
                                onChange={handleChange}
                                name="mmf"
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div style={{ width: "30%" }}>
                        <InputLabel id="demo-simple-select-label">Blocked</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.blocked}
                                onChange={handleChange}
                                name="blocked"
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>No</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <InputLabel id="demo-simple-select-label">
                    <span className="text-red-600">*</span>Primary Product Area
                </InputLabel>
                <FormControl fullWidth>
                    <Select
                        sx={{ margin: "10px 0" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.ppa}
                        onChange={handleChange}
                        name="ppa"
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                    </Select>
                </FormControl>
                <FormLabel htmlFor="title">Parent Epic</FormLabel>
                <TextField
                    sx={{ margin: "10px 0" }}
                    id="pe"
                    name="pe"
                    type="text"
                    placeholder="T"
                    value={values.pe}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.pe && Boolean(errors.pe)}
                    helperText={touched.pe && errors.pe}
                />
                <InputLabel id="demo-simple-select-label">Quaterly Plan</InputLabel>
                <FormControl fullWidth>
                    <Select
                        sx={{ margin: "10px 0" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.qeplan}
                        onChange={handleChange}
                        name="qeplan"
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <InputLabel id="demo-simple-select-label">Release</InputLabel>
                <FormControl fullWidth>
                    <Select
                        sx={{ margin: "10px 0" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.release}
                        onChange={handleChange}
                        name="release"
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel id="demo-simple-select-label">T-shirt</InputLabel>
                <FormControl fullWidth>
                    <Select
                        sx={{ margin: "10px 0" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.tShirt}
                        onChange={handleChange}
                        name="tshirt"
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ margin: "15px 0" }} className="d-flex flex-row">
                    {/* <h3>Report Color</h3> */}
                    <InputLabel>Report Color</InputLabel>
                    <div
                        style={{
                            width: "30px",
                            height: "30px",
                            borderRadius: "50%",
                            margin: "0 10px",
                            backgroundColor: color,
                        }}
                    />
                    {/* <label>Select Color</label> */}
                    <input
                        className="w-1/4"
                        type="color"
                        defaultValue={color}
                        onChange={(event) => {
                            setColor(event.target.value);
                        }}
                    />
                </div>
                <div className="d-flex flex-row sel">
                    <div style={{ width: "30%", marginRight: "10px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker", "DatePicker"]}>
                                <DatePicker
                                    label="Portfolio Ask"
                                    value={portfolioAsk}
                                    onChange={(newValue) => setPortfolioAsk(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div style={{ width: "30%", marginRight: "10px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker", "DatePicker"]}>
                                <DatePicker
                                    label="Start / Intiation"
                                    value={start}
                                    onChange={(newValue) => setStart(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                    <div style={{ width: "30%", marginRight: "10px" }}>
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={["DatePicker", "DatePicker"]}>
                                <DatePicker
                                    label="Target Completion"
                                    value={targetCompletion}
                                    onChange={(newValue) => setTargetCompletion(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <FormLabel className="mt-10" htmlFor="title">
                    Affected Countries
                </FormLabel>
                <TextField
                    sx={{ margin: "10px 0" }}
                    id="affectedCountries"
                    name="affectedCountries"
                    type="text"
                    placeholder="India"
                    value={values.affectedCountries}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.affectedCountries && Boolean(errors.affectedCountries)}
                    helperText={touched.affectedCountries && errors.affectedCountries}
                />
                <InputLabel id="demo-simple-select-label">Business Unit</InputLabel>
                <FormControl fullWidth>
                    <Select
                        sx={{ margin: "10px 0" }}
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.bu}
                        onChange={handleChange}
                        name="bu"
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <FormLabel htmlFor="title">Associated Ticket</FormLabel>
                <TextField
                    sx={{ margin: "10px 0" }}
                    id="associatedTicket"
                    name="associatedTicket"
                    type="text"
                    placeholder=""
                    value={values.associatedTicket}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.associatedTicket && Boolean(errors.associatedTicket)}
                    helperText={touched.associatedTicket && errors.associatedTicket}
                />
                <FormControl>
                    <FormLabel
                        className="fs-4 mt-3"
                        id="demo-row-radio-buttons-group-label"
                    >
                        Test Categories
                    </FormLabel>
                    <RadioGroup
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="test"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <FormControlLabel
                            value="0"
                            control={<Radio />}
                            label="Automation"
                        />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Documentation"
                        />
                        <FormControlLabel
                            value="2"
                            control={<Radio />}
                            label="Enablement"
                        />
                        <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="End to End"
                        />
                        <FormControlLabel
                            value="4"
                            control={<Radio />}
                            label="Performance"
                        />
                        <FormControlLabel
                            value="5"
                            control={<Radio />}
                            label="Regression"
                        />
                    </RadioGroup>
                </FormControl>
                <div className="mt-3">
                    <button
                        type="submit"
                        className="px-5 py-2.5 text-sm font-medium text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
}
