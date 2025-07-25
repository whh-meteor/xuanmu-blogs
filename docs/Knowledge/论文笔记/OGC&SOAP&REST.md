《架构风格和基于网络的软件架构的设计》 。
https://www.ics.uci.edu/~fielding/pubs/dissertation/top.htm

## 第1部分

自 1994 年以来，REST 架构风格一直被用来指导现代 Web 架构的设计和开发。本章介绍了在编写超文本传输​​协议 (HTTP) 和统一资源标识符 (URI) 的 Internet 标准时应用 REST 的经验和教训...


“具象状态转移”这个名称旨在让人联想到精心设计的 Web 应用程序的行为方式：网页网络（虚拟状态机），用户通过选择链接（状态转换）在应用程序中进行操作，导致下一页（代表应用程序的下一个状态）被传输给用户并呈现以供他们使用。

REST 并不旨在捕获 Web 协议标准的所有可能用途。HTTP 和 URI 的某些应用与分布式超媒体系统的应用模型不匹配。

自描述 REST 架构风格以来，已经发布了许多 OGC Web 服务接口标准 ~ WMS 1.1.1 (2002)、OWS Common 1.0 (2005)、WCS 1.0 (2005)、WMS 1.3.0 (2006)、WFS 2.0.0 (2010)、OWS Common 2.0 (2010)、WCS 2.0 (2012) 等...该列表并不全面，但您可以看到，对于某些人来说，已经存在通过 OGC 服务定义与空间数据交互的 RESTful 方式的机会。


## 第2部分

第2部分

这个问题混淆了两件事，REST 是一种架构风格（请参阅第 1 部分），而 JavaScript 对象表示法 (JSON) 是一种轻量级数据交换格式（请参阅json.org）。JSON 不被视为超媒体格式，因为该表示法并未形式化编码 URI 的方式。由于 JSON 不是超媒体格式，并且 REST 需要超媒体/超文本，因此仅使用 JSON 的系统不能被描述为 RESTful。

请参阅：REST API 必须是超文本驱动的 ~ Roy T. Fielding (2008) 和：REST：我不认为它意味着您认为的那样 ~ Stefan Tilkov (2014)


## 第3部分

因此，目前可以从 OGC 服务以某些 JSON 格式向您提供输出（尽管这些格式都不是由 OGC 定义的），例如，您可以让 WMS (GetFeatureInfo) 和 WFS 为您提供 JSON。

OGC 目前正在寻求定义一些基于 JSON 的格式来传输地理空间数据，例如用于观测和测量数据的 OM-JSON。

OGC 目前也在研究如何解决与其 Web 服务接口标准相关的 REST，例如 WFS 和 OWS common 的下一个版本正在研究这个方面。



## OGC Web处理服务开发的两个软件框架的设计与实现——结论
WPS version 1.0.0 specification does not give all answers to questions that might rise during service implementation. For example there is a lack of guidelines on process management. According to specification active processes of the WPS service can by investigated by checking their status of their execution. Although the status of the process might inform about its current state, but this information is read only. Therefore service client that lunched his own process can not influence the course of its execution (i.e. by issuing a kind of stop, suspend or resume command). It is not known how to handle the situations of process killing by the operating system (due to the long duration of its execution for example) when a fatal error appears. Of course, there might be a question whether geospatial services available can be considered as manageable parts of a distributed system (with all the baggage associated with implementation of the remote garbage collection) or not. Due to the potential risk of overloading server resources by the processes running under the service control, the possibility of process management through the service interface appears to be a legitimate expectation. Problematic might be also the implementation of the management of the data sent to the server and stored by the server. The WPS standard does not give any specific advice here, except that the service does not provide the results generated (when status and storage functions are used by the process). The standard does not describe how long the data should be stored on the server, nor gives a direction to solve this problem. And this is a big problem, because geospatial data can occupy a significant part of the disk, so

