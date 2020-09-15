function myFunction() {
  AuxilliaryReplaceTime(7)
}

function onEdit(e){
  // get the coordinates
  var range = e.range
  let row = range.getRow()
  let column = range.getColumn()
  
  // now check if the cell in column 1 of row == '#'
  
  Logger.log(e.value) // value
  var c2 = range.getSheet().getRange(row, 3) // name
  Logger.log(c2.getValue())
  
  if (!checkIsRowAccount(row))
  {
    Logger.log("Failed # check.")
    return;
  }
  if (column == 23 && e.value == "TRUE")
    AuxilliaryReplaceTime(row)
    
}

function AuxilliaryReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 24)
  var orders = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 25).getValue()
 
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setHours(today.getHours() + orders);
  
  var date = Utilities.formatDate(today, timezone, "yyyy-MM-dd HH:mm:ss")
  time.setValue(date)
}

function checkExpired(v)
{
  // input must be a(n Object) value.
  let parsedv = Date.parse(v)
  let currtime = new Date()
  
  return (parsedv < currtime)
}

function checkIsRowAccount(row)
{
  //return true/false if the row has a # in the 1st column
  let check = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 1).getValue()
  return check == '#'
}

function checkNumberOfAccounts()
{
  let count = 0;
  let row = 4;
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  
  while (checkIsRowAccount(row))
  {
    count++
    row++
  }

  Logger.log(count)
  return count
}

function AuxilliaryReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if their auxilliary has returned.
  // loop from row 4
  let row = 4
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop; checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,23).getValue())
    
    
    if (sheet.getRange(row, 23).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row++
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, 24).getValue()))
    
    if (checkExpired(sheet.getRange(row, 24).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, 23).setValue(false)
    }
    row++
  }
}