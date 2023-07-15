import React from 'react';
import {Link} from "react-router-dom";

const Footer = () => {
    return (
        <div className="footer">
            <div className="first_footer">© CryptoExchange. Работаем с 2019 года</div>
            <a href="mailto:cryptoexchange.ru@gmail.com" className="footer_a">cryptoexchange.ru@gmail.com</a>
            <Link to="/terms">Пользовательское соглашение</Link>
            <Link to="/privacy">Политика конфиденциальности</Link>
        </div>
    );
};

export default Footer;
