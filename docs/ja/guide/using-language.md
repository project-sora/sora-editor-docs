---
outline: deep
---
# 言語
言語は、構文分析、自動補完、自動インデントなどの言語固有の機能を提供する Sora Editor のインターフェイスです。

単一の `Language` インスタンスは 1 つのエディター インスタンスのみに使用する必要があります。 そして、エディタ インスタンスが解放されるか、新しい `Language` インスタンスが設定されると、自動的に破棄されます。

`CodeEditor#setEditorLanguage` を使用して、新しい `Language` を適用できます。 デフォルトでは、エディターは組み込みの `EmptyLanguage` を使用し、分析は実行されません。 したがって、構文ハイライトやその他の言語機能は利用できません。

プログラミング言語の分析と構文ハイライトを設定するためのユニバーサル言語実装が提供されています。 `language-java` モジュールは単純なトークンベースの Java 構文ハイライト専用であることに注意してください。
## 言語モジュールを使用する
言語モジュールを使用する前に、それがプロジェクトにインポートされていることを確認してください。
### language-textmate
このモジュールは、[TextMate](https://github.com/textmate/textmate) 文法を使用して、テキストのトークン化とさまざまなプログラミング言語のハイライトを支援します。 TextMate は、[Visual Studio Code](https://github.com/microsoft/vscode) および [Eclipse](https://github.com/eclipse/tm4e) の構文ハイライトにも使用されます。 ほとんどのライブラリ インテグレータは、 `Language` 実装を自分で作成する代わりに、このモジュールを使用することを好みます。

エディターに TextMate を使用するには、以下の手順に従ってください。
#### 言語構文と構成を見つける
TextMate はさまざまな言語をサポートしており、構文ハイライト ルールは `*.tmLanguage` PLIST ファイルまたは `*.tmLanguage.json` JSON ファイルによって定義されます。 これらの TextMate ルール ファイル (別名 `syntaxes`) と、オプションでターゲット言語の言語設定ファイル (`*. language-configuration.json`) が必要です。

これらのファイルは次の場所にあります。
* [TM4E 言語パック](https://github.com/eclipse/tm4e/tree/25e7fbe39c02644ca5d541d20a2c601791af7b8d/org.eclipse.tm4e.language_pack/syntaxes)
* [VSCode 拡張機能](https://github.com/microsoft/vscode/tree/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions)
#### テーマを見つける
TextMate は TextMate テーマと一緒に使用する必要があります。 また、[VSCode Extensions](https://github.com/microsoft/vscode/tree/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions) からテーマ JSON ファイルを見つける必要があります。
`theme-*` パターンで名前が付けられたフォルダーがいくつかあります。 これらのフォルダーは、VSCode 組み込み TextMate テーマ用です。
#### 言語レジストリの準備
TextMate では複数の言語を読み込むことができます。 後でロードできるように `languages.json` を準備する必要があります。 たとえば、アセット ディレクトリは次のとおりです：
```Text
.
├─ textmate
|  ├─ java
|  |  ├─ syntaxes
|  |  |  └─ java.tmLanguage.json
|  |  └─ language-configuration.json
|  └─ kotlin
|     ├─ syntaxes
|     |  └─ Kotlin.tmLanguage
|     └─ language-configuration.json
└─ language.json
```
`language.json` はつぎのとおりです:
```JSON
{
  "languages": [
    {
      "grammar": "textmate/java/syntaxes/java.tmLanguage.json",
      "name": "java",
      "scopeName": "source.java",
      "languageConfiguration": "textmate/java/language-configuration.json"
    },
    {
      "grammar": "textmate/kotlin/syntaxes/Kotlin.tmLanguage",
      "name": "kotlin",
      "scopeName": "source.kotlin",
      "languageConfiguration": "textmate/kotlin/language-configuration.json"
    }
  ]
}
```
`name` はカスタムで、`scopeName` は構文ファイルのルート スコープです。

インジェクション言語を使用できる言語については、[デモアプリ](https://github.com/Rosemoe/sora-editor/blob/main/app/src/main/assets/textmate/langages.json)の HTML サンプルを参照してください。
#### ロード構文とテーマ
エディターで TextMate を使い始める前に、まず TextMate 用のデータを準備する必要があります。 **これらの手順は、TextMate を使用するエディタの数に関係なく、1 回だけ実行されます。**

APK アセットから textmate ファイルをロードするとします。 まず、TextMate の内部ファイル アクセス用に `FileResolver` を追加する必要があります。
::: code-group

```Kotlin Kotlin
FileProviderRegistry.getInstance().addFileProvider(
    AssetsFileResolver(
        applicationContext.assets // アプリケーションコンテキストを使用する
    )
)
```

```Java Java
FileProviderRegistry.getInstance().addFileProvider(
    new AssetsFileResolver(
        getApplicationContext().getAssets() // アプリケーションコンテキストを使用する
    )
)
```

:::
次に、テーマがロードされるはずです。 以下のコードは、単一のテーマをエディターにロードする方法を示しています。
::: code-group

```Kotlin Kotlin
val themeRegistry = ThemeRegistry.getInstance()
val name = "quietlight" // テーマの名前
val themeAssetsPath = "textmate/$name.json"
themeRegistry.loadTheme(
    ThemeModel(
        IThemeSource.fromInputStream(
            FileProviderRegistry.getInstance().tryGetInputStream(themeAssetsPath), themeAssetsPath, null
        ), 
        name
    ).apply {
        // テーマが暗い場合
        // isDark = true
    }
)
```

```Java Java
var themeRegistry = ThemeRegistry.getInstance();
var name = "quietlight"; // テーマの名前
var themeAssetsPath = "textmate/" + name + ".json";
var model = new ThemeModel(
        IThemeSource.fromInputStream(
            FileProviderRegistry.getInstance().tryGetInputStream(themeAssetsPath), themeAssetsPath, null
        ), 
        name
    );
// テーマが暗い場合
// model.setDark(true);
themeRegistry.loadTheme(model);
```

:::
次に、TextMate のアクティブなテーマを選択します。 TextMate は、レジストリを使用してグローバル カラー スキームを管理します。
::: code-group

```Kotlin Kotlin
ThemeRegistry.getInstance().setTheme("your-theme-name")
```

```Java Java
ThemeRegistry.getInstance().setTheme("your-theme-name");
```

:::
最後に、言語の構文と構成をロードします。

::: code-group

```Kotlin Kotlin
GrammarRegistry.getInstance().loadGrammars("textmate/languages.json")
```

```Java Java
GrammarRegistry.getInstance().loadGrammars("textmate/languages.json");
```

:::

#### エディターの設定
エディターの配色を設定します。 `TextMateColorScheme` がエディタに適用されていない場合、TextMate の構文ハイライト結果の色は透明になります。
::: code-group

```Kotlin Kotlin
editor.colorScheme = TextMateColorScheme.create(ThemeRegistry.getInstance())
```

```Java Java
editor.setColorScheme(TextMateColorScheme.create(ThemeRegistry.getInstance()));
```

:::
エディタの言語を設定します。
::: code-group

```Kotlin Kotlin
val languageScopeName = "source.java" // ターゲット言語のスコープ名
val language = TextMateLanguage.create(
    languageScopeName, true /* オートコンプリートを有効にする場合は true */
)
editor.setEditorLanguage(language)
```

```Java Java
var languageScopeName = "source.java"; // ターゲット言語のスコープ名
var language = TextMateLanguage.create(
    languageScopeName, true /* オートコンプリートを有効にする場合は true */
);
editor.setEditorLanguage(language);
```

:::
これですべての設定が完了しました。おめでとう！
### language-java
Java 言語サポートは、トークンベースのハイライト、識別子のオートコンプリート、およびコード ブロック マーカーを提供します。 エディターをテストするための実験的な機能もいくつかあります。

機能は依然としてシンプルですが、その速度は他の複雑な言語分析に比べてかなり高速です。

言語を作成して適用するには、以下のコードを参照してください：
::: code-group

```Kotlin Kotlin
editor.editorLanguage = JavaLanguage()
```

```Java Java
editor.setEditorLanguage(new JavaLanguage());
```

:::
### language-treesitter
TreeSitter は、[Atom](https://github.com/atom/atom) と現在は [Zed](https://github.com/zed-industries/zed) の作成者によって開発され、2 つのコード エディターで使用されています。 。 TreeSitter は、パーサー生成ツールおよび増分解析ライブラリです。

TreeSitter を使用すると、ソース ファイルの具体的な構文ツリーを構築し、ソース ファイルの編集に応じて構文ツリーを効率的に更新できます。 また、正確な構文の強調表示には構文ツリーを使用します。

Java バインディング [android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter) を使用して、tree-sitter API を呼び出します。

読み進める前に、まずエディター フレームワークの [TextStyle](https://github.com/Rosemoe/sora-editor/blob/main/editor/src/main/java/io/github/rosemoe/sora/lang/styling/TextStyle.java) をチェックアウトすることを強くお勧めします。

#### 言語を準備する

既存の言語実装を見つけることができます
[android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter) より。 希望する言語が
欠けている場合は、Android 用の言語を自分で構築する必要があります。

さらに、構文ツリーをクエリするための 4 つの `scm` ファイルが必要です。
* 1.ハイライト用
ほとんどの言語の「highlights.scm」は、TreeSitter 言語リポジトリにあります。 たとえば、Java 用のものは [こちら](https://github.com/tree-sitter/tree-sitter-java/tree/master/queries) です。
* 2. コードブロック用（オプション）
これは sora エディター固有のクエリです。 手順とサンプルについては、[こちら](https://github.com/Rosemoe/sora-editor/blob/main/app/src/main/assets/tree-sitter-queries/java/blocks.scm)を参照してください。
* 3.ブラケット用（オプション）
これは sora エディター固有のクエリです。 手順とサンプルについては、[こちら](https://github.com/Rosemoe/sora-editor/blob/main/app/src/main/assets/tree-sitter-queries/java/brackets.scm)を参照してください。
* 4. ローカル変数の場合（オプション）
ほとんどの言語の「locals.scm」は、[nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter/tree/master/queries) リポジトリにあります。

役立つリンク:
* [TreeSitter](https://github.com/tree-sitter)
* [TreeSitter ドキュメント](https://tree-sitter.github.io/tree-sitter/)
* [nvim-treesitter](https://github.com/nvim-treesitter/nvim-treesitter)
* [Zed 言語](https://github.com/zed-industries/zed/tree/main/crates/zed/src/languages)