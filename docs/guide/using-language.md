---
outline: deep
---
# Language
Language is the interface in Sora Editor to provide language-specific functionality, including syntax analysis, auto-completion and auto-indent.

Single `Language` instance should serve for only one editor. And it is automatically destroyed when the editor is released or a new `Language` instance is set.

You can use `CodeEditor#setEditorLanguage` to apply a new `Language` to it. By default, the editor uses built-in `EmptyLanguage` and no analysis is performed. Thus, syntax-highlight and other language features are unavailable. 

We provide some universal language implementation for you to setup the analysis and syntax-highlight for a programming language. Note that `language-java` module is only for simple token-based Java syntax-highlight.
## Use Language Modules
Before using the language module, make sure you have imported it into your project.
### language-textmate
This module uses [TextMate](https://github.com/textmate/textmate) grammars to help tokenize text and highlight for various programming languages. TextMate is also used in [Visual Studio Code](https://github.com/microsoft/vscode) and [Eclipse](https://github.com/eclipse/tm4e) for syntax-highlight. Most library integrators will in favour of using this module instead of writing `Language` implementation themselves.

Follow the steps below to use TextMate for your editor.
#### Find Language Syntax and Config
TextMate supports various languages, and syntax-highlight rules are defined by `*.tmLanguage` PLIST files or `*.tmLanguage.json` JSON files. You need these TextMate rule files (aka `syntaxes`) and optionally language configuration files (`*.language-configuration.json`) for your target language.

You can find those files in:
* [TM4E Language Packs](https://github.com/eclipse/tm4e/tree/25e7fbe39c02644ca5d541d20a2c601791af7b8d/org.eclipse.tm4e.language_pack/syntaxes)
* [VSCode Extensions](https://github.com/microsoft/vscode/tree/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions)
#### Find Themes
TextMate must be used together with TextMate themes. You also need to find theme JSON files from [VSCode Extensions](https://github.com/microsoft/vscode/tree/4f2ff19ecacffa0aa4874db4d63ed4e899d98431/extensions).
There are some folders named in `theme-*` pattern. Those folders are for VSCode built-in TextMate themes.
#### Prepare Language Registry
Multiple languages can be loaded by TextMate. We should prepare `languages.json` for later loading. For exmaple, your assets directory:
```Text
.
├─ textmate
|  ├─ java
|  |  ├─ syntaxes
|  |  |  └─ java.tmLanguage.json
|  |  └─ language-configuration.json
|  └─ kotlin
|     ├─ syntaxes
|     |  └─ jKotlin.tmLanguage
|     └─ language-configuration.json
└─ language.json
```
Your `language.json`:
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
`name` is custom and `scopeName` is the root scope of the syntax file.

For language that can have injection languages, refer to HTML sample in [Demo App](https://github.com/Rosemoe/sora-editor/blob/main/app/src/main/assets/textmate/languages.json)
#### Load Syntaxes and Themes
Before starting use TextMate in editor, we should prepare data for TextMate first. **These steps are performed only once, no matter how many editor is to use TextMate.** 

Supposing we are to load textmate files from our APK assets. First, we need to add `FileResolver` for TextMate internal file access.
::: code-group

```Kotlin Kotlin
FileProviderRegistry.getInstance().addFileProvider(
    AssetsFileResolver(
        applicationContext.assets // use application context
    )
)
```

```Java Java
FileProviderRegistry.getInstance().addFileProvider(
    new AssetsFileResolver(
        getApplicationContext().getAssets() // use application context
    )
)
```

:::
Then, the themes should be loaded. The code below shows how to load a single theme into the editor.
::: code-group

```Kotlin Kotlin
val themeRegistry = ThemeRegistry.getInstance()
val name = "quietlight" // name of theme
val themeAssetsPath = "textmate/$name.json"
themeRegistry.loadTheme(
    ThemeModel(
        IThemeSource.fromInputStream(
            FileProviderRegistry.getInstance().tryGetInputStream(path), path, null
        ), 
        name
    ).apply {
        // If the theme is dark
        // isDark = true
    }
)
```

```Java Java
var themeRegistry = ThemeRegistry.getInstance();
var name = "quietlight"; // name of theme
var themeAssetsPath = "textmate/" + name + ".json";
var model = new ThemeModel(
        IThemeSource.fromInputStream(
            FileProviderRegistry.getInstance().tryGetInputStream(path), path, null
        ), 
        name
    );
// If the theme is dark
// model.setDark(true);
themeRegistry.loadTheme(model);
```

:::
Next, select an active theme for TextMate. TextMate uses its registry to manage global color scheme. 
::: code-group

```Kotlin Kotlin
ThemeRegistry.getInstance().setTheme("your-theme-name")
```

```Java Java
ThemeRegistry.getInstance().setTheme("your-theme-name");
```

:::
Finally, we load the language syntaxes and configurations.

::: code-group

```Kotlin Kotlin
GrammarRegistry.getInstance().loadGrammars("textmate/languages.json")
```

```Java Java
GrammarRegistry.getInstance().loadGrammars("textmate/languages.json");
```

:::

#### Setup Editor
Set color scheme for the editor. If `TextMateColorScheme` is not applied to the editor, the colors of syntax-highlight result from TextMate will be transparent.
::: code-group

```Kotlin Kotlin
editor.colorScheme = TextMateColorScheme.create(ThemeRegistry.getInstance())
```

```Java Java
editor.setColorScheme(TextMateColorScheme.create(ThemeRegistry.getInstance()));
```

:::
Set editor language.
::: code-group

```Kotlin Kotlin
val languageScopeName = "source.java" // The scope name of target language
val language = TextMateLanguage.create(
    languageScopeName, true /* true for enabling auto-completion */
)
editor.setEditorLanguage(language)
```

```Java Java
var languageScopeName = "source.java"; // The scope name of target language
var language = TextMateLanguage.create(
    languageScopeName, true /* true for enabling auto-completion */
);
editor.setEditorLanguage(language);
```

:::
Congratulations! You've done all the setup. Enjoy!
### language-java
The Java language support provides token-based highlight, identifier auto-completion and code block markers. It also has some experimental features for testing editor.

Though its functionality remains to be simple, its speed is fairly fast than other complex language analysis.

To create and apply the language, see code below:
::: code-group

```Kotlin Kotlin
editor.editorLanguage = JavaLanguage()
```

```Java Java
editor.setEditorLanguage(new JavaLanguage());
```

:::
### language-treesitter