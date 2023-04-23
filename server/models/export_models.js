

// ############## DATABASE MODEL ####################
export class Admin{
    constructor(admin){
        this.name = admin.name || "Admin Name";
        this.email = admin.email || "admin@email";
        this.password = admin.password || "-";
        this.token = admin.token || "token";
        this.dp = admin.dp || "default_dp.png"
    }
}

//TODO Add New and Old Notification List contains notification id
export class User{
    constructor(user){
        this.id = user.id || "id";
        this.platform = user.platform || "google";
        this.level = user.level || "user";
        this.name = user.name || "User Name";
        this.email = user.email || "Email";
        this.mobile = user.mobile || "mobile";
        this.favourites = user.favourites || []; //product id
        this.orders = user.orders || []; // order id
        this.carts = user.carts || []; //cart id
        this.dp = user.dp || "default_dp.png";
        this.addresses = user.addresses || [];
        this.notifications = user.notifications || []; // notificaton ids
        this.inbox = user.inbox || [] // chat id
        this.followers = user.followers || []; //user ids
        this.following = user.following || []; //user ids
        this.products = user.products || []; //product ids
        this.Collections = user.Collections || []; //collection ids
        this.rating = user.rating || 5; //rating ids
        this.rate_count = user.rate_count || 1; //
        this.created_at = user.created_at || new Date();
        this.token = user.token || "token";
    }
}



export class Product{
    constructor(data){
        this.id = data.id || -1;
        this.creater = data.creater || "Creater";
        this.title = data.title || "Product Title";
        this.short = data.short || "short description";
        this.description = data.description || "product description";
        this.price = data.price || -1;
        this.feature_images = data.images || ["product_default.jpg", "product_default.jpg", "product_default.jpg"];
        this.rating = data.rating || 5;
        this.rate_count = data.rate_count || 1;
        this.tags = data.tags || "";
        this.review = data.review || "no review";
        this.favourites = data.favourites || []; //user id
        this.available = data.available || 0;
        this.created_at = data.created_at || new Date();
        this.reports = data.reports || [];
    }
}

export class Collection{
    constructor(data){
        this.id = data.id || "id";
        this.creater = data.creater || "Creater";
        this.title = data.title || "collecton";
        this.short = data.short || "short description"
        this.description = data.description || "description";
        this.feature_image = data.feature_image || "product_default.jpg";
        this.products = data.products || [];
        this.created_at = data.created_at || new Date();
        
    }
}


export class Order{
    constructor(order){
        this.id = order.id? order.id : "id";
        this.customer_id = order.customer_id || "user id";
        this.price = order.price||-1;
        this.cart_items = order.cart_items || []; // [product_id, count]
        this.created_at = order.created_at;
        this.status = order.status;
        this.transaction_no = order.transaction_no || "invalid";
        this.remarks = order.remarks || "remarks";
        this.tracking_id = order.tracking_id || "tracking id";
    }
}


export class Cart{
    constructor(item) {
        this.id = item.id || "id";
        this.customer_id = item.customer_id || "user id";
        this.cart_items =  item.cart_items || []; // [product_id, count]
        this.created_at = item.created_at || new Date();
    }
}


export class Session{
    constructor(entry)
    {
        this.id = entry.id || "id";
        this.time = entry.time || new Date();
        this.browser = entry.browser || "browser";
        this.user_id = entry.user_id || "user_id";
        this.token = entry.token || "token";
    }
}

export class Reports{
    constructor(data){
        this.id = data.id || "id";
        this.writer = data.writer || "user id";
        this.domain = data.domain || "domain";
        this.message = data.message || "message";
        this.created_at = data.created_at;
        this.status = data.status || "STATUS";
    }
}
export class HomePage {
    constructor(data) {
      this.feature_images = data.feature_images || [];
      this.collections = data.collections || [];
      this.products = data.products || [];
      this.notifications = data.notifications || [];
      this.greetings = data.greetings || "Welcome!";
    }
  }
  
  export class Review {
    constructor(data) {
      this.id = data.id || "id";
      this.writer = data.writer || "user id";
      this.message = data.message || "No message";
      this.time = data.time || new Date();
      this.sentiment = data.sentiment || "neutral";
    }
  }
  
  export class Message {
    constructor(data) {
      this.id = data.id || "id";
      this.sender = data.sender || "Unknown";
      this.receiver = data.receiver || "Unknown";
      this.message = data.message || "No message";
      this.time = data.time || new Date();
      this.status = data.status || "unseen" // delivered, seen, unseen, not delivered, failed, deleted
    }
  }
  
  export class Chat {
    constructor(data) {
      this.id = data.id || "id";
      this.subject = data.subject || "General";
      this.sender = data.sender || "Unknown";
      this.receiver = data.receiver || "Unknown";
      this.messages = data.messages || [];
    }
  }
// #######################################################
