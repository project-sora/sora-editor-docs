---
outline: deep
---
# Getting Started
## Requirements
Before including [sora-editor](https://github.com/Rosemoe/sora-editor) library into your project, please ensure your environment and build configuration satisfy the requirements below:
* Running Gradle on JDK 17 or above
* The minimum Android SDK version of your module is at least Android L (API 21)
  * If you are to use [Language Server Protocol](https://microsoft.github.io/language-server-protocol/), the requirement will be at least Android O (API 26)
* Project Java source compatibility and target compatibility is `JavaVersion.VERSION_17`
::: details Set Java Source and Target Compatibilities

::: code-group

```Kotlin{3-4,8-10} [Kotlin DSL]
android {
    compileOptions {
        sourceCompatibility = JavaVersion.VERSION_17
        targetCompatibility = JavaVersion.VERSION_17
    }
}
// If Kotlin used in your app
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


::: details For Non-Gradle Build Systems

The editor uses resources and is distributed in AAR files. Your build system must support processing AAR files.

If you are not using Gradle as your build system, we won't provide information related to your build issues.

:::
## Add Dependencies

Newest Version: [![Maven Central](https://img.shields.io/maven-central/v/io.github.Rosemoe.sora-editor/editor.svg?label=Maven%20Central)]((https://search.maven.org/search?q=io.github.Rosemoe.sora-editor%20editor))

Add sora-editor library to your app's dependencies:

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

Replace the placeholder `<versionName>` and `<moduleName>` with correct version name and module name. You may add multiple modules to your project. 

Here's an example for those who want to use TextMate grammars for syntax-highlighting in editor:

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

 You can find the newest version name from the badge above, or turn to our GitHub [Releases](https://github.com/Rosemoe/sora-editor/releases) page for full version list.

Currently, available modules names are: `editor`, `editor-lsp`, `language-java`, `language-textmate` and `language-treesitter`.
Check the table below to get more information about the modules.

:::

### 🛠️Available modules

| Module              | Summary                                                                                                                                                                                                                                                                                                                                                                                                            |
| ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| editor              | Widget library containing all basic things of the framework                                                                                                                                                                                                                                                                                                                                                        |
| editor-lsp          | A convenient library for creating languages by [Language Server Protocol](https://microsoft.github.io/language-server-protocol/) (aka LSP)                                                                                                                                                                                                                                                                         |
| language-java       | A simple implementation for Java lexer-based highlighting and identifier auto-completion                                                                                                                                                                                                                                                                                                                           |
| language-textmate   | An advanced highlighter for the editor. It can be used to load TextMate language bundles and themes. The internal implementation of TextMate is from [tm4e](https://github.com/eclipse/tm4e)                                                                                                                                                                                                                      |
| language-treesitter | Offer [tree-sitter](https://tree-sitter.github.io/tree-sitter/) support for editor. This can be used to parse the code to an AST fast and incrementally, which is helpful for accurate highlighting and providing completions. Note that this module only provides incremental parsing and highlighting. Thanks to Java bindings [android-tree-sitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/) |
### 🚧Snapshot Builds

Generally, it is recommended to use [released versions](https://github.com/Rosemoe/sora-editor/releases). But sometimes you may still want to use nightly builds for latest bug fixes and enhancements.

::: details How to Use Snapshot Builds

Snapshot versions are automatically published on repository push. You may combine current released version name
and short commit hash to make a snapshot version name. 

For example, if the latest released version name is '0.21.1' and
short commit hash is '97c4963', you may use version name '0.21.1-97c4963-SNAPSHOT' to import the snapshot version to your project.

Note that adding extra maven repository is required:
```Kotlin{3}
repositories {
    // ...
    maven("https://s01.oss.sonatype.org/content/repositories/snapshots")
}
```

:::

## Configure Desugaring for TextMate

If you use `language-textmate` module in your project, and want to run the application on devices under Android N (API 24), you **must** enable [Core Library Desugaring](https://developer.android.google.cn/studio/write/java8-support#library-desugaring) to avoid compatibility issues. Otherwise, you can go on to next section.

To enable the desugaring, follow the instructions below to setup your **application module**.

* Add Desugaring Dependency
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

* Add Compile Option
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

## Create the Widget

Please ensure you have included `editor` module in your project, and then sync your project with Gradle files successfully.

The main widget class is `io.github.rosemoe.sora.widget.CodeEditor`. You can create the code editor either by XML or Java/Kotlin code(recommended). Only limited editor attributes can be set in XML.
### Use in XML
Declare editor in your layout XML files:
```XML
<io.github.rosemoe.sora.widget.CodeEditor
    android:id="@+id/editor"
    android:layout_width="match_parent"
    android:layout_height="match_parent"
    app:text="Hello, world!"
    app:textSize="18sp" />
```
It's not necessary to set `text` or `textSize` in XML declaration.

Refer to [XML Attributes](/reference/xml-attributes) for more information about its usage in XML.
::: tip NOTE
It is not recommended to use `wrap_content` for editor width or height. In that case, when the text is editted, the editor has to request re-layout which probably causes lags.
:::
### Use in Java/Kotlin code
Just create a editor and add it to any view group. Supposing we are in any `Activity` context, and `vg` is a `ViewGroup` instance.
::: code-group
```Kotlin [Kotlin]
val editor = CodeEditor(this)
editor.setText("Hello, world!") // Set text
editor.typefaceText = Typeface.MONOSPACE // Use Monospace Typeface
editor.nonPrintablePaintingFlags =
                CodeEditor.FLAG_DRAW_WHITESPACE_LEADING or CodeEditor.FLAG_DRAW_LINE_SEPARATOR or CodeEditor.FLAG_DRAW_WHITESPACE_IN_SELECTION // Show Non-Printable Characters
vg.add(editor, ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT))
```
```Java [Java]
var editor = new CodeEditor(this);
editor.setText("Hello, world!"); // Set Text
editor.setTypefaceText(Typeface.MONOSPACE); // Use Monospace Typeface
editor.setNonPrintablePaintingFlags(
                CodeEditor.FLAG_DRAW_WHITESPACE_LEADING | CodeEditor.FLAG_DRAW_LINE_SEPARATOR | CodeEditor.FLAG_DRAW_WHITESPACE_IN_SELECTION); // Show Non-Printable Characters
vg.add(editor, new ViewGroup.LayoutParams(ViewGroup.LayoutParams.MATCH_PARENT, ViewGroup.LayoutParams.MATCH_PARENT));
```
:::
Please view methods of `CodeEditor` and fields of `DirectAccessProps` for more attributes you can configure.
::: warning BE CAUTIOUS
Not all fields of `DirectAccessProps` can take effect without invalidation. Call `invalidate()` on editor after changing those fields marked with `@InvalidateRequired`.

Methods and fields that marked with `@UnsupportedUserUsage` should not be used. They are visible for internal access.
:::
## Release the Widget
When a `CodeEditor` instance is no longer used, its `release()` method **must** be invoked to release resources and any background thread serving for the editor.
After releasing the editor, you should not use the editor, to avoid errors.

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
## Continue
Go to [Language](./using-language.md) and [Color Scheme](./using-color-scheme.md) to equip the editor with programming language support and your custom color scheme.