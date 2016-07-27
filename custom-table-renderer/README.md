# Customized Table Renderer

This folder contains BellaDati extension called **Customized Table Renderer**. It is based on basic [Table Renderer](../table-renderer/) with additional features like:

* custom look & feel (e.g. colors, padding, borders, resizing table columns, hiding columns, etc.)
* access to PDF files located on filesystem where BellaDati is running
* selecting multiple table rows

Please see [tutorial](http://support.belladati.com/techdoc/Creating+custom+table) for more information about this extension.

You can download this ready–made extension as [ZIP file](./Customized-Table-Renderer-Extension.zip) and import it into your BellaDati instance.

Parameters:

| Name                  | Type    | Description                                          | Example      |
|-----------------------|---------|------------------------------------------------------|--------------|
| enableResizingColumns | Boolean | You can enable/disable resizing columns in table     | false        |
| hideColumnWithPath    | Boolean | You can show/hide column where file path is located  | false        |
| indexOfColumnWithPath | Integer | Index of column where file path is located           | 4            |
| linkGetFile           | String  | Link to our Client API endpoint that returns file from given absolute path | /bi/utils/api:file?path=           |
| linkMergePdfFiles     | String  | Link to our Client API endpoint that merges PDF files into one PDF file    | /bi/utils/api:mergePdfFiles?paths= |
| linkViewDetail        | String  | Link to our Client API endpoint that loads the view detail with data       | /bi/report/api:viewDetail/         |
| tableViewId           | String  | Identification of source table view                  | 123-AbCdEfGh |

Files:

```
 ├-- Customized-Table-Renderer-Extension.zip     -> Ready–made extension that can be imported into BellaDati
 ├-- body.html                                   -> Content of HTML body
 ├-- colResizable-1.6.min.js                     -> jQuery plugin to resize table columns - see https://github.com/alvaro-prieto/colResizable
 ├-- custom-table-renderer.js                    -> JavaScript code responsible for loading JSON data and rendering table
 ├-- custom-table-styles.css                     -> CSS styles
 └-- head.html                                   -> Content of HTML head
```

Please see [our documentation](http://support.belladati.com/doc/Extensions) and [tutorials](http://support.belladati.com/techdoc/Extensions) for more information about BellaDati Extensions feature.
