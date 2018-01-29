import React from 'react';
import {render} from 'react-dom';

class Shop extends React.Component {
    render() {
        return (
            <div id="page">
                <h2>Shop</h2>
                <p>You can find Vortech CDs, shirts, and packages at our BandCamp shop below!</p>
                <div className="center">
                    <a href="https://vortech.bandcamp.com/merch">
                        https://vortech.bandcamp.com/merch
                        <img src="static/img/external/bandcamp-big.jpg" alt="BandCamp" className="shop-bandcamp" />
                    </a>
                </div>
            </div>
        );
    }
}

export default Shop;
