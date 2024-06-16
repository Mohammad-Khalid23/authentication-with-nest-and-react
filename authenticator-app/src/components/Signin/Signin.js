import * as React from 'react';
import { useState, useEffect } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import HttpRequest from '../utils/httpRequest';
import { validateEmail } from '../utils/validator';
import {useNavigate} from 'react-router-dom'


export default function SignIn() {
const navigate = useNavigate()

    const [credentials, setCredentials] = useState({});
    const [isLoading, setLoader] = useState(false);
    const [errorMessage, setErrorMessage] = useState({
        email: '',
        password: ''
    });
    const [alert, setAlertMessage] = useState({
        type: '',
        message: ''
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        console.log('------token',token)
        if(token){
            // navigate('/');
        }
        console.log("Use effect called in Login")
    }, []);
    const handleChange = (e) => {
        setCredentials({ ...credentials, [e.target.id]: e.target.value });
    }

    const submitLogin = async (e) => {
        try {
            setLoader(true);
            e.preventDefault();
            setErrorMessage({
                email: '',
                password: ''
            });

            console.log('------credentials', credentials);

            const isFormValidated = validateFormField();

            if (isFormValidated) {
                const response = await HttpRequest('auth/signin', {}, credentials);
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

    const validateFormField = ()=>{

        const { email, password } = credentials;
        if(!email){
            return  setErrorMessage({
                ...errorMessage,
                email :"Email should not be empty"
            });
        }else{
            const isValidated = validateEmail(email);
            if(!isValidated) {
                return setErrorMessage({
                    ...errorMessage,
                    email :"Invalid email"
                });
            }
        }

        if(!password){
            return setErrorMessage({
                ...errorMessage,
                password: "Password should not be empty"
            });
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
                    Sign in
                </Typography>
                <Box component="form" onSubmit={submitLogin} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
                        onChange={handleChange}
                        error={errorMessage.email ? true : false}
                        helperText={errorMessage.email}
                    />
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        name="password"
                        label="Password"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        onChange={handleChange}
                        error={errorMessage.password ? true : false}
                        helperText={errorMessage.password}
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                        disabled={isLoading}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Button onClick={()=>navigate('/signup')}variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}