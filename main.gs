var firstcharacterrow = 10
var characterrowgap = 6
var dropdowncol = 2
var harvestcheckboxcol = 16
var auxcheckboxcol = 20
var zigcheckboxcol = 24
var yerkescheckboxcol = 27
var sgcheckboxcol = 30

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
    return
  }
  
  if (column == auxcheckboxcol && e.value == "TRUE")
    AuxilliaryReplaceTime(row)
    
    else if (column == yerkescheckboxcol && e.value == "TRUE")
      YerkesReplaceTime(row)
      
      else if (column == sgcheckboxcol && e.value == "TRUE")
        SGReplaceTime(row)
        
        else if (column == harvestcheckboxcol && e.value == "TRUE")
          GatheringResetEnergy(row)
          
          else if (column == zigcheckboxcol && e.value == "TRUE")
            ZigReplaceTime(row)
            
          else if (column == dropdowncol && e.value == "TRUE")
            ExpandChecklist(row)
            
          else if (column == dropdowncol && e.value == "FALSE")
            CollapseChecklist(row)  
            }


function ExpandChecklist(row)
{
  SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].showRows(row+1, 5)
}

function CollapseChecklist(row)
{
    SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].hideRows(row+1, 5)
}
function AuxilliaryReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, auxcheckboxcol+1)
  var orders = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, auxcheckboxcol+2).getValue()
  
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setHours(today.getHours() + orders)
  
  var date = Utilities.formatDate(today, timezone, "yyyy-MM-dd HH:mm:ss")
  time.setValue(date)
}

function YerkesReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, yerkescheckboxcol+1)
  
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setDate(today.getDate() + 7)
  
  var date = Utilities.formatDate(today, timezone, "yyyy-MM-dd HH:mm:ss")
  time.setValue(date)
}

function SGReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, sgcheckboxcol+1)
  
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setHours(today.getHours() + 22)
  
  var date = Utilities.formatDate(today, timezone, "yyyy-MM-dd HH:mm:ss")
  time.setValue(date)
}

function GatheringResetEnergy(row)
{
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  sheet.getRange(row, harvestcheckboxcol).setValue(false)
  sheet.getRange(row, harvestcheckboxcol+1).setValue(0)
}

function ZigReplaceTime(row)
{
  var time = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, zigcheckboxcol+1)
  
  var timezone = "GMT+8"
  
  var today = new Date()
  today.setDate(today.getDate() + 1)
  
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
  if (SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getMaxRows() < row)
    return false
    
    let check = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0].getRange(row, 1).getValue()
    return check == '#'
}

function checkNumberOfAccounts()
{
  let count = 0
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  
  while (checkIsRowAccount(row))
  {
    count++
      row+=characterrowgap
  }
  Logger.log(count)
  return count
}

function AuxilliaryReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if their auxilliary has returned.
  // loop from row 4
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,auxcheckboxcol).getValue())
    
    
    if (sheet.getRange(row, auxcheckboxcol).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row+=characterrowgap
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, auxcheckboxcol+1).getValue()))
    
    if (checkExpired(sheet.getRange(row, auxcheckboxcol+1).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, auxcheckboxcol).setValue(false)
      sheet.getRange(row, auxcheckboxcol+1).clearContent()
    }
    row+=characterrowgap
  }
}

function YerkesReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if their auxilliary has returned.
  // loop from row 4
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,yerkescheckboxcol).getValue())
    
    if (sheet.getRange(row, yerkescheckboxcol).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row+=characterrowgap
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, yerkescheckboxcol+1).getValue()))
    
    if (checkExpired(sheet.getRange(row, yerkescheckboxcol+1).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, yerkescheckboxcol).setValue(false)
      sheet.getRange(row, yerkescheckboxcol+1).clearContent()
    }
    row+=characterrowgap
  }
}

function SGReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if their auxilliary has returned.
  // loop from row 4
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,sgcheckboxcol).getValue())
    
    
    if (sheet.getRange(row, sgcheckboxcol).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row+=characterrowgap
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, sgcheckboxcol+1).getValue()))
    
    if (checkExpired(sheet.getRange(row, sgcheckboxcol+1).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, sgcheckboxcol).setValue(false)
      sheet.getRange(row, sgcheckboxcol+1).clearContent()
    }
    row+=characterrowgap
  }
}

function GatheringRestoreEnergy()
{
  // run this function every 3 minutes
  // energy takes 300 mins to restore
  
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    let energy = sheet.getRange(row, harvestcheckboxcol+1)
    if (energy.getValue() < 100)
    {
      energy.setValue(energy.getValue() + 1/3)
    }
    
    if (energy.getValue() >= 100)
    {
      energy.setValue(100)
    } 
    
    row+=characterrowgap
  }
}

function ZigReturnCheck()
{
  // every 5 minutes, loop through all the accounts and see if zig COs are ok.
  // loop from row 10
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    Logger.log("In loop checking row")
    Logger.log(row)
    Logger.log(sheet.getRange(row,zigcheckboxcol).getValue())
    
    
    if (sheet.getRange(row, zigcheckboxcol).getValue() != true)
    {
      Logger.log("checkbox not true, skipping row")
      row+=characterrowgap
      continue
    }
    
    Logger.log(checkExpired(sheet.getRange(row, zigcheckboxcol+1).getValue()))
    
    if (checkExpired(sheet.getRange(row, zigcheckboxcol+1).getValue()))
    {
      Logger.log("checkExpired() returned true, falsing checkbox in row")
      sheet.getRange(row, zigcheckboxcol).setValue(false)
      sheet.getRange(row, zigcheckboxcol+1).clearContent()
    }
    row+=characterrowgap
  }
}

function WeeklyReset()
{
  // every wednesday, 4pm (gmt +8)
  let row = firstcharacterrow
  let sheet = SpreadsheetApp.getActiveSpreadsheet().getSheets()[0]
  while (checkIsRowAccount(row))
  {
    sheet.getRange(row, 5, charcount, 10).setValue(false)
    row+=characterrowgap
  }
}