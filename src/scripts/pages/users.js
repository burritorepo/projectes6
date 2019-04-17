"use strict";
import "../../styles/pages/_users.scss";

class Users {
    constructor() {
        console.log('contructor!!!')
        this.urlBase = 'https://reqres.in/api';
        this.init();
    }

    getData(url, query) {
        return fetch(`${this.urlBase}/${url}${query}`)
    };

    async handleData(promise) {

        let response = await promise;
        let users = await response.json();
        this.insertDom(this.makeTemplate(users), this.makePagination(users));

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

    makePagination(users) {
        let { total_pages } = users;
        let colArr = [];
        for(let i= 1; i<=total_pages; i++) {
            colArr.push(`<li class="page-item">
            <a class="page-link" href="users?page=${i}">${i}</a>
          </li>`)
        };
        
        let template = `<ul class="pagination justify-content-center">
                ${colArr.join('')}   
            </li>
        </ul>`;


        return template;
    }

    insertDom(...element) {
        document.querySelector('#main').innerHTML += element.join('');

        document.querySelectorAll('.page-link').forEach((element) => {
            element.addEventListener('click', (e) => {
                // console.log('click', e.target.href)
                e.preventDefault();
                // console.log(e.getAttribute("href"))
                this.handleData(this.getData('users', '?page=3'));
            })
        })
    }

    init() {
        this.handleData(this.getData('users', '?page=2'));
    }
}

new Users();

