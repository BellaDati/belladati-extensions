$(document).ready(function() {
  console.log(new Date().toLocaleString() + ': Loading JSON of table view: #PARAM=tableViewId#');
  var containerDiv = document.getElementById("bd-table-container");
  containerDiv.appendChild(document.createTextNode("Loading ..."));

  $.ajax({
    url: "/en/bi/report/api:viewDetail/#PARAM=tableViewId#",
    success: function(response) {
      console.log(new Date().toLocaleString() + ': JSON received. Rendering table ...');
      var data = response.data;

      $("#bd-table-container").empty();
      var containerDiv = document.getElementById("bd-table-container");
      containerDiv.appendChild(document.createTextNode("Rendering ..."));
      
      // create TABLE element and set CSS class
      $("#bd-table-container").empty();
      var containerDiv = document.getElementById("bd-table-container");
      var table = document.createElement('table');
      table.setAttribute('class', 'bd-table');
      containerDiv.appendChild(table);
                         
      // create THEAD inside TABLE
      var thead = table.createTHead();
      
      // iterate over all rows in header
      console.log(new Date().toLocaleString() + ': Rendering THEAD with ' + data.header.length + ' rows ...');
      var theadRowIndex = 0;
      for (i = 0; i < data.header.length; i++) {
      
        // insert new row into THEAD
        var theadRow = thead.insertRow(theadRowIndex++);
        
        // iterate over all cells in a row
        var theadCellIndex = 0;
        var columns = data.header[i];
        for (j = 0; j < columns.length; j++) {
          var column = columns[j];
          if (column && (typeof column.value != 'undefined') && (typeof column.i != 'undefined')) {
          
            // insert new cell with value
            var theadCell = theadRow.insertCell(theadCellIndex++);
            theadCell.appendChild(document.createTextNode(column.value));

            // set colspan/rowspan attributes
            if (typeof column.colspan != 'undefined') {
              theadCell.setAttribute('colspan', column.colspan);
            }
            if (typeof column.rowspan != 'undefined') {
              theadCell.setAttribute('rowspan', column.rowspan);
            }
            
          }
        }
      }
                         
      // create TBODY inside TABLE
      var tbody = table.createTBody();
      
      // iterate over all rows in body
      console.log(new Date().toLocaleString() + ': Rendering TBODY with ' + data.body.length + ' rows ...');
      var tbodyRowIndex = 0;
      for (i = 0; i < data.body.length; i++) {
        
        // insert new row into TBODY
        var tbodyRow = tbody.insertRow(tbodyRowIndex++);
        
        // iterate over all cells in a row
        var tbodyCellIndex = 0;
        var columns = data.body[i];
        for (j = 0; j < columns.length; j++) {
          var column = columns[j];
          if (column && (typeof column.value != 'undefined') && (typeof column.i != 'undefined')) {
            
            // insert new cell
            var tbodyCell = tbodyRow.insertCell(tbodyCellIndex++);

            // escape and set value (it contains links based on drilldown or appearence settings)
            var value = column.value;
            var escapedValue = value.indexOf(">") > -1 ? value.substring(value.lastIndexOf(">") + 1) : value;
            tbodyCell.appendChild(document.createTextNode(escapedValue));

            // set colspan/rowspan attributes
            if (typeof column.colspan != 'undefined') {
              tbodyCell.setAttribute('colspan', column.colspan);
            }
            if (typeof column.rowspan != 'undefined') {
              tbodyCell.setAttribute('rowspan', column.rowspan);
            }
            
          }
        }
      }
      
      console.log(new Date().toLocaleString() + ': Render completed successfully');
    }

  });    
});