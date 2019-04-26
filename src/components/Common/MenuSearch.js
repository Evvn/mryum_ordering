import React from 'react';

class MenuSearch extends React.Component {
    constructor(props) {
        super(props);
        this.result = [];
    }

    search = async input => {
        const {data} = this.props;
        const _dataKeys = Object.keys(data.menuByItem);
        let big_bucket = [];

        if (input) {
            let expression = new RegExp(`${input}`, 'gi');
            
            
            let sectionsPromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data.menuByItem[key].fields;
                    if (expression.test(fields['category'])) {
                        let fields = data.menuByItem[key].fields;
                        let searchScore = this.score(fields['category'].toString(), expression);
                        bucket.push({result: fields['category'], score: searchScore});
                    }
                }
                
                resolve(bucket);
            });

            let pricePromise = new Promise(resolve => {
                let bucket = [];
                let expression = new RegExp(`${input}`, 'gi');
                for (const key of _dataKeys) {
                    let fields = data.menuByItem[key].fields;
                    
                    if (expression.test(fields['price'])) {
                        let fields = data.menuByItem[key].fields;
                        let searchScore = this.score(fields['price'].toString(), expression, 'price');
                        bucket.push({result: fields['price'], score: searchScore});
                    }
                }

                resolve(bucket);
            });

            let itemNamePromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data.menuByItem[key].fields;
                
                    if (expression.test(fields['name'])) {
                        let fields = data.menuByItem[key].fields;
                        let searchScore = this.score(fields['name'].toString(), expression);
                        bucket.push({result: fields['name'], score: searchScore});
                    }
                }

                resolve(bucket);
            });

            let itemDescriptionPromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data.menuByItem[key].fields;
                
                    if (expression.test(fields['description'])) {
                        let fields = data.menuByItem[key].fields;
                        let searchScore = this.score(fields['description'].toString(), expression);
                        bucket.push({result: fields['description'], score: searchScore});
                    }
                }

                resolve(bucket);
            });
            
            

            let [sections, price, itemName, itemDesc] = await Promise.all([sectionsPromise, pricePromise, itemNamePromise, itemDescriptionPromise]);

            
            big_bucket = big_bucket.concat(sections, price, itemName, itemDesc);
            big_bucket.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
            
            let actionables = [];
            big_bucket.map(x => actionables.push(x.result));
            return actionables;
        }
    }


    score = (entry, regex, field) => {
        let matched = entry.match(regex);
        if (matched) {
            let result;
            switch (field) {
                case 'price':
                    let weight = 0;
                    // weight decimal places and commas(maybe?) higher for prices
                    for (let char of entry) {
                        if (char === '.' || char === ',') {
                            weight += .20;
                        }
                    }

                    result = (matched.length / entry.length) + weight;
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