import { environment } from 'src/environments/environment'

export const baseUrl = environment.production ? 'TODO prod env' : 'https://44xbz91fj2.execute-api.eu-central-1.amazonaws.com/development/'

export const productsUrl = baseUrl + '/getAllProducts'
export const productUrl = baseUrl + '/product?id='
export const cartUrl = baseUrl + '/cart'
