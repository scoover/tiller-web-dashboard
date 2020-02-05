// remote url for dashboard html (optional - local version used if not defined)
var templateUrl = 'https://storage.googleapis.com/assets.templates.tillermoney.com/tillerLabs/html/web-dashboard-template.html';
// expected dashboard formatter sheet name
var sheetNameWebDashboard = 'Web Dashboard';

// getTemplateFromUrl(): fetch template html from a url
function getTemplateFromUrl(url) {
  // check that the url is defined
  if((typeof url !== 'string') || !url.length) {
    return { success: false };
  }

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
  var html;

  // if the dashboard definition sheet is not found...
  if(!sheet) {
    return showErrorHtml(
        'Definition Sheet Not Found',
        '<p>Dashboard metrics are defined via a sheet named \
        <b>' + sheetNameWebDashboard + '</b>. The spreadsheet hosting this web app does not \
        include a sheet named <b>' + sheetNameWebDashboard + '</b>.</p>'
      );
  }

  // attempt to load a remote template 
  var response =  getTemplateFromUrl(templateUrl);
  
  // if the fetch operation was successful...
  if(response.success) {
    // use the template loaded from `templateUrl`
    html = HtmlService.createTemplate(response.html);
  }
  else {
    return showErrorHtml(
        'Could Not Load Template',
        '<p>This web app requires a template to render the dashboard.<br> \
        The service was unable to load the template at the following address:<br>\
        <a href=\'' + templateUrl + '\' target=\'_blank\'>' + templateUrl + '</a>.</p>\
        <p>Check the URL and try again...</p>'
      );
  }

  // inject stringified sheet contents array into template
  html.dashboardConfig = JSON.stringify(sheet.getDataRange().getValues());
  // return the populated webpage
  return html.evaluate();
}

// showErrorHtml(): render error message html from local template
function showErrorHtml(title, message) {
  var errroHtml = HtmlService.createTemplate(errorHtml);
  errroHtml.title = title;
  errroHtml.message = message;
  return errroHtml.evaluate();
}

var errorHtml = '<!DOCTYPE html><html> <head> <title>Web Dashboard Error</title> \
  <link href=\"https://fonts.googleapis.com/css?family=Francois+One&display=swap\" rel=\"stylesheet\"> \
  <style>body{font-family: \'Francois One\', sans-serif; padding: 30px; background-color: #fffeec;} \
  h1{margin: 25px auto 60px; text-align: center; line-height: 1.05; font-size: 50px;}\
  .message-container{margin: 0 auto; background-color: #ffea00; border-radius: 10px; padding: 20px; \
  width: 60%; text-align: center;}.message{font-size: 45px; line-height: 1.25; margin: 0; padding: 0;}\
  </style> </head> <body> <h1 id=\"header\"> <span style=\"font-size: 25px; font-weight: 100;\">\
  Tiller Web Dashboard</span><br><?!=title ?> </h1> <div class=\"message-container\"> \
  <p class=\"message\"><?!=message ?></p></div></body></html>';