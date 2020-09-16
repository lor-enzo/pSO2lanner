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
    
  else if (column == 27 && e.value == "TRUE")
    YerkesReplaceTime(row)
  
  else if (column == 30 && e.value == "TRUE")
    SGReplaceTime(row)
    
  else if (column == 18 && e.value == "TRUE")
    GatheringResetEnergy(row)
    
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

function YerkesReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 28)
 
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setDate(today.getDate() + 7);
  
  var date = Utilities.formatDate(today, timezone, "yyyy-MM-dd HH:mm:ss")
  time.setValue(date)
}

function SGReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 31)
  
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setHours(today.getHours() + 22);
  
  var date = Utilities.formatDate(today, timezone, "yyyy-MM-dd HH:mm:ss")
  time.setValue(date)
}

function GatheringResetEnergy(row)
{
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  sheet.getRange(row, 18).setValue(false)
  sheet.getRange(row, 19).setValue(0)
  
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
      sheet.getRange(row, 24).clearContent()
    }
    row++
  }
}

function YerkesReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if their auxilliary has returned.
  // loop from row 4
  let row = 4
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop; checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,27).getValue())
    
    if (sheet.getRange(row, 27).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row++
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, 28).getValue()))
    
    if (checkExpired(sheet.getRange(row, 28).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, 27).setValue(false)
      sheet.getRange(row, 28).clearContent()
    }
    row++
  }
}

function SGReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if their auxilliary has returned.
  // loop from row 4
  let row = 4
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop; checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,30).getValue())
    
    
    if (sheet.getRange(row, 30).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row++
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, 31).getValue()))
    
    if (checkExpired(sheet.getRange(row, 31).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, 30).setValue(false)
      sheet.getRange(row, 31).clearContent()
    }
    row++
  }
}

function GatheringRestoreEnergy()
{
  // run this function every 3 minutes
  // energy takes 300 mins to restore
  
  let row = 4
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    let energy = sheet.getRange(row, 19)
    if (energy.getValue() < 100)
    {
      energy.setValue(energy.getValue() + 1/3)
    }
    
    if (energy.getValue() >= 100)
    {
      energy.setValue(100)
    } 
    
    row++
  }
}