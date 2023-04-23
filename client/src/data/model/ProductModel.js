

export default class ProductModel{
    constructor(){
        this.id = 1;
        this.title = "title";
        this.description = "description";
        this.price = 200;
        this.rating = 1;
        this.rate_count = 25;
        this.feature_image = "product_default.jpg";
        this.love = false;
        this.comment_ids = [];
        this.tags = [];
    }
}