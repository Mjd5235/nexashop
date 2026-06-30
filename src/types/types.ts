export interface productTypes {
    id: number;
    product_id: number;
    user_id: number;
    created_at: number;
    primary_key: number;
    image: string;
    image_path: string;
    title: string;
    description: string;
    time: number;
    stock: number;
    quantity: number;
    price: number;
    oldPrice: number;
    category: string;
    features: string;
}

export interface CartType {
    id: number;
    product_id: number;
    user_id: number;
    created_at: number;
    primary_key: number;
    image: string;
    image_path: string;
    title: string;
    description: string;
    time: number;
    stock: number;
    price: number;
    oldPrice: number;
    category: string;
    features: string;
    quantity: number;
    products: {
        primary_key: number;
        title: string;
        image: string;
        price: number;
        oldPrice: number;
        time: number;
        stock: number;
        category: string;
    };
}


export interface OrderType {
    id: string;
    created_at: number;
    status: string;
    total_price: number;
    user_id: number;
    user_email: string;
    user_avatar: string;
    cart_items: [{
        product_id: number;
        image: string;
        title: string;
        price: number;
        category: string;
        quantity: number;
    }]
}