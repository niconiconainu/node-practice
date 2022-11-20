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

### ToDoタスクをデータベースに保存しよう
