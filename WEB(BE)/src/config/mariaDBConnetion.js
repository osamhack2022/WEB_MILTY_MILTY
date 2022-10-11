const mysql = require('mysql');
const conn = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_ID,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_TABLE,
};

var connection = mysql.createConnection(conn);  // DB 커넥션 생성
connection.connect(); // DB 접속


connection.query(query, function (err, results, fields) {
  if (err) {
    console.log("DB sql 오류 : " + err);
  }
  console.log("DB sql 성공 : " + err);
});

connection.end(); // DB 접속 종료

const sql = {                     // DB sql 간편하게 쓸 수 있게 옵션 같은 메서드를 만들었습니다.
  selectUser: function (find) {
  },
}