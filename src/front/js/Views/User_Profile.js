import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";
import LogoutIcon from '@mui/icons-material/Logout';
import { Link } from "react-router-dom";
import HeartBrokenIcon from '@mui/icons-material/HeartBroken';
import Button from '@mui/material/Button';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import LockResetIcon from '@mui/icons-material/LockReset';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import PropTypes from 'prop-types';
import Dialog from '@mui/material/Dialog';
import Alert from '@mui/material/Alert';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import CloseIcon from '@mui/icons-material/Close';
import { Modal } from "../component/modal";
import "../../styles/userProfile.css";

export const UserProfile = () => {
    const { store, actions } = useContext(Context);
    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/")
        }
    }, [])
    const [user, setUser] = useState({
        first_name: "",
        last_name: "",
        city: ""
    })
    // const user = store.user;
    const navigate = useNavigate()
    console.log(user);
    const [modalChangeData, setModalChangeData] = useState(false)
    const [modalSupport, setModalSupport] = useState(false)
    const [modalDelete, setmodalDelete] = useState(false)
    const [modalChangePasword, setModalChangePasword] = useState(false)
    if (!user) return null;
    const handleLogout = () => {
        actions.logout()
        navigate("/");
    };
    const handleDeleteAccount = (e) => {
        actions.deleteAccount(e);
    };

    const handleUpdatePassword = (e) => {
        e.preventDefault();
        const password = e.target.elements["password"].value;
        const newPassword = e.target.elements["newPassword"].value;
        console.log(e);
        actions.updatePassword(password, newPassword);
    }
    const handleChangeData = (e) => {
        e.preventDefault()
        actions.updateUser(user, setModalChangeData)
    }
    const handleChange = (e) => {
        console.log(e);
        
        setUser({
            ...user, [e.target.name]: e.target.value            
        })
    }

    useEffect(() => {
        setUser(store.user)
    }, [])

    return (
        <div className="profile-container" style={{ display: "flex", flexDirection: "column" }}>
            <img src={store.userProfilePicture} />
<<<<<<< HEAD
=======

>>>>>>> d1be3cf0866b66848956e4c11de7f8eb8c13420b
            <h1 className="profile-title">Hola {user.first_name} {user.last_name}</h1>

            {/* --------Modal para modificar los datos de perfil del usuario-------- */}

            <Modal
                className="modalUser"
                isOpen={modalChangeData} close={() => { setModalChangeData(false) }}>
                <form id="delete-form" onSubmit={handleChangeData}>
                    <input
                        name="first_name"
                        value={user.first_name}
                        type="text"
                        placeholder="Nombre"
                        onChange={handleChange}
                        requiered
                    />
                    <input
                        name="last_name"
                        value={user.last_name}
                        type="text"
                        placeholder="Apellido"
                        onChange={handleChange}
                        requiered
                    />
                    <input
                        name="city"
                        value={user.city}
                        type="text"
                        placeholder="City"
                        onChange={handleChange}
                        requiered
                    />

                    <button className="submit-button" type="submit">Confirmar</button>
                </form>
            </Modal>

            {/* --------Modal para modificar la contraseña del usuario-------- */}

            <Modal
                className="modalUser"
                isOpen={modalChangePasword} close={() => { setModalChangePasword(false) }}>
                <form id="delete-form" onSubmit={handleUpdatePassword}>
                    <input
                        name="password"
                        type="password"
                        placeholder="Ingresa tu contraseña actual"
                        requiered
                    />
                    <input
                        name="newPassword"
                        type="password"
                        placeholder="Ingresa tu nueva contraseña"
                        requiered
                    />

                    <button className="submit-button" type="submit">Confirmar cambiar contraseña</button>
                </form>
            </Modal>

            {/* --------Modal para soporte-------- */}
            <Modal
                className="modalUser"
                isOpen={modalSupport} close={() => { setModalSupport(false) }}
                title="Si necesitas ayuda, envíanos un correo a ermomageeks@gmail.com y te responderemos lo antes posible.">

            </Modal>


            {/* --------Modal para eliminar el usuario-------- */}
            <Modal
                className="modalUser"
                isOpen={modalDelete} close={() => { setmodalDelete(false) }}
                title="¿Confirmas que quieres eliminar tu cuenta? perderás todo el progreso obtenido">
                <form id="delete-form" onSubmit={handleDeleteAccount}>
                    <input
                        type="password"
                        placeholder="Ingresa tu contraseña"
                        requiered
                    />
                    <button className="submit-button" type="submit">Confirmar eliminación</button>
                </form>
            </Modal>


            <div className="profile-card">
                <div className="profile-header">
                    <div className="profile-image"></div>
                    <div className="profile-info">

                        <h5 className="profile-phrase">“Frase de perfil”</h5>
                    </div>
                </div>

<<<<<<< HEAD

            </div>

            <div className="profile-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button onClick={() => setModalChangeData(true)} className="profile-option">
                    Datos de perfil <AssignmentIndIcon sx={{ marginLeft: 1 }} />
                </Button>
=======
                <div className="profile-options" style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <Button onClick={() => setModalChangeData(true)} className="profile-option">
                    Datos de perfil <AssignmentIndIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => setModalChangePasword(true)} className="profile-option">
                    Cambiar contraseña <LockResetIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => setModalSupport(true)}>
                    Soporte <SupportAgentIcon sx={{ marginLeft: 1 }} />
                </Button>

>>>>>>> d1be3cf0866b66848956e4c11de7f8eb8c13420b

                <Button onClick={() => setModalChangePasword(true)} className="profile-option">
                    Cambiar contraseña <LockResetIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => setModalSupport(true)}>
                    Soporte <SupportAgentIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={() => setmodalDelete(true)}>
                    Eliminar cuenta <HeartBrokenIcon sx={{ marginLeft: 1 }} />
                </Button>

                <Button onClick={handleLogout}>
                    Cerrar sesión <LogoutIcon sx={{ marginLeft: 1 }} />
                </Button>

            </div>
        </div>
    );
};
