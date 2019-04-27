import React from 'react';

class MenuSearch extends React.Component {
    constructor(props) {
        super(props);
        this.result = [];
    }

    search = async input => {
        const blackList = ['.', '!', '@', '#', '$', '%', '^', '&', '*', '(', ')', '_', '+', '-', '='];
        const {data} = this.props;
        const _dataKeys = Object.keys(data.menuByItem);
        let big_bucket = [];
        let treated_input = '';

        for (let i = 0; i < input.length; i++) {
            let character = input.charAt(i);
            let found = blackList.find((element) => element);
            if (found) {
                treated_input = `${treated_input}\\${character}`;
            } else {
                treated_input = `${treated_input}${input.charAt(i)}`;
            }
        }

        if (treated_input) {
            let expression = new RegExp(`${treated_input}`, 'gi');

            // initial pruning of results
            let sectionsPromise = new Promise(resolve => {
                let bucket = [];
                for (const key of _dataKeys) {
                    let fields = data.menuByItem[key].fields;
                    if (expression.test(fields['category'])) {
                        let fields = data.menuByItem[key].fields;
                        let searchScore = this.score(fields['category'].toString(), expression);
                        bucket.push({result: fields['category'], score: searchScore, id: fields.id});
                    }
                }

                resolve(bucket);
            });

            let pricePromise = new Promise(resolve => {
                let bucket = [];
                let expression = new RegExp(`${treated_input}`, 'gi');
                for (const key of _dataKeys) {
                    let fields = data.menuByItem[key].fields;

                    if (expression.test(fields['price'])) {
                        let fields = data.menuByItem[key].fields;
                        let searchScore = this.score(fields['price'].toString(), expression, 'price');
                        bucket.push({result: fields['price'], score: searchScore, id: fields.id});
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
                        bucket.push({result: fields['name'], score: searchScore, id: fields.id});
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
                        let searchScore = fields['description'] ? this.score(fields['description'].toString(), expression): '0.000';
                        bucket.push({result: fields['description'], score: searchScore, id: fields.id});
                    }
                }

                resolve(bucket);
            });

            // parallel execution
            let [sections, price, itemName, itemDesc] = await Promise.all([sectionsPromise, pricePromise, itemNamePromise, itemDescriptionPromise]);

            // concat to one array
            big_bucket = big_bucket.concat(sections, price, itemName, itemDesc);

            // prune away scores property from output
            let actionables = [];

            // filters out and scores duplicate id's
            let holder = {};
            for (let i = 0; i < big_bucket.length; i++) {

                if (holder.hasOwnProperty(big_bucket[i].id)) {
                    holder[big_bucket[i].id] = {...big_bucket[i], score: (parseFloat(big_bucket[i].score) + 0.2).toString()};
                } else {
                    holder[big_bucket[i].id] = {...big_bucket[i]};
                }
            }

            Object.keys(holder).map(x => actionables.push(holder[x]));

            // sort by match score (highest - lowest)
            actionables.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));

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


    handleInput = (value) => {
        const {onInput} = this.props;

        this.search(value).then(result => {
            if (result) {
                onInput(result);
            } else {
                onInput([]);
            }
        });
    }

    render() {
        return (
            <div>
                <input type="search" placeholder="Search" onChange={(e) => this.handleInput(e.target.value)}/>
            </div>
        );
    }
}

export default MenuSearch;
