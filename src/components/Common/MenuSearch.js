import React from 'react';
import { tmpdir } from 'os';

class MenuSearch extends React.Component {
    constructor(props) {
        super(props);
        this.result = [];
    }

    // Sections: Drinks, Price: 4, Item Name: Coffee | Tea | Etc, Item Description: Batch Brew Filter 
    search = input => {
        const {data} = this.props;
        const _dataKeys = Object.keys(data);

        if (input) {
            let expression = new RegExp(`${input}`, 'gi');
            
            let bucket = [];
            for (const key of _dataKeys) {
                let fields = data[key].fields;
                console.log(fields["Item Description"])
                // refactor to run async
                if (expression.test(fields['Sections'])) {
                    let fields = data[key].fields;
                    let searchScore = this.score(fields['Sections'], expression);
                    bucket.push({result: fields['Sections'], score: searchScore});
                }

                if (expression.test(fields['Price'])) {
                    let fields = data[key].fields;
                    let searchScore = this.score(fields['Price'], expression);
                    bucket.push({result: fields['Price'], score: searchScore});
                }

                if (expression.test(fields['Item Name'])) {
                    let fields = data[key].fields;
                    let searchScore = this.score(fields['Item Name'], expression);
                    bucket.push({result: fields['Item Name'], score: searchScore});
                }

                if (expression.test(fields['Item Description'])) {
                    let fields = data[key].fields;
                    let searchScore = this.score(fields['Item Description'], expression);
                    bucket.push({result: fields['Item Description'], score: searchScore});
                }

            }

            // expression.sort((a,b) => (a.score < b.score) ? 1 : ((b.score < a.score) ? -1 : 0));
            let actionables = [];
            bucket.map(x => actionables.push(x.result));
            this.result = actionables;
            //console.log(actionables);

        }
    }

    score = (entry, regex) => {
        let matched = entry.match(regex);
        if (matched) {
            let result = matched.length / entry.length;
            return result.toFixed(3);
        }
    }

    render() {
        const {data} = this.props;
        console.log(this.search('tea'))
        return ( 
            <div> 
                { 'hello' } 
            </div>
        );
    }
}

export default MenuSearch;