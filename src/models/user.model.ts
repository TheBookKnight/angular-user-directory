/**
 * Company represents the company object that is part of the user object.
 * @param name - The name of the company.
 * @param catchPhrase - The catch phrase of the company.
 * @param bs - The business statement of the company.
 */
export interface Company {
    name: string;
    catchPhrase: string;
    bs: string
}

/**
 * Address represents the address object that is part of the user object.
 * @param street - The street of the address.
 * @param suite - The suite of the address.
 * @param city - The city of the address.
 * @param zipcode - The zipcode of the address.
 * @param geo - The geo object of the address.
 */
export interface Address {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: Geo;
}

/**
 * Geo represents the geo object that is part of the address object.
 * @param lat - The latitude of the geo object.
 * @param lng - The longitude of the geo object.
 */
export interface Geo {
    lat: string;
    lng: string;
}

/**
 * User represents the user object that is the main object of the application.
 * @param id - The ID of the user.
 * @param name - The name of the user.
 * @param username - The username of the user.
 * @param email - The email of the user.
 * @param address - The address of the user.
 * @param phone - The phone number of the user.
 * @param website - The website of the user.
 * @param company - The company of the user.
 */
export interface User {
    id: number;
    name: string;
    username: string;
    email: string;
    address: Address;
    phone: string;
    website: string;
    company: Company;
}
