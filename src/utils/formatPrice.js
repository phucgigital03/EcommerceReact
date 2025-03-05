

export const formatPrice = (amount)=>{
    return new Intl.NumberFormat("en-US",{
        style: "currency",
        currency: "USD"
    }).format(amount)
}

export const formatCalculatePrice = (price,quantity)=>{
    return (Number(quantity) * Number(price)).toFixed(2);
}
