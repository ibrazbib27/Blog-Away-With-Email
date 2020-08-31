import {Connection} from "../index";

const findOne = async (id: number, token: string) => {
    return new Promise<Array<any>>((res, rej) => {
        Connection.query(
            `SELECT * FROM Blogs.Accesstokens WHERE id = ${id} AND token = '${token}';`,
            (err, result) => {
                if (err) return rej(err);
                res(result);
            }
        );
    });
};

const insert = async (userid: number) => {
    return new Promise<Array<any>>((res, rej) => {
        Connection.query(
            `INSERT INTO Blogs.Accesstokens (userid) VALUES (${userid});`,
            (err, result) => {
                if (err) return rej(err);
                res(result);
            }
        );
    });
};

const last = async () => {
    return new Promise<Array<any>>((res, rej) => {
        Connection.query(
            `SELECT id FROM Blogs.Accesstokens ORDER BY id DESC LIMIT 1;`,
            (err, result) => {
                if (err) return rej(err);
                res(result);
            }
        );
    });
};

const update = async (id: number, token: string) => {
    return new Promise<Array<any>>((res, rej) => {
        Connection.query(
            `UPDATE Blogs.Accesstokens SET token = '${token}' WHERE id = ${id};`,
            (err, result) => {
                if (err) return rej(err);
                res(result);
            }
        );
    });
};

export default {
    FindOne: findOne,
    Insert: insert,
    Update: update,
    Last: last,
};
