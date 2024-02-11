# Setup-Editor
Before setup you should initialize the editor... check  [Getting Started](https://github.com/abodinagdat16/sora-editor-docs/blob/main/guide/getting-started.md)
## Init edtitor in your class
::: code-group

```Kotlin
val editor: CodeEditor = findViewById(R.id.editor)
```

```Java
CodeEditor editor = findViewById(R.id.editor);
```

:::

## Customize editor
 * enable Worldwrap (Wrap text)
   ```Java
   editor.setWordwrap(true);
   ```
 * change text size
  ```java
  editor.setTextSize(12.0f);
  ```
 * change typeface
```java
Typeface typeface = ResourcesCompat.getFont(context, R.font.yourFont);
editor.setTypefaceText(typeface);
```
