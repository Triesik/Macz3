import {useEffect, useState} from "react";

export async function GetScoreBoard(username, password) {
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:9090/login", true);
    xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
            var scores = JSON.parse(xhr.responseText);
            console.log(scores);
        }
    };
    xhr.send();

    let response = await new Promise(resolve => {
        var xhr = new XMLHttpRequest();
        xhr.open("GET", url, true);
        xhr.onload = function(e) {
            // to co jest w 7-10
            resolve(xhr.response);
        };
        xhr.onerror = function () {
            resolve(undefined);
            console.error("** An error occurred during the XMLHttpRequest");
        };
        xhr.send();
    })

    return response
}