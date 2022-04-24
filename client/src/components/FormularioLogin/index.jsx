import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            width: '25ch',
        },
    },
    formulario: {
        width: '100%',
        height: '90vh',
        display: 'flex',
        flexDirection: 'column',
        gap: '10px',
        alignItems: 'center',
        justifyContent: 'center'
    },
    buttons: {
        width: '100%',
        display: 'flex',
        gap: '5px',
        justifyContent: 'center',
        marginTop: '20px'
    },
    button: {
        backgroundColor: '#ff9800',
        color: 'white',
        width: '10%',
        marginTop: '10px',
    },
    button2: {
        color: '#ff9800',
        width: '10%',
        marginTop: '10px',
    }
}));

const schema = yup.object({
    email: yup.string('is not valid').required('is required'),
    password: yup.string('is not valid').required('is required'),
}).required();

export const FormularioLogin = function ({ login }) {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const onSubmit = async data => login(data.email, data.password);

    const classes = useStyles();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.root} noValidate autoComplete="off">
            <div className={classes.formulario}>
                <h3 >Login</h3>
                <label   >E-mail</label>
                <TextField name='email' {...register("email")} id="outlined-basic" style={{ width: '30%', backgroundColor: 'white' }} size='small' label="E-mail" variant="outlined" />
                <p style={{ color: 'red' }} >{errors.email?.message}</p>
                <label >Password</label>
                <TextField name='password' {...register("password")} id="outlined-basic" style={{ width: '30%', backgroundColor: 'white' }} size='small' label="Password" variant="outlined" />
                <p style={{ color: 'red' }} >{errors.password?.message}</p>
                <div className={classes.buttons}>
                    <Button type='submit' className={classes.button} >
                        Login
                    </Button>
                    <Button className={classes.button2} >
                        register
                    </Button>
                </div>
            </div>
        </form >
    )
}