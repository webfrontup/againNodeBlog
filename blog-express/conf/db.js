const env = process.env.NODE_ENV

let MYSQL_CONF
let REDIS_CONF

if(env === 'dev'){
    MYSQL_CONF = {
		host: "localhost",
		user: "root",
		password: "root",
		port: "33062",
		database: "myblog"
    };
    // redis
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}


if (env === "production") {
    MYSQL_CONF = {
		host: "localhost",
		user: "root",
		password: "root",
		port: "33062",
		database: "myblog"
    };
    REDIS_CONF = {
        port: 6379,
        host: '127.0.0.1'
    }
}

module.exports = {
	MYSQL_CONF: MYSQL_CONF,
	REDIS_CONF
};
