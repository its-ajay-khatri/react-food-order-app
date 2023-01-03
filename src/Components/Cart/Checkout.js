import classes from './Checkout.module.css';

const Checkout = (props) => {

    const confirmHandler = (event) => {
        event.preventDefault();
    }
    return(
        <>
            <form onSubmit={confirmHandler}>
                <div className={classes.control}>
                    <label htmlFor='name'>Your Name</label>
                    <input type='text' id='name' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='street'>street</label>
                    <input type='text' id='street' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='postal'>Postal</label>
                    <input type='text' id='postal' />
                </div>
                <div className={classes.control}>
                    <label htmlFor='city'>PoCitystal</label>
                    <input type='text' id='city' />
                </div>
                <div className={classes.actions}>
                    <button type='button'>Ok</button>
                    <button onClick={props.onCancel}>close</button>
                </div>
            </form>
        </>
    )
}

export default Checkout;