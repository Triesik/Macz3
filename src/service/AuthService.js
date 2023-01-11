import {useEffect, useState} from "react";

export async function Authenticate(username, password) {
    return fetch("http://localhost:9090/login", {
        method: 'POST',
        body: JSON.stringify({username: username, password: password})
    })
        .then(async response => {
            if(response.statusText!== "OK")
                return await response.text();

            const json = await response.json();
            localStorage.setItem('JWT', json.token);
            return "";
        })
        .catch(error => {
            debugger;
            return error.toString();
        });
}