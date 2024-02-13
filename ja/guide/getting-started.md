---
outline: deep
---
# クイックスタート
## 要件
[sora-editor](https://github.com/Rosemoe/sora-editor) ライブラリをプロジェクトに組み込む前に、環境とビルド構成が以下の要件を満たしていることを確認してください。
* JDK 17 以降で Gradle を実行します、
* モジュールの最小 Android SDK バージョンは Android L (API 21) 以上です、
   * [言語サーバー プロトコル](https://microsoft.github.io/language-server-protocol/) を使用する場合、Android O (API 26) 以上が必要となります、
* プロジェクトの Java ソース互換性とターゲット互換性は `JavaVersion.VERSION_17` です。
::: details Java コンパイルとターゲットの互換性の設定

::: code-group

```Kotlin{3-4,8-10} [Kotlin DSL]
android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
// アプリで Kotlin が使用されている場合
// kotlin {
//     jvmToolchain(17)
// }
```

```Groovy{3-4} [Groovy DSL]
android {
    compileOptions {
        sourceCompatibility JavaVersion.VERSION_17
        targetCompatibility JavaVersion.VERSION_17
    }
}
```

:::


::: details 非 Gradle ビルド システムの場合

エディターはリソースを使用し、AAR ファイルで配布されます。 ビルド システムは AAR ファイルの処理をサポートする必要があります。

ビルド システムとして Gradle を使用していない場合、ビルドの問題に関連する情報は提供されません。

:::
## 依存関係の追加

最新版：[![Maven Central](https://img.shields.io/maven-central/v/io.github.Rosemoe.sora-editor/editor.svg?label=Maven%20Central)]((https://search.maven.org/search?q=io.github.Rosemoe.sora-editor%20editor))

sora-editor ライブラリをアプリの依存関係に追加してください：

::: code-group

```Kotlin{2-3} [Kotlin DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<versionName>"))
    implementation("io.github.Rosemoe.sora-editor:<moduleName>")
}
```

```Groovy{2-3} [Groovy DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<versionName>"))
    implementation 'io.github.Rosemoe.sora-editor:<moduleName>'
}
```

:::

プレースホルダー `<versionName>` と `<moduleName>` を正しいバージョン名とモジュール名に置き換えてください。 プロジェクトに複数のモジュールを追加できます。

以下は、エディターで構文を強調表示するために TextMate 文法を使用したい人向けの例です。

::: code-group

```Kotlin{2-4} [Kotlin DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:0.23.2"))
    implementation("io.github.Rosemoe.sora-editor:editor")
    implementation("io.github.Rosemoe.sora-editor:language-textmate")
}
```

```Groovy{2-4} [Groovy DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:0.23.2"))
    implementation 'io.github.Rosemoe.sora-editor:editor'
    implementation 'io.github.Rosemoe.sora-editor:language-textmate'
}
```

```Kotlin{2-4} [Kotlin DSL without bom]
dependencies {
    val editorVersion = "0.23.2"
    implementation("io.github.Rosemoe.sora-editor:editor:$editorVersion")
    implementation("io.github.Rosemoe.sora-editor:language-textmate:$editorVersion")
}
```

```Groovy{2-4} [Groovy DSL without bom]
dependencies {
    def editorVersion = '0.23.2'
    implementation 'io.github.Rosemoe.sora-editor:editor:$editorVersion'
    implementation 'io.github.Rosemoe.sora-editor:language-textmate:$editorVersion'
}
```

:::

::: tip NOTE

 上のバッジから最新バージョン名を見つけるか、GitHub [リリース](https://github.com/Rosemoe/sora-editor/releases) ページにアクセスして完全なバージョンのリストを確認してください。

現在、利用可能なモジュール名は、`editor`、`editor-lsp`、`language-java`、`language-textmate`、および `language-treesitter` です。
モジュールの詳細については、以下の表を確認してください。

:::

### 🛠️付属のモジュール

| モジュール                | 紹介                                                                                                                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| editor              | エディターのコア フレームワークが含まれています。                                                                                                                                                                                                                                                                                                   |
| editor-lsp          | Language Server Protocol (略して LSP) を使用して言語を作成するための便利なツールのライブラリです。                                                                                                                                                                                                                                                                  |
| language-java       | Java の強調表示とオートコンプリートを含む言語ライブラリ。                                                                                                                                                                                                                                                                                         |
| language-textmate   | 高度なハイライト分析ライブラリ。これを使用して、textmate 言語構成ファイルをロードし、このエディターに適用できます。内部実装は [tm4e](https://github.com/eclipse/tm4e) から取得されます。                                                                                                                                                                                     |
| language-treesitter | エディターに　[tree-sitter](https://tree-sitter.github.io/tree-sitter/)　サポートを提供します。これを使用すると、コードを抽象構文ツリーに迅速かつ段階的に解析することができ、正確な強調表示と補完の提供に役立ちます。このモジュールはトランジションとハイライトのサポートのみを提供することに注意してください。[android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/) プロジェクトによって提供される Java バインディング ライブラリを感謝します。 |
### 🚧スナップショット ビルド

通常は、[リリース済みバージョン](https://github.com/Rosemoe/sora-editor/releases) を使用することをお勧めします。 ただし、最新のバグ修正や機能強化のためにナイトリー ビルドを使用したい場合もあります。

::: details スナップショット ビルドの使用方法

スナップショット バージョンは、リポジトリ プッシュ時に自動的に公開されます。 現在リリースされているバージョン名と短いコミット ハッシュを組み合わせて、
スナップショット バージョン名を作成できます。

たとえば、最新リリースのバージョン名が「0.21.1」、
短いコミット ハッシュが '97c4963' の場合、バージョン名 '0.21.1-97c4963-SNAPSHOT' を使用して、スナップショット バージョンをプロジェクトにインポートできます。

追加の Maven リポジトリを追加する必要があることに注意してください：
```Kotlin{3}
repositories {
    // ...
    maven("https://s01.oss.sonatype.org/content/repositories/snapshots")
}
```

:::

## TextMate の脱糖（Desugar）を構成する

プロジェクトで `language-textmate` モジュールを使用し、Android N (API 24) のデバイスでアプリケーションを実行したい場合は、互換性の問題を回避するためにコア ライブラリの脱糖を**有効にする必要があります**。 それ以外の場合は、次のセクションに進んでください。

脱糖を有効にするには、以下の手順に従って**アプリケーション モジュール**をセットアップしてください：

* Desugar 依存関係を追加
::: code-group

```Kotlin [Kotlin DSL]
dependencies {
    coreLibraryDesugaring("com.android.tools:desugar_jdk_libs:2.0.4") // [!code highlight]
}
```

```Groovy [Groovy DSL]
dependencies {
    coreLibraryDesugaring 'com.android.tools:desugar_jdk_libs:2.0.4' // [!code highlight]
}
```

:::

* コンパイルオプションの追加
::: code-group

```Kotlin [Kotlin DSL]
android {
    compileOptions {
        isCoreLibraryDesugaringEnabled = true // [!code highlight]
    }
}
```

```Groovy [Groovy DSL]
android {
    compileOptions {
        coreLibraryDesugaringEnabled true // [!code highlight]
    }
}
```

:::

## ウィジェットを作成する

プロジェクトに `editor` モジュールが含まれていることを確認し、プロジェクトを Gradle ファイルと正常に同期してください。

メインのウィジェット クラスは `io.github.rosemoe.sora.widget.CodeEditor` です。 コード エディターは、XML コードまたは Java/Kotlin コードによって作成できます。
### XML での使用
レイアウト XML ファイルでエディターを宣言します：
```XML
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:text="Hello, world!"
    app:textSize="18sp" />
```
XML宣言で「text」や「textSize」を設定する必要はありません。

XML での使用法の詳細については、[XML 属性](/reference/xml-attributes) を参照してください。
::: tip NOTE
エディターの幅または高さに「wrap_content」を使用することはお勧めできません。 その場合、テキストを編集するときに、編集者は再レイアウトを要求する必要があり、おそらくラグが発生します。
:::
### Java/Kotlin コードでの使用
エディターを作成し、任意のビュー グループに追加するだけです。 任意の `Activity` コンテキストにいて、`vg` が `ViewGroup` インスタンスであると仮定します。
::: code-group
```Kotlin [Kotlin]
val editor = CodeEditor(this)
editor.setText("Hello, world!") // テキストの設定
editor.typefaceText = Typeface.MONOSPACE // 等幅書体(Monospace)を使用する
editor.nonPrintablePaintingFlags =
                CodeEditor.FLAG_DRAW_WHITESPACE_LEADING or CodeEditor.FLAG_DRAW_LINE_SEPARATOR or CodeEditor.FLAG_DRAW_WHITESPACE_IN_SELECTION // 印刷できない文字を表示する
vg.add(editor, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
```
```Java [Java]
var editor = new CodeEditor(this);
editor.setText("Hello, world!"); // テキストの設定
editor.setTypefaceText(Typeface.MONOSPACE); // 等幅書体(Monospace)を使用する
editor.setNonPrintablePaintingFlags(
                CodeEditor.FLAG_DRAW_WHITESPACE_LEADING | CodeEditor.FLAG_DRAW_LINE_SEPARATOR | CodeEditor.FLAG_DRAW_WHITESPACE_IN_SELECTION); // 印刷できない文字を表示する
vg.add(editor, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
```
:::
構成できるその他の属性については、`CodeEditor` のメソッドと `DirectAccessProps` のフィールドを参照してください。
::: warning ご注意！
`DirectAccessProps` のすべてのフィールドが無効化されないと有効になるわけではありません。 `@InvalidateRequired` でマークされたフィールドを変更した後、エディターで `invalidate()` を呼び出します。

`@UnsupportedUserUsage` でマークされたメソッドとフィールドは使用しないでください。 これらは内部アクセスに対して表示されます。
:::
## ウィジェットの解放
`CodeEditor` インスタンスが使用されなくなった場合、その `release()` メソッドを呼び出して、リソースとエディターに提供されているバックグラウンド スレッドを**解放する必要があります**。
エラーを避けるために、エディタをリリースした後はエディタを使用しないでください。

::: code-group

```Kotlin Kotlin
override fun onDestroy() {
    super.onDestroy()
    editor?.release()
}
```

```Java Java
@Override
protected void onDestroy() {
    super.onDestroy();
    if (editor != null) {
        editor.release();
    }
}
```

:::
## 続くはどうしますか？...
[言語](./using-language.md) および [カラー スキーム](./using-color-scheme.md) に移動して、エディターにプログラミング言語サポートとカスタム カラー スキームを装備します。