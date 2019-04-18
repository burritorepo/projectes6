"use strict";
import "../../styles/pages/_detail-users.scss";
import { Users } from './users';

export class DetailUser {
    constructor(id) {
        console.log('contructor!!')
        this.urlBase = 'https://reqres.in/api';
        this.idUser = id;
        this.init();
    }

    getData(entity, query) {
        return fetch(`${this.urlBase}/${entity}${query}`)
    };

    async handleData(promise) {
        let response = await promise;
        let user = await response.json();

        this.userMakeTemplate(user);
    };

    /**
     * 
     */
    handleError() {
        console.log('error!!')
    };

    goBack() {
        console.log('volver!!')
        new Users();
    }

    userMakeTemplate(user) {
        let {data: userData} = user;
        let div = document.createElement('div');

        div.classList.add('page');
        div.classList.add('page-detail-users');

        div.innerHTML = `<div class="container">
            <div class="col">
                <button type="button" class="btn btn-dark mb-3">Volver</button>
                <img src="${userData.avatar}" class="card-img-top" alt="${userData.first_name}">
                <div class="card-body">
                    <h5 class="card-title">${userData.first_name}</h5>
                    <p class="card-text">${userData.last_name}</p>
                </div>
            </div>
        </div>`;

        div.querySelector('button').addEventListener('click', this.goBack);

        document.querySelector('#main').innerHTML = '';
        document.querySelector('#main').appendChild(div);
    }

    init() {
        this.handleData(this.getData('users', `/${this.idUser}`))
    }
};