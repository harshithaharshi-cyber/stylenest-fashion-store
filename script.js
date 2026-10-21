const products = [
  {id:1,brand:"STUDIO EDIT",name:"Soft Knit Cardigan",category:"Women",price:1299,oldPrice:1899,rating:4.8,badge:"BESTSELLER",image:"https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=85"},
  {id:2,brand:"NORTH & CO.",name:"Everyday Oversized Tee",category:"Men",price:599,oldPrice:899,rating:4.6,badge:"NEW",image:"https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=85"},
  {id:3,brand:"MUSE LABEL",name:"The Weekend Dress",category:"Women",price:1799,oldPrice:2499,rating:4.9,badge:"TRENDING",image:"https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=700&q=85"},
  {id:4,brand:"FORM & FUNCTION",name:"Classic Everyday Tote",category:"Accessories",price:899,oldPrice:1299,rating:4.7,badge:"JUST IN",image:"https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=700&q=85"},
  {id:5,brand:"NORTH & CO.",name:"Relaxed Linen Shirt",category:"Men",price:1499,oldPrice:1999,rating:4.5,badge:"EASY FIT",image:"https://images.unsplash.com/photo-1602810318383-e386cc2a3ccf?auto=format&fit=crop&w=700&q=85"},
  {id:6,brand:"STUDIO EDIT",name:"Minimal Gold Earrings",category:"Accessories",price:499,oldPrice:799,rating:4.8,badge:"GIFT PICK",image:"https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=700&q=85"},
  {id:7,brand:"MUSE LABEL",name:"City Days Co-ord",category:"Women",price:2199,oldPrice:2999,rating:4.7,badge:"LOW STOCK",image:"https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=700&q=85"},
  {id:8,brand:"NORTH & CO.",name:"Weekend Sneakers",category:"Men",price:1899,oldPrice:2599,rating:4.6,badge:"POPULAR",image:"https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=700&q=85"}
];
const state = {category:"All", search:"", sort:"featured", wishlist:new Set(), cart:new Map(), wishlistOnly:false};
const grid = document.getElementById("productGrid");
const money = value => "₹" + value.toLocaleString("en-IN");
const byId = id => products.find(p => p.id === Number(id));

