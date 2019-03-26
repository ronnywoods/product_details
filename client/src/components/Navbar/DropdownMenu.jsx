import React from 'react';

const DropdownMenu = props => {
  return (
    <div className="col-5">
      <ul>
        <li className="headline">{props.title}</li>
        {props.options.map((op,i ) => {
          if(op === '____'){
            return (
              <li key = {op+i} className="gray">{op}</li>
            )
          } else if (op === 'Sale'){
            return (
              <li key = {op+i} className="bold">{op}</li>
            )
          } else {
            return (
              <li key={op+i}>{op}</li>
            )
          }
        })}
      </ul>
    </div>
  )
};

export default DropdownMenu;
