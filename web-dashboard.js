// remote url for dashboard html (optional - local version used if not defined)
var templateUrl = 'https://example.com/web-dashboard.htm';
// expected dashboard formatter sheet name
var sheetNameWebDashboard = 'Web Dashboard';

// define dashboard formatter column names
var webMetricName  = 'Header';
var webMetricValue = 'Value';
var webMetricType  = 'Type';
var webMetricColor = 'Color';
var webMetricNote = 'Note';
var webMetricHeaders = [ webMetricName, webMetricValue, webMetricType, webMetricColor, webMetricNote ];

// define colors for web dashboard styling
var whiteColor = '#FDFDFD';
var blackColor = '#1C2436';
var headerColor = whiteColor;
var colors = {
  apricot:   { fill: '#FFD8B1',  text: blackColor },
  beige:     { fill: '#FFFAC8',  text: blackColor },
  black:     { fill: blackColor, text: whiteColor },
  blue:      { fill: '#2E86DE',  text: whiteColor },
  brown:     { fill: '#9A6324',  text: whiteColor },
  cyan:      { fill: '#42D4F4',  text: whiteColor },
  darkgray:  { fill: '#80889A',  text: whiteColor },
  darkblue:  { fill: '#303C5B',  text: whiteColor },
  green:     { fill: '#69C569',  text: whiteColor },
  lavender:  { fill: '#E6BEFF',  text: blackColor },
  lime:      { fill: '#BFEF45',  text: blackColor },
  gray:      { fill: '#EEEEF1',  text: blackColor },
  magenta:   { fill: '#F032E6',  text: whiteColor },
  maroon:    { fill: '#800000',  text: whiteColor },
  mint:      { fill: '#AAFFC3',  text: blackColor },
  navy:      { fill: '#000075',  text: whiteColor },
  olive:     { fill: '#808000',  text: whiteColor },
  orange:    { fill: '#F58231',  text: whiteColor },
  pink:      { fill: '#FABEBE',  text: blackColor },
  purple:    { fill: '#911EB4',  text: whiteColor },
  red:       { fill: '#EE5253',  text: whiteColor },
  teal:      { fill: '#469990',  text: whiteColor },
  white:     { fill: whiteColor, text: blackColor },
  yellow:    { fill: '#FFEF00',  text: blackColor }
};
// set background color for dashboard
var backgroundColor = colors.darkblue.fill;

// getTemplateFromUrl(): fetch template html from a url
function getTemplateFromUrl(url) {
  var options = { method : 'GET', contentType : 'application/html', muteHttpExceptions: true };
  var response = UrlFetchApp.fetch(url, options);

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
  // get the contents of the dashboard definition sheet
  var values = sheet.getDataRange().getValues();
  
  var cells = '';
  var metricsInfo = extractMetrics();
  var colIndexHeaders = metricsInfo.columns;
  var metrics = metricsInfo.metrics;
  var html = null;
  
  metrics.forEach(function(metric) {
    var metricColor = getColor(metric);
    cells += 
      '<div class=\'col-xs-10 col-md-6 col-lg-4 col-xl-3 col-xs-offset-1\' style=\'margin-bottom: 30px;\'>\
        <div style=\'\
          color: ' + metricColor.text + ';\
          background-color: ' + metricColor.fill + ';\
          border-radius: 10px;\'>\
          <table>\
            <tr>\
              <td class=\'metric-description\'>' + metric[webMetricName] + '</td>\
            </tr>\
            <tr>\
              <td class=\'metric\'>' + applyTypeFormatter(metric[webMetricValue], metric[webMetricType]) + '</td>\
            </tr>\
            <tr>\
              <td class=\'metric-footer\'>'+(metric.hasOwnProperty(webMetricNote)? metric[webMetricNote]:'&nbsp;')+'</td>\
            </tr>\
          </table>\
        </div>\
      </div>';
  });

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

  // if a remote template wasn't defined or couldn't be loaded...
  if(!html) {
    // use the local template
    html = HtmlService.createTemplateFromFile('template');
  }

  // get page title from cell A1
  html.title = values[0][0];
  // update the "body" content in the template
  html.cells = cells;
  // update the dashboard background color
  html.backgroundColor = backgroundColor;
  // update the dashboard's header color
  html.headerColor = headerColor;

  // return the populated webpage
  return html.evaluate();
}

// extractMetrics(): apply the user-provided data formatter to the user-provided value
function extractMetrics() {
  var spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  var sheet = spreadsheet.getSheetByName(sheetNameWebDashboard);
  var values = sheet.getDataRange().getValues();
  var metrics = [ ];
  var headerRowIndex = 1;
  var colIndexHeaders = { };

  webMetricHeaders.forEach(function(header) {
    var index = values[headerRowIndex].indexOf(header);

    if(index != -1) {
      colIndexHeaders[header] = values[headerRowIndex].indexOf(header);
    }
  });

  for (var row = headerRowIndex + 1; row < values.length; row++) {
    var metric = { };

    Object.keys(colIndexHeaders).forEach(function(header) {
      var cellValue = values[row][colIndexHeaders[header]];
      if(typeof cellValue !== 'string' || cellValue != '') {
        metric[header] = cellValue;
      }
    });

    // if the metric has any values in it, add it to the metrics array
    if(Object.keys(metric).length) {
      metrics.push(metric);
    }
  }

  return {
    columns: colIndexHeaders,
    metrics: metrics
  };
}

// applyTypeFormatter(): apply the user-provided data formatter to the user-provided value
function applyTypeFormatter(value, type) {
  switch (type) {
    // format a currency with thousands commas and decimal
    case 'currency00':
      return (value<0? '-':'') + '$'+Math.abs(value).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
    // format a currency with thousands commas without decimal
    case 'currency':
      return (value<0? '-':'') + '$'+Math.abs(value).toFixed(0).replace(/\d(?=(\d{3})+$)/g, '$&,');
    // format an integer
    case 'integer':
      return Utilities.formatString('%d', value);
    // format a percentage
    case 'percent':
      return Utilities.formatString('%d\%', value*100);
    // default to a text formatter (no change in to the original value)
    default:
    case 'text':
      return value;
  }
}

// getColor(): validate the user-requested color name and return color object
function getColor(metric) {
  // confirm the requested color is valid... if not, default to gray
  if(!metric.hasOwnProperty(webMetricColor) || !colors.hasOwnProperty(metric[webMetricColor])) {
    return colors.gray;
  }

  // return the requested color
  return colors[metric[webMetricColor]];
}