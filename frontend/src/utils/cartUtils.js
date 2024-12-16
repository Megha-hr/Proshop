export const addDecimals=(num)=>{
    return (Math.round(num*100)/100).toFixed(2);
}

export const upadateCart=(state)=>{
     //calculate items price
    state.itemPrice=addDecimals(state.cartItems.reduce((acc,item)=>acc+item.price*item.qty,0));
    //calculate shipping price
    state.shippingPrice=addDecimals(state.items>100?0:10);
    //calculate tax price
    state.taxPrice=addDecimals(Number((0.15*state.itemPrice).toFixed(2)));
   
    //calculate total price
    state.Total=(Number(state.itemPrice)+Number(state.shippingPrice)+Number(state.taxPrice)).toFixed(2);
 
    localStorage.setItem('cart',JSON.stringify(state))
    return state;
}