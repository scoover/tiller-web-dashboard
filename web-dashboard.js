// remote url for dashboard html (optional - local version used if not defined)
// var templateUrl = 'https://example.com/web-dashboard.htm';
// expected dashboard formatter sheet name
var sheetNameWebDashboard = 'Web Dashboard';

// getTemplateFromUrl(): fetch template html from a url
function getTemplateFromUrl(url) {
  // configure and fetch html template from provided url
  var options = { method : 'GET', contentType : 'application/html', muteHttpExceptions: true };
  var response = UrlFetchApp.fetch(url, options);

  // return object containing response code and html template
  return {
    success: response.getResponseCode() === 200,
    code: response.getResponseCode(),
    html: response.getContentText()
  };
}

// doGet(): this function executes whenever the web app url called
function doGet(e) {
  // load the linked spreadsheet object
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  // load the dashboard definition sheet
  var sheet = spreadsheet.getSheetByName(sheetNameWebDashboard);
  // create HtmlService object 
  var html = null;

  // if the dashboard definition sheet is not found...
  if(!sheet) {
    return showErrorHtml(
        'Definition Sheet Not Found',
        '<p>Dashboard metrics are defined via a sheet named <b>' + sheetNameWebDashboard + '</b>. \
        The spreadsheet hosting this web app does not include a sheet named <b>' + sheetNameWebDashboard + '</b>.</p>'
      );
  }

  // attempt to load a remote template if a `templateUrl` is defined
  if (typeof templateUrl !== 'undefined') {
    // attempt to load the remote url
    var response =  getTemplateFromUrl(templateUrl);
    
    // if the fetch operation was successful...
    if(response.success) {
      // use the template loaded from `templateUrl`
      html = HtmlService.createTemplate(response.html);
    }
  }

  // if a remote template wasn't defined or couldn't be loaded,  use the local template
  if(!html) { html = HtmlService.createTemplateFromFile('template'); }

  // inject stringified sheet contents array into template
  html.dashboardConfig = JSON.stringify(sheet.getDataRange().getValues());
  // return the populated webpage
  return html.evaluate();
}

// showErrorHtml(): render error message html from local template
function showErrorHtml(title, message) {
  var errroHtml = HtmlService.createTemplateFromFile('error');
  errroHtml.title = title;
  errroHtml.message = message;
  return errroHtml.evaluate();
}