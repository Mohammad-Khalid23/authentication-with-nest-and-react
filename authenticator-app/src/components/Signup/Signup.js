// import { useState } from 'react';
// import { TextField, Container, Button } from '@mui/material'
// import HttpRequest from '../utils/httpRequest';

// export default function Signup(){
//     const [credentials,setCredentials]=useState({});

//     const handleChange = (e)=>{
//         setCredentials({...credentials,[e.target.id]:e.target.value});
//     }

//     const submitSignup= async(e)=>{
//         try {
//             console.log('------credentials', credentials);
//          const response =  await HttpRequest('auth/register',{},credentials);
// console.log("----------response",response)

//         } catch (error) {
//             console.log('-------------_ERROR', error);
//         }

//     }


//     return(
//         <form className="mt-8 space-y-6">
//         <TextField id="name" onChange={handleChange} label="Name" variant="outlined" />
//         <TextField id="email" onChange={handleChange} label="Email" variant="outlined" />
//         <TextField id="password" onChange={handleChange} label="Password" variant="outlined" />
//         <Button onClick={submitSignup} variant="contained">Login</Button>       

//       </form>
//     )
// }

import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Alert from '@mui/material/Alert';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import InputAdornment from '@mui/material/InputAdornment';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useNavigate } from 'react-router-dom';
import HttpRequest from '../utils/httpRequest';
import { validatePassword, validateEmail } from '../utils/validator';


export default function SignUp() {
    const navigate = useNavigate()

    const [credentials, setCredentials] = useState({});
    const [isLoading, setLoader] = useState(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [errorMessage, setErrorMessage] = useState({
        name: '',
        email: '',
        password: ''
    });

    const [alert, setAlertMessage] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('------token', token)
        if (token) {
            // navigate('/');
        }
        console.log("Use effect called in Login")
    }, [errorMessage]);
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleSubmit = async (e) => {
        try {
            setLoader(true);
            e.preventDefault();

            setErrorMessage({
                name: '',
                email: '',
                password: ''
            });

            const isFormValidated = validateFormField();

            if (isFormValidated) {
                const response = await HttpRequest('auth/signup', {}, credentials);
                console.log("----------response", response)

                if (response?.status === 200 && response?.data) {
                    setAlertMessage({
                        type: 'success',
                        message: "Succesfully signup"
                    })
                    localStorage.setItem('token', response?.data?.token);
                    navigate('/')
                } else if (response.message) {
                    setAlertMessage({
                        type: 'error',
                        message: response.message[0]
                    })
                } else {
                    setAlertMessage({
                        type: 'error',
                        message: response.error
                    })
                }
            }
            setLoader(false);

        } catch (error) {
            setLoader(true);
        }
    }


    const validateFormField = () => {

        const { name, email, password } = credentials;


        setErrorMessage({
            name: '',
            email: '',
            password: ''
        });
        if (!name) {
            return setErrorMessage({
                ...errorMessage,
                name: "Name should not be empty"
            });
        }

        if (!email) {
            return setErrorMessage({
                ...errorMessage,
                email: "Email should not be empty"
            });
        } else {
            const isValidated = validateEmail(email);
            if (!isValidated) {
                return setErrorMessage({
                    ...errorMessage,
                    email: "Invalid email"
                });
            }
        }

        if (!password) {
            return setErrorMessage({
                ...errorMessage,
                password: "Password should not be empty"
            });
        } else {
            const isValidated = validatePassword(password);
            if (!isValidated) {
                return setErrorMessage({
                    ...errorMessage,
                    password: "Password must contain 1 letter, 1 number, 1 special charcater and minimum 8 character"
                });
            }
        }

        return true;
    }


    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Sign up
                </Typography>
                <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="given-name"
                                name="Name"
                                required
                                fullWidth
                                id="name"
                                label="Name"
                                autoFocus
                                onChange={handleChange}
                                error={errorMessage.name ? true : false}
                                helperText={errorMessage.name}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                onChange={handleChange}
                                error={errorMessage.email ? true : false}
                                helperText={errorMessage.email}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                label="Password"
                                id="password"
                                autoComplete="new-password"
                                onChange={handleChange}
                                error={errorMessage.password ? true : false}
                                helperText={errorMessage.password}
                                type={showPassword ? 'text' : 'password'}
                                endAdornment={
                                  <InputAdornment position="end">
                                    <IconButton
                                      aria-label="toggle password visibility"
                                      onClick={handleClickShowPassword}
                                    //   onMouseDown={handleMouseDownPassword}
                                      edge="end"
                                    >
                                      {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                  </InputAdornment>
                                }
                            />
                        </Grid>
                    </Grid>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign Up
                    </Button>
                    <Grid container justifyContent="flex-end">
                        <Grid item>
                            <Button onClick={() => navigate('/signin')} variant="body2">
                                Already have an account? Sign in
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
            <Alert severity={alert.type}>{alert.message}.</Alert>
        </Container>
    );
}