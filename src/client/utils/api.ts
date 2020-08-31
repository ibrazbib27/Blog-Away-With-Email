import * as fetch from "isomorphic-fetch";

export let AccessToken: string = localStorage.getItem("token") || null;
export let User: any = {
    userid: localStorage.getItem("userid") || null,
    role: localStorage.getItem("role") || null,
};

export const json = async <T = any>(
    uri: string,
    methods: string = "GET",
    body?: {}
) => {
    let header: any = {
        "Content-type": "application/json;charset=utf-8",
    };

    if (AccessToken) {
        header["Authorization"] = `Bearer ${AccessToken}`;
    }

    try {
        let result: any;
        if (methods === "GET") {
            result = await fetch(uri, {
                method: methods,
            });
        } else if (methods === "DELETE") {
            result = await fetch(uri, {
                method: methods,
                headers: header,
            });
        } else {
            result = await fetch(uri, {
                method: methods,
                headers: header,
                body: JSON.stringify(body),
            });
        }

        if (result.ok) return <T>await result.json();
        else false;
    } catch (e) {
        console.log(e);
        throw e;
    }
};

export const SetAccessToken = (
    token: string,
    user: {} = { userid: undefined, role: "admin" }
) => {
    AccessToken = token;
    User = user;

    localStorage.setItem("token", token);
    localStorage.setItem("userid", User.userid);
    localStorage.setItem("role", User.role);
};
