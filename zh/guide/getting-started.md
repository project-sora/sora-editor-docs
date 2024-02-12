---
outline: deep
---
# 快速开始
## 要求
您的项目在引入[sora-editor](https://github.com/Rosemoe/sora-editor)库之前，请确保您的构建环境及配置满足以下要求：
* 使用Gradle编译且JDK版本不低于17
* 您模块的最低Android SDK版本至少为Android L（API 21）
  * 如果您需要使用[语言服务器协议](https://microsoft.github.io/language-server-protocol/)，则要求至少为Android O（API 26）
* 项目的源代码兼容性和目标兼容性应是`JavaVersion.VERSION_17`
::: details 设置Java源代码兼容性和目标兼容性

::: code-group

```Kotlin{3-4,8-10} [Kotlin DSL]
android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
// 如果您的应用使用Kotlin，请额外添加以下配置
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


::: details 使用非Gradle进行构建

编辑器的相关资源通过AAR文件进行分发，所以构建系统必须支持处理AAR文件。

如果您一定要使用非Gradle作为您项目的构建系统，我们将不会为您的构建问题提供任何帮助。

:::
## 添加依赖

最新版本: [![Maven Central](https://img.shields.io/maven-central/v/io.github.Rosemoe.sora-editor/editor.svg?label=Maven%20Central)]((https://search.maven.org/search?q=io.github.Rosemoe.sora-editor%20editor))

添加sora-editor到您应用的依赖中:

::: code-group

```Kotlin{2-3} [Kotlin DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<版本名>"))
    implementation("io.github.Rosemoe.sora-editor:<模块名>")
}
```

```Groovy{2-3} [Groovy DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<版本名>"))
    implementation 'io.github.Rosemoe.sora-editor:<模块名>'
}
```

:::

请将`<versionName>`和`<moduleName>`替换为正确的版本名称和模块名称。你可以添加多个模块到您的项目中。

以下是一个在编辑器中使用TextMate语法高亮的示例，请根据您的实际情况引入：

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

```Kotlin{2-4} [Kotlin DSL(不使用bom)]
dependencies {
    val editorVersion = "0.23.2"
    implementation("io.github.Rosemoe.sora-editor:editor:$editorVersion")
    implementation("io.github.Rosemoe.sora-editor:language-textmate:$editorVersion")
}
```

```Groovy{2-4} [Groovy DSL(不使用bom)]
dependencies {
    def editorVersion = '0.23.2'
    implementation 'io.github.Rosemoe.sora-editor:editor:$editorVersion'
    implementation 'io.github.Rosemoe.sora-editor:language-textmate:$editorVersion'
}
```

:::

::: tip 注意

您可以通过上面的徽章中得知最新的版本名称，也可以前往我们的GitHub [Releases](https://github.com/Rosemoe/sora-editor/releases)页面获取完整的版本列表。

当前可供使用的模块有： `editor`、`editor-lsp`、`language-java`, `language-textmate`以及`language-treesitter`。
请参考下面的表格获取对应模块的相关信息。

:::

### 🛠️可用模块

| 模块                | 介绍                                                                                                                                                                                                                                                                                                                     |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| editor              | 包含编辑器的核心框架。                                                                                                                                                                                                                                                                                                   |
| editor-lsp          | 可以使用语言服务器协议（简称LSP）创建语言的便捷工具库。                                                                                                                                                                                                                                                                  |
| language-java       | 包含Java高亮和自动补全的语言库。                                                                                                                                                                                                                                                                                         |
| language-textmate   | 一个高级的高亮分析库。你可以借助它来加载textmate语言配置文件并应用于本编辑器。 内部实现来自[tm4e](https://github.com/eclipse/tm4e)。                                                                                                                                                                                     |
| language-treesitter | 为编辑器提供[tree-sitter](https://tree-sitter.github.io/tree-sitter/)支持。tree-sitter可用于快速、增量地将代码转换 成抽象语法树，以便您向用户提供精确的高亮和自动补全功能。注意此模块仅提供了转换和高亮支持。感谢[android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/)项目提供的Java绑定库。 |

## 为TextMate配置脱糖

如果您的项目使用了`language-textmate`模块，并且想要在Android N（API 24）以下的设备上运行您的应用，您**必须**启用脱糖以避免兼容性问题。如果您已进行此操作，请看下一部分。

如果要启用脱糖，请按照以下说明配置您的**应用模块**。

* 添加脱糖依赖
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

* 添加编译选项
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

## 创建组件

请确保您的项目中已经包含核心模块`editor`，并且您项目的Gradle相关文件已经成功同步。

核心组件的名称为`io.github.rosemoe.sora.widget.CodeEditor`。您可以通过XML或者Java/Kotlin代码创建组件

```Xml
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```