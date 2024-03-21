// LineBotResponse
export interface LineBotResponse {
  success: boolean;
  data: Array<LineBotConfig>;
  message: string;
}
export interface LineBotConfig {
  id: number;
  partner_id: string;
  logo: string;
  name: string;
  channel_secret: string;
  channel_token: string;
  basic_id: string;
  qrcode: string;
  channel_type: number;
  linebot_liff: string;
  check_linebot_notify_premission: string;
  check_coupon_premission: string;
  check_member_change_address: string;
  check_order_edit_premission: string;
  check_order_ship_status: number;
  check_line_liff_hotnews_premission: number;
  check_line_liff_question_premission: number;
  pay_premission: string;
  pay_way: string;
  pay_way_description: string | null;
  MerchantID: string;
  pay_hash_key: string;
  pay_hash_iv: string;
  reception_hash_key: string;
  reception_hash_iv: string;
  line_pay_channel_id: string;
  line_pay_secret_key: string;
  line_liff_primary_color: string;
  line_liff_page_word_color: string;
  line_liff_page_background_color: string;
  line_liff_sidebar_word_color: string;
  line_liff_sidebar_background_color: string;
  line_liff_footer_word_color: string;
  line_liff_footer_background_color: string;
  line_liff_hotnews_word_color: string;
  line_liff_hotnews_background_color: string;
  line_liff_question_word_color: string;
  line_liff_question_background_color: string;
  order_description: string | null;
}

// GroupsResponse
export interface GroupsResponse {
  success: boolean;
  data: Array<GroupData>;
  message: string;
}
export interface GroupData {
  id: number;
  partner_id: string;
  groupbuy_id: string;
  title: string;
  description: string | null;
  start_at: string;
  end_at: string;
  on_sale: number;
  created_at: string;
  updated_at: string;
}

// ProductsResponse
export interface ProductsResponse {
  success: boolean;
  data: {
    all_shop_list: Array<Product>;
  };
  message: string;
}
export interface Product {
  id: number;
  groupbuy_id: number;
  product_id: number;
  created_at: string;
  updated_at: string;
  partner_id: string;
  shop_category_id: number | string;
  title: string;
  productword: string;
  description: string;
  image: string | null;
  sellingprice: number | null;
  price: number;
  on_sale: number;
  disable: number;
  type: number;
  option: number;
  kind: number;
  limit_product: number;
  limit_product_amount: number;
  limit_total_product: number;
  limit_total_product_amount: number;
  product_vip: number;
  product_preview: number;
  practice_order_amount: number;
  practice_is_pay_order_amount: number;
}



// IsLoginResponse
export interface IsLoginResponse {
  success: boolean;
  data: null;
  message: string;
}

// OrderResponse
export interface OrderResponse {
  success: boolean;
  data: OrderData;
  message: string;
}
export interface OrderData {
  partner_id: string;
  user_id: string;
  groupbuy_id: number;
  receive_address: string;
  receive_email: string;
  receive_name: string;
  receive_phone: string;
  pay_type: number;
  orderItem: Array<OrderItem>;
  mid: number;
  mobile: string;
  order_sn: string;
  address: string;
  total: number;
}
export interface OrderItem {
  product_id: number;
  qty: number;
}

// NewsResponse
export interface NewsResponse {
  success: boolean;
  data: Array<News>;
  message: string;
}
export interface News {
  hotnews_id: number;
  hotnews_title: string;
  hotnews_content: string;
  hotnews_photo: string | null;
  hotnews_category_id: number;
  hotnews_status: number;
  partner_id: string;
  hotnews_datetime: string;
  hotnews_category_name: string;
}

// QuestionApiResponse
export interface QuestionResponse {
  success: boolean;
  data: Array<Questions>;
  message: string;
}
export interface Questions {
  question_id: number;
  question_title: string;
  question_content: string;
  question_photo: string | null;
  question_status: number;
  partner_id: string;
  question_category_id: number;
  question_datetime: string;
  question_category_name: string;
}