function filteredProducts(){
  let list = products.filter(p => (state.category === "All" || p.category === state.category) &&
    (p.name + " " + p.brand + " " + p.category).toLowerCase().includes(state.search.toLowerCase()) &&
    (!state.wishlistOnly || state.wishlist.has(p.id)));
  if(state.sort === "low") list.sort((a,b)=>a.price-b.price);
  if(state.sort === "high") list.sort((a,b)=>b.price-a.price);
  if(state.sort === "rating") list.sort((a,b)=>b.rating-a.rating);
  return list;
}
function renderProducts(){
  const list = filteredProducts();
  document.getElementById("resultCount").textContent = `Showing ${list.length} ${list.length===1?"style":"styles"}`;
  grid.innerHTML = list.map(p=>`
    <article class="product-card">
      <div class="product-photo">
        <img src="${p.image}" alt="${p.name}" loading="lazy" onerror="this.src='https://placehold.co/600x800/f2eee8/242424?text=StyleNest'">
        <span class="product-badge">${p.badge}</span>
        <button class="wish-button ${state.wishlist.has(p.id)?"wished":""}" data-wish="${p.id}" aria-label="${state.wishlist.has(p.id)?"Remove from":"Add to"} wishlist">${state.wishlist.has(p.id)?"♥":"♡"}</button>
        <button class="quick-add" data-add="${p.id}">ADD TO BAG +</button>
      </div>
      <div class="product-info"><p class="product-brand">${p.brand}</p><h3 class="product-name">${p.name}</h3>
        <div class="product-bottom"><div><span class="product-price">${money(p.price)}</span><span class="old-price">${money(p.oldPrice)}</span></div><span class="product-rating">★ ${p.rating}</span></div>
      </div>
    </article>`).join("");
  document.getElementById("emptyState").classList.toggle("hidden",list.length>0);
  grid.classList.toggle("hidden",list.length===0);
  document.getElementById("wishlistToggle").style.color = state.wishlistOnly ? "var(--orange)" : "";
  document.querySelectorAll(".filter-pill").forEach(b=>b.classList.toggle("selected",b.dataset.filter===state.category));
  document.querySelectorAll(".nav-link").forEach(b=>b.classList.toggle("active",b.dataset.category===state.category));
}
function showToast(message){const t=document.getElementById("toast");t.textContent=message;t.classList.add("show");clearTimeout(showToast.timer);showToast.timer=setTimeout(()=>t.classList.remove("show"),2200);}
function updateCartCount(){const count=[...state.cart.values()].reduce((sum,item)=>sum+item.qty,0);document.getElementById("cartCount").textContent=count;document.getElementById("drawerCount").textContent=`(${count})`;}
function addToCart(id){const p=byId(id);if(!p)return;const item=state.cart.get(p.id);state.cart.set(p.id,{product:p,qty:item?item.qty+1:1});renderCart();updateCartCount();showToast(`${p.name} added to your bag`);}
function renderCart(){
  const wrap=document.getElementById("cartItems");const entries=[...state.cart.values()];
  if(!entries.length){wrap.innerHTML='<div class="cart-empty"><div style="font-size:35px;margin-bottom:12px">♧</div>Your bag is waiting for a little something.<br><br><button class="text-button" id="continueShopping">Continue shopping ↗</button></div>';}
  else wrap.innerHTML=entries.map(({product:p,qty})=>`<div class="cart-item"><img src="${p.image}" alt=""><div><h4>${p.name}</h4><p>${money(p.price)}</p><div class="quantity-controls"><button data-qty="${p.id}" data-change="-1" aria-label="Decrease quantity">−</button><span>${qty}</span><button data-qty="${p.id}" data-change="1" aria-label="Increase quantity">+</button></div></div><button class="remove-item" data-remove="${p.id}">Remove</button></div>`).join("");
  const total=entries.reduce((sum,item)=>sum+item.product.price*item.qty,0);document.getElementById("subtotal").textContent=money(total);updateCartCount();
}
function openCart(){document.getElementById("cartDrawer").classList.add("open");document.getElementById("overlay").classList.remove("hidden");document.getElementById("cartDrawer").setAttribute("aria-hidden","false");document.body.style.overflow="hidden";}
function closeCart(){document.getElementById("cartDrawer").classList.remove("open");document.getElementById("overlay").classList.add("hidden");document.getElementById("cartDrawer").setAttribute("aria-hidden","true");document.body.style.overflow="";}
function setCategory(category){state.category=category;state.wishlistOnly=false;renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth",block:"start"});}
document.addEventListener("click",e=>{
  const add=e.target.closest("[data-add]");if(add){addToCart(add.dataset.add);return;}
  const wish=e.target.closest("[data-wish]");if(wish){const id=Number(wish.dataset.wish);state.wishlist.has(id)?state.wishlist.delete(id):state.wishlist.add(id);renderProducts();showToast(state.wishlist.has(id)?"Saved to wishlist":"Removed from wishlist");return;}
  const category=e.target.closest("[data-category]");if(category){setCategory(category.dataset.category);return;}
  const filter=e.target.closest("[data-filter]");if(filter){state.category=filter.dataset.filter;state.wishlistOnly=false;renderProducts();return;}
  const qty=e.target.closest("[data-qty]");if(qty){const id=Number(qty.dataset.qty),item=state.cart.get(id);if(item){item.qty+=Number(qty.dataset.change);if(item.qty<=0)state.cart.delete(id);renderCart();}return;}
  const remove=e.target.closest("[data-remove]");if(remove){state.cart.delete(Number(remove.dataset.remove));renderCart();showToast("Item removed");return;}
  if(e.target.id==="continueShopping"){closeCart();}
});
document.getElementById("searchInput").addEventListener("input",e=>{state.search=e.target.value;renderProducts();});
document.getElementById("sortSelect").addEventListener("change",e=>{state.sort=e.target.value;renderProducts();});
document.getElementById("wishlistToggle").addEventListener("click",()=>{state.wishlistOnly=!state.wishlistOnly;state.category="All";renderProducts();document.getElementById("shop").scrollIntoView({behavior:"smooth"});if(state.wishlistOnly&&!state.wishlist.size)showToast("Tap the heart on a product to save it");});
document.getElementById("cartToggle").addEventListener("click",openCart);
document.getElementById("closeCart").addEventListener("click",closeCart);
document.getElementById("overlay").addEventListener("click",closeCart);
document.getElementById("shopNow").addEventListener("click",()=>document.getElementById("shop").scrollIntoView({behavior:"smooth"}));
document.getElementById("resetFilters").addEventListener("click",()=>{state.category="All";state.search="";state.wishlistOnly=false;document.getElementById("searchInput").value="";renderProducts();});
document.getElementById("checkoutButton").addEventListener("click",()=>showToast(state.cart.size?"Checkout is a demo — payment is not enabled":"Your bag is empty"));
document.getElementById("newsletterForm").addEventListener("submit",e=>{e.preventDefault();document.getElementById("newsletterMessage").textContent="You're on the list! (Demo signup only)";document.getElementById("emailInput").value="";});
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeCart();});
renderProducts();renderCart();
