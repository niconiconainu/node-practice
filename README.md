こちらの記事で勉強中
https://zenn.dev/wkb/books/node-tutorial

## メモ
### Node.jsでHTTPサーバを構築しよう

httpサーバの構築には、「http」というモジュールを利用します。
モジュールとは、ある機能をもったプログラムのまとまりのことを指します。
httpモジュールはhttpサーバを構築する上で必要な機能を提供するモジュールです。
また、httpモジュールは標準モジュールといい、Node.jsに元から含まれているモジュールの1つで、Node.jsがインストールされていれば利用できます。
それに対し、Node.jsに元から含まれていないモジュールを外部モジュールといい、こちらは自身でインストールする必要があります。

HTTPレスポンスは以下の3要素で構成されます。

ステータス行
ステータス行では主にHTTPリクエストが成功したか失敗したを表すデータが入る
ヘッダー
送信するデータの情報などの追加情報が入る
本文
データの内容が入る

ポートとはネットワークがサーバを通る際のドアのようなもので、0〜65535番まであります。
サーバのポートが開いていないと通信ができませんが、さらに、ポートが待機状態 (listen) でない場合も通信できません。
→ポートを開くだけでなく、待機状態にする

構築したHTTPサーバにHTTPリクエストを送るためのURLはこちらです。
http://localhost:3000/
http://127.0.0.1:3000/

上記URLを分解して説明します。

http:
ここでは通信方式 (プロトコル) を指定します。
HTTP通信でリクエストを送るため、http:となります。

//localhost
ここではリクエスト先のサーバの住所となるIPアドレス、もしくはドメイン名を指定します。
ドメイン名とはIPアドレスに名前化したもので、DNSサーバというところでIPアドレスに変換されます。
localhostは特殊で、自身のPCを示しており、IPアドレスに変換すると、127.0.0.1となります。
今回は自身のPC内でHTTPサーバを実装し、node main.js によりHTTPサーバを起動したため、自身のPCがWebサーバとなっています。
そのため、自身のPC宛にHTTPリクエストを送ります。

:3000
ここではアクセス先のポート番号を指定しています。
3000番を待機状態にするよう実装しているため、3000を指定します。

### ToDoアプリをExpressで作成しよう
`express --view=ejs todoapp`
--viewでテンプレートエンジンを指定します。
今回はejsというテンプレートエンジンを使用します。

router.post()内ではレンダリングを行わず、GETリクエストに対するレンダリング時にtodosを渡すようにします。
さらに、POSTリクエスト時は res.redirect('/') でルートパスに対してGETリクエストを送りましょう。
これにより、router.post()内でレンダリングを行わずとも、リダイレクトによりrouter.get()が実行され、最終的に問題なくレンダリングされます。

### knex.jsでデータベースを操作しよう
https://geniusium.hatenablog.com/entry/2022/08/20/210202

knek.js 設定項目
client
使用するデータベース用のモジュールを指定します。
今回はmysqlモジュールを使用するため、mysqlとなります。

connection
接続情報を設定します。

database
使用するデータベース名を指定します。
今回はtodo_appとなります。

user
接続に使用するユーザを指定します。
今回はrootとなります。

password
接続に使用するユーザのパスワードを指定します。
今回はrootユーザを使用するため、rootユーザのパスワードとなります。

pool
コネクションプールを設定します。
コネクションプールとは、データベースへの接続を保持して再利用する機能のことをいいます。

min
保持する接続数の最大限度を指定します。
max
保持する接続数の最小限度を指定します。

### Todoアプリにユーザ機能を追加しよう
未サインインとサインイン済みの違いについて、このToDoアプリケーションでは以下のように挙動を分けることを想定しています。

未サインイン
トップページ (http://localhost:3000/) にアクセスしても、ToDoタスクの追加や閲覧はできない。
サインイン済み
トップページ (http://localhost:3000/) にアクセスすると、ToDoタスクの追加や閲覧ができる。
つまり、トップページを2種類用意し、サインインの状況に応じて分けます。
これを実装するにはサインインの状況を知るための仕組みが必要です。

そこで利用する技術がCookie (クッキー) やセッションです。
CookieとはWebサーバからウェブブラウザに送られるデータの1つで、ウェブブラウザで保存され、その後のHTTPリクエスト時にWebサーバに送られます。
セッションとはWebサーバに保存するデータのことです。
セッションには主にユーザ情報を保存します。
一般的にはセッションを識別するID (セッションID) のみをCookieとしてウェブブラウザに送り、その後のHTTPリクエスト時に送ってもらうことで、セッションIDを元にセッションの中身 (ユーザ情報等) を取り出し、このHTTPリクエストはどのユーザのものかを識別します。

cookieSessionの使い方
name
Cookie名を指定します。
keys
Cookieに格納するデータを暗号化するための文字列(キー)を指定します。
const secret = "secretCuisine123"; はここで使用するためのものです。
複数のキーを使用する場合は配列内にカンマ (,) 区切りで指定します。
暗号化とはデータを第三者に分からなくするための技術のことをいいます。
暗号化によってデータを加工してCookieに保存することで、データが盗まれても真のデータを知られずに済みます。
maxAge
Cookieの有効期限をミリ秒単位で指定します。
今回は24 * 60 * 60 * 1000 = 86400000 (ミリ秒) = 24時間を指定しています。

### passportを利用した認証を実装しよう
passportはストラテジーと呼ばれる認証処理を通して認証を行います。
既存のサービスと連携させた認証も可能で、Twitter認証を実装したい場合はpassport-twitter、Facebook認証を実装したい場合はpassport-facebook等、専用のモジュールが用意されています。
```
passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password",
  },function(username, password, done) {
  }
));
```
上記はストラテジーのテンプレートです。

usernameField: "username",
passwordField: "password",

これらは、どの値を元に認証を行うかを定義しており、usernameField、passwordFieldには<input>タグのname属性で指定したデータ名が入ります。

passportには、ユーザ情報をセッションに保存するシリアライズ、IDからユーザ情報を特定し、req.userに格納するデシリアライズという機能があります。
この機能のおかげでユーザ情報の取得が便利になります。

シリアライズ
```
passport.serializeUser(function(user, done) {
  done(null, user.id);
});
```

デシリアライズ
```
passport.deserializeUser(async function(id, done) {
  await User.findById(id, function(err, user) {
    done(err, user);
  });
});
```

https://tyoshikawa1106.hatenablog.com/entry/2016/04/01/091509

https://stackoverflow.com/questions/72375564/typeerror-req-session-regenerate-is-not-a-function-using-passport
下のバージョンを利用したほうがよいみたい
npm install passport@0.5

