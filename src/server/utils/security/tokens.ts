import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";

import config from "../../config/development";
import DB from "../../db";

export const CreateToken = async (payload: IPayload) => {
    await DB.AccessTokens.Insert(payload.userid);
    let [tokenid]: any = await DB.AccessTokens.Last();
    payload.accesstokenid = tokenid.id;
    payload.unique = crypto.randomBytes(32).toString("hex");
    let token = await jwt.sign(payload, config.auth.secret);
    await DB.AccessTokens.Update(payload.accesstokenid, token);
    return token;
};

export const ValidToken = async (token: string) => {
    let payload: IPayload = <IPayload>jwt.decode(token);
    let [accesstokenid] = await DB.AccessTokens.FindOne(
        payload.accesstokenid,
        token
    );
    if (!accesstokenid) throw new Error("Invalid Token!");
    else return payload;
};

export interface IPayload {
    [key: string]: any;

    userid: number;
    unique?: string;
}
