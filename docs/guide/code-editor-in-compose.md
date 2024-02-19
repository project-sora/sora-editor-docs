---
outline: deep
---

# CodeEditor in Compose

Jetpack Compose is a new framework for Android development. If you are attempting to use Sora Editor, while working on apps built with Jetpack Compose. This documentation might help you.

> The guide and code, and my english perhaps are not good, please correct them if there's any. Thank you.

## Create a State holder

First, we will define a `CodeEditorState` which wraps the states of the `CodeEditor`.

```kotlin
data class CodeEditorState(
    val editor: CodeEditor? = null,
    val initialContent: Content = Content()
) {
    var content by mutableStateOf(initialContent)
}
```

You can add many states as you want.

::: tip NOTE
If you are not using `ViewModel` and want to make a `remember*()` composable function, you can do following:
```kotlin
@Composable
fun rememberCodeEditorState(
    initialContent: Content = Content()
) = remember {
    CodeEditorState(
        initialContent = initialContent
    )
}
```
:::

## Create `CodeEditor` composable

Now, we will create `CodeEditor` composable, which will be composed with `AndroidView`. In this composable, it will accept a `state` parameter which is associated with `CodeEditorState`.

```kotlin
@Composable
fun CodeEditor(
    modifier: Modifier = Modifier,
    state: CodeEditorState
) {
    // ...
}
```

### Set the factory for `CodeEditor`

We will need a `Context` to define a `CodeEditor`.

```kotlin
private fun setCodeEditorFactory(
    context: Context,
    state: CodeEditorState
): CodeEditor {
    val editor = CodeEditor(context)
    editor.apply {
        setText(state.content)
        // ...
    }
    state.editor = editor
    return editor
}
```

Once we finished creating the factory, we now can define it with `remember` composable function.

```kotlin
@Composable
fun CodeEditor(
    modifier: Modifier = Modifier,
    state: CodeEditorState
) {
    val context = LocalContext.current
    val editor = remember {
        setCodeEditorFactory(
            context = context,
            state = state
        )
    }
    AndroidView(
        factory = { editor },
        modifier = modifier,
        onRelease = {
            it.release()
        }
    )
    // ...
}
```

### Set `LaunchedEffect` for `CodeEditor`'s states

We need to use `LaunchedEffect` to trigger when there are states of `CodeEditor` changed.

```kotlin
LaunchedEffect(key1 = state.content) {
    state.editor?.setText(state.content)
}
```

## Using the `CodeEditor` composable

After we finished implementing the `CodeEditor` composable, we can use it in our apps now. First of all, **it is highly recommend** to create a `CodeEditorState` in the `ViewModel`.

For example, in the `MainScreen`, we will create `MainViewModel`, in this viewmodel, we will define the `CodeEditorState` here.

```kotlin
class MainViewModel : ViewModel() {
    val editorState by mutableStateOf(
        CodeEditorState()
    )
}
```

Then, for the `MainScreen` composable, make sure you need to adjust the `Modifier` of `CodeEditor` as it is neccessary.

```kotlin
@Composable
fun MainScreen(
    viewModel: MainViewModel = viewModel()
) {
    Column {
        CodeEditor(
            modifier = Modifier
                .fillMaxSize(),
            state = viewModel.editorState
        )
    }
}
```

::: warning WARNING
If there are composables on the bottom of the `CodeEditor`, please set `Modifier.weight(1f)` instead of `Modifier.fillMaxSize()`. Otherwise, the `CodeEditor` will just dominate entire screen.
:::

## End

`CodeEditor` is the only widget that we need to use `AndroidView`. As for the other widgets like `SymbolInputView`, they can be fully implemented with composables.

---

That's all. I don't know if this is a good practice to attempt Sora Editor's `CodeEditor` in Jetpack Compose, but I hope you will be inspired through this guide.  Thanks for reading.