---
title: 为什么SOAP很糟糕
description: 论文笔记
date: 2023-07-04
tags:
  - 论文笔记
---

# 为什么SOAP很糟糕

There's an amusing dialogue floating around about how simple SOAP is. As someone who bears some past responsibility for well used SOAP services (Google's APIs for search and AdWords) let me say now I'd never choose to use SOAP and WSDL again. I was wrong.
The promise of SOAP and WSDL was removing all the plumbing. When you look at SOAP client examples, they're two lines of code. "Generate proxy. RPC to proxy." And for toys, that actually works. But for serious things it doesn't. I don't have the space to explain all the problems right now (if you've seen my talks at O'Reilly conferences, you know), but they boil down to massive interoperability problems. Good lord, you can't even pass a number between languages reliably, much less arrays, or dates, or structures that can be null, or... It just doesn't work. Maybe with enough effort SOAP interop could eventually be made to work. It's not such a problem if you're writing both the client and the server. But if you're publishing a server for others to use? Forget it.

The deeper problem with SOAP is strong typing. WSDL accomplishes its magic via XML Schema and strongly typed messages. But strong typing is a bad choice for loosely coupled distributed systems. The moment you need to change anything, the type signature changes and all the clients that were built to your earlier protocol spec break. And I don't just mean major semantic changes break things, but cosmetic things like accepting a 64 bit int where you use used to only accept 32 bit ints, or making a parameter optional. SOAP, in practice, is incredibly brittle. If you're building a web service for the world to use, you need to make it flexible and loose and a bit sloppy. Strong typing is the wrong choice.

The REST / HTTP+POX services typically assume that the clients will be flexible and can make sense of messages, even if they change a bit. And in practice this seems to work pretty well. My favourite API to use is the Flickr API, and my favourite client for it is 48 lines of code. It supports 100+ Flickr API methods. How? Fast and loose. And it works great.

To be fair, SOAP can be forced to work. Using SOAP didn't really hurt adoption of the APIs I worked on. But it sure didn't help either. So what's the alternative? I'm not sure. Right now I'd probably go the HTTP+POX route while trying to name my resources well enough that the REST guys will invite me to their parties. But XML itself is such a disaster and AJAX is starting to show the cracks in HTTP (like, say, the lack of asynchrony).

Truly, none of this protocol fiddling matters. Just do something that works.

I no longer work for Google; these opinions are very much my own.

tech • bad
16 years ago   2006-11-17 08:54 Z


有一个关于 SOAP 是多么简单的有趣对话。作为一个过去对使用良好的 SOAP 服务（Google 的搜索API 和AdWords）负有一些责任的人，我现在可以说，我再也不会选择使用 SOAP 和 WSDL。我错了。
SOAP 和 WSDL 的承诺是消除所有管道。当您查看 SOAP 客户端示例时，它们是两行代码。“生成代理。RPC 到代理。” 对于玩具来说，这确实有效。但对于严肃的事情则不然。我现在没有足够的篇幅来解释所有问题（如果您看过我在 O'Reilly 会议上的演讲，您就会知道），但它们都归结为大规模的互操作性问题。天啊，你甚至无法在语言之间可靠地传递数字，更不用说数组、日期或可能为空的结构，或者......它就是行不通。也许通过足够的努力，SOAP 互操作最终可以发挥作用。如果您同时编写客户端和服务器，那么这不是问题。但是如果您要发布服务器供其他人使用呢？忘了它。

SOAP 的更深层次问题是强类型。WSDL 通过 XML 模式和强类型消息实现其魔力。但对于松散耦合的分布式系统来说，强类型并不是一个好的选择。当您需要更改任何内容时，类型签名就会更改，并且根据早期协议规范构建的所有客户端都会中断。我的意思不仅仅是主要的语义变化会破坏一些东西，而是一些装饰性的东西，比如接受 64 位 int（以前只接受 32 位 int），或者使参数成为可选的。实际上，SOAP 非常脆弱。如果您正在构建一个可供全世界使用的 Web 服务，您需要使其灵活、松散且有点草率。强类型是错误的选择。

REST / HTTP+POX 服务通常假设客户端是灵活的并且可以理解消息，即使它们发生了一点变化。在实践中，这似乎效果很好。我最喜欢使用的 API 是Fl​​ickr API，而我最喜欢的客户端是48 行代码。它支持 100 多种 Flickr API 方法。如何？快速而宽松。而且效果很好。

公平地说，SOAP 可以被迫工作。使用 SOAP 并没有真正影响我所开发的 API 的采用。但它肯定也没有帮助。那么还有什么选择呢？我不知道。现在，我可能会采用 HTTP+POX 路线，同时尝试为我的资源命名得足够好，以便 REST 人员会邀请我参加他们的聚会。但 XML 本身就是 一场 灾难，而 AJAX 开始暴露出 HTTP 中的缺陷（比如 缺乏异步性）。

确实，这个协议的摆弄都不重要。做一些有效的事情。

我不再为谷歌工作；这些意见很大程度上是我自己的。

科技•糟糕
16 年前   2006-11-17 08:54 Z