import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  LineBotResponse,
  GroupsResponse,
  ProductsResponse,
  IsLoginResponse,
  OrderResponse,
  NewsResponse,
  QuestionResponse,
} from './types';

export type PartnerId = {
  partner_id: string;
}
export type GroupbuyId = {
  partner_id: string;
  groupbuy_id: string;
}

export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://shopstore-groupbuyapidev.openinfo.info/api'
  }),
  tagTypes: ['LineBot', 'Groups', 'Products', 'IsLogin', 'Order', 'News', 'Question'],
  endpoints: (builder) => ({
    getLineBot: builder.query<LineBotResponse, PartnerId>({
      query: (body) => ({
        url: 'groupbuy/linebot',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      providesTags: ['LineBot']
    }),
    getGroup: builder.query<GroupsResponse, PartnerId>({
      query: (body) => ({
        url: 'groupbuy',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      providesTags: ['Groups']
    }),
    getProducts: builder.query<ProductsResponse, GroupbuyId>({
      query: (body) => ({
        url: 'groupbuy/detail',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      providesTags: ['Products'],
    }),
    getIsLogin: builder.query<IsLoginResponse, void>({
      query: (body) => ({
        url: 'groupbuy/checkuser',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      providesTags: ['IsLogin'],
    }),
    createOrder: builder.mutation<OrderResponse, void>({
      query: (body) => ({
        url: 'groupbuy/createorder',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      invalidatesTags: ['Order'],
    }),
    getNews: builder.query<NewsResponse, PartnerId>({
      query: (body) => ({
        url: 'groupbuy/hotnews',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      providesTags: ['News'],
    }),
    getQuestion: builder.query<QuestionResponse, PartnerId>({
      query: (body) => ({
        url: 'groupbuy/question',
        method: 'POST',
        headers: { 'Content-Type': 'application/json', },
        body,
      }),
      providesTags: ['Question'],
    }),   
  }),
});

export const {
  useGetLineBotQuery,
  useGetGroupQuery,
  useGetProductsQuery,
  useGetIsLoginQuery,
  useCreateOrderMutation,
  useGetNewsQuery,
  useGetQuestionQuery,
} = api;
// https://zudemwango.medium.com/how-to-post-and-fetch-data-using-rtk-query-in-react-native-99f94e721885
