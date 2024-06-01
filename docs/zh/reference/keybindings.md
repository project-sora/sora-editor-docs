---
outline: deep
---

# 快捷键
当您使用物理键盘工作时，您可以使用快捷键来执行各种文本操作。

默认情况下，编辑器默认支持部分快捷键。目前支持的键绑定大多类似于Android Studio/IntelliJ IDEA。

## 内置快捷键

编辑器目前支持以下快捷键：

| 快捷键                 | 描述                                                                                   |
| ---------------------- | -------------------------------------------------------------------------------------- |
| `Ctrl + A`             | 全选。                                                                                 |
| `Ctrl + X`             | 如果没有选定内容，则剪切当前行。否则，执行通常的剪切操作。                             |
| `Ctrl + C`             | 如果没有选定内容，则选择并复制当前行。否则，执行通常的复制操作。                       |
| `Ctrl + V`             | 常规粘贴操作。                                                                         |
| `Ctrl + Z`             | 撤销上一步操作。                                                                       |
| `Ctrl + R`             | 重做上一步操作。                                                                       |
| `Ctrl + D`             | 如果有选定内容，则复制选定内容，否则复制当前行。                                       |
| `Ctrl + W`             | 选择光标左侧的单词。                                                                   |
| `Ctrl + Left`          | 移动到单词开头。如果光标已在当前单词的开头，则将光标移动到前一个单词的开头，跳过空格。 |
| `Ctrl + Right`         | 移动到单词结尾。如果光标已在当前单词的结尾，则将光标移动到下一个单词的结尾，跳过空格。 |
| `Ctrl + Up`            | 向上滚动一行。                                                                         |
| `Ctrl + Down`          | 向下滚动一行。                                                                         |
| `Ctrl + Home`          | 将光标移动到内容开头。                                                                 |
| `Ctrl + End`           | 将光标移动到内容结尾。                                                                 |
| `Ctrl + PgUp`          | 将光标移动到页面顶部。                                                                 |
| `Ctrl + PgDn`          | 将光标移动到页面底部。                                                                 |
| `Ctrl + Enter`         | 拆分当前行。如果有选定内容，则先删除选定内容，然后拆分当前行。                         |
| `Ctrl + Shift + Left`  | 与`Ctrl+Left`相同，但会开始或者扩大文本选择范围。                                      |
| `Ctrl + Shift + Right` | 与`Ctrl+Right`相同，但会开始或者扩大文本选择范围。                                     |
| `Ctrl + Shift + Up`    | 将当前行（或所有选定行）上移一行。                                                     |
| `Ctrl + Shift + Down`  | 将当前行（或所有选定行）下移一行。                                                     |
| `Ctrl + Shift + Home`  | 与`Ctrl+Home`相同，但开始或者扩大文本选择范围。                                        |
| `Ctrl + Shift + End`   | 与`Ctrl+End`相同，但开始或者扩大文本选择范围。                                         |
| `Ctrl + Shift + PgUp`  | 将光标移动到页面顶部并选择旧位置到新位置的文本。                                       |
| `Ctrl + Shift + PgDn`  | 将光标移动到页面底部并选择旧位置到新位置的文本。                                       |
| `Ctrl + Alt + Enter`   | 在当前行之前插入新行。                                                                 |
| `Ctrl + Shift + J`     | 连接当前行和下一行。                                                                   |
| `Shift + Enter`        | 开始一行新行。                                                                         |
| `选定文本 + TAB`       | 如果已经选择文本，则按`TAB`键将会缩进所有选定行。                                      |
| `Shift + TAB`          | 减少当前行的缩进。如果已经选择文本，则减少所选行的缩进。                               |

## 自定义快捷键

你可以订阅[`KeyBindingEvent`](https://github.com/Rosemoe/sora-editor/blob/main/editor/src/main/java/io/github/rosemoe/sora/event/KeyBindingEvent.java)并且添加自己的快捷键。你甚至可以覆盖默认的按键绑定并执行自定义操作。