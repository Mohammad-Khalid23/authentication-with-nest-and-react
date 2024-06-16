// import { useState } from 'react';
// import { TextField, Container, Button } from '@mui/material'
// import HttpRequest from '../utils/httpRequest';

// export default function Login(){
//     const [credentials,setCredentials]=useState({});

//     const handleChange = (e)=>{
//         setCredentials({...credentials,[e.target.id]:e.target.value});
//     }

//     const submitLogin= async(e)=>{
//         try {
//             console.log('------credentials', credentials);
//          const response =  await HttpRequest('auth/login',{},credentials);
// console.log("----------response",response)

//         } catch (error) {
//             console.log('-------------_ERROR', error);
//         }

//     }


//     return(
//         <form className="mt-8 space-y-6">
//         <TextField id="email" onChange={handleChange} label="Email" variant="outlined" />
//         <TextField id="password" onChange={handleChange} label="Password" variant="outlined" />
//         <Button onClick={submitLogin} variant="contained">Login</Button>       

//       </form>
//     )
// }
import * as React from 'react';
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


export default function SignIn() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            email: data.get('email'),
            password: data.get('password'),
        });
    };

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
                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <TextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                    />
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        sx={{ mt: 3, mb: 2 }}
                    >
                        Sign In
                    </Button>
                    <Grid container>
                        <Grid item>
                            <Link href="#" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Box>
        </Container>
    );
}