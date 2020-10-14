import React, { useEffect, useState } from 'react';
import api from '../../Services/api';
import './styles.css';

export default function AddItemComponent(props: { hash: string, itemName: string, imageUrl: string, preview: string }): JSX.Element {

    const [Price, SetPrice] = useState(0);

    function AddItem() {
        if (isNaN(Number(Price))) return;
        console.log("ok")

        api.post("/AddItemInDb", {
            item_hash: props.hash,
            item_name: props.itemName,
            image_url: props.imageUrl,
            preview: props.preview,
            price: Price,
            steamId: localStorage.getItem("CurrentSteamId")
        });

        alert("Skin adicionada com sucesso!");
    }

    useEffect(() => {
        console.log(props);
    }, [])

    return (
        <div className="add-item-background">
            <div className="add-item-flex">
                <div className="add-item-form">

                    <div style={{ display: "grid" }}>
                        <span style={{ fontSize: "12px", fontWeight: "bold" }}>Preço(R$)</span>
                        <input type="number" onChange={e => SetPrice(Number(e.target.value))} />
                        <button onClick={AddItem}>Adicionar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}