import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import { Eye } from 'react-feather';
import './styles.css';

interface ItemInfo {
    item_hash: string,
    item_name: string,
    image_url: string,
    preview: string,
    price: number,
    view_counter: number
}

export default function Home(): JSX.Element {

    const [Loading, SetLoading] = useState(false);
    const [StoreList, SetStoreList] = useState<any[]>([]);
    const [OldStoreList, SetOldStoreList] = useState<any[]>([]);

    useEffect(() => {
        api.get("/GetStoreList").then(response => {
            SetStoreList(response.data.list);
            SetOldStoreList(response.data.list);
            SetLoading(true);
        })
    }, [])

    function UpdateViewCounter(item_hash: string) {
        api.post("/UpdateViewCounter", {
            item_hash: item_hash
        });
    }

    function FilterList(word: string) {
        const arr: any[] = [];
        OldStoreList.map((item: ItemInfo) => {
            if (item.item_name.search(word) == 0) {
                arr.push(item);
                console.log(item);
            }
        });
        SetStoreList(arr);
        //console.log(word);
    }

    if (!Loading) {
        return (
            <div>Loading...</div>
        )
    }
    return (
        <div className="home-container">
            <header>
                <img className="lore-img" src="https://www.pngkey.com/png/full/439-4396293_cs-go-awp-png-csgo-awp-dragon-lore.png" alt="dragon-lore" />
                <h1 className="store-name-title">Hoppe Store</h1>
            </header>

            <div className="contact-section">
                <h1>Contato</h1>
                <span>Gostou de alguma skin? Entre em contato pelo <a className="whats-link" target="_blank" href="https://wa.me/55035998095697>">whatsapp</a>! (55035998095697)</span>
                <div className="separator"></div>
            </div>

            <div className="item-list">
                <h1 className="item-list-title">Dê uma olhada em nossos itens!</h1>

                <div className="search-div" style={{ display: "grid", maxWidth: "10vw" }}>
                    <span>Procurar</span>
                    <input onChange={(e) => FilterList(e.target.value)} type="text" />
                </div>

                <div className="catalog">

                    {StoreList.map((item: ItemInfo) => {
                        return (
                            <div key={item.item_name} className="item">
                                <img className="item-img" src={`https://community.cloudflare.steamstatic.com/economy/image/${item.item_hash}`} alt={item.item_name} />
                                <span>{item.item_name}</span>
                                <span style={{ color: "green", fontWeight: "bold" }}>R$ {item.price}</span>
                                <button><a href={item.preview} onClick={() => UpdateViewCounter(item.item_hash)}>Ver no jogo</a></button>
                                <span className="view-counter"><Eye style={{ verticalAlign: "bottom" }} size={16} color="white" /> {item.view_counter}</span>
                            </div>
                        )
                    })}

                </div>
            </div>

            <footer>Desenvolvido por <a target="_blank" style={{ textDecoration: "none", color: "white" }} href="https://www.instagram.com/gabrielhoppe/"> Gabriel Hoppe</a></footer>
        </div>
    )
}