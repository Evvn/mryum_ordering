import React from 'react';

class MenuSearch extends React.Component {
    constructor(props) {
        super(props);
        this.result = [];
    }

    // Sections: Drinks, Price: 4, Item Name: Coffee | Tea | Etc, Item Description: Batch Brew Filter 
    search = async input => {
        const {data} = this.props;
        const _dataKeys = Object.keys(data);
        if (input) {
            let expression = new RegExp(`${input}`, 'gi');
            
            let big_bucket = [];
            
            // refactor to run async
            let sectionsPromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data[key].fields;
                    if (expression.test(fields['category'])) {
                        let fields = data[key].fields;
                        let searchScore = this.score(fields['category'].toString(), expression);
                        bucket.push({result: fields['category'], score: searchScore});
                    }
                }
                
                console.log('sections', bucket)
                resolve(bucket);
            });

            let pricePromise = new Promise(resolve => {
                let bucket = [];
                let expression = new RegExp(`${input}`, 'gi');
                for (const key of _dataKeys) {
                    let fields = data[key].fields;
                    
                    if (expression.test(fields['price'])) {
                        let fields = data[key].fields;
                        let searchScore = this.score(fields['price'].toString(), expression);
                        bucket.push({result: fields['price'], score: searchScore});
                    }
                }
                console.log('price', bucket)
                resolve(bucket);
            });

            let itemNamePromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data[key].fields;
                
                    if (expression.test(fields['name'])) {
                        let fields = data[key].fields;
                        let searchScore = this.score(fields['name'].toString(), expression);
                        bucket.push({result: fields['name'], score: searchScore});
                    }
                }

                console.log('item name', bucket)
                resolve(bucket);
            });

            let itemDescriptionPromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data[key].fields;
                
                    if (expression.test(fields['description'])) {
                        let fields = data[key].fields;
                        let searchScore = this.score(fields['description'].toString(), expression);
                        bucket.push({result: fields['description'], score: searchScore});
                    }
                }

                console.log('description', bucket)
                resolve(bucket);
            });
            
            

            const [sections, price, itemName, itemDesc] = await Promise.all([sectionsPromise, pricePromise, itemNamePromise, itemDescriptionPromise]);

            
        
            // expression.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
            // let actionables = [];
            // bucket.map(x => actionables.push(x.result));
            // this.result = actionables;
            //console.log(sections);

        }
    }


    // set some kind of weight on . or , for price
    score = (entry, regex, field) => {
        let matched = entry.match(regex);
        if (matched) {
            let result;
            switch (field) {
                case 'price':
                    
                    result = matched.length / entry.length;
                    break;
            
                default:
                    result = matched.length / entry.length;
                    break;
            }
            return result.toFixed(3);
        }
    }

    render() {
        const {data} = this.props;
        this.search('4').then(oops => {
            console.log(oops)
        })
        return ( 
            <div> 
                { 'hello' } 
            </div>
        );
    }
}

export default MenuSearch;