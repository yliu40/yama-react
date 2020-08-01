import React, {useState, useEffect, useRef} from 'react';
import {TextField, Dialog, DialogActions, DialogContent, DialogTitle} from "@material-ui/core";
import {
    ItemButton
} from "../../assets/jss/material-dashboard-react/views/dashboardStyle"
import {API_ROOT, AUTH_HEADER} from "../../constants";
import {func} from "prop-types";
import Card from "components/Card/Card.js";
import Button from "../../components/CustomButtons/Button";
import CardHeader from "../../components/Card/CardHeader";
import CardBody from "../../components/Card/CardBody";
import GridItem from "components/Grid/GridItem.js";
import GridContainer from "components/Grid/GridContainer.js";

const token = JSON.parse(localStorage.getItem('TOKEN_KEY')).token;
const userName = JSON.parse(localStorage.getItem('TOKEN_KEY')).username ;
const userType = JSON.parse(localStorage.getItem('TOKEN_KEY')).userType;
function getItems(setItems) {
    //fetch(`${API_ROOT}/announcement`, {
    fetch(`${API_ROOT}/announcement`, {
        method: 'GET',
        headers: {
            'Authorization': `${AUTH_HEADER} ${token}`,
        },

    })
        .then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Failed to load posts');
        })
        .then(data => {
            setItems(data);
        }).catch((e) => {
        console.error(e);
    });
}

function updateItem(formData,announcementId) {
    //fetch(`${API_ROOT}/announcement`, {
    return fetch(`${API_ROOT}/announcement/${announcementId}`, {
        method: 'PUT',
        headers: {
            'Authorization': `${AUTH_HEADER} ${token}`,
            'Access-Control-Request-Methods': "POST, GET, OPTIONS, DELETE, PUT",
            "Content-Type":  "application/json"
        },
        body: formData,
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Failed to update")
    }).then(data => {
        console.log(data);
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    })

}

function createItem(formData) {
    console.log(formData);
    //fetch(`${API_ROOT}/announcement`, {
    return fetch(`${API_ROOT}/announcement`, {
        method: 'POST',
        headers: {
            'Authorization': `${AUTH_HEADER} ${token}`,
            'Access-Control-Request-Methods': "POST, GET, OPTIONS, DELETE, PUT",
            "Content-Type":  "application/json"
        },
        body: formData,
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Failed to create")
    }).then(data => {
        console.log(data);
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    })

}
function deleteItem(formData,announcementId) {
//function deleteItem(formData) {
    //fetch(`${API_ROOT}/announcement`, {

    return fetch(`${API_ROOT}/announcement/${announcementId}`, {
        method: 'Delete',
        headers: {
            'Authorization': `${AUTH_HEADER} ${token}`,
            'Access-Control-Request-Methods': "POST, GET, OPTIONS, DELETE, PUT",
            "Content-Type":  "application/json"
        },
        body: formData,
    }).then(response => {
        if (response.ok) {
            return response.json();
        }
        throw new Error("Failed to delete")
    }).then(data => {
        console.log(data);
        return true;
    }).catch(err => {
        console.log(err);
        return false;
    })
}

