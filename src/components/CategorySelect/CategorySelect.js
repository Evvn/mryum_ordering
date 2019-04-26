import React from 'react';

const CategorySelection = (props) => {
  const { onSelect, categories} = props;

  const createBackground = (url) => {
    let style = {
      backgroundImage: `url('${url}')`,
    }
    return style
  }

  return(
    <div style={{marginTop: '20px'}} className="categorySelection">
      {categories.map(category => (
        <div style={{marginTop: '50px'}} onClick={() => onSelect(category)}>
          <h1>{category}</h1>
        </div>
      ))}
    </div>
  );
}


export default CategorySelection;
