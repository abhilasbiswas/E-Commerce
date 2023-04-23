


export class User{
    constructor(user){
        this.name = user.name?user.name:"";
        this.email = user.email?user.email:"";
        this.mobile = user.mobile?user.mobile:"";
        this.favourites = user.favourites?user.favourites:[];
        this.orders = user.orders?user.orders:[];
        this.carts = user.carts?user.carts:[];
        this.dp = user.dp?user.dp:"https://ik.imagekit.io/abhilasbiswas/default_dp.png?updatedAt=1678945306750";
        this.addresses = user.addresses?user.addresses:[];
    }
}

export class ProductModel{
    constructor(data){
        this.id = data.id?data.id: -1;
        this.title = data.title?data.title : "";
        this.short = data.short?data.short : ""
        this.description = data.description?data.description:"";
        this.price = data.price?data.price : -1;
        this.feature_images = data.images?data.images:["product_default.jpg","product_default.jpg","product_default.jpg"];
        this.rating = data.rating?data.rating:5;
        this.tags = data.tags?data.tags:"";
        this.rate_count = data.rate_count?data.rate_count:1;
    }
}

export class Collection{
    constructor(data){
        this.id = data.id?data.id:-1;
        this.title = data.title?data.title:"";
        this.tags = data.tags?data.tags:[];
        this.description = data.description?data.description:"";
        this.feature_image = data.feature_image?data.feature_image:"product_default.jpg";
        this.products = data.products?data.products:[];

    }
}

