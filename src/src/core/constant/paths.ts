enum PathEnum {
    ROOT = '/',
    LOGIN = '/auth/login',
    REGISTER = '/auth/register',
    PRODUCTS = '/products',
    SETTINGS = '/',
    HELP = '/'
}

export const publicRoutes: Array<string> = [
    'auth'
]

export default PathEnum