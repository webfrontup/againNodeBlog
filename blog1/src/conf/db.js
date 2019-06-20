const env = process.env.NODE_ENV

let MYSQL_CONF

if(env === 'dev'){
    MYSQL_CONF = {
		host: "localhost",
		user: "root",
		password: "root",
		port: "33061",
		database: "myblog"
	};
}


if (env === "production") {
    MYSQL_CONF = {
		host: "localhost",
		user: "root",
		password: "root",
		port: "33062",
		database: "myblog"
	};
}

module.exports = {
	MYSQL_CONF: MYSQL_CONF
};
