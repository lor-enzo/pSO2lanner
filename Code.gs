function myFunction() {
  AuxilliaryReplaceTime(7)
}

function onEdit(e){
  // get the coordinates
  var range = e.range
  let row = range.getRow()
  let column = range.getColumn()
  
  // now check if the cell in column 1 of row == '#'
  
  var check = range.getSheet().getRange(row, 1);
  Logger.log(e.value) // value
  Logger.log(check.getValue()) // # check
  var c2 = range.getSheet().getRange(row, 3) // name
  Logger.log(c2.getValue())
  
  if (check != '#')
  {
    Logger.log("Failed # check.")
    return;
  }
  if (column == 23)
    onEditAuxilliary(e)
  
}

function onEditAuxilliary(e){
  Logger.log("onEditAuxilliary(e)")
  let sheet = e.range.getSheet()
  let row = e.range.getRow()
  let timetarget = sheet.getRange(row, 24)
  let ordernumer = sheet.getRange(row,25).getValue()
}

function AuxilliaryReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 24)
  var orders = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 25).getValue()

  var orderoffset = 8 + orders
  var timezone = "GMT+" + orderoffset
  var date = Utilities.formatDate(new Date(), timezone, "HH:mm")
  time.setValue(date)
}

function test()
{
  var something = Date.parse(SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(4,24).getValue())
  var something2 = new Date()
  
  if (something < something2)
    Logger.log("now is older than target time")
    
  if (something > something2)
    Logger.log("nyes")
    
     Logger.log("end")
}
