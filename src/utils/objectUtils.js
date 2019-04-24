export const sortByValue = (obj) => {
    const newObj = {};
    const sortable = Object.keys(obj).map(key => [key, obj[key]]);
    sortable.sort((a,b) => a[1] - b[1]);
    sortable.forEach(obj => {
      newObj[obj[0]] = obj[1]
    });

    return newObj;
};