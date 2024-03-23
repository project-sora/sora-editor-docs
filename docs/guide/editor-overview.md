---
outline: deep
---
# Overview
Sora Editor is an Android View library for editting code, with instant syntax-highlight and real-time auto-completion support.

The editor is desgined to be effective, smooth and pluggable, and you can easily start a code editting app by integrating our library into your project.


<div class="tip custom-block" style="padding-top: 8px">

Just want to try it out? Go to [Getting Started](./getting-started.md).

</div>

## Highlights of Our Editor
### **Full-Featured**
Sora Editor has implemented most features of modern IDEs. We provide not only fundamental stuff, but also forefront functionaliy.

Features implemented up to now:
  - Incremental Syntax-highlight
  - Auto-Completion (with [code snippets](https://macromates.com/manual/en/snippets))
  - Code Block Indicators
  - Unlimited Text Undo Stack and Fast Search-Replace
  - Word Wrap Display Mode
  - Display Non-Printable Characters
  - Diagnostic Markers and Tooltip Window
  - Text Magnifier
  - Punctuation Pair Matching and Highlighting
  - Sticky Scroll
  - Language Support backed by [TextMate](https://github.com/eclipse/tm4e) and [TreeSitter](https://github.com/AndroidIDEOfficial/android-tree-sitter/)

### **Smooth User Experience**
Sora Editor uses suitable animations to interpolate the transitions of components, bringing a smooth User Experience (UX). The widget also has a PC navigation mode and key bindings for users who use mouse and hardware keyboard to edit texts.
### **High-Performance**
Sora Editor benefits from modern multi-core processors by supporting language-specific code analysis incrementally in background workers. Auto-completion items are computed and published to UI on demand.

The rendering process is also optimized. The editor builds measuring caches and [RenderNode](https://developer.android.com/reference/android/graphics/RenderNode)s for visible text, which enables the editor to re-render fast and respond to user interaction quickly. Most objects used by the rendering process are reused.
## Discussion
We have created official group for project discussions.
- QQ Group: [216632648](https://jq.qq.com/?_wv=1027&k=n68uxQws)
- [Telegram Group](https://t.me/rosemoe_code_editor)