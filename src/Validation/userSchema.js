import { object, string, minLength, nonEmpty, url, pipe } from 'valibot';

export const loginSchema = object({
    username: pipe(string(), nonEmpty('Title is required'), minLength(3, 'Title must have at least 3 characters')),
    password: pipe(string(), nonEmpty('Price is required'), minLength(3, 'Password must be at least 3 characters')),
});

export const signupSchema = object({
    username: pipe(string(), nonEmpty('Title is required'), minLength(3, 'Title must have at least 3 characters')),
    password: pipe(string(), nonEmpty('Price is required'), minLength(3, 'Password must be at least 3 characters')),
    image: pipe(string(), nonEmpty('Image is required'), url('Must be a valid image URL'))
});




