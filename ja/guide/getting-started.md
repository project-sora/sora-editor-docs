# クイックスタート

依存関係をプロジェクトに追加してください:

[![Maven Central](https://img.shields.io/maven-central/v/io.github.Rosemoe.sora-editor/editor.svg?label=Maven%20Central)]((https://search.maven.org/search?q=io.github.Rosemoe.sora-editor%20editor))

```groovy
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<versionName>"))
    implementation("io.github.Rosemoe.sora-editor:<moduleName>")
}
```

## 🛠️付属のモジュール

| モジュール                | 紹介                                                                                                                                                                                                                                                                                          |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| editor              | エディターのコア フレームワークが含まれています。                                                                                                                                                                                                                                                                                                   |
| editor-lsp          | Language Server Protocol (略して LSP) を使用して言語を作成するための便利なツールのライブラリです。                                                                                                                                                                                                                                                                  |
| language-java       | Java の強調表示とオートコンプリートを含む言語ライブラリ。                                                                                                                                                                                                                                                                                         |
| language-textmate   | 高度なハイライト分析ライブラリ。これを使用して、textmate 言語構成ファイルをロードし、このエディターに適用できます。内部実装は [tm4e](https://github.com/eclipse/tm4e) から取得されます。                                                                                                                                                                                     |
| language-treesitter | エディターに　[tree-sitter](https://tree-sitter.github.io/tree-sitter/)　サポートを提供します。これを使用すると、コードを抽象構文ツリーに迅速かつ段階的に解析することができ、正確な強調表示と補完の提供に役立ちます。このモジュールはトランジションとハイライトのサポートのみを提供することに注意してください。[android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/)プロジェクトによって提供される Java バインディング ライブラリを感謝します。 |

最新のエディターのバージョンは、上部のバッジまたは [Releases](https://github.com/Rosemoe/CodeEditor/releases)から見つけることができます。

## プロジェクトの初期化

CodeEditor をレイアウト ファイルに追加してください：

```xml
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

こうすると、最も基本的なエディターが完成したものです。
