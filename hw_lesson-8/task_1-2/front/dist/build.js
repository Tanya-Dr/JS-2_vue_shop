(()=>{"use strict";Vue.component("error-modal",{template:'\n        <transition name="modal">\n            <div class="modal-mask">\n                <div class="modal-wrapper">\n                    <div class="modal-container">  \n                        <div class="modal-header">\n                            <h3>Ошибка</h3>\n                        </div>\n  \n                        <div class="modal-body">\n                            <p>не удаётся выполнить запрос к серверу</p>\n                        </div>\n\n                        <div class="modal-footer">\n                            <button class="modal-default-button" @click="$emit(\'close\')">OK</button>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </transition>'}),Vue.component("search",{props:["value"],template:'\n        <div class="search">\n            <input type = "text" class = "goods-search" v-bind:value="value" v-on:input="$emit(\'input\', $event.target.value)" v-on:keyup.enter = "$emit(\'showresult\')">  \n            <button class = "search-button btn" type = "button" @click = "$emit(\'showresult\')">Search</button>\n        </div>  \n    '}),Vue.component("goods-list",{props:["goods"],template:'\n        <div>\n            <div class="goods-list" v-if = "goods.length !== 0">\n                <goods-item v-for="goodEntity in goods" :goodProp="goodEntity" :key="goodEntity.id" @showcart="$emit(\'getcart\')"></goods-item>\n            </div>\n            <div class="goods-list" v-else>\n                <h3 class="list__heading">Нет данных</h3>\n            </div>\n        </div>      \n    '});const t=(Vue.component("goods-item",{props:["goodProp"],methods:{async addToCart(){await fetch("http://localhost:3000/addToCart",{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(this.goodProp)}),this.$emit("showcart")}},template:'\n      <div class="goods-item">\n        <h3>{{goodProp.product_name}}</h3>\n        <p>{{goodProp.price}}</p>\n        <button type="button" @click=addToCart>Add To Cart</button>\n      </div>\n    '}),"http://localhost:3000"),o=(Vue.component("cart",{props:["goods","visability","sum"],methods:{async clearCart(){await fetch(`${t}/clearCart`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"}}),this.$emit("getcart")}},template:'\n        <div class="cart" v-if = "visability">\n            <div class="cart__header">\n                <h3 class = "cart__heading">Cart</h3>\n                <a href="#" class="cart__delete" @click = "$emit(\'closecart\')">\n                <svg class="card__cross" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">\n                <path d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z" fill="#575757"/>\n                </svg>\n                </a>\n            </div>\n    \n            <div class="cart-list" v-if = "goods.length !== 0">\n                <cart-item v-for="goodEntity in goods" :goodProp="goodEntity" :key="goodEntity.id" @showcart="$emit(\'getcart\')"></cart-item>                   \n            </div>\n            <h4 class="cart__heading_4" v-if = "goods.length !== 0">Total sum: {{sum}}</h4>\n            \n            <div class="cart-list" v-if = "goods.length == 0">\n                <h4 class="cart__heading_4">Корзина пустая</h4>\n            </div>                \n            <button class = "clear-button" type = "button" v-if = "goods.length !== 0" @click=clearCart>Clear cart</button>                \n        </div>    \n    '}),"http://localhost:3000"),s=(Vue.component("cart-item",{props:["goodProp"],methods:{async deleteFromCart(){await fetch(`${o}/deleteFromCart`,{method:"POST",mode:"cors",headers:{"Content-Type":"application/json;charset=utf-8"},body:JSON.stringify(this.goodProp)}),this.$emit("showcart")}},template:'\n      <div class="cart-item">\n        <h3>{{goodProp.product_name}}</h3>\n        <p>price: {{goodProp.price}}</p>\n        <p>quantity: {{goodProp.quantity}}</p>\n        <button type="button" @click=deleteFromCart>Delete</button>\n      </div>\n    '}),"http://localhost:3000");new Vue({el:"#app",data:{goods:[],filteredGoods:[],searchLine:"",cartList:[],isVisibleCart:!1,sum:0,showErrorModal:!1},methods:{async getProducts(){try{const t=await fetch(`${s}/catalogData`);if(t.ok){const o=await t.json();this.goods=o,this.filteredGoods=o}else this.showErrorModal=!0}catch{this.showErrorModal=!0}},async getCart(){const t=await fetch(`${s}/cartData`);if(t.ok){const o=await t.json();this.cartList=o}this.sumOfGoods()},filterGoods(){const t=new RegExp(this.searchLine,"i");this.filteredGoods=this.goods.filter((o=>t.test(o.product_name)))},showCart(){this.getCart(),this.isVisibleCart=!0},sumOfGoods(){this.sum=0,this.cartList.forEach((t=>{this.sum+=t.price*t.quantity}))}},async mounted(){await this.getProducts(),await this.getCart()}})})();