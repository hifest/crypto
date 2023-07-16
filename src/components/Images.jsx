import img1 from "../img/b88x31.png"
import img2 from "../img/bestchange.gif"
import img3 from "../img/bitsmedia.png"
import img4 from "../img/cash.png"
import img5 from "../img/exnode.png"


export const Images = () => {
    return (
        <>
            <div className="images" >
                <a href="https://www.bestchange.ru/" target="_blank">
                    <img  className="images-img" src={img2}/>
                </a>
                <a href="https://rates.guru/" target="_blank">
                    <img className="images-img" src={img4}/>
                </a>
                <a href="https://bits.media/" target="_blank">
                    <img className="images-img" src={img3}/>
                </a>
                <a href="https://exnode.ru/" target="_blank">
                    <img className="images-img" src={img5}/>
                </a>
                <a href="https://e-mon.ru/" target="_blank">
                    <img className="images-img" src={img1}/>
                </a>
            </div>
        </>
    )
 }