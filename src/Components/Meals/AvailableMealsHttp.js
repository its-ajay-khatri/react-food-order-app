import { useState, useEffect } from 'react';
import styles from './AvailableMeals.module.css';
import MealItem from './MealItem/MealItem';
import Card from '../UI/Card';

const DUMMY_MEALS = [
    {
      id: 'm1',
      name: 'Sushi',
      description: 'Finest fish and veggies',
      price: 22.99,
    },
    {
      id: 'm2',
      name: 'Schnitzel',
      description: 'A german specialty!',
      price: 16.5,
    },
    {
      id: 'm3',
      name: 'Barbecue Burger',
      description: 'American, raw, meaty',
      price: 12.99,
    },
    {
      id: 'm4',
      name: 'Green Bowl',
      description: 'Healthy...and green...',
      price: 18.99,
    },
  ];

const AvailableMeals = (props) => {

    const[meals, setMeals] = useState([]);
    const[isLoading, setIsLoading] = useState(true);
    const[error, isError] = useState();

    useEffect(() => {
      const fetchMeals = async () => {
        const response = await fetch("https://shopping-cart-e5377-default-rtdb.firebaseio.com/Meals.json");
       
       if(!response.ok){
        throw new Error("Somethign went wrong");
       }
       
        const responseData = await response.json();

        const loadedMeals = [];

        for (const key in responseData){
            loadedMeals.puch({
              id: key,
              name: responseData[key].name,
              description: responseData[key].description,
              price: responseData[key].price,
            });
        }
        console.log(loadedMeals);
        setMeals(loadedMeals);
        setIsLoading(false);
      };
      
      try{
        fetchMeals();
      }
      catch(error){
        setIsLoading(false);
        isError(error.message)
      }
    },[]);

    (isLoading && <p>Hola...</p> )

    if(error){
      return (
        <>
          <section style={{textAligh: 'center' ,Color: 'red' }}>
            <p>{error}</p>
          </section>
        </>
      )
    }

    const mealslist = DUMMY_MEALS.map(meal => 
    <MealItem 
        id = {meal.id}
        key={meal.id} 
        name={meal.name} 
        description={meal.description} 
        price={meal.price} 
    />);
    return <section className={styles.meals}>
        <Card>
            <ul>
                {mealslist}
            </ul>
        </Card>
    </section>
};

export default AvailableMeals;