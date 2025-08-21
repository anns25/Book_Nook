import React, { useState } from 'react';
import {
  Box,
  Tabs,
  Tab,
  TextField,
  Button,
  Typography,
  Paper,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { styled } from '@mui/material/styles';
import { useAuth } from '../context/AuthProvider';
import { safeParse } from 'valibot';
import { loginSchema, signupSchema } from '../Validation/userSchema';

const StyledPaper = styled(Paper)(({ theme }) => ({
  maxWidth: 800,
  margin: 'auto',
  marginTop: theme.spacing(10),
  overflow: 'hidden',
  boxShadow: theme.shadows[6],
  borderRadius: theme.spacing(2),
  display: 'flex',
  flexDirection: 'row',
  [theme.breakpoints.down('md')]: {
    flexDirection: 'column',
    marginTop: theme.spacing(0),
    borderRadius: theme.spacing(0),
    boxShadow: theme.shadows[0],
    maxWidth: '100vw'
  },
}));

const LeftSide = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundImage:
    'url(https://images.unsplash.com/photo-1571596667548-606cf9fe27c6?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  [theme.breakpoints.down('md')]: {
    minHeight: '40vh'
  },
}));

const RightSide = styled(Box)(({ theme }) => ({
  flex: 1,
  padding: theme.spacing(6),
  backgroundColor: theme.palette.background.default,
  [theme.breakpoints.down('md')]: {
    padding: theme.spacing(3),
    minHeight: 600
  },
}));

const AuthCard = () => {

  const [tab, setTab] = useState(0);
  const [isSeller, setIsSeller] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({});

  const {login, signup } = useAuth();

  const handleTabChange = (_, newValue) => setTab(newValue);

  const handleLogin=(e) =>{
    e.preventDefault();
    const result = safeParse(loginSchema,{username, password});
    if(!result.success){
      const fieldErrors = {};
      result.issues.forEach(issue => {
        const field = issue.path?.[0].key;

        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    login(username, password);

  }

  const handleSignUp = (e) => {
    e.preventDefault();
    const result = safeParse(signupSchema, { username, password , image});
    if (!result.success) {
      const fieldErrors = {};
      result.issues.forEach(issue => {
        const field = issue.path?.[0].key;

        fieldErrors[field] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    signup(username, password, isSeller?'seller':'buyer', image);


  }

  return (
    <StyledPaper>
      <LeftSide />

      <RightSide>
        <Tabs
          value={tab}
          onChange={handleTabChange}
          textColor="primary"
          indicatorColor="secondary"
          variant="fullWidth"
          sx={{ marginBottom: 4 }}
        >
          <Tab label="Sign In" />
          <Tab label="Sign Up" />
        </Tabs>

        {tab === 0 ? (
          <>
            <Typography variant="h5" fontFamily="Playfair Display" gutterBottom>
              Welcome Back
            </Typography>
            <TextField
              fullWidth
              label="Username"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Password"
              type="password"
              variant="outlined"
              margin="normal"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleLogin}
            >
              Sign In
            </Button>
          </>
        ) : (
          <>
            <Typography variant="h5" fontFamily="Playfair Display" gutterBottom>
              Create an Account
            </Typography>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              error={Boolean(errors.username)}
              helperText={errors.username}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              type="password"
              margin="normal"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
            />
            <TextField
              fullWidth
              label="Profile Image"
              variant="outlined"
              margin="normal"
              value={image}
              onChange={(e)=>setImage(e.target.value)}
              error={Boolean(errors.image)}
              helperText={errors.image}
            />
            <Box mt={2}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={isSeller}
                    onChange={(e) => setIsSeller(e.target.checked)}
                    name="role"
                    color="primary"
                  />
                }
                label="Sign up as Seller"
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3 }}
              onClick={handleSignUp}
            >
              Sign Up
            </Button>
          </>
        )}
      </RightSide>
    </StyledPaper>
  );
};

export default AuthCard;
