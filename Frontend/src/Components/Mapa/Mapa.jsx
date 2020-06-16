import React, { useState, useEffect } from "react";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Drawer from "@material-ui/core/Drawer";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import List from "@material-ui/core/List";
import Typography from "@material-ui/core/Typography";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import { useHistory } from "react-router-dom";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import MotorcycleIcon from '@material-ui/icons/Motorcycle';
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import Container from "@material-ui/core/Container";
import PropTypes from 'prop-types';
import CircularProgress from '@material-ui/core/CircularProgress';
import Box from '@material-ui/core/Box';
import ReactMapGL, { Marker } from "react-map-gl";
import AirportShuttleIcon from '@material-ui/icons/AirportShuttle';
import AddLocationIcon from '@material-ui/icons/AddLocation';
import RoomIcon from '@material-ui/icons/Room';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Paper from "@material-ui/core/Paper";
import axios from "axios";
// function Copyright() {
//   return (
//     <Typography variant="body2" color="textSecondary" align="center">
//       {"Copyright © "}
//       <Link color="inherit" href="https://material-ui.com/">
//         Your Website
//       </Link>{" "}
//       {new Date().getFullYear()}
//       {"."}
//     </Typography>
//   );
// }

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-end",
        padding: "0 8px",
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(["width", "margin"], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: "none",
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: "relative",
        whiteSpace: "nowrap",
        width: drawerWidth,
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: "hidden",
        transition: theme.transitions.create("width", {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up("sm")]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto",
    },
    fixedHeight: {
        height: 240,
    },
    iconoActivado: {
        //color: "#07CCB9",
        backgroundColor: "#566be1",
        '&:hover': {
            background: "#8595ec",
        },
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: "flex",
        overflow: "auto",
        flexDirection: "column",
        marginTop: "5%",
    },
    bikeCard: {
        maxWidth: 300,
    },
    paperCard: {
        margin: "5%",
        display: "flex",
        flexWrap: "wrap"
    },
    paperMap: {
        padding: theme.spacing(2),
        display: "flex",
        marginTop: "5%",
        height: "70vh",
        position: "relative",
        width: "70vw",
    },
    frenoDelantero: {
        color: "#5aa8fc",
    },
    frenoTrasero: {
        color: "#4bd6cb",
    },
    filtroAceite: {
        color: "#ffd73e",
    },
    filtroAire: {
        color: "#ff8135",
    },
    llantaTrasera: {
        color: "#a9ad14",
    },
    paperList: {
        width: "60vw",
        maxWidth: 360,
    },
    largeIcon: {
        '& svg': {
            fontSize: 30
        }
    },
    textoPopup: {
        color: "#000",
    },
    buttonAgregar: {
        textAlign: "center",
        marginTop: "5%",
    },
}));

function datediff(first, second) {
    // Take the difference between the dates and divide by milliseconds per day.
    // Round to nearest whole number to deal with DST.
    return Math.round((second - first) / (1000 * 60 * 60 * 24));
};

function CircularProgressWithLabel(props) {
    return (
        <Box position="relative" display="inline-flex">
            <CircularProgress variant="static" {...props} />
            <Box
                top={0}
                left={0}
                bottom={0}
                right={0}
                position="absolute"
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                <Typography variant="caption"
                    component="div"
                    color="textSecondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    )
}

CircularProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and static variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
};

export default function InicioS() {

    const [perfilInfo, setPerfilInfo] = useState(null);

    const [markers, setMarkers] = useState([
        { longitud: -75.68356953924989, latitud: 4.82760080224331 },
        { longitud: -75.6782356807677, latitud: 4.824526940239316 },
        { longitud: -75.66993923601812, latitud: 4.845137991059463 },
        { longitud: -75.6859792892393, latitud: 4.8180158372820445 },
    ]);

    const [ubicacionActual, setUbicacionActual] = useState([])

    const [viewport, setViewport] = useState({
        latitude: 4.813415,
        longitude: -75.699704,
        width: "80vw",
        height: "85vh",
        zoom: 15,
    });

    const [opciones, setOpciones] = useState({
        mapa: true
    });


    useEffect(() => {
        navigator.geolocation.getCurrentPosition(pos => {
            setUbicacionActual([pos.coords.longitude, pos.coords.latitude]);
            setViewport({
                ...viewport,
                longitude: pos.coords.longitude,
                latitude: pos.coords.latitude
            })
        });
        axios
            .get("http://localhost:4000/api/users", {})
            .then((res) => {
                setPerfilInfo(res.data)
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    const history = useHistory();
    const classes = useStyles();
    const [open, setOpen] = useState(false);

    //Barra lateral izquierda
    const handleDrawerOpen = () => {
        setOpen(true);
    };
    const handleDrawerClose = () => {
        setOpen(false);
    };
    //////////////////////////////////////
    //Consultas (empieza en las recientes)
    ///////////////////////////////////////



    const handleLogout = () => {
        history.push("/");
    };



    ///////////////////////////////////////////////////////////
    //////////////////////////////////////////////////////////
    /////////////////////////////////////////////////////////



    return (
        <div className={classes.root}>
            <CssBaseline />
            <AppBar
                position="absolute"
                className={clsx(classes.appBar, open && classes.appBarShift)}
            >
                <Toolbar className={classes.toolbar}>
                    <IconButton
                        edge="start"
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        className={clsx(
                            classes.menuButton,
                            open && classes.menuButtonHidden
                        )}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography
                        component="h1"
                        variant="h6"
                        color="inherit"
                        noWrap
                        className={classes.title}
                    >
                        Dashboard
          </Typography>
                    <IconButton onClick={handleLogout} color="inherit">
                        <PowerSettingsNewIcon />
                    </IconButton>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                classes={{
                    paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
                }}
                open={open}
            >
                <div className={classes.toolbarIcon}>
                    <IconButton onClick={handleDrawerClose}>
                        <ChevronLeftIcon />
                    </IconButton>
                </div>
                <Divider />
                <List>
                    <ListItem
                        button
                        className={opciones.mapa ? classes.iconoActivado : null}
                        onClick={(e) => setOpciones({ mapa: true })}
                    >
                        <ListItemIcon>
                            <RoomIcon />
                        </ListItemIcon>
                        <ListItemText primary="Mapa" />
                    </ListItem>
                    <ListItem
                        button
                        className={opciones.perfil ? classes.iconoActivado : null}
                        onClick={(e) => setOpciones({ perfil: true })}
                    >
                        <ListItemIcon>
                            <AccountCircleIcon />
                        </ListItemIcon>
                        <ListItemText primary="Perfil" />
                    </ListItem>
                </List>
            </Drawer>
            <main className={classes.content}>
                <div className={classes.appBarSpacer} />


                <Container maxWidth="lg" className={classes.container}>
                    <Grid style={{ justifyContent: "center" }} container spacing={3}>
                        {
                            opciones.mapa && <ReactMapGL
                                {...viewport}
                                mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
                                onViewportChange={viewport => {
                                    setViewport(viewport);
                                }}
                                mapStyle="mapbox://styles/mapbox/streets-v11"
                            >
                                {ubicacionActual[0] && <Marker
                                    longitude={ubicacionActual[0]}
                                    latitude={ubicacionActual[1]}
                                    offsetLeft={-41}
                                    offsetTop={-65}
                                >
                                    <IconButton
                                        className={classes.largeIcon}
                                    >
                                        <AddLocationIcon color="secondary" />
                                    </IconButton>
                                </Marker>}
                                {markers.map(function (ubicacion, index) {
                                    return (<Marker key={index}
                                        longitude={ubicacion.longitud}
                                        latitude={ubicacion.latitud}
                                        offsetLeft={-41}
                                        offsetTop={-65}
                                    >
                                        <IconButton
                                            className={classes.largeIcon}
                                        >
                                            <AirportShuttleIcon color="primary" />
                                        </IconButton>
                                    </Marker>)
                                })}
                            </ReactMapGL>
                        }
                        {

                            perfilInfo && opciones.perfil && <Paper className={classes.paperCard}>
                                <List className={classes.paperList}>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText primary="Nombre(s)" secondary={perfilInfo[0].names} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText primary="Apellidos" secondary={perfilInfo[0].lastNames} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText primary="Contraseña" secondary={perfilInfo[0].password} />
                                    </ListItem>
                                    <Divider component="li" />
                                    <ListItem>
                                        <ListItemText primary="Correo electrónico" secondary={perfilInfo[0].email} />
                                    </ListItem>
                                    <ListItem>
                                        <ListItemText primary="Teléfono" secondary={perfilInfo[0].cellPhone} />
                                    </ListItem>
                                </List>
                            </Paper>
                        }

                    </Grid>
                </Container>
            </main>
        </div>
    );
}
