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
}