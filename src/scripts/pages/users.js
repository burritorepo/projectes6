"use strict";

class Users {
    constructor() {
        this.urlBase = 'https://reqres.in/api';
        this.init();
    }

    getData(url, query) {
        return fetch(`${this.urlBase}/${url}${query}`)
    };

    makeTemplate(data) {
        data.then((data) => {
            return data.json();
        }).then((data) => {
            console.log('data', data)
        })
    }

    insertDom() {

    }

    init() {
        this.makeTemplate(this.getData('users','?page=2'));
    }
}

let users = new Users();
