var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("coin");
var startRow = 2; // Start from row 2
var endRow = sheet.getLastRow();  // End at the last row
var cryptoCodes = sheet.getRange("A" + startRow + ":A" + endRow).getValues();
var myList = []; 
var myList2 = [];
var color = "#00ff00";
var sheet1 = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("name");
var mailedCoin=sheet1.getRange("A2").getValue();
var mailedCoin1=sheet1.getRange("B2").getValue();
Logger.log(mailedCoin)
function updateAllBitcoinPrices() {
   
  var prices = [];
 
  for (var i = 0; i < cryptoCodes.length; i++) {
    var cryptoCode = cryptoCodes[i][0];
    var url = "https://cryptoprices.cc/" + cryptoCode;
   
    // Fetch the data
    var response = UrlFetchApp.fetch(url);
    var data = response.getContentText();
   
    // Add the data to the prices array
    prices.push([data]);
   
  }
 
  // Update the cells in column B with the new prices
  sheet.getRange(startRow, 2, prices.length, 1).setValues(prices);
 
}


Utilities.sleep(10000);
sendMail()




function sendMail(){
  for (var i = 0; i < cryptoCodes.length; i++) {
    var check = sheet.getRange("F" + (startRow + i)).getBackground();
    var check2 = sheet.getRange("G" + (startRow + i)).getBackground();
    // If you want to send an email when i is equal to 3, you can use the following block
    if (color === check) {
      // Assuming you want to get the value from A1 for all rows (you might need to clarify this)
      var valueInColumnA = sheet.getRange("A" + (startRow + i)).getValue();
      var valueInColumnD = sheet.getRange("D" + (startRow + i)).getValue();
      var concatenatedValues = valueInColumnA + '    ' + valueInColumnD ;
      myList.push(concatenatedValues);
    }
    if(color === check2){
      var valueInColumnA = sheet.getRange("A" + (startRow + i)).getValue();
      var valueInColumnD = sheet.getRange("D" + (startRow + i)).getValue();
      var concatenatedValues = valueInColumnA + '    ' + valueInColumnD ;
      myList2.push(concatenatedValues)
    }


  }
  var string1 = "";
  var string2 = "";
  for (var i = 0; i < myList.length; i++) {
    string1 += myList[i] + "\n";
    string2 += myList[i];
  }
 
  Logger.log(string2);
 
 
  var range = sheet1.getRange("A2");


  // Wrap the value in a 2D array
  var values = [[string2]];


  // Set the value using setValues
  range.setValues(values);


  if(string2!==mailedCoin){
    MailApp.sendEmail("asimalia051@gmail.com","Coins has reached 0.5%", `${string1}`);
    //Logger.log("No name")
  }
  else{
    Logger.log("Match")
  }
 
  var string11 = "";
  var string22 = "";
  for (var i = 0; i < myList2.length; i++) {
    string11 += myList2[i] + "\n";
    string22 += myList2[i];
  }
 
  Logger.log(string22);
 
 
  var range1 = sheet1.getRange("B2");


  // Wrap the value in a 2D array
  var values1 = [[string22]];


  // Set the value using setValues
  range1.setValues(values1);


  if(string22!==mailedCoin1){
    MailApp.sendEmail("asimalia051@gmail.com","Coins has reached 1%", `${string11}`);
    //Logger.log("No name")
  }
  else{
    Logger.log("Match")
  }



}

