/* eslint-disable no-unused-vars */
import React, { useState } from 'react'
import { useFormik } from "formik";
import * as yup from "yup";
import { Select, TextField, FormLabel, FormControl, InputLabel, MenuItem, RadioGroup, FormControlLabel, Radio, Box, Button, ButtonBase } from "@mui/material";
import dayjs from 'dayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import "./form.css";
function Form() {
    const [color, setColor] = useState('#d63c3c');

    const [portfolioAsk, setPortfolioAsk] = useState(dayjs());
    const [start, setStart] = useState(dayjs());
    const [targetCompletion, setTargetCompletion] = useState(dayjs());

    const validationSchema = yup.object({
        title: yup.string().required("Required"),
        state: yup.number(),
    })

    const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
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
        },
        validationSchema,
        async onSubmit(values) {
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
            console.log(formdata);
        }

    })


    return (
        <div style={{ width: "50%" }}>
            <div>
                <h3 className='m-10'>Feature (Jira Cloud Epic)</h3>
                <h1 className='text-primary'>New Feature (Jira Cloud Epic)</h1>
            </div>
            <form className='d-flex flex-column' onSubmit={handleSubmit}>
                <FormLabel htmlFor="title">▪️Title</FormLabel>
                <TextField
                    sx={{ margin: "15px 0" }}
                    id="title"
                    name="title"
                    type="text"
                    placeholder="T"
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.title && Boolean(errors.title)}
                    helperText={touched.title && errors.title}
                />
                <InputLabel id="demo-simple-select-label">▪️State</InputLabel>
                <FormControl fullWidth sx={{ margin: "15px 0" }}>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.state}
                        onChange={handleChange}
                        name='state'
                    >
                        <MenuItem value={0}>0 - Pending Approval</MenuItem>
                        <MenuItem value={1}>1 - Ready To Start</MenuItem>
                        <MenuItem value={2}>2 - In Progress</MenuItem>
                        <MenuItem value={3}>3 - Dev Complete</MenuItem>
                        <MenuItem value={4}>4 - Test Complete</MenuItem>
                        <MenuItem value={5}>5 - Accepted</MenuItem>
                    </Select>
                </FormControl>
                <FormLabel htmlFor="title">▪️Description</FormLabel>
                <TextField
                    sx={{ margin: "10px 0" }}
                    id="description"
                    name="description"
                    type="text"
                    placeholder="T"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.description && Boolean(errors.description)}
                    helperText={touched.description && errors.description}
                />
                <div style={{ margin: "15px 0" }} className='d-flex flex-row sel'>
                    <div style={{ width: "30%", marginRight: "10px" }}>
                        <InputLabel id="demo-simple-select-label">Type</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.type}
                                onChange={handleChange}
                                name='type'
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
                                name='mmf'
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                    <div className='m-10' style={{ width: "30%" }}>
                        <InputLabel id="demo-simple-select-label">Blocked</InputLabel>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={values.blocked}
                                onChange={handleChange}
                                name='blocked'
                            >
                                <MenuItem value={true}>Yes</MenuItem>
                                <MenuItem value={false}>NO</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <InputLabel id="demo-simple-select-label">▪️Primary Product Area</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.ppa}
                        onChange={handleChange}
                        name='ppa'
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
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.qeplan}
                        onChange={handleChange}
                        name='qeplan'
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>

                <InputLabel id="demo-simple-select-label">Release</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.release}
                        onChange={handleChange}
                        name='release'
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <InputLabel id="demo-simple-select-label">T-shirt</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.tShirt}
                        onChange={handleChange}
                        name='tshirt'
                    >
                        <MenuItem value={1}>Ten</MenuItem>
                        <MenuItem value={2}>Twenty</MenuItem>
                        <MenuItem value={3}>Thirty</MenuItem>
                    </Select>
                </FormControl>
                <div style={{ margin: "15px 0" }} className='d-flex flex-row'>
                    <h3>Report Color</h3>
                    <div style={{ width: "100px", height: "50px", margin: "0 10px", backgroundColor: color }} />
                    <label className='mt-10'>Select Color</label>
                    <input
                        type="color"
                        defaultValue={color}
                        onChange={(event) => { setColor(event.target.value) }}
                    />
                </div>
                <div className='d-flex flex-row sel'>
                    <div style={{ width: "30%", marginRight: "10px" }}>

                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
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
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
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
                            <DemoContainer components={['DatePicker', 'DatePicker']}>
                                <DatePicker
                                    label="Target Completion"
                                    value={targetCompletion}
                                    onChange={(newValue) => setTargetCompletion(newValue)}
                                />
                            </DemoContainer>
                        </LocalizationProvider>
                    </div>
                </div>
                <FormLabel htmlFor="title">Affected Countries</FormLabel>
                <TextField
                    sx={{ margin: "10px 0" }}
                    id="affectedCountries"
                    name="affectedCountries"
                    type="text"
                    placeholder="T"
                    value={values.affectedCountries}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.affectedCountries && Boolean(errors.affectedCountries)}
                    helperText={touched.affectedCountries && errors.affectedCountries}
                />
                <InputLabel id="demo-simple-select-label">Business Unit</InputLabel>
                <FormControl fullWidth>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={values.bu}
                        onChange={handleChange}
                        name='bu'
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
                    placeholder="T"
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
                        column
                        aria-labelledby="demo-row-radio-buttons-group-label"
                        name="test"
                        onChange={handleChange}
                        onBlur={handleBlur}
                    >
                        <FormControlLabel value="0" control={<Radio />} label="Automation" />
                        <FormControlLabel
                            value="1"
                            control={<Radio />}
                            label="Documentation"
                        />
                        <FormControlLabel value="2" control={<Radio />} label="Enablement" />
                        <FormControlLabel
                            value="3"
                            control={<Radio />}
                            label="End to End"
                        />
                        <FormControlLabel value="4" control={<Radio />} label="Performance" />
                        <FormControlLabel
                            value="5"
                            control={<Radio />}
                            label="Regression"
                        />
                    </RadioGroup>
                </FormControl>
                <div className='text-center'>
                    <Button variant="contained" type='submit' sx={{ width: "20%", margin: "10px 0" }}>
                        Submit
                    </Button>
                </div>
            </form>
        </div>
    )
}

export default Form