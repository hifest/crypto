import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from '@mui/material/TextField';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

export const Converter = () => {
    const [currencyFromValue, setCurrencyFromValue] = useState('BTC');
    const [amountFromValue, setAmountFromValue] = useState('0.0003');
    const [currencyToValue, setCurrencyToValue] = useState('ETH');
    const [result, setResult] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [FIO, setFIO] = useState('');
    const [wallet, setWallet] = useState('');
    const [showSnackbar, setShowSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    useEffect(() => {
        validate();
    }, [currencyFromValue, amountFromValue, currencyToValue]);

    const validate = () => {
        if (
            currencyFromValue !== '' &&
            amountFromValue !== '' &&
            currencyToValue !== '' &&
            validateEmail(email) &&
            validatePhone(phone) &&
            validateFIO(FIO) &&
            validateWallet(wallet)
        ) {
            submit();
        } else {
            setSnackbarMessage('Please fill in all fields correctly.');
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
                setSnackbarMessage('');
            }, 5000);
        }
    };

    const multFloats = (x, y) => {
        if (String(x).length > 1 && String(y).length > 1) {
            const xP = String(x).split('.')[1].length;
            const yP = String(y).split('.')[1].length;
            const _x = x * Math.pow(10, xP);
            const _y = y * Math.pow(10, yP);
            return (_x * _y) / Math.pow(10, xP + yP);
        } else {
            return x * y;
        }
    };

    const submit = () => {
        const url = `https://min-api.cryptocompare.com/data/price?fsym=${currencyFromValue}&tsyms=${currencyToValue}`;

        fetch(url)
            .then((res) => res.json())
            .then((data) => {
                const fromText = `${amountFromValue} ${currencyFromValue}`;
                const inputAmount = parseFloat(amountFromValue);
                const dataAmount = parseFloat(data[currencyToValue]);
                const resultAmount = multFloats(inputAmount, dataAmount);
                const toText = `${resultAmount} ${currencyToValue}`;
                setResult(`${fromText} = ${toText}`);
            })
            .catch((err) => {
                console.error(err);
            });
    };

    const handleCurrencyFromChange = (event) => {
        setCurrencyFromValue(event.target.value);
    };

    const handleAmountFromChange = (event) => {
        setAmountFromValue(event.target.value);
    };

    const handleCurrencyToChange = (event) => {
        setCurrencyToValue(event.target.value);
    };

    const handeEmail = (event) => {
        setEmail(event.target.value);
    };

    const handleFIO = (event) => {
        setFIO(event.target.value);
    };

    const handlePhone = (event) => {
        setPhone(event.target.value);
    };

    const handleWallet = (event) => {
        setWallet(event.target.value);
    };

    const validateEmail = (email) => {
        // Add your email validation logic here
        return email !== '';
    };

    const validatePhone = (phone) => {
        // Add your phone validation logic here
        return phone !== '';
    };

    const validateFIO = (FIO) => {
        // Add your FIO validation logic here
        return FIO !== '';
    };

    const validateWallet = (wallet) => {
        // Add your wallet validation logic here
        return wallet !== '';
    };

    const handleCloseSnackbar = () => {
        setShowSnackbar(false);
        setSnackbarMessage('');
    };

    return (
        <>
            <form className="form">
                <div className="form-currency">
                    <div className="form-title">Отдаю</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            name="currencyFrom"
                            id="currencyFromSelect"
                            value={currencyFromValue}
                            onChange={handleCurrencyFromChange}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                        >
                            <MenuItem value="BTC">BTC</MenuItem>
                            <MenuItem value="ETH">ETH</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField
                        className="input-form"
                        id="amountFrom"
                        variant="standard"
                        name="amountFrom"
                        value={amountFromValue}
                        onChange={handleAmountFromChange}
                    />
                    <div className="form-subtext">Min: 0.0003 Max: 530 BTC</div>
                    <div className="form-subtext">1 BTC = 16.26857085 ETH</div>
                    <TextField
                        className="form-email"
                        id="email"
                        label="Email"
                        variant="standard"
                        type="email"
                        value={email}
                        onChange={handeEmail}
                    />
                    <TextField
                        id="phone"
                        label="Телефон"
                        variant="standard"
                        type="phone"
                        value={phone}
                        onChange={handlePhone}
                    />
                </div>
                <div className="form-currency">
                    <div className="form-title">Получаю</div>
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                        <Select
                            name="currencyTo"
                            id="currencyToSelect"
                            value={currencyToValue}
                            onChange={handleCurrencyToChange}
                            labelId="demo-simple-select-standard-label"
                            id="demo-simple-select-standard"
                        >
                            <MenuItem value="BTC">BTC</MenuItem>
                            <MenuItem value="ETH">ETH</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="EUR">EUR</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl>
                        <InputLabel htmlFor="result"></InputLabel>
                        <Input
                            id="result"
                            value={result}
                            disabled
                        />
                    </FormControl>
                    <TextField
                        className="form-fio"
                        id="fio"
                        label="ФИО получателя"
                        variant="standard"
                        type="text"
                        value={FIO}
                        onChange={handleFIO}
                    />
                    <TextField
                        id="wallet"
                        label="Кошелек"
                        variant="standard"
                        type="text"
                        value={wallet}
                        onChange={handleWallet}
                    />
                    <div className="form-subtext subtext">
                        При нажатии на кнопку "Обменять" Вы соглашаетесь c{' '}
                        <a href="#">пользовательским соглашением</a> нашего ресурса
                    </div>
                    <Button className="form-btn" variant="contained" onClick={validate}>
                        Обменять
                    </Button>
                </div>
            </form>
            <Snackbar open={showSnackbar} autoHideDuration={5000} onClose={handleCloseSnackbar}>
                <MuiAlert elevation={6} variant="filled" onClose={handleCloseSnackbar} severity="error">
                    {snackbarMessage}
                </MuiAlert>
            </Snackbar>
        </>
    );
};
