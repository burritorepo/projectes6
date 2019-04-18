"use strict";
 

import {DetailUser} from './detail-user';

export class Users {
    /**
     * 
     */
    constructor() {
        this.urlBase = 'https://reqres.in/api';
        this.init();
    };

    /**
     * 
     * @param {*} url 
     * @param {*} query 
     */
    getData(entity, query) {
        return fetch(`${this.urlBase}/${entity}${query}`)
    };

    async handleData(promise) {

        let response = await promise;
        let users = await response.json();

        this.usersMakeTemplate(users);
        this.paginationMakeTemplate(users);

        // this.handleError('err', err)

    };

    /**
     * 
     */
    handleError() {
        console.log('error!!')
    };

    /**
     * 
     * @param {*} id 
     * @param {*} e 
     */
    goDetail(id, e) {
        e.preventDefault();
        new DetailUser(id);
    }

    /**
     * 
     * @param {*} users 
     */
    usersMakeTemplate(users) {
        let { data: listUsers } = users;
        document.querySelector('#users').innerHTML = `<div class="page page-users"> <div class="container d-flex flex-nowrap"></div></div>`;

        listUsers.forEach((user) => {
            let div = document.createElement('div');

            div.classList.add('col');

            div.innerHTML = `<div class="card">
                <img src="${user.avatar}" class="card-img-top" alt="${user.first_name}">
                <div class="card-body">
                    <h5 class="card-title">${user.first_name}</h5>
                    <p class="card-text">${user.last_name}</p>
                    <a href="#" class="btn btn-primary">Detail</a>
                </div>
            </div>`

            div.querySelector('.btn').addEventListener('click', this.goDetail.bind(this, user.id))

            document.querySelector('#users .container').appendChild(div);
        });
    };

    /**
     * 
     * @param {*} users 
     */
    paginationMakeTemplate(users) {

        if (!document.querySelector('#users-nav').children.length) {
            let { total_pages, page } = users;
            let ul = document.createElement('ul');

            ul.classList.add('pagination', 'justify-content-center');

            let pagination = (query, e) => {
                e.stopPropagation();
                let liList = e.target.closest('ul').childNodes;
                let currentLi = e.target.closest('li');

                liList.forEach(element => {
                    element.classList.remove('active');
                });

                currentLi.classList.add('active');

                this.handleData(this.getData('users', query));
            }

            for (let i = 1; i <= total_pages; i++) {
                let li = document.createElement('li');
                let span = document.createElement('span');

                span.classList.add('page-link');
                span.innerHTML = `${i} `;
                span.addEventListener('click', pagination.bind(this, `?page=${i}`));

                li.appendChild(span);
                li.classList.add('page-item');

                if (i === page) {
                    li.classList.add('active');
                }

                ul.appendChild(li);
            };

            document.querySelector('#users-nav').appendChild(ul);
        }

        return false;
    };

    /**
     * 
     */
    makeTemplate() {
        document.querySelector('#main').innerHTML = '';
        
        let wrapper = document.querySelector('#main');
        let divContent = document.createElement('div');
        let divNav = document.createElement('div');

        divContent.setAttribute('id', 'users');
        divNav.setAttribute('id', 'users-nav');

        wrapper.appendChild(divContent);
        wrapper.appendChild(divNav);
    };

    /**
     * 
     */
    init() {
        this.makeTemplate()
        this.handleData(this.getData('users', '?page=1'));
    };
};

