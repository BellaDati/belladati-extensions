$(document).ready(function() {
  console.log(new Date().toLocaleString() + ': Loading JSON of table view: #PARAM=tableViewId#');
  var containerDiv = document.getElementById("bd-custom-table-container");
  containerDiv.appendChild(document.createTextNode("Loading ..."));

  $.ajax({
    url: "#PARAM=linkViewDetail##PARAM=tableViewId#",
    success: function(response) {
      console.log(new Date().toLocaleString() + ': JSON received. Rendering table ...');
      var data = response.data;

      $("#bd-custom-table-container").empty();
      var containerDiv = document.getElementById("bd-custom-table-container");
      containerDiv.appendChild(document.createTextNode("Rendering ..."));
      
      // create TABLE element and set CSS class
      $("#bd-custom-table-container").empty();
      var containerDiv = document.getElementById("bd-custom-table-container");
      var table = document.createElement('table');
      table.setAttribute('class', 'bd-custom-table');
      containerDiv.appendChild(table);
      
      // create checkbox
      var checkbox = document.createElement('input');
      checkbox.type = "checkbox";
                         
      // create THEAD inside TABLE
      var thead = table.createTHead();
      
      // iterate over all rows in header
      console.log(new Date().toLocaleString() + ': Rendering THEAD with ' + data.header.length + ' rows ...');
      var theadRowIndex = 0;
      for (i = 0; i < data.header.length; i++) {
      
        // insert new row into THEAD
        var theadRow = thead.insertRow(theadRowIndex++);
        
        // insert checkbox into first cell
        var theadCellIndex = 0;
        var checkboxCell = theadRow.insertCell(theadCellIndex++);
        
        // iterate over all cells in a row
        var columns = data.header[i];
        for (j = 0; j < columns.length; j++) {
          var column = columns[j];
          if (column && (typeof column.value != 'undefined') && (typeof column.i != 'undefined')) {
          
            // insert new cell
            var theadCell = theadRow.insertCell(theadCellIndex++);
            
            // fill cell with appropriate header
            var textValue = column.value;
            if (isColumnWithPath(column.i)) {
              textValue += " (Link)";
            }
            theadCell.appendChild(document.createTextNode(textValue));
          
            // hide cell with link
            if (shouldBeColumnHidden(column.i)) {
               theadCell.style.display = 'none';
            }
            
            // set colspan/rowspan attributes
            if (typeof column.colspan != 'undefined') {
              theadCell.setAttribute('colspan', computeColspanByHiddenColumn(column.i, column.colspan));
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
        
        // insert checkbox into first cell
        var tbodyCellIndex = 0;
        var checkboxCell = tbodyRow.insertCell(tbodyCellIndex++);
        checkboxCell.appendChild(checkbox.cloneNode());
        
        // iterate over all cells in a row
        var columns = data.body[i];
        for (j = 0; j < columns.length; j++) {
          var column = columns[j];
          if (column && (typeof column.value != 'undefined') && (typeof column.i != 'undefined')) {
            
            // insert new cell with value and colspan/rowspan attributes
            var tbodyCell = tbodyRow.insertCell(tbodyCellIndex++);
            
            // escape value (it contains links based on drilldown or appearence settings)
            var value = column.value;
            var escapedValue = value.indexOf(">") > -1 ? value.substring(value.lastIndexOf(">") + 1) : value;
            
            // fill cell with appropriate text or link
            if (isColumnWithPath(column.i)) {
              var aLink = document.createElement('a');
              aLink.appendChild(document.createTextNode(escapedValue));
              aLink.href = "#PARAM=linkGetFile#" + escapedValue;
              tbodyCell.appendChild(aLink);
              tbodyCell.setAttribute('id', escapedValue);
              tbodyCell.setAttribute('class', 'bd-cell-with-link');
            } else {
              tbodyCell.appendChild(document.createTextNode(escapedValue));
            }
          
            // hide cell with link
            if (shouldBeColumnHidden(column.i)) {
               tbodyCell.style.display = 'none';
            }
            
            // set colspan/rowspan attributes
            if (typeof column.colspan != 'undefined') {
              tbodyCell.setAttribute('colspan', computeColspanByHiddenColumn(column.i, column.colspan));
            }
            if (typeof column.rowspan != 'undefined') {
              tbodyCell.setAttribute('rowspan', column.rowspan);
            }
            
          }
        }
      }
      
      console.log(new Date().toLocaleString() + ': Rendering controls ...');

      // register events for rows in tbody and checkboxes
      $('.bd-custom-table tbody tr').click(function(event) {
        if (event.target.type !== 'checkbox') {
          $(':checkbox', this).trigger('click');
        }
      });
      $("input[type='checkbox']").change(function(e) {
        if ($(this).is(":checked")) {
          $(this).closest('tr').addClass("highlight_row");
          refreshControls();
        } else {
          $(this).closest('tr').removeClass("highlight_row");
          refreshControls();
        }
      });
      refreshControls();

      console.log(new Date().toLocaleString() + ': Render completed successfully');

    }
  });

  function isColumnWithPath(columnIndex) {
    return columnIndex == #PARAM=indexOfColumnWithPath#;
  }

  function shouldBeColumnHidden(columnIndex) {
    return isColumnWithPath(columnIndex) && #PARAM=hideColumnWithPath#;
  }

  function computeColspanByHiddenColumn(columnIndex, colspan) {
    if (#PARAM=hideColumnWithPath#) {
      if (columnIndex <= #PARAM=indexOfColumnWithPath# && #PARAM=indexOfColumnWithPath# < (columnIndex + colspan)) {
        return colspan - 1;
      } else {
        return colspan;
      }
    } else {
      return colspan;
    }
  }

  function refreshControls() {
    // clear existing controls
    $('#bd-custom-link').empty();
    $('#bd-custom-label').empty();
    
    // compute count and paths    
    var count = 0;
    var paths = "";
    $('.bd-custom-table tr').filter(':has(:checkbox:checked)').find('td').filter('.bd-cell-with-link').each(function() {
      count++;
      paths += paths ? (";" + this.id) : this.id;
    });
    
    // refresh link for PDF merge
    var button = document.createElement('button');
    button.type = "button";
    button.appendChild(document.createTextNode("Preview Drawing"));
    var link = document.createElement('a');
    link.appendChild(button);
    link.href = "#PARAM=linkMergePdfFiles#" + paths;
    if (count == 0) {
      link.setAttribute('class', 'disabled');
    }
    document.getElementById('bd-custom-link').appendChild(link);
    
    // refresh label with count
    var label = document.createTextNode("Selected Drawings: " + count);
    document.getElementById('bd-custom-label').appendChild(label);
    console.log(new Date().toLocaleString() + ': Selected files: ' + paths);
  }

});