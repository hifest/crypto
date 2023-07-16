import React from 'react';
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import {auth} from "../firebase"
import {getDatabase, onValue, ref} from "firebase/database";
import {onAuthStateChanged} from "firebase/auth";

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

const HistoryPage = () => {
    const [data,setData] = React.useState('')
    const [open, setOpen] = React.useState(false);
    const [dataForModal,setDataForModal] = React.useState('')

    const db = getDatabase();

    React.useEffect(() => {
        const fetchData = async () => {
            await new Promise(resolve => {
                const unsubscribe = onAuthStateChanged(auth, user => {
                    if (user) {
                        resolve();
                    }
                });
                return () => unsubscribe();
            });

            const starCountRef = ref(db, 'users/' + auth.currentUser.uid + '/operations');
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setData(data)
            });
        };

        fetchData();
    }, [auth]);

    function isPast30Minutes(dateString) {
        // Розбиваємо рядок на складові часу
       if(dateString){
           const [year, month, day, hour, minute, second] = dateString.split(/[-T:]/).map(Number);

           // Створюємо об'єкт дати з отриманих складових
           const date = new Date(year, month - 1, day, hour, minute, second);

           // Отримуємо поточну дату та час
           const now = new Date();

           // Додаємо 30 хвилин до заданої дати
           date.setMinutes(date.getMinutes() + 30);

           // Перевіряємо, чи поточний час після доданої дати
           return now > date;
       }
    }
    function minutesUntil30MinutesAfter(dateString) {
        // Розбиваємо рядок на складові часу
        const [year, month, day, hour, minute, second] = dateString.split(/[-T:]/).map(Number);

        // Створюємо об'єкт дати з отриманих складових
        const date = new Date(year, month - 1, day, hour, minute, second);

        // Додаємо 30 хвилин до заданої дати
        date.setMinutes(date.getMinutes() + 30);

        // Отримуємо поточну дату та час
        const now = new Date();

        // Різниця між поточним часом і доданою датою в хвилинах
        const diffInMinutes = Math.floor((date - now) / (1000 * 60));

        // Перевіряємо, чи пройшло вже 30 хвилин
        if (diffInMinutes <= 0) {
            return false;
        }

        return diffInMinutes;
    }



    const handleClose = () => {
        setOpen(false);
    }

    const getData = (id) =>{
        setOpen(true)
        const fetchData = async () => {
            await new Promise(resolve => {
                const unsubscribe = onAuthStateChanged(auth, user => {
                    if (user) {
                        resolve();
                    }
                });
                return () => unsubscribe();
            });
            const starCountRef = ref(db, 'users/' + auth.currentUser.uid + '/operations/' + id);
            onValue(starCountRef, (snapshot) => {
                const data = snapshot.val();
                setDataForModal(data)
            });
        };

        fetchData();
    }
    const copyText = () => {
        const wallet = dataForModal.wallet;
        navigator.clipboard.writeText(wallet)
    }

    return (
        <>
       {data ?
        <>
            <div className="history__container">
                {Object.keys(data).map((key) => (
                    <div key={key} onClick={()=>getData(data[key].IDForSearch)}>
                        <div className="history__block">
                            <div>ID Транзакции: {data[key].transId}</div>
                            {<div>Время: {data[key].dateStart}</div>}
                            <div>Email: {data[key].email}</div>
                            <p>Нажмите, чтобы открыть</p>
                            <div className={isPast30Minutes(data[key].dataForCalculaticng) ? "history__divider red" : "history__divider green"}></div>
                        </div>
                    </div>
                ))}
            </div>
            <Modal
                open={open}
                onClose={()=>{
                    handleClose()
                }}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box className="form-form" sx={style}>
                    <Typography className="modal-id" id="modal-modal-title" variant="h6" component="h2">
                        Заявка id {dataForModal.transId}
                    </Typography>
                    <div className="form-grid">
                        <div className="form-gridbox lf tp first">
                            <div className="form-grids fw ">{dataForModal.currency}</div>
                        </div>
                        <div className="form-gridbox tp">
                            <div className="form-grids fw">{dataForModal.currency2}</div>
                        </div>
                        <div className="form-gridbox lf first">
                            <div className="form-grids bl">{dataForModal.amount}</div>
                        </div>
                        <div className="form-gridbox">
                            <div className="form-grids bl">{dataForModal.amount2}</div> </div>
                        <div className="form-gridbox lf first">
                            <div className="form-grids ">Дата создания:</div></div>
                        <div className="form-gridbox">
                            <div className="form-grids">{dataForModal.dateStart}</div></div>
                        <div className="form-gridbox lf first">
                            <div className="form-grids ">Дата окончания:</div></div>
                        <div className="form-gridbox">
                            <div className="form-grids">{dataForModal.dateEnd}</div></div>
                        <div className="form-gridbox lf first">
                            <div className="form-grids ">Реквизиты получателя:	</div></div>
                        <div className="form-gridbox">
                            <div className="form-grids">{dataForModal.FIO}</div></div>
                        <div className="form-gridbox lf first">
                            <div className="form-grids  ">Время для оплаты:</div></div>
                        <div className="form-gridbox">
                            {dataForModal.dataForCalculaticng ?
                                <div className={isPast30Minutes(dataForModal.dataForCalculaticng) ? "form-grids red-text": "form-grids green-text"}>{minutesUntil30MinutesAfter(dataForModal.dataForCalculaticng) ? minutesUntil30MinutesAfter(dataForModal.dataForCalculaticng) : "время для оплати вишло"}</div> : "Нету данних" }
                        </div>
                        <div className="form-gridbox lf first">
                            <div className="form-grids  ">Статус:</div></div>
                        <div className="form-gridbox">
                            <div className="form-grids">Ожидает оплаты</div>
                        </div>
                    </div>
                    <div className="modal-subtext">
                        <div style={{ textAlign: 'center' }}>
                            Оплатите {dataForModal.amount} {dataForModal.currency} на:
                        </div>
                        <div>{dataForModal.wallet}</div>
                        <Button onClick={copyText}>Copy</Button>
                    </div>

                    <div className="modal-buttons">
                        <Button className="form-btn modal-btn" variant="contained" onClick={()=>{
                            handleClose()
                        }}>
                            Я оплатил
                        </Button>
                        <Button className="form-btn modal-btn" variant="contained" onClick={()=>{
                            handleClose()
                        }} >
                            Отмена
                        </Button>
                    </div>
                </Box>
            </Modal>
        </>
            : <div className="h1100">У ВАС НЕТУ ТРАНЗАКЦИЙ</div> }
        </>
    );
};

export default HistoryPage;
