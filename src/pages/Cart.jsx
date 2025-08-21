import React from 'react';
import { Box, Typography, IconButton, Button, Grid, Divider, Container, useMediaQuery } from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import { useTheme } from "@mui/material";
import { useCart } from '../context/CartProvider'; // adjust path as needed
import { useNavigate } from 'react-router-dom';

const Cart = () => {
    const { cartItems, dispatch } = useCart();
    const theme = useTheme();
    const navigate = useNavigate();
    const handleNavigate = () => {
        navigate(-1);
    }


    const handleRemove = (book_id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: { book_id } });
    };

    const handleQuantityChange = (book_id, quantity) => {
        if (quantity > 0) {
            dispatch({ type: 'UPDATE_ITEM', payload: { book_id, quantity } });
        }
    };

    const handleBuyNow = () => {
        alert('Proceeding to payment...');
    };

    const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Container>
            <Box p={2} sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary, minHeight: '100vh' }}>
                <Typography variant="h4" align="center" sx={{ fontFamily: theme.typography.h1.fontFamily, mb: 4 }}>
                    Cart
                </Typography>

                {cartItems.length === 0 ? (
                    <Typography align="center">Your cart is empty.</Typography>
                ) : (
                    <Grid container spacing={2} direction="column">
                        {cartItems.map((item) => (
                            <Grid key={item.book_id}>
                                <Box
                                    display="flex"
                                    flexDirection="row"
                                    alignItems={{ xs: "space-between", sm: "center" }}
                                    justifyContent="space-between"
                                    p={2}
                                    sx={{ border: '1px solid #DDD0C8', borderRadius: 2, backgroundColor: '#fff' }}
                                >
                                    <Box display="flex" alignItems="center" flex="1">
                                        <Box
                                            component="img"
                                            src={item.image}
                                            alt={item.title}
                                            sx={{ width: 70, height: 100, borderRadius: 1, mr: 2 }}
                                        />
                                        {!isSmallScreen &&
                                            (<Box>
                                                <Typography variant="subtitle1" fontWeight="bold">
                                                    {item.title}
                                                </Typography>
                                                <Typography variant="body2">{item.author}</Typography>

                                                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{item.genre}</Typography>
                                                <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                                    ★★★★☆ {item.rating}
                                                </Typography>
                                            </Box>)}
                                    </Box>
                                    <Box display="flex"
                                        flexDirection="column"
                                        sx={{ width: { xs: "50%", sm: "auto" } }}>
                                        {isSmallScreen && (<Box>
                                            <Typography variant="subtitle1" fontWeight="bold">
                                                {item.title}
                                            </Typography>
                                            <Typography variant="body2">{item.author}</Typography>

                                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>{item.genre}</Typography>
                                            <Typography variant="body2" sx={{ fontSize: '0.9rem' }}>
                                                ★★★★☆ {item.rating}
                                            </Typography>
                                        </Box>)}
                                        <Box display="flex" alignItems="center" mt={{ xs: 2 }}>
                                            <IconButton
                                                onClick={() =>
                                                    handleQuantityChange(item.book_id, item.quantity - 1)
                                                }
                                                sx={{ color: theme.palette.primary.main }}
                                            >
                                                <Remove />
                                            </IconButton>
                                            <Typography mx={1}>{item.quantity}</Typography>
                                            <IconButton
                                                onClick={() =>
                                                    handleQuantityChange(item.book_id, item.quantity + 1)
                                                }
                                                sx={{ color: theme.palette.primary.main }}
                                            >
                                                <Add />
                                            </IconButton>
                                        </Box>

                                        <Typography mx={2} fontWeight="bold">
                                            ${item.price * item.quantity}
                                        </Typography>

                                        <Button
                                            onClick={() => handleRemove(item.book_id)}
                                            variant="contained"
                                            color="secondary"
                                            sx={{ ml: { xs: 0, sm: 2 }, mt: { xs: 2}, whiteSpace: 'nowrap' }}
                                        >
                                            Remove
                                        </Button>
                                    </Box>
                                </Box>
                            </Grid>
                        ))}

                        <Grid item size={{ sm: 12}}>
                            <Box
                                p={3}
                                sx={{
                                    border: '1px solid #DDD0C8',
                                    borderRadius: 2,
                                    backgroundColor: '#fff',
                                }}
                            >
                                <Typography variant="h6" fontWeight="bold" mb={2}>
                                    Summary
                                </Typography>

                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Subtotal</Typography>
                                    <Typography>
                                        $
                                        {cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)}
                                    </Typography>
                                </Box>

                                <Box display="flex" justifyContent="space-between" mb={1}>
                                    <Typography>Shipping</Typography>
                                    <Typography>{(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0)<1000)?"$20":"FREE"}</Typography>
                                </Box>

                                <Divider sx={{ my: 1 }} />

                                <Box display="flex" justifyContent="space-between" mb={2}>
                                    <Typography fontWeight="bold">Total</Typography>
                                    <Typography fontWeight="bold">
                                        $
                                        {(cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) < 1000 )? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) + 20 : cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) }
                                    </Typography>
                                </Box>
                            </Box>
                        </Grid>


                        <Divider sx={{ my: 2 }} />

                        <Box display="flex" flexDirection={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center">
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    px: { xs: 1.5, sm: 4 },
                                    py: 1.5,
                                    mx: 2.5,
                                    my: 1.5,
                                    fontFamily: theme.typography.h2.fontFamily,
                                    fontWeight: 'bold',
                                    fontSize: { xs: '12px', sm: '15px' },
                                    width: { xs: '30%', sm: 'auto' }
                                }}
                                onClick={handleBuyNow}
                            >
                                Buy Now
                            </Button>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                sx={{
                                    borderRadius: 2,
                                    px: { xs: 1.5, sm: 4 },
                                    py: 1.5,
                                    mx: 2.5,
                                    my: 1.5,
                                    fontFamily: theme.typography.h2.fontFamily,
                                    fontWeight: 'bold',
                                    fontSize: { xs: '12px', sm: '15px' },
                                    width: { xs: '30%', sm: 'auto' }
                                }}
                                onClick={handleNavigate}
                            >
                                Go Back
                            </Button>

                        </Box>
                    </Grid>
                )}
            </Box>
        </Container>
    );
};

export default Cart;
