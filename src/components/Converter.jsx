import React, {useState, useEffect, useContext} from 'react';
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
import {onAuthStateChanged} from "firebase/auth";
import {auth} from "../firebase";
import { child, push, update } from "firebase/database";


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


export const obj = {
    "ADA": {
        min:31.3152,
        max:3000,
        wallet: 'addr1q8sgyece9u9f9kvu7vhhp9sj6kt9nmskpdsj9h7kez8pyhlxytavhwj0glsqks3tts4mymcgz8xvrle9fe7883qw6p3sgtaneq',
        image: "https://avalpay.ru/img/pm2/ada.svg"
    },
    "LTC": {
        min:0.0894,
        max:15,
        wallet: 'ltc1qz78ntrlfyhyd9z39rtjvhp2z0n93w5hkpyyzxd',
        image: "https://avalpay.ru/img/pm2/ltc.svg"
    },
    "XTZ": {
        min:10.6509,
        max:530,
        wallet: 'tz1hPGdWAuaiNZPVjLBc2Ee3cFfQgQJFc82e',
        image: "https://avalpay.ru/img/pm2/xtz.svg"
    },
    "BTC": {
        min:0.0003,
        max:530,
        wallet: 'bc1q8yj8ht8c044jp9uzus88wj7s5lpp27k62gvclw',
        image: "https://avalpay.ru/img/pm2/btc.svg"
    },
    "ZEC": {
        min:0.2975,
        max:530,
        wallet: 't1d2BM96SQwGexzrWep4Q9ejoMQN9EUTZVm',
        image: "https://avalpay.ru/img/pm2/zec.svg"
    },
    "TRX": {
        min:115.2221,
        max:50000,
        wallet: 'TCARaruHkXevvRHTFYHkUccx7cpwLUzGVP',
        image: "https://avalpay.ru/img/pm2/trx.svg"
    },
    "ETH": {
        min:0.0048,
        max:26,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://avalpay.ru/img/pm2/eth.svg"
    },
    "XMR": {
        min:0.0555,
        max:6,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://avalpay.ru/img/pm2/xmr.svg"
    },
    "DASH": {
        min: 0.2681,
        max:11,
        wallet: 'Xioo28G2h6bfuTk4NwcHuEivjskyeHGihd',
        image: "https://avalpay.ru/img/pm2/dash.svg"
    },
    "DOGE": {
        min:138.2064,
        max:2302 ,
        wallet: 'DFFMf7KjqqCuzeTd9bKyGgDnajKYdMiLhc',
        image: "https://avalpay.ru/img/pm2/doge.svg"
    },
    "BTG": {
        min:138.2064,
        max:2302,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://avalpay.ru/img/pm2/btg.svg"
    },
    "DGB": {
        min:0.6545,
        max:265,
        wallet: 'dgb1qztms8gd6xh58kw4m4vxedfv7jf9l2cylz5kenz',
        image: "https://avalpay.ru/img/pm2/dgb.svg"
    },
    "ALGO": {
        min:85.2273 ,
        max:8322 ,
        wallet: 'WQKUWFZIBKLR7KXIXQE7F53NUB7TNZBXAZVDZ7P27X7VC3EKINZGRNTTI4',
        image: "https://avalpay.ru/img/pm2/algo.svg"
    },
    "SOL": {
        min:0.4108 ,
        max:322 ,
        wallet: 'gY9BXuRAeet4QeEs2z8GXfNH1T1tKrWvdPsGVeJSZse',
        image: "https://avalpay.ru/img/pm2/sol.svg"
    },
    "RVN": {
        min:465.8385 ,
        max:34555 ,
        wallet: 'RRBAaKBZnd1NsbQRTz2zNa2vpj8pUiswiv',
        image: "https://avalpay.ru/img/pm2/rvn.svg"
    },
    "USDT": {
        min:9.0000 ,
        max:2450 ,
        wallet: 'TCARaruHkXevvRHTFYHkUccx7cpwLUzGVP',
        image: "https://avalpay.ru/img/pm2/trc20.svg"
    },
    "XLM": {
        min:103.84 ,
        max:2077,
        wallet: 'GB74YQ7ZILYYI6YT5S7VXSC5PJTJPFXXHWC6B4FADYNTOWBRN6KOCSRL',
        image: "https://altcoinsbox.com/wp-content/uploads/2023/01/xlm-stellar-lumens-logo-350x350.webp"
    },
    "XRP": {
        min:21.25,
        max:1062,
        wallet: 'rE3eGs1Vq2PtVUCcS41X2PosjTGSD6waYu',
        image: 'https://cryptologos.cc/logos/xrp-xrp-logo.png?v=025'
    },
    "MATIC": {
        min:13.905,
        max:530,
        wallet: '0x18dF7003369a7E2311cfF9C6A9e7eA4dDBF9f38c',
        image: "https://altcoinsbox.com/wp-content/uploads/2023/03/matic-logo-350x350.webp"
    },
    "VET": {
        min:535.788851,
        max:10712,
        wallet: '0x343e86Be6F148E1838f7773D8099615b568bA09A',
        image: "https://altcoinsbox.com/wp-content/uploads/2023/03/vechain-logo-300x283.webp"
    }
}

export const Converter = () => {
    const [isUserReg,setIsUserReg] = useState(false)
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
    const [id,setId] = useState(Date.now())

    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
                setIsUserReg(true)
            } else {
                setIsUserReg(false)
            }
        });
    },[])



    const sendDataUser = (e) => {
        e.preventDefault();
        const user = auth.currentUser?.uid; // Отримати uid користувача (перевірити, чи існує auth.currentUser)
        const db = getDatabase();
        const newPostKey = push(child(ref(db), 'operations')).key;
        const postData = {
            IDForSearch: newPostKey,
            currency: currencyFromValue,
            amount: amountFromValue,
            currency2: currencyToValue,
            amount2: result,
            email: email,
            phone: phone,
            FIO: FIO,
            walletDalboeba: wallet,
            dateStart: `${day}.${month}.${year}, ${hours}:${minutes}`,
            dateEnd: `${day2}.${month2}.${year2}, ${hours2}:${minutes2}`,
            dataForCalculaticng: `${year}-${month}-${day}T${hours}:${minutes}:00`,
            wallet: obj[currencyFromValue].wallet,
            transId: id
        };
        const updates = {};
        updates['/users/' + user + "/operations/" + newPostKey] = postData;

        handleClose();
        return update(ref(db), updates);
    };

    useEffect(() => {
        validate();
    }, [currencyFromValue, amountFromValue, currencyToValue]);

    const handleOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
    }
    const changeId  = () =>{
        setId(Date.now())
    }
    const confirm = () => {
        if (isUserReg) {
            if (amountFromValue >= obj[currencyFromValue].min && amountFromValue <= obj[currencyFromValue].max) {
                if (
                    currencyFromValue !== '' &&
                    amountFromValue !== '' &&
                    currencyToValue !== '' &&
                    validateEmail(email) &&
                    validatePhone(phone) &&
                    validateFIO(FIO) &&
                    validateWallet(wallet)
                ) {
                    handleOpen();
                    submit();
                } else {
                    setSnackbarMessage('Пожалуйста, заполните все поля правильно.');
                    setShowSnackbar(true);
                    setTimeout(() => {
                        setShowSnackbar(false);
                        setSnackbarMessage('');
                    }, 5000);
                }
            } else {
                setSnackbarMessage('Сумма к обмену не корректна.');
                setShowSnackbar(true);
                setTimeout(() => {
                    setShowSnackbar(false);
                    setSnackbarMessage('');
                }, 5000);
            }
        } else {
            setSnackbarMessage('Для продолжения требуется регистрация.');
            setShowSnackbar(true);
            setTimeout(() => {
                setShowSnackbar(false);
                setSnackbarMessage('');
            }, 5000);
        }
    }
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

    const copyText = () => {
        const wallet = obj[currencyFromValue].wallet;
        navigator.clipboard.writeText(wallet)
    }



    const date = new Date();
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const date2 = new Date();
    date2.setMinutes(date.getMinutes() + 30);
    const year2 = date2.getFullYear();
    const month2 = date2.getMonth() + 1;
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
                        <div className="form-control">
                            <img className='form-img' src={obj[currencyToValue].image} />
                        <Select
                            className="form-select"
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
                    </div>
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
                        <Button className="form-btn" variant="contained" onClick={e=>{
                            sendDataUser(e)
                            confirm()
                        }}>
                            Обменять
                        </Button>
                        <Modal
                            open={open}
                            onClose={()=>{
                                changeId()
                                handleClose()
                            }}
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
                                    <div className="form-grids gr">30 минут</div></div>
                                <div className="form-gridbox lf first">
                                    <div className="form-grids  ">Статус:</div></div>
                                <div className="form-gridbox">
                                    <div className="form-grids">Ожидает оплаты</div>
                                </div>
                                </div>
                                <div className="modal-subtext">
                                    <div style={{ textAlign: 'center' }}>
                                        Оплатите {amountFromValue} {currencyFromValue} на:
                                    </div>
                                    <div>{obj[currencyFromValue].wallet}</div>
                                    <Button onClick={copyText}>Copy</Button>
                                </div>

                                <div className="modal-buttons">
                                    <Button className="form-btn modal-btn" variant="contained" onClick={()=>{
                                        changeId()
                                        handleClose()
                                    }}>
                                        Я оплатил
                                    </Button>
                                    <Button className="form-btn modal-btn" variant="contained" onClick={()=>{
                                        changeId()
                                        handleClose()
                                    }} >
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
