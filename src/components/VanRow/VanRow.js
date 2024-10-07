import React from 'react';
import { useDrop } from 'react-dnd';
import Rental from '../Rental/Rental.js';


const VanRow = ({ van, rentals, moveRental }) => {
    const [, drop] = useDrop(() => ({
      accept: 'rental',
      drop: (item) => moveRental(item.id, van),
    }));
  
    return (
      <div ref={drop} className="row">
        <div className="van">{van}</div>
        <div className="rentals">
          {rentals
            .filter((rental) => rental.van === van)
            .map((rental) => (
              <Rental key={rental.id} rental={rental} />
            ))}
        </div>
      </div>
    );
  }

  export default VanRow;