---
outline: deep
---

# Using ComposeView in PopupWindow

`CodeEditor` supports a number of components namely `EditorAutoCompletion`, `EditorTextActionWindow` etc, when you want to customize the layout of them, you will have two approaches:

1. Using legacy XML to define the layouts
2. Using Compose to define the layout with `ComposeView`

In this documentation, we will dive into the approach of using Compose to define the layout for `EditorTextActionWindow`.

## Challenges of attempting `ComposeView` in `PopupWindow`

As the `EditorTextActionWindow` internally uses `PopupWindow`, and provides
`setContentView()` to apply the view to the component. 

::: danger ERROR
However, if you directly put the Compose content in the `PopupWindow`, an error will throw.
```kotlin
java.lang.IllegalStateException: ViewTreeLifecycleOwner not found from android.widget.PopupWindow$PopupDecorView{9dfea2f V.E...... R.....I. 0,0-0,0}
        at androidx.compose.ui.platform.WindowRecomposer_androidKt.createLifecycleAwareViewTreeRecomposer(WindowRecomposer.android.kt:242)
        at androidx.compose.ui.platform.WindowRecomposer_androidKt.access$createLifecycleAwareViewTreeRecomposer(WindowRecomposer.android.kt:1)
        ...
```
:::

By default, the `PopupWindow` cannot be worked with Compose. To solve this, we need a `FrameLayout` to be the parent layout of the `PopupWindow`, we then use this `FrameLayout` to contain the Compose content, and apply the `ViewTreeLifecycleOwner` and `ViewTreeSavedStateRegistryOwner` to the `FrameLayout`.

::: tip TIP
We can directly retrieve the `ViewTreeLifecycleOwner` and `ViewTreeSavedStateRegistryOwner` via the `CompositionLocal`.

```kotlin
val viewTreeLifecycleOwner = LocalViewTreeLifecycleOwner.current
val viewTreeSavedStateRegistryOwner = LocalViewTreeSavedStateRegistry.current
```
:::

## Define a `FrameLayout`

We will use `android.R.id.content` for the content child of the `View` as it is neccessary to let Compose find the content child.

```kotlin
val composeView = ComposeView(context).apply {
    setContent {
        // the Compose content...
    }
}
val parentView = FrameLayout(context).apply {
    id = android.R.id.content
    setViewTreeLifecycleOwner(viewTreeLifecycleOwner)
    setViewTreeSavedStateRegistryOwner(viewTreeSavedStateRegistryOwner)
    layoutParams = FrameLayout.LayoutParams(
        ViewGroup.LayoutParams.WRAP_CONTENT, 
        ViewGroup.LayoutParams.WRAP_CONTENT
    )
    addView(composeView)
}
```

## Complete the `EditorTextActionWindow` layout

Here is the example of customizing the layout for `EditorTextActionWindow` in Compose.

```kotlin
data class EditorTextActionItem(
    val label: String,
    val icon: ImageVector
)
```

```kotlin
val actionItems = listOf(
    EditorTextActionItem(
        label = "Select all",
        icon = /* ... */
    ),
    EditorTextActionItem(
        label = "Copy",
        icon = /* ... */
    )
    EditorTextActionItem(
        label = "Paste",
        icon = /* ... */
    )
    // ...
)
```

```kotlin
@Composable
fun EditorTextActionWindow(
    modifier: Modifier = Modifier,
    items: List<EditorTextActionItem>,
    onItemClick: (EditorTextActionItem) -> Unit
): FrameLayout {
    val context = LocalContext.current
    val viewTreeLifecycleOwner = LocalViewTreeLifecycleOwner.current
    val viewTreeSavedStateRegistryOwner = LocalViewTreeSavedStateRegistry.current
    val composeView = ComposeView(context).apply {
        setContent {
            EditorTextActionContent(modifier, items, onItemClick)
        }
    }
    val parentView = FrameLayout(context).apply {
        id = android.R.id.content
        setViewTreeLifecycleOwner(viewTreeLifecycleOwner)
        setViewTreeSavedStateRegistryOwner(viewTreeSavedStateRegistryOwner)
        layoutParams = FrameLayout.LayoutParams(
            ViewGroup.LayoutParams.WRAP_CONTENT, 
            ViewGroup.LayoutParams.WRAP_CONTENT
        )
        addView(composeView)
    }
    return parentView
}

@Composable
private fun EditorTextActionContent(
    modifier: Modifier = Modifier,
    items: List<EditorTextActionItem>,
    onItemClick: (EditorTextActionItem) -> Unit
) {
    Row(modifier) {
        items.forEach { item ->
            IconButton(
                onClick = { onItemClick(item) }
            ) {
                Icon(
                    imageVector = item.icon,
                    contentDescription = item.label
                )
            }
        }
    }
}
```

Finally, apply the layout into `EditorTextActionWindow`.

```kotlin
editor.getComponent<EditorTextActionWindow>().setContentView(parentView)
```