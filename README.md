# Poecoco-udS
This repo is a develop tool for Poecoco, which is designed to be a resident service like a server, for listening and check if data or legends were changed in POE server.

**How it works?**

It'll check datas from the host you gave and run cyclely as timer set, to deal with: 
* ***Item list*** 
* ***static list***
* ***etc...***

and translate them into more than **TEN different languages** which supported in Path of exile .


# Language List
**The amount of trans can offered depends on what could be got from POE server.**
* 10 languages

	| KEY        | label  |
	| ------------- | -----:|
	| US         | English |
	| zhTW         | 繁體中文 |
	| zhCN         | 简体中文 |
	| RU         | Русский |
	| PO         | Português |
	| TH         | ภาษาไทย |
	| FR         | Français |
	| DE         | Deutsch |
	| ES         | Spanish |
	| KR         | 한국어 |
# Default address
```
http://localhost:1999
```
# RESTful
```
/
```
* API document.
```
/item?name=***exName***&type=***exType***
```
* Will return item info if ***exName*** and ***exType*** both matched.
* Will return a item lists which ***exType*** matchedn when ***exName*** is empty.

```
```
*
```
```
*
```
```
*
```
```
*
# Install
git clone --depth 10 https://github.com/NEUTRON-Studio/Poecoco-udS.git
# Requirement
Golang: go 1.13, even greater.
# Development
For developing, please make sure you work on the right branch, which as ***master***. <br>
***release*** banch only works on merging and It'll **deploy** automatically.
# Execution

* If service launched with ***-dev*** or ***no flags***, All the result that received will  be json, which be unpackged strings.
	```
	go run main.go -dev
	```
* If service launched with ***-pro***, you'll get a encrypted bytes which packaged by [MsgPack for Golang](https://github.com/vmihailenco/msgpack)
	```
	go run main.go -pro
	```
___
## **Github Action Event** 
***Github Action*** would run ***-pro*** flags in release branch as default, and run ***-dev*** flags in master branch.
