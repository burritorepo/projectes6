"use strict";
import "../../scss/pages/_users.scss";
class Users {
    constructor() {
        this.urlBase = 'https://reqres.in/api';
        this.init();
    }

    getData(url, query) {
        return fetch(`${this.urlBase}/${url}${query}`)
    };

    async handleData(promise) {
        try {
            let response = await promise;
            let users = await response.json();

            this.insertDom(this.makeTemplate(users));
        } catch (err) {
            this.handleError(err);
        }
    };

    handleError() {
        console.log('error!!')
    };

    makeTemplate(users) {
        let { data: listUsers } = users;
        let usersArr = [];
        usersArr = listUsers.map((user) => {
            let template = `<div class="col"><div class="card">
                <img src="${user.avatar}" class="card-img-top" alt="${user.first_name}">
                <div class="card-body">
                    <h5 class="card-title">${user.first_name}</h5>
                    <p class="card-text">${user.last_name}</p>
                    <a href="/users/${user.id}" class="btn btn-primary">Detail</a>
                </div>
            </div></div>`;

            return template;
        })

        return `<div class="page page-users"><div class="container d-flex flex-nowrap">${usersArr.join('')}</div></div>`;
    }

    makePagination() {
        
    }

    insertDom(element) {
        document.querySelector('#main').innerHTML += element;
    }

    init() {
        this.handleData(this.getData('users', '?page=2'));
    }
}

let users = new Users();
