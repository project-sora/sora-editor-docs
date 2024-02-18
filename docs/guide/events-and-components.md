---
outline: deep
---
# Events and Components
## Event
`Event` is delivered to notify certain changes in the editor. Make sure you use the event system instead of the listeners in `View`, because some input handling logic is overriden by the editor. You may not receive the callback if you use those listeners.
### Types of Event
Frequently used:
* `ClickEvent`: triggered when a single click is performed.
* `DoubleClickEvent`: triggered when the user double-clicks the view. Note that in this case, the first click triggers `ClickEvent`, while the second click not.
* `LongPressEvent`: triggered when the view is long pressed.
* `ContentChangeEvent`: trigger when `setText()` is called or current text in editor changes.
::: details All Types of Event
* ClickEvent
* DoubleClickEvent
* LongPressEvent
* ContentChangeEvent
* EditorKeyEvent
* KeyBindingEvent
* ScrollEvent
* SelectionChangeEvent
* SideIconClickEvent
* SnippetEvent
* HandleStateChangeEvent
* ColorSchemeUpdateEvent
* PublishSearchResultEvent
* EditorLanguageChangeEvent
* EditorFormatEvent
* EditorReleaseEvent
* ImePrivateCommandEvent
* BuildEditorInfoEvent
* EditorFocusChangeEvent
* EditorAttachStateChangeEvent
* ContextClickEvent
* HoverEvent
* CreateContextMenuEvent
:::
### Subscribe Event
Usually, we use `CodeEditor#subscribeEvent` to add callbacks for certain type of event.

Here is an example for subscribing `ClickEvent`.
::: code-group

```Kotlin Kotlin
editor.subscribeEvent<ClickEvent> { event, unsubscribe ->
    // Handle the event
}
```

```Java Java
editor.subscribeEvent(ClickEvent.class, (event, unsubscribe) -> {
    // Handle the event
});
```

:::
::: tip NOTE
Currently, you are unable to subscribe abstract/super events to handle several types of event with common super class.
:::
### Unsubscribe Event
Sometimes, we do not want to always receive the event.
You can use the `Unsubscribe` object given on event to unsubscribe yourself.

In the following code example, the listener will receive the subscribed event once.
::: code-group

```Kotlin Kotlin
editor.subscribeEvent<ClickEvent> { event, unsubscribe ->
    // Handle the event
    // ...
    unsubsribe.unsubscribe()
}
```

```Java Java
editor.subscribeEvent(ClickEvent.class, (event, unsubscribe) -> {
    // Handle the event
    // ...
    unsubscribe.unsubscribe();
});
```

:::
If you want to unsubscribe the event receiver outside the event callback, please use the receipt you get from `subscribeEvent`.
::: code-group

```Kotlin Kotlin
val receipt = editor.subscribeEvent<ClickEvent> { event, unsubscribe ->
    // Handle the event
}
// Unsubscribe anywhere
receipt.unsubscribe()
```

```Java Java
var receipt = editor.subscribeEvent(ClickEvent.class, (event, unsubscribe) -> {
    // Handle the event
});
// Unsubscribe anywhere
receipt.unsubscribe();
```

:::

::: warning BE CAREFUL
The receipt is used to unsubscribe the event outside the callback. If you are handling the event, please use the `Unsubscribe` object given.
:::
## Components
Componets are a part of editor. Most components rely on the event system but editor itself does not control the components directly. They can be disabled or replaced.
### Component Actions
You can get a component by `CodeEditor#getComponent` with its class.
::: code-group

```Kotlin Kotlin
val component = editor.getComponent<EditorAutoCompletion>()
```

```Java Java
var component = editor.getComponent(EditorAutoCompletion.class);
```

:::
Components can be disabled.
::: code-group

```Kotlin Kotlin
component.enabled = false
```

```Java Java
component.setEnabled(false);
```

:::
### Components Introduction
#### Auto Completion
`EditorAutoCompletion` manages auto-completion analysis and the completion windows. 

It checks if it is suitable to show the completion on editor events, and dispatches background completion task to the `Language`.

<div align="center"><img src="../img/auto-completion-preview.jpg" alt="Auto-Completion Preview" width="25%"/></div>

#### Text Action Window
`EditorTextActionWindow` manages the small panel for text actions, including paste, copy, cut, select-all and long-select.

The panel is shown when text is selected or the user clicks on the insert selection.

<div align="center"><img src="../img/text-action-window-preview.jpg" alt="Text Actions Preview" width="25%"/></div>

#### Magnifier
`Magnifier` is controlled by `EditorTouchEventHandler`. Text magnifier is shown when any selection handle is held.

<div align="center"><img src="../img/magnifier-preview.jpg" alt="TMagnifier Preview" width="25%"/></div>

#### Diagnostic Tooltip
`EditorDiagnosticsTooltipWindow` is shown when insert selection enters a region of diagnostics item. It requires `DiagnosticDetail` from your language implementation for detailed information of the diagnostic item.

The tooltip window also allows the user to perform quickfixes on the text. (experimental)


<div align="center"><img src="../img/diagnostic-tooltip-preview.jpg" alt="Text Actions Preview" width="25%"/></div>

#### Context Menu
`EditorContextMenuCreator` helps the editor to create context menu when mouse right-clicks in editor.