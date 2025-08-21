import React, { useState } from 'react';
import { Box, Typography, Button, Rating, Divider, Paper } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { useNavigate, useParams } from 'react-router-dom';
import { useCart } from '../context/CartProvider';
import CartDrawer from '../components/CartDrawer';

const View = ({ books }) => {
    const theme = useTheme();

    const { id } = useParams();
    const navigate = useNavigate();

    const { dispatch } = useCart(); // ✅ get dispatch function
    const [drawerOpen, setDrawerOpen] = useState(false); // ✅ drawer toggle


    const handleNavigate = () => {
        navigate(-1);
    }



    const book = books.find(b => b.book_id === id);

    const handleAddToCart = () => {
        dispatch({ type: 'ADD_TO_CART', payload: book }); // ✅ add to cart
        setDrawerOpen(true); // ✅ open drawer
    }

    return (
        <Box
            sx={{
                backgroundColor: theme.palette.background.default,
                minHeight: '100vh',
                p: { xs: 2, md: 5 },
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <Paper
                elevation={6}
                sx={{
                    display: 'flex',
                    flexDirection: { xs: 'column', md: 'row' },
                    maxWidth: 1200,
                    width: '100%',
                    backgroundColor: theme.palette.background.default,
                    p: 4,
                    gap: 4,
                }}
            >
                {/* Book Cover */}
                <Box
                    component="img"
                    src={book.image}
                    alt={book.title}
                    sx={{
                        width: { xs: '100%', md: 300 },
                        height: 'auto',
                        objectFit: 'cover',
                        borderRadius: 2,
                        boxShadow: 4,
                    }}
                />

                {/* Book Info */}
                <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <Typography variant="h3" fontFamily={theme.typography.h1.fontFamily} color="primary.main">
                        {book.title}
                    </Typography>
                    <Typography variant="h5" fontFamily={theme.typography.h2.fontFamily} color="text.primary">
                        by {book.author}
                    </Typography>
                    <Typography variant="body1" fontFamily={theme.typography.body1.fontFamily} color="text.primary">
                        Genre: <strong>{book.genre}</strong>
                    </Typography>

                    <Rating name="read-only" value={book.rating} precision={0.1} readOnly />
                    <Typography variant="body1" color="text.primary">
                        Price: ₹{book.price}
                    </Typography>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="h6" fontWeight="bold" color="text.primary">
                        Summary
                    </Typography>
                    <Typography variant="body2" color="text.primary" fontFamily={theme.typography.body1.fontFamily}>
                        {book.summary}
                    </Typography>
                    <Box>
                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleAddToCart}
                            sx={{
                                mt: 3,
                                alignSelf: 'flex-start',
                                fontFamily: theme.typography.body1.fontFamily,
                                boxShadow: 3,
                                mr: 3,
                            }}
                        >
                            Add to Cart
                        </Button>
                        <CartDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />

                        <Button
                            variant="contained"
                            color="secondary"
                            onClick={handleNavigate}
                            sx={{
                                mt: 3,
                                alignSelf: 'flex-start',
                                fontFamily: theme.typography.body1.fontFamily,
                                boxShadow: 3,
                            }}
                        >
                            Go Back
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default View;
