const productNameField = document.getElementById('productName');
const productPriceField = document.getElementById('productPrice');
const table = document.getElementById('table');

const addToCart = () => {
    //Call the show data function to display data to UI
    showData(productNameField.value, productPriceField.value)
    //Call the function to update local storage
    updateLocalStorage()
    //Clearing input field
    productNameField.value = '';
    productPriceField.value = '';

}

//Check if there is any cart item or not
const getCart = () => {
    const cart = localStorage.getItem('cart');
    let cartObject;
    if (cart) {
        cartObject = JSON.parse(cart);
    } else {
        cartObject = {product: []};
    }
    return cartObject;
}

//Updating local storage
const updateLocalStorage = () => {
    const cartObject = getCart();
    const productName = productNameField.value;
    const productPrice = productPriceField.value;
    const productArr = cartObject.product;
    const productObj = { name: productName, price: productPrice };
    productArr.push(productObj);
    const newMergeObjectStringified = JSON.stringify(cartObject);
    localStorage.setItem('cart', newMergeObjectStringified)
}

//SHowing data to UI
const showData = (productName, productPrice) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
        <td>${productName}</td>
        <td>${productPrice}</td>
    `
    table.appendChild(tr);
}

//Updating UI with the data of local storage
const getDataLocalStorage = () => {
    const data = JSON.parse(localStorage.cart).product;
    data.forEach(e => {
        showData(e.name, e.price)
    });
}
getDataLocalStorage()