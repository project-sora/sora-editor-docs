# Getting Started
## Requirements
Before including [sora-editor](https://github.com/Rosemoe/sora-editor) library into your project, please ensure your environment and build configuration satify the requirements below:
* Running Gradle on JDK 17 or above
* The minimum Android SDK version of your module is at least Android L (API 21)
  * If you are to use [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), the requirement will be at least Android O (API 26)
* Project Java source compatibility and target compatibility is `JavaVersion.VERSION_17`
::: details For Non-Gradle Build Systems

The editor uses resources and is distributed in AAR files. Your build system must support processing AAR files.

If you are not using Gradle as your build system, we won't provide information related to your build issues.

:::
## Add Dependencies
Add to your app's dependencies:

[![Maven Central](https://img.shields.io/maven-central/v/io.github.Rosemoe.sora-editor/editor.svg?label=Maven%20Central)]((https://search.maven.org/search?q=io.github.Rosemoe.sora-editor%20editor))

::: code-group

```Kotlin [Kotlin DSL]
dependencies {
    implementation(platform("io.github.Rosemoe.sora-editor:bom:<versionName>"))
    implementation("io.github.Rosemoe.sora-editor:<moduleName>")
}
```

```Groovy [Groovy DSL]
dependencies {
    implementation platform("io.github.Rosemoe.sora-editor:bom:<versionName>")
    implementation "io.github.Rosemoe.sora-editor:<moduleName>"
}
```

:::

### 🛠️Available modules

| Module              | Summary                                                                                                                                                                                                                                                                                                                                                                                                           |
| ------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| editor              | Widget library containing all basic things of the framework                                                                                                                                                                                                                                                                                                                                                       |
| editor-lsp          | A convenient library for creating languages by using Language Server Protocol (aka LSP)                                                                                                                                                                                                                                                                                                                           |
| language-java       | A simple implementation for Java highlighting and identifier auto-completion                                                                                                                                                                                                                                                                                                                                      |
| language-textmate   | An advanced highlighter for the editor. You can find textmate language bundles and themes and load them by using this module. The internal implementation of textmate is from[tm4e](https://github.com/eclipse/tm4e)。                                                                                                                                                                                            |
| language-treesitter | Offer [tree-sitter](https://tree-sitter.github.io/tree-sitter/) support for editor. This can be used to parse the code to an AST fast and incrementally, which is helpful for accurate highlighting and providing completions. Note that this module only provides incremental paring and highlighting. Thanks to Java bindings [android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/) |

Check the newest version from the badge above or [Releases](https://github.com/Rosemoe/CodeEditor/releases).

## Init your project

```xml
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent" />
```