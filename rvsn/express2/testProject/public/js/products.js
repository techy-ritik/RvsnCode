const productForm = document.querySelector('.productForm')

productForm.addEventListener('submit',(event)=>{
    event.preventDefault();

    const productObj = {
        productName : document.getElementById('product').value,
    } 

    console.log(productObj)
    axios.post("http://localhost:4000/products",productObj)
    .then((result)=>{
        console.log(result)
    })
    .catch((err)=>{
        console.log(err);
    })
})