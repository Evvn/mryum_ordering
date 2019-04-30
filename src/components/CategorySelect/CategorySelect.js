import React from 'react';
//css
import './styles/categorySelect.scss'

class CategorySelection extends React.Component{
  componentWillMount() {
    const { setCategory, categories } = this.props
    setCategory(categories[0])
  }

  createBackground = (url) => {
    let style = {
      backgroundImage: `url('${url}')`,
    }
    return style
  }

  render() {
    const { setCategory, categories} = this.props;

    return(
      <div className="categorySelect">
        {categories.map(category => (
          <div className="categoryCard" onClick={() => setCategory(category)}>
            <span className="categoryName">{category}</span>
          </div>
        ))}
      </div>
    )
  }
}

export default CategorySelection;