few service requests may completely exhaust the resources available on the server. Another issue is the inability to re-use of data already loaded on the server (for example, to call the same process, but with another set of parameters). The way of using a status should also be clarified. Not all requests need to define their status (e.g. when a response is returned immediately). According to specification all request with the status option are process by the system which generates a response using storage mechanism. Interesting is that it is possible to issue a request with the status option active and inactive storage – in such a case the resulting output file will be generated regardless inactive storage. Processing of large files downloaded from the web is also problematic. When the large geotiff files are set for processing, their downloading will increase network load and might take a lot of time. Therefore, processing by WPS this type of data is rather poor idea. It seams to be a good idea to develop a standard describing programming interface for WPS processes implementation. With such a standard, it would be possible to transfer components implementing algorithms (e.g. DLLs, packages of classes, war files) between different implementations of WPS service. Currently, all components created are implementation specific and not movable. The WPS specification defines a relatively small number of exceptions with NoApplicableCode exception used in most uncovered cases. A good complement to the standard would be a scheme of introducing user exceptions. Finally, the use of SOAP in the WPS service, similar to other OGC services, it is very poor. It is limited only to filling body element with standard requests or responses leaving out the potential of SOAP in handling requests chains. No better looks the use of WSDL documents describing services. The current specification does not specify how to generate and share WSDL documents, and the poor examples of the tests are focused only on verifying the validity of the service protocol. Some remarks on SOAP and WSDL were provided by Sancho-Jiménez et al. (2008). At least WPS as other OGC services does not tackle the problem of security. Anyone can call WPS processes with no restriction or data protection. The solution is to use the proxy server or another security layer (as GeoRM, which is not standardized yet). Despite many flaws, WPS also has many advantages, which include among others: a simple interface that allows distributing calculations, the nature of an intermediate layer, the possibility of request chaining, simple interface for process definition, and the possibility of returning the result in the RAW format. Although the recognition of WPS among other OGC services (like WMS, WFS or WCS) is not so strong, the potential inherent in it can change this situation. The presented open-source framework implementations, plWPS and jWPS, can certainly contribute to increase the popularity of the WPS.


WPS版本1.0.0规范没有给出在服务实现过程中可能出现的所有问题的答案。例如，缺乏关于流程管理的指导方针。根据规范，可以通过检查其执行状态来调查WPS服务的活动进程。虽然进程的状态可能会告知其当前状态，但此信息是只读的。因此，启动自己进程的服务客户端不能影响其执行过程(即，通过发出一种停止、暂停或恢复命令)。当出现致命错误时，不知道如何处理操作系统终止进程的情况(例如，由于其执行的持续时间较长)。当然，是否可以将可用的地理空间服务视为分布式系统的可管理部分(具有与实现远程垃圾收集相关的所有包袱)，这可能是一个问题。由于在服务控制下运行的进程存在使服务器资源过载的潜在风险，因此通过服务接口管理进程的可能性似乎是合理的预期。管理发送到服务器并由服务器存储的数据的实现也可能是有问题的。WPS标准在这里没有给出任何具体建议，只是服务不提供生成的结果(当进程使用状态和存储功能时)。该标准没有说明数据应该在服务器上存储多长时间，也没有给出解决这个问题的方向。这是一个大问题，因为地理空间数据可能会占据磁盘的很大一部分，因此很少的服务请求可能会完全耗尽服务器上的可用资源。另一个问题是无法重用已加载到服务器上的数据(例如，使用另一组参数调用相同的进程)。还应明确使用状态的方式。并非所有请求都需要定义其状态(例如，当响应立即返回时)。根据规范，所有带有状态选项的请求都由系统处理，系统使用存储机制生成响应。有趣的是，可以使用状态选项ACTIVE AND INACTIVE STORAGE发出请求-在这种情况下，生成的输出文件将与INACTIVE存储无关。处理从网络下载的大文件也是有问题的。将大型Geotiff文件设置为要处理时，它们的下载将增加网络负载，并且可能会花费大量时间。因此，用WPS处理这种类型的数据是相当糟糕的想法。为WPS流程实现开发一个描述编程接口的标准似乎是一个好主意。有了这样的标准，就有可能在WPS服务的不同实现之间传输实现算法的组件(例如，DLL、类包、WAR文件)。目前，创建的所有组件都是特定于实现的，并且不能移动。WPS规范定义了数量相对较少的异常，NoApplicableCode异常用于大多数未涵盖的情况。对该标准的一个很好的补充是引入用户例外的方案。最后，在WPS服务中使用SOAP，类似于其他OGC服务，它非常差。它仅限于使用标准请求或响应填充Body元素，而忽略了在处理请求链时使用SOAP的可能性。使用描述服务的wsdl文档看起来也好不到哪里去。当前的规范没有指定如何生成和共享WSDL文档，测试的糟糕示例仅集中在验证服务协议的有效性上。Sancho-Jiménez等人提供了一些关于SOAP和wsdl的评论。(2008年)。至少WPS和其他OGC服务一样，没有解决安全问题。任何人都可以在没有限制或数据保护的情况下调用WPS进程。解决方案是使用代理服务器或另一个安全层(作为GeoRM，它还没有标准化)。尽管有许多缺陷，WPS也有许多优点，其中包括：允许分发计算的简单接口、中间层的性质、请求链的可能性、用于过程定义的简单接口以及以RAW格式返回结果的可能性。尽管WPS在其他OGC服务(如WMS、WFS或WCS)中的认可度并不高，但其固有的潜力可以改变这种情况。目前的开源框架实现plWPS和jWPS肯定有助于提高WPS的受欢迎程度。