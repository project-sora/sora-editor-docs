# 快速开始

为您的项目添加依赖:

[![Maven Central](https://img.shields.io/maven-central/v/io.github.Rosemoe.sora-editor/editor.svg?label=Maven%20Central)]((https://search.maven.org/search?q=io.github.Rosemoe.sora-editor%20editor))

```groovy
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<versionName>"))
    implementation("io.github.Rosemoe.sora-editor:<moduleName>")
}
```

## 🛠️包含组件

| 模块                | 介绍                                                                                                                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| editor              | 包含编辑器的核心框架。                                                                                                                                                                                                                                                                                                   |
| editor-lsp          | 可以使用语言服务器协议（简称LSP）创建语言的便捷工具库。                                                                                                                                                                                                                                                                  |
| language-java       | 包含Java高亮和自动补全的语言库。                                                                                                                                                                                                                                                                                         |
| language-textmate   | 一个高级的高亮分析库。你可以借助它来加载textmate语言配置文件并应用于本编辑器。 内部实现来自[tm4e](https://github.com/eclipse/tm4e)。                                                                                                                                                                                     |
| language-treesitter | 为编辑器提供[tree-sitter](https://tree-sitter.github.io/tree-sitter/)支持。tree-sitter可用于快速、增量地将代码转换 成抽象语法树，以便您向用户提供精确的高亮和自动补全功能。注意此模块仅提供了转换和高亮支持。感谢[android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/)项目提供的Java绑定库。 |

你可以从顶部的徽章或者[Releases](https://github.com/Rosemoe/CodeEditor/releases)找到最新的编辑器版本。

## 初始化项目

在你的布局文件中添加CodeEditor

```xml
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```

这样一个最基本的编辑器就完成了