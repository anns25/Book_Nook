import React from 'react';
import {
  Drawer,
  Box,
  Typography,
  IconButton,
  Button,
  Divider,
  useMediaQuery,
  Grid,
} from '@mui/material';
import { Add, Remove, Close } from '@mui/icons-material';
import { useTheme } from '@mui/material/styles';
import { useCart } from '../context/CartProvider'; // Adjust the path
import { Link } from 'react-router-dom';

const CartDrawer = ({ open, onClose }) => {
  const { cartItems, dispatch } = useCart();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const handleQuantityChange = (book_id, quantity) => {
    if (quantity > 0) {
      dispatch({ type: 'UPDATE_ITEM', payload: { book_id, quantity } });
    }
  };

  const handleRemove = (book_id) => {
    dispatch({ type: 'REMOVE_ITEM', payload: { book_id } });
  };


  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box
        width={isSmallScreen ? '100vw' : 400}
        p={2}
        sx={{ backgroundColor: theme.palette.background.default }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h6">Your Cart ({totalItems})</Typography>
          <IconButton onClick={onClose}>
            <Close />
          </IconButton>
        </Box>

        {cartItems.length === 0 ? (
          <Typography>Your cart is empty.</Typography>
        ) : (
          <>
            {cartItems.map((item) => (
              <Box
                key={item.book_id}
                mb={2}
                p={2}
                sx={{
                  border: '1px solid #DDD0C8',
                  borderRadius: 2,
                  backgroundColor: '#fff',
                }}
              >
                <Box display="flex">
                  <Box
                    component="img"
                    src={item.image}
                    alt={item.title}
                    sx={{ width: 60, height: 90, borderRadius: 1, mr: 2 }}
                  />
                  <Box>
                    <Typography fontWeight="bold">{item.title}</Typography>
                    <Typography variant="body2">{item.author}</Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      {item.genre}
                    </Typography>
                    <Typography variant="body2" sx={{ fontSize: '0.85rem' }}>
                      ★★★★☆ {item.rating}
                    </Typography>
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
                  <Box display="flex" alignItems="center">
                    <IconButton
                      onClick={() => handleQuantityChange(item.book_id, item.quantity - 1)}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <Remove />
                    </IconButton>
                    <Typography mx={1}>{item.quantity}</Typography>
                    <IconButton
                      onClick={() => handleQuantityChange(item.book_id, item.quantity + 1)}
                      sx={{ color: theme.palette.primary.main }}
                    >
                      <Add />
                    </IconButton>
                  </Box>
                  <Typography fontWeight="bold">${item.price * item.quantity}</Typography>
                </Box>

                <Button
                  onClick={() => handleRemove(item.book_id)}
                  variant="contained"
                  color="secondary"
                  sx={{ mt: 1 }}
                  fullWidth
                >
                  Remove
                </Button>
              </Box>
            ))}

            <Grid>
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
                    {totalPrice}
                  </Typography>
                </Box>

                <Box display="flex" justifyContent="space-between" mb={1}>
                  <Typography>Shipping</Typography>
                  <Typography>{(totalPrice < 1000) ? "$20" : "FREE"}</Typography>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Box display="flex" justifyContent="space-between" mb={2}>
                  <Typography fontWeight="bold">Total</Typography>
                  <Typography fontWeight="bold">
                    $
                    {(totalPrice < 1000) ? totalPrice + 20 : totalPrice}
                  </Typography>
                </Box>
              </Box>
            </Grid>

            <Divider sx={{ my: 2 }} />

            <Box textAlign="center">
              <Typography fontWeight="bold" mb={1}>
                Total: ${totalPrice.toFixed(2)}
              </Typography>
              <Link to={`/cart`}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  sx={{ fontWeight: 'bold' }}
                >
                  Go To Cart
                </Button>
              </Link>
            </Box>
          </>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
