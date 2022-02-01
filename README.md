# POEcoco-upData

```POEcoco-upData``` 是一個基於Github Action運作的工具，會依照排定的時間自動進行資料的更新。<br/>
* 預設每日整點檢查 Daily run as default

# 主要功能
主要於官網拉取各語言的文本:
1. 產生物品的翻譯資料
2. 產生詞綴的翻譯資料
3. 進行技能樹資料的更新

最後另外生成供POEcoco使用的翻譯資料以及渲染技能樹的圖形結構。
<br/>
# Language List
**文本資料由Path of Exile 官網API提供**
* 10 languages

	| KEY        | label  |
	| ------------- | -----:|
	| GB         | English |
	| TW         | 繁體中文 |
	| CN         | 简体中文 |
	| RU         | Русский |
	| BR         | Português |
	| TH         | ภาษาไทย |
	| FR         | Français |
	| DE         | Deutsch |
	| ES         | Spanish |
	| KR         | 한국어 |
<br/>

# 文件結構說明

## 各個資料處理結果位於 ```/output/...```
<h3>

 * ```/fetch```: 從官網API獲取的新資料。
 * ```/items```: 處理完成的各個物品文本結構。
 * ```/stats```: 處理完成的各個詞綴文本結構。
 * ```/skilltree```: 從官網擷取的技能樹。
<br/><br/>
 <h4>為了剔除有些文本內存在，但其餘文本不包含的情況:</h4>

 * ```/blacklist```: 包含已經被移除的物品翻譯。
<br/><br/>
 <h4>未實作-只做為項目保留:</h4> 

 * ```/static```: 處理完成的各個資料文本結構。
<br/><br/>
 <h4>供其他項目使用:</h4> 

* ```/poecoco```: Poecoco使用的資料。
</h3>