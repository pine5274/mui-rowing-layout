# ライブストリーミング用レイアウト仕様書

OBSでライブストリーミングをする際にしようするオーバーレイです。ローイングの試合のライブ配信での使用を想定しています。info.json にかかれている情報を画面に描画します。例えば、1レーンのチーム名などです。
ローカルPCでビルドし、そこで生成されるhtml をOBSで読み込みます。



## フォルダ構成

- index.html
- index.css
- index.js
- info.json
- image
  - bg.png

## 技術構成
- フロントエンド：react, material-ui
- ビルド：vite

info.json 内にある情報をindex.js でよみこみ、index.html 内に描画します。

以下はinfo.json の例です。

```
[
    {
        "name": "西日本選手権",
        "lane": [
            "1 関西みらい銀行",
            "2 デンソーオルカリス",
            "3 明治安田D",
            "4 中部電力ボート部A",
            "5 デンソーオルカリス",
            "6 メンテックローイングクラブ"
        ],
        "info": "W2X Final A",
        "time-line": [
            {
                "time": "8:00",
                "name": "高校W1X Heat"
            },
            {
                "time": "9:00",
                "name": "中学M1X Heat"
            },
            {
                "time": "10:00",
                "name": "高校W2X Semifinal"
            },
            {
                "time": "11:00",
                "name": "M2X Heat"
            },
            {
                "time": "12:00",
                "name": "W4X+ Heat"
            },
            {
                "time": "13:00",
                "name": "W4X+ Heat"
            }
        ]
    }
]
```

画面左上に`info`を描画します。

画面下部に`lane`を描画します。lane はMUI のChip コンポーネントを使います。
