import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../Services/api';
import axios from 'axios';
import './styles.css';

import AddItemModal from '../../Components/AddItemComponent';
import { ECANCELED } from 'constants';

interface Item {
    item_name: string,
    image_url: string,

    market_name: string,
    name_color: string,
    icon_url_large: string,
    icon_url: string,
    descriptions: [
        { type: string, value: string },
        { type: string, value: string },
        { type: string, value: string },
        { type: string, value: string },
        { type: string, value: string, color: string },
        { type: string, value: string },
        { type: string, value: string },
    ]
    market_actions: [
        { link: string, name: string }
    ]
}

export default function AdminPanel(): JSX.Element {
    const navigation = useHistory();
    const [Loading, SetLoading] = useState(false);
    const [ItemList, SetItemList] = useState([]);
    const [InvList, SetInvList] = useState([]);
    const [SteamId, SetSteamId] = useState("");

    const [Hash, SetHash] = useState("");
    const [ItemName, SetItemName] = useState("");
    const [ItemImage, SetItemImage] = useState("");
    const [Preview, SetPreview] = useState("");


    const [ShowAddItemModal, SetShowAddItemModal] = useState(false);

    useEffect(() => {
        const login = localStorage.getItem("LoginInfo")
        if (login) {
            const ParsedData = JSON.parse(login);
            console.log(ParsedData);
        } else {
            navigation.push("adminlogin");
        }

        api.get("/GetItemList").then(response => {
            SetItemList(response.data.items);
        })

        SetLoading(true);
    }, []);

    useEffect(() => {
        window.addEventListener("click", event => {
            const flexElement = document.querySelector(".add-item-flex");
            const promise = flexElement == event.target;
            if (promise) {
                SetShowAddItemModal(false);
            }
        })
    }, [])

    function LogoutHandler() {
        localStorage.removeItem("LoginInfo");
        navigation.push("adminlogin");
    }

    function SearchInventory() {
        api.post("/SearchInventory", { steamid: SteamId }).then(response => {
            console.log(response)
            localStorage.setItem("CurrentSteamId", SteamId);
            SetInvList(response.data.inventory);
        });
    }

    function RemoveItem(url: string) {
        console.log(url);
        api.post("/DelItemByImageUrl", { image_url: url }).then(response => {
            if (response.data.deleted) {
                alert("Removido com sucesso!");
            }
        })
    }

    function ActiveAddItemModal(hash: string, itemName: string, imageUrl: string, preview: string) {
        SetHash(hash);
        SetItemName(itemName);
        SetItemImage(imageUrl);
        SetPreview(preview);
        SetShowAddItemModal(true);
    }

    if (Loading) {
        return (
            <div>
                {ShowAddItemModal ? <AddItemModal hash={Hash} itemName={ItemName} imageUrl={ItemImage} preview={Preview} /> : null}
                <header>
                    <h1 style={{ color: "white" }}>Admin Panel</h1>
                    <button style={{ marginLeft: "1rem" }} onClick={LogoutHandler}>Logout</button>
                </header>

                <div>
                    <h1 style={{ fontWeight: 300, color: "#111", marginLeft: "3rem" }} >Procurar Inventário:</h1>

                    <div className="form-search-inv" style={{ display: "grid", maxWidth: "10rem" }}>
                        <span>SteamID</span>
                        <input type="text" onChange={e => SetSteamId(e.target.value)} />
                        <button onClick={SearchInventory}>Procurar</button>
                    </div>
                </div>


                <div className="search-inv-container">
                    {InvList.map((item: Item) => {
                        return (
                            <div key={item.market_name} className="inventory-search-item">
                                { item.icon_url_large ?
                                    <img className="search-inventory-image" src={`https://community.cloudflare.steamstatic.com/economy/image/${item.icon_url_large}`} alt={item.market_name} />
                                    :
                                    <img className="search-inventory-image" src={`https://icon-library.com/images/none-icon/none-icon-23.jpg`} alt={item.market_name} />
                                }

                                {item.descriptions[4] ?
                                    <span style={{ color: `#${item.descriptions[4].color}` }} >{item.market_name}</span> :
                                    <span>{item.market_name}</span>
                                }


                                <button onClick={() => ActiveAddItemModal(item.icon_url, item.market_name, item.icon_url_large, item.market_actions[0].link)}>Adicionar</button>
                            </div>
                        )
                    })}
                </div>

                <div className="search-inv-container">
                    {ItemList.map((item: Item) => {
                        return (
                            <div key={item.item_name} className="inventory-search-item">
                                { item.image_url ?
                                    <img className="search-inventory-image" src={`https://community.cloudflare.steamstatic.com/economy/image/${item.image_url}`} alt={item.item_name} />
                                    :
                                    <img className="search-inventory-image" src={`https://icon-library.com/images/none-icon/none-icon-23.jpg`} alt={item.item_name} />
                                }

                                <span style={{ color: "white" }}>{item.item_name}</span>

                                <button style={{ color: "red" }} onClick={() => RemoveItem(item.image_url)}>Remover</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    } else {
        return (
            <div>
                Loading...
            </div>
        )
    }

}