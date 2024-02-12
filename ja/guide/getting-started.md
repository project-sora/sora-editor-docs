---
outline: deep
---
# クイックスタート

## 要件
[sora-editor](https://github.com/Rosemoe/sora-editor) ライブラリをプロジェクトに組み込む前に、環境とビルド構成が以下の要件を満たしていることを確認してください。
* JDK 17 以降で Gradle を実行する、
* モジュールの最小 Android SDK バージョンは Android L (API 21) 以上です、
   * [言語サーバー プロトコル](https://microsoft.github.io/language-server-protocol/) を使用する場合、Android O (API 26) 以上が必要となります。
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
## 🛠️付属のモジュール

| モジュール                | 紹介                                                                                                                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| editor              | エディターのコア フレームワークが含まれています。                                                                                                                                                                                                                                                                                                   |
| editor-lsp          | Language Server Protocol (略して LSP) を使用して言語を作成するための便利なツールのライブラリです。                                                                                                                                                                                                                                                                  |
| language-java       | Java の強調表示とオートコンプリートを含む言語ライブラリ。                                                                                                                                                                                                                                                                                         |
| language-textmate   | 高度なハイライト分析ライブラリ。これを使用して、textmate 言語構成ファイルをロードし、このエディターに適用できます。内部実装は [tm4e](https://github.com/eclipse/tm4e) から取得されます。                                                                                                                                                                                     |
| language-treesitter | エディターに　[tree-sitter](https://tree-sitter.github.io/tree-sitter/)　サポートを提供します。これを使用すると、コードを抽象構文ツリーに迅速かつ段階的に解析することができ、正確な強調表示と補完の提供に役立ちます。このモジュールはトランジションとハイライトのサポートのみを提供することに注意してください。[android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/)プロジェクトによって提供される Java バインディング ライブラリを感謝します。 |


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

```Xml
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```