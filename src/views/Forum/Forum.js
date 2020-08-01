import React, {useState, useEffect, useRef} from 'react';
import Button from "../../components/CustomButtons/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, TextField} from "@material-ui/core";
import {Detail, Holder, ItemButton, Wrapper} from "../../assets/jss/material-dashboard-react/views/forumStyle";

import {API_ROOT, AUTH_HEADER} from "../../constants";

const token = JSON.parse(localStorage.getItem('TOKEN_KEY')).token;
const userName = JSON.parse(localStorage.getItem('TOKEN_KEY')).username ;
const userType = JSON.parse(localStorage.getItem('TOKEN_KEY')).userType;

function getItems(setItems) {
    //fetch(`${API_ROOT}/announcement`, {
    fetch(`${API_ROOT}/posts`, {
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

function updateItem(formData,topicId) {
    //fetch(`${API_ROOT}/announcement`, {
    return fetch(`${API_ROOT}/posts/${topicId}`, {
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
    return fetch(`${API_ROOT}/posts/user/${userName}`, {
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
function deleteItem(formData,topicId) {
//function deleteItem(formData) {
    //fetch(`${API_ROOT}/announcement`, {

    return fetch(`${API_ROOT}/posts/${topicId}`, {
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

function updateFollowUp(formData,topicId,followupId) {
    //fetch(`${API_ROOT}/announcement`, {
    return fetch(`${API_ROOT}/posts/${topicId}/comments/${followupId}`, {
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
function createFollowUp(formData,topicId) {
    return fetch(`${API_ROOT}/posts/${topicId}/comments/user/${userName}/`, {
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
function deleteFollowUp(formData,topicId,followUpId) {
    return fetch(`${API_ROOT}/posts/${topicId}/comments/${followUpId}`, {
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

function Forum() {
    const [forum, setForum] = useState([]);
    const [open, setOpen] = useState(false);
    const [holderOpen, setHolderOpen] = useState('block');
    const [buttonOpen, setButtonOpen] = useState( 'none');
    const userId = "1";
    const holder = true;
    //const manager = false;
    const [title, setTitle] = useState('');
    const [detail, setDetail] = useState('');
    const [infoTitle, setInfoTitle] = useState("");
    const [infoDetail, setInfoDetail] = useState("");
    const [infoFollowups, setInfoFollowups] = useState([]);
    const [newFollowup, setNewFollowup] = useState("");
    const mainColor = "info";
    const [forumId,setForumId] = useState("");
    const [forumUserId, setForumUserId] = useState("");

    const [editOpen, setEditOpen] = useState(false);
    const [editTitle, setEditTitle] = useState("");
    const [editDetail,setEditDetail] = useState("");

    const[editFollowOpen, setEditFollowOpen] = useState(false);
    const[editFollowText, setEditFollowText] = useState("");
    const[editFollowId, setEditFollowId ] = useState("");
    useEffect(() => {
        getItems(setForum);
    });
    return (
        <div>
            <Button color={mainColor} onClick={() => setOpen(true)}> new topic</Button>
            <Dialog open={open} onClose={() => setOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">create new topic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={title}
                        onChange={(event) => setTitle(event.target.value)}
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

                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setOpen(false)} color={mainColor}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        const formData = new FormData();
                        formData.set('title', title);
                        formData.set('detail', detail);
                        formData.set('userId', userId);
                        // console.log("test:" + title+ detail+endDate);
                        let suc = createItem(formData);
                        getItems(setForum);
                        suc ? setOpen(false) : console.log(suc);
                    }} color= {mainColor}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editFollowOpen} onClose={() => setEditFollowOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit follow up</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Follow up"
                        multiline
                        rows={4}
                        fullWidth
                        value={editFollowText}
                        onChange={(event) => setEditFollowText(event.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditFollowOpen(false)} color={mainColor}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        const formData = new FormData();
                        formData.set('text', editFollowText);
                        formData.set('followupId',editFollowId)
                        formData.set('userId', userId);
                        // console.log("test:" + title+ detail+endDate);
                        let suc = updateFollowUp(formData,forumId,editFollowId);
                        getItems(setForum);
                        suc ? setOpen(false) : console.log(suc);
                    }} color= {mainColor}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Dialog open={editOpen} onClose={() => setEditOpen(false)} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">Edit topic</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Title"
                        fullWidth
                        value={editTitle}
                        onChange={(event) => setEditTitle(event.target.value)}
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
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setEditOpen(false)} color={mainColor}>
                        Cancel
                    </Button>
                    <Button onClick={() => {
                        const formData = new FormData();
                        formData.set('title', editTitle);
                        formData.set('detail', editDetail);
                        formData.set('forumId', forumId)
                        formData.set('userId', userId);
                        console.log("test:" + editTitle+ editDetail+userId);
                        let suc = updateItem(formData,forumId);
                        getItems(setForum);
                        suc ? setOpen(false) : console.log(suc);
                    }} color= {mainColor}>
                        Save
                    </Button>
                </DialogActions>
            </Dialog>
            <Wrapper>
                <Holder style = {{display : holderOpen}}>{
                    forum.map((item) => (
                        <div>
                            <ItemButton onClick={() => {
                                setInfoTitle(item.title);
                                setInfoDetail(item.detail);
                                setInfoFollowups(item.followups);
                                setHolderOpen("none");
                                setButtonOpen("block");
                                setForumId(item.id);
                                setForumUserId(item.userId)
                            }}>{item.title}</ItemButton>
                        </div>
                    ))
                }
                </Holder>
                <div style = {{display : buttonOpen}}>
                    <ItemButton   onClick={() => {
                        setHolderOpen("block");
                        setButtonOpen("none");
                        setNewFollowup("");
                    }}>
                        back
                    </ItemButton>
                    {
                        userId === forumUserId ? <ItemButton   onClick={() => {
                            setEditTitle(infoTitle);
                            setEditDetail(infoDetail);
                            setEditOpen(true);
                        }}>
                            edit
                        </ItemButton> : <span></span>
                    }
                    {
                        userId === forumUserId ? <ItemButton   onClick={() => {
                            const formData = new FormData();
                            console.log("test:" + editTitle+ editDetail+userId);
                            let suc = deleteItem(formData,forumId);
                            getItems(setForum);
                            suc ? setOpen(false) : console.log(suc);
                            setHolderOpen("block");
                            setButtonOpen("none");
                            setNewFollowup("");
                        }}>
                            delete
                        </ItemButton> : <span></span>
                    }
                    <p></p>
                    <TextField
                        label="Title"
                        value = {infoTitle}
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        fullWidth={true}
                    /><p></p>
                    <TextField
                        label="Detail"
                        value = {infoDetail}
                        InputProps={{
                            readOnly: true,
                        }}
                        multiline
                        fullWidth={true}
                    /><p></p>
                    <Holder >{
                        infoFollowups.map((follow) => (
                            <div>
                                <TextField
                                    label="Follow up"
                                    value = {follow.text}
                                    InputProps={{
                                        readOnly: true,
                                    }}
                                    multiline
                                    fullWidth={true}
                                />
                                {
                                    follow.userId === userId ? <ItemButton onClick={()=>{
                                        setEditFollowText(follow.text);
                                        setEditFollowId(follow.followupId);
                                        setEditFollowOpen(true);
                                    }}>
                                        edit
                                    </ItemButton> : <div></div>
                                }
                                {
                                    follow.userId === userId ? <ItemButton onClick={()=>{
                                        const formData = new FormData();
                                        let suc = deleteFollowUp(formData,forumId,setEditFollowId);
                                        getItems(setForum);
                                        suc ? setOpen(false) : console.log(suc);
                                    }}>
                                        delete
                                    </ItemButton> : <div></div>
                                }
                            </div>
                        ))}
                    </Holder>
                    <TextField
                        margin="dense"
                        label="New Follow Up"
                        multiline
                        rows={3}
                        fullWidth
                        value={newFollowup}
                        onChange={(event) => setNewFollowup(event.target.value)}
                    />
                    <ItemButton   onClick={() => {
                        const formData = new FormData();
                        formData.set('text', newFollowup);
                        formData.set('forumId', forumId);
                        formData.set('userId', userId);
                        console.log("test:" + newFollowup+ forumId + userId);
                        // let suc = createItem(formData);
                        // getItems(setDashboards);
                        // suc ? setOpen(false) : console.log(suc);
                    }}>
                        Save new follow up
                    </ItemButton>

                </div>

            </Wrapper>

        </div>


    );
}

// function getItems(setItems) {
//     //fetch(`${API_ROOT}/forum`, {
//     fetch("/yama/forum")
//         .then((response) => {
//             if (response.ok) {
//                 return response.json();
//             }
//             throw new Error('Failed to load posts');
//         })
//         .then(data => {
//             setItems(data);
//         }).catch((e) => {
//         console.error(e);
//     });
// }

export default Forum;