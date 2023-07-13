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
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import {getDatabase, ref, set} from "firebase/database";
import { obj } from '../redux/store'

const style = {
    position: 'absolute' ,
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
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
    const [open, setOpen] = React.useState(false);


    const sendDataUser = (e) => {
        e.preventDefault()

        const db = getDatabase();

        set(ref(db, 'operations/' + id), {
            currency: currencyFromValue,
            amount: amountFromValue,
            email: email,
            phone: phone,
            FIO: FIO,
            wallet: wallet
        }).then(() => {
            console.log("Данные успешно отправлены в базу данных");
        }).catch((error) => {
            console.error("Ошибка при отправке данных:", error);
        });
        handleClose()
    }

    useEffect(() => {
        validate();
    }, [currencyFromValue, amountFromValue, currencyToValue]);

    const handleOpen = () => setOpen(true);
    const handleClose = () => {
        setOpen(false);
    }

    const confirm = () => {
        if (
            currencyFromValue !== '' &&
            amountFromValue !== '' &&
            currencyToValue !== '' &&
            validateEmail(email) &&
            validatePhone(phone) &&
            validateFIO(FIO) &&
            validateWallet(wallet)
        ) {
            handleOpen()
            submit()
        } else {
            setSnackbarMessage('Пожалуйста, заполните все поля правильно.');
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
                setSnackbarMessage('');
            }, 5000);
        }
    };
    const validate = () => {
        if (
            currencyFromValue !== '' ||
            amountFromValue !== '' ||
            currencyToValue !== ''
        ) {
            submit();
        } else {
            setSnackbarMessage('Пожалуйста, заполните все поля правильно.');
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
                const toText = `${resultAmount}`;
                setResult(`${toText}`);
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
        var re = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return re.test(String(email).toLowerCase());
        return email !== '';
    };

    const validatePhone = (phone) => {

        return phone !== '' && phone.length > 6;
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


    const id = Date.now();

    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const date2 = new Date();
    date2.setMinutes(date.getMinutes() + 30);
    const year2 = date2.getFullYear();
    const month2 = date.getMonth() + 1;
    const day2 = date2.getDate();
    const hours2 = date2.getHours();
    const minutes2 = date2.getMinutes();
    return (
        <>
            <form className="form">
                <div className="form-currency">
                    <div className="form-title">Отдаю</div>
                    <FormControl  sx={{ m: 1, minWidth: 120 }}>
                        <div className="form-control">
                            <img className='form-img' src={obj[currencyFromValue].image} />
                            <Select
                                className="form-select"
                                name="currencyFrom"
                                id="currencyFromSelect"
                                value={currencyFromValue}
                                onChange={handleCurrencyFromChange}
                                labelId="demo-simple-select-standard-label"
                                id="demo-simple-select-standard"
                            >
                                <MenuItem value="ALGO">Algorand</MenuItem>
                                <MenuItem value="BTC">Bitcoin</MenuItem>
                                <MenuItem value="BTG">Bitcoin gold</MenuItem>
                                <MenuItem value="ADA">Cardano</MenuItem>
                                <MenuItem value="DASH">Dash</MenuItem>
                                <MenuItem value="DGB">Digibyte</MenuItem>
                                <MenuItem value="DOGE">Dogecoin</MenuItem>
                                <MenuItem value="ETH">Ethereum</MenuItem>
                                <MenuItem value="LTC">Litecoin</MenuItem>
                                <MenuItem value="XMR">Monero</MenuItem>
                                <MenuItem value="MATIC">Polygon</MenuItem>
                                <MenuItem value="RVN">Ravencoin</MenuItem>
                                <MenuItem value="XRP">Ripple</MenuItem>
                                <MenuItem value="SOL">Solana</MenuItem>
                                <MenuItem value="XLM">Stellar</MenuItem>
                                <MenuItem value="USDT">Tether</MenuItem>
                                <MenuItem value="XTZ">Tezos</MenuItem>
                                <MenuItem value="TRX">Tron</MenuItem>
                                <MenuItem value="VET">VeChain</MenuItem>
                                <MenuItem value="ZEC">Zcash</MenuItem>

                            </Select>
                        </div>
                    </FormControl>
                    <TextField
                        className="input-form"
                        id="amountFrom"
                        variant="standard"
                        name="amountFrom"
                        value={amountFromValue}
                        onChange={handleAmountFromChange}
                    />
                    <div className="form-subtext">Min: {obj[currencyFromValue].min} Max: {obj[currencyFromValue].max} {currencyFromValue}</div>
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
                            <MenuItem value="ALGO">Algorand</MenuItem>
                            <MenuItem value="BTC">Bitcoin</MenuItem>
                            <MenuItem value="BTG">Bitcoin gold</MenuItem>
                            <MenuItem value="ADA">Cardano</MenuItem>
                            <MenuItem value="DASH">Dash</MenuItem>
                            <MenuItem value="DGB">Digibyte</MenuItem>
                            <MenuItem value="DOGE">Dogecoin</MenuItem>
                            <MenuItem value="ETH">Ethereum</MenuItem>
                            <MenuItem value="LTC">Litecoin</MenuItem>
                            <MenuItem value="XMR">Monero</MenuItem>
                            <MenuItem value="MATIC">Polygon</MenuItem>
                            <MenuItem value="RVN">Ravencoin</MenuItem>
                            <MenuItem value="XRP">Ripple</MenuItem>
                            <MenuItem value="SOL">Solana</MenuItem>
                            <MenuItem value="XLM">Stellar</MenuItem>
                            <MenuItem value="USDT">Tether</MenuItem>
                            <MenuItem value="XTZ">Tezos</MenuItem>
                            <MenuItem value="TRX">Tron</MenuItem>
                            <MenuItem value="VET">VeChain</MenuItem>
                            <MenuItem value="ZEC">Zcash</MenuItem>

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
                        label={"Кошелек " + currencyToValue}
                        variant="standard"
                        type="text"
                        value={wallet}
                        onChange={handleWallet}
                    />
                    <div className="form-subtext subtext">
                        При нажатии на кнопку "Обменять" Вы соглашаетесь c{' '}
                        <a href="#">пользовательским соглашением</a> нашего ресурса
                    </div>
                    <div className="form-btn-container">
                        <Button className="form-btn" variant="contained" onClick={confirm}>
                            Обменять
                        </Button>
                        <Modal
                            open={open}
                            onClose={handleClose}
                            aria-labelledby="modal-modal-title"
                            aria-describedby="modal-modal-description">
                            <Box className="form-form" sx={style}>
                                <Typography className="modal-id" id="modal-modal-title" variant="h6" component="h2">
                                    Заявка id {id}
                                </Typography>
                            <div className="form-grid">
                                <div className="form-gridbox lf tp first">
                                    <div className="form-grids fw ">{currencyFromValue}</div>
                                </div>
                               <div className="form-gridbox tp">
                                    <div className="form-grids fw">{currencyToValue}</div>
                               </div>
                               <div className="form-gridbox lf first">
                                    <div className="form-grids bl">{amountFromValue}</div>
                               </div>
                                <div className="form-gridbox">
                                    <div className="form-grids bl">{result}</div> </div>
                                <div className="form-gridbox lf first">
                                    <div className="form-grids ">Дата создания:</div></div>
                                <div className="form-gridbox">
                                    <div className="form-grids">{day}.{month}.{year}, {hours}:{minutes}</div></div>
                                <div className="form-gridbox lf first">
                                    <div className="form-grids ">Дата окончания:</div></div>
                                <div className="form-gridbox">
                                    <div className="form-grids">{day2}.{month2}.{year2}, {hours2}:{minutes2}</div></div>
                                <div className="form-gridbox lf first">
                                    <div className="form-grids ">Реквизиты получателя:	</div></div>
                               <div className="form-gridbox">
                                    <div className="form-grids">{FIO}</div></div>
                                <div className="form-gridbox lf first">
                                    <div className="form-grids  ">Время для оплаты:</div></div>
                                <div className="form-gridbox">
                                    <div className="form-grids gr">Время для оплаты вышло</div></div>
                                <div className="form-gridbox lf first">
                                    <div className="form-grids  ">Статус:</div></div>
                                <div className="form-gridbox">
                                    <div className="form-grids">Ожидает оплаты</div>
                                </div>
                                </div>
                                <div className="modal-subtext">Оплатите {amountFromValue} {currencyFromValue} на: <br/>
                                    {obj[currencyFromValue].wallet}</div>
                                <div className="modal-buttons">
                                    <Button onClick={sendDataUser} className="form-btn modal-btn" variant="contained">
                                        Я оплатил
                                    </Button>
                                    <Button className="form-btn modal-btn" variant="contained" onClick={handleClose} >
                                        Отмена
                                    </Button>
                                </div>
                            </Box>
                        </Modal>
                    </div>
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