function DashBoard() {
    //const defaultEndDay = "2020-07-30";
    let date = new Date();

    // console.log("day test:"+date.getFullYear() + "-" + (date.getMonth() + 1) + "-" +date.getDate());
    //console.log("day test:"+date.getDate());
    let defaultEndDay = "";
    if (date.getMonth() < 10) {
        defaultEndDay = date.getFullYear() + "-0" + (date.getMonth() + 1);
    } else {
        defaultEndDay = date.getFullYear() + "-" + (date.getMonth() + 1);
    }
    if (date.getDate() < 10) {
        defaultEndDay = defaultEndDay + "-0" + date.getUTCDate();
    } else {
        defaultEndDay = defaultEndDay + "-" + date.getUTCDate();
    }
    console.log("day test:" + defaultEndDay);
    const [dashboards, setDashboards] = useState([]);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDetail, setEditDetail] = useState("");
    const [editEndDate, setEditEndDate] = useState("");
    const [announcementId,setAnnouncementId] = useState("");
    const manager = userType === "Admin" ? true : false;
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [endDate, setEndDate] = useState(defaultEndDay);
    const [info, setInfo] = useState('');
    const test = useRef(null)
    const mainColor = "info";
    const userId = "1";
    useEffect(() => {
        getItems(setDashboards);
    });
    return (
        <div>
            {
                manager ? <Button color={mainColor} onClick={() => setOpen(true)}>create</Button> : <p></p>
            }
            <Dialog open={openEdit} onClose={() => setOpenEdit(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit dashboard</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={editTitle}
                        //inputProps={{ ref: input => this.test = input}}
                        required
                        onChange={(event) => setEditTitle(event.target.value)}
                        //onChange={(event) => console.log("test:"+ test.current)}
                    />
                    <TextField
                        margin="dense"
                        label="detail"
                        multiline
                        rows={4}
                        fullWidth
                        value={editDetail}
                        onChange={(event) => setEditDetail(event.target.value)}
                    />

                    <TextField
                        label="EndDisplayDay"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={editEndDate}
                        onChange={(event) => setEditEndDate(event.target.value)}
                    />
                    <p>{info}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setInfo("");
                        setOpenEdit(false);
                    }} color={mainColor}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (editTitle == "") {
                            setInfo("*Title is required!")
                        } else {
                            const formData = new FormData();
                            formData.set('title', editTitle);
                            formData.set('detail', editDetail);
                            formData.set('endDate', editEndDate);
                            formData.set('userId', userId);
                            formData.set('userName', userName);
                            let suc = updateItem(formData, announcementId);
                            suc ? setOpenEdit(false) : console.log(suc);
                        }

                    }} color={mainColor}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">create dashboard</DialogTitle>
                <DialogContent>

                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        //inputProps={{ ref: input => this.test = input}}
                        required
                        onChange={(event) => setTitle(event.target.value)}
                        //onChange={(event) => console.log("test:"+ test.current)}
                    />
                    <TextField
                        margin="dense"
                        label="detail"
                        multiline
                        rows={4}
                        fullWidth
                        value={detail}
                        onChange={(event) => setDetail(event.target.value)}
                    />

                    <TextField
                        label="EndDisplayDay"
                        type="date"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={endDate}
                        onChange={(event) => setEndDate(event.target.value)}
                    />
                    <p>{info}</p>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => {
                        setOpen(false);
                        setEndDate(defaultEndDay);
                        setDetail("");
                        setTitle("");
                        setInfo("");
                    }} color={mainColor}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        if (title == "") {
                            setInfo("*Title is required!")
                        } else {
                            const formData = new FormData();
                            formData.set('title', title);
                            formData.set('detail', detail);
                            formData.set('endDate', endDate);
                            formData.set('userId', userId);
                            formData.set('userName', userName);
                            console.log("test:" + title + detail + endDate);
                            let suc = createItem(formData);
                            setEndDate(defaultEndDay);
                            setDetail("");
                            setTitle("");
                            setInfo("");
                            suc ? setOpen(false) : console.log(suc);
                        }

                    }} color={mainColor}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <GridContainer spacing={2}>
                {
                    dashboards.map((item) => (

                        <GridItem xs={12} sm={6} md={3}>
                            <Card>
                                <CardHeader color={mainColor}>
                                    <p>{item.title}</p>
                                </CardHeader>

                                <CardBody>
                                    {/*<h4>{item.title}</h4>*/}
                                    <p>{item.detail}</p>
                                    {
                                        manager ? <ItemButton onClick={() => {
                                            setEditTitle(item.title);
                                            setEditDetail(item.detail);
                                            setEditEndDate(item.endDate);
                                            setAnnouncementId(item.announcementId)
                                            console.log("dddd:" + item.endDate)
                                            setOpenEdit(true)
                                        }}>
                                            edit
                                        </ItemButton> : <p></p>
                                    }
                                    {
                                        manager ? <ItemButton onClick={() => {
                                            const formData = new FormData();
                                            // formData.set('announcementId', item.announcementId);
                                            // formData.set('userId', userId);
                                            //formData.set('userName', userName);
                                            //let suc = deleteItem(formData);
                                            let suc = deleteItem(formData,item.announcementId);
                                            getItems(setDashboards);
                                            suc ? console.log("success") : console.log("Failed");
                                        }}>
                                            delete
                                        </ItemButton> : <p></p>
                                    }
                                </CardBody>
                            </Card>
                        </GridItem>

                    ))
                }
            </GridContainer>
        </div>
    );
}

export default DashBoard;