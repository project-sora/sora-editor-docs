# Color Scheme
Color scheme (`EditorColorScheme`) manages the colors of editor. 

Color types are represented by distinct integer IDs. `EditorColorScheme` internally maintains a map of color type ID to actual color. Built-in color types are defined as static integer constants in the class.

Unlike `Language`, single `EditorColorScheme` instance can be applied to multiple editors. Color scheme will notify all the editor it serves, to update their appearance. You can manage appearance of your editors easily by using shared color scheme instance. Editor will detached from its color scheme when `CodeEditor#release` is invoked.

The class holds editor by `WeakReference`, so editors can be safely recycled.

## Update Color Scheme
Get the color scheme of an editor by `CodeEditor#getColorScheme`.

Use `EditorColorScheme#setColor(int, int)` to apply new colors to the editor.

Example:
::: code-group
```Kotlin
val scheme = editor.colorScheme
scheme.setColor(EditorColorScheme.KEYWORD, Color.RED)
```
```Java
var scheme = editor.getColorScheme();
scheme.setColor(EditorColorScheme.KEYWORD, Color.RED);
```
:::
Be careful that multiple editors can share the same color scheme. Changing color scheme of one editor may lead to color changes in other editors, too.

## Extend the Color Scheme
Sometimes we need to extend the class to better define your own color scheme.
### Override Default Colors
Subclasses are expected to override `applyDefault()` to apply its default colors, though other methods are not final. 

After overriding this method, you will have to call super class's `applyDefault()` and then a series of setColor(int, int) calls to apply your colors. Sometimes we add new color types in the editor library. If super method is not called, some vital colors can be missing.
### Add New Color Types
You can use color IDs that are not in pre-defined ID pool for custom languages. We recommend adding a base offset for your custom color IDs. For example, first custom color type ID is `256`. This leaves enough space for editor's future built-in colors.

The last pre-defined color type ID is `EditorColorScheme.END_COLOR_ID`.
## Default Color Scheme
By default, newly-created editor uses the global default color scheme. The default color scheme is shared by those editors, and can be obtained from `EditorColorScheme#getDefault`.

You can update global default color scheme by `EditorColorScheme#setDefault`.
* Update global default color scheme. Newly-created editor will use the new default color scheme.
::: code-group
```Kotlin
EditorColorScheme.setDefault(MyColorScheme())
```
```Java
EditorColorScheme.setDefault(new MyColorScheme());
```
:::
* Update global default color scheme, and also apply to editors that are using the old default color scheme
::: code-group
```Kotlin
EditorColorScheme.setDefault(MyColorScheme(), true)
```
```Java
EditorColorScheme.setDefault(new MyColorScheme(), true);
```
:::