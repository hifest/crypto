import React, {useState} from 'react';
import bcrypt from 'bcryptjs';
import { getDatabase, ref, child, get,onValue  } from "firebase/database";
const Admin = () => {

    const [login, setLogin] = useState("");
    const [password, setPassword] = useState("");
    const [storedHashedPassword,setStoredHashedPassword] = useState("");
    const [storedHashedLogin,setStoredHashedLogin] = useState("");
    const [continueVar,setContinueVar] = useState(false);
    const [allData,setAllData] = useState("")

    React.useEffect(() => {
        const dbRef = ref(getDatabase());
        get(child(dbRef, `admin/`)).then((snapshot) => {
            if (snapshot.exists()) {
                setStoredHashedPassword(snapshot.val().password)
                setStoredHashedLogin(snapshot.val().login)
            } else {
                console.log("No data available");
            }
        }).catch((error) => {
            console.error(error);
        });

    }, []);


    const checkAndRedirect = (e) =>{
        e.preventDefault()
        bcrypt.compare(password, storedHashedPassword, (err, isMatch) => {
            if (err) {
                console.error(err);
                return;
            }
            if (isMatch) {
                if(login === storedHashedLogin){
                    setContinueVar(true)
                }
            } else {
                console.log('Пароль не співпадає. іди нахуй');
            }
        });
    }

    const getAllData = () =>{
        const db = getDatabase();
        const starCountRef = ref(db, 'users/');
        onValue(starCountRef, (snapshot) => {
            const data = snapshot.val();
            console.log(data)
            setAllData(data)
        });
    }

    React.useEffect(() => {
        if (continueVar) {
            getAllData();
        }
    }, [continueVar]); // Додаємо `continueVar` як залежність від нікотину

    const userKeys = Object.keys(allData);

    return (
        <>
            {
                continueVar ?


                    <div  className="admin__box">
                        {userKeys.map((userKey) => (
                            <>
                                {Object.keys(allData[userKey].operations).map((operationKey) => (
                                    <div key={operationKey} className="admin__block">
                                        <p>UserID: {userKey}</p>
                                        <p>EmailUser: {allData[userKey].email}</p>
                                        <p>Login: {allData[userKey].login}</p>
                                        <p>TransId: {allData[userKey].operations[operationKey].transId}</p>
                                        <br/>
                                        <p>Операція: {operationKey}</p>
                                        <p>
                                            Обмін: з {allData[userKey].operations[operationKey].currency} на {allData[userKey].operations[operationKey].currency2}
                                        </p>
                                        <p>
                                            К-сть: {allData[userKey].operations[operationKey].amount} на {allData[userKey].operations[operationKey].amount2}
                                        </p>
                                        <p>Email з заявки: {allData[userKey].operations[operationKey].email}</p>
                                        <p>Телефон з заявки: {allData[userKey].operations[operationKey].phone}</p>
                                        <p>Ваш кошельок: {allData[userKey].operations[operationKey].wallet}</p>
                                        <p>Кошельок ліда: {allData[userKey].operations[operationKey].walletDalboeba}</p>
                                        <p>Дата стару: {allData[userKey].operations[operationKey].dateStart} </p>
                                        <p>Дата кінця: {allData[userKey].operations[operationKey].dateEnd} </p>
                                    </div>
                                ))}
                            </>
                        ))}
                    </div>

                :

                <div className="h100">
                    <form className="register" onSubmit={checkAndRedirect}>
                        <h2 className="register__header">Вхід</h2>


                        <div className="form__group field">
                            <input type="input" className="form__field" placeholder="Логин" min={2} max={50} value={login} onChange={(e)=> setLogin(e.target.value)} required  autoComplete="off"/>
                            <label htmlFor="name" className="form__label">Логин</label>
                        </div>


                        <div className="form__group field">
                            <input type="password" className="form__field" placeholder="Пароль" min={10} max={50} value={password} onChange={(e)=> setPassword(e.target.value)} required  autoComplete="off"/>
                            <label htmlFor="name" className="form__label">Пароль</label>
                        </div>

                        <button className="btn_reg" type="submit">Увійти</button>

                    </form>
                </div>
            }
        </>
    );
};

export default Admin;
