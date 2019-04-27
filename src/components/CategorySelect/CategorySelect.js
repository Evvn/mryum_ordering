import React from 'react';

//css
import './styles/categorySelect.scss'

const CategorySelection = (props) => {
  const { setCategory, categories} = props;

  const createBackground = (url) => {
    let style = {
      backgroundImage: `url('${url}')`,
    }
    return style
  }

  return(
    <div className="categorySelect">
      {categories.map(category => (
        <div className="categoryCard" onClick={() => setCategory(category)}>
          <span className="categoryName">{category}</span>
        </div>
      ))}
    </div>
  );
}


export default CategorySelection;
