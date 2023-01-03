import React from 'react';
import mealsImage from '../../assets/meals.jpg';
import styles from './Header.module.css';
import HeaderCartButton from './HeaderCartButton';

const Header = (props) => {
    return <React.Fragment>
        <header className={styles.header}>
            <h1>ResctMeals</h1>
            <HeaderCartButton onClick={props.onShowCart} />
        </header>
        <div className={styles['main-image']}>
            <img src={mealsImage} alt="y=table full of food!" />
        </div>
    </React.Fragment>
};

export default Header;