
import { Box, TextField, Button, Typography, IconButton, Paper, useTheme } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';
import axios from 'axios';
import { safeParse } from 'valibot';
import { useState } from 'react';

const Add = ({ onAddBook, handleDrawer }) => {

    const theme = useTheme();

    const [errors, setErrors] = useState({});

    const handleAddBook = (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);


        const formObject = {
            title: formData.get('title'),
            author: formData.get('author'),
            genre: formData.get('genre'),
            price: parseFloat(formData.get('price')),
            rating: parseFloat(formData.get('rating')),
            image: formData.get('imageUrl'),
            summary: formData.get('summary'),
        };

        //Validation

        // const result = safeParse(productSchema, formObject);


        // if (!result.success) {
        //     const fieldErrors = {};
        //     result.issues.forEach(issue => {
        //         const field = issue.path?.[0].key;

        //         fieldErrors[field] = issue.message;
        //     });
        //     setErrors(fieldErrors);

        //     return;
        // }

        axios.post('http://localhost:3000/book/add', formObject,
            // {
            //     headers: {
            //         Authorization: `Bearer ${localStorage.getItem("token")}`,
            //     }
            // }
        )
            .then(response => {
                onAddBook(response.data.data);
                toast.success("Book Added Successfully ! 🎉");
                handleDrawer(false)();
            })
            .catch(err => {
                console.log("Could not add product", err);
                toast.error("Error : Could not add product !");
            });
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'start',
                bgcolor: theme.palette.background.default,
                px: 3,
                py: 5
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    width: 300,
                    position: 'relative',
                    borderRadius: 2
                }}
            >
                {/* Close icon */}
                <IconButton
                    sx={{ position: 'absolute', top: 8, left: 8, color: 'inherit' }}
                    onClick={() => handleDrawer(false)()}
                >
                    <CloseIcon />
                </IconButton>

                <Typography variant="h6" align="center" gutterBottom sx={{ fontWeight: "bold", pb: 2 }}>
                    Add Book
                </Typography>

                <Box
                    component="form"
                    onSubmit={handleAddBook}
                    sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                >
                    <TextField
                        label="Title"
                        name="title"
                        fullWidth
                        required
                    // error={Boolean(errors.title)}
                    // helperText={errors.title}
                    />
                    <TextField
                        label="Author"
                        name="author"
                        fullWidth
                        required
                    // error={Boolean(errors.title)}
                    // helperText={errors.title}
                    />
                    <TextField
                        label="Genre"
                        name="genre"
                        fullWidth
                        required
                    // error={Boolean(errors.title)}
                    // helperText={errors.title}
                    />
                    <TextField
                        label="Price"
                        name="price"
                        fullWidth
                        required
                        type="number"
                        inputProps={{ step: 0.01, min: 0 }}
                    // error={Boolean(errors.price)}
                    // helperText={errors.price}
                    />
                    <TextField
                        label="Rating"
                        name="rating"
                        fullWidth
                        required
                        type="number"
                        inputProps={{ step: 0.1, min: 0 , max: 5}}
                    // error={Boolean(errors.price)}
                    // helperText={errors.price}
                    />
                    <TextField
                        label="Image URL"
                        name="imageUrl"
                        fullWidth
                        required
                    // error={Boolean(errors.image)}
                    // helperText={errors.image}
                    />
                    <TextField
                        label="Summary"
                        name="summary"
                        multiline
                        rows={3}
                        fullWidth
                        required
                    // error={Boolean(errors.description)}
                    // helperText={errors.description}
                    />
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"

                    >
                        Add Book
                    </Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default Add;
