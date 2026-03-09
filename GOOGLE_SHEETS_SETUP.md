# Google Sheets Integration Setup

This guide sets up a free, scalable form backend using Google Sheets + Apps Script.

## Step 1: Create a Google Sheet

1. Go to [Google Sheets](https://sheets.google.com) and create a new spreadsheet
2. Name it "Kyuro Waitlist"
3. In Row 1, add these headers: `Timestamp | Email | Role`
4. Note the spreadsheet ID from the URL: `https://docs.google.com/spreadsheets/d/SPREADSHEET_ID/edit`

## Step 2: Create the Apps Script

1. In the spreadsheet, go to **Extensions > Apps Script**
2. Delete any existing code and paste the following:

```javascript
function doPost(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = JSON.parse(e.postData.contents);

    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.email,
      data.role
    ]);

    return ContentService
      .createTextOutput(JSON.stringify({ result: "success" }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: "error", error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
```

3. Save the script (Ctrl+S)

## Step 3: Deploy as Web App

1. Click **Deploy > New deployment**
2. Click the gear icon and select **Web app**
3. Set:
   - Description: "Kyuro Waitlist"
   - Execute as: **Me**
   - Who has access: **Anyone**
4. Click **Deploy**
5. Authorize the script when prompted
6. Copy the **Web app URL** (looks like: `https://script.google.com/macros/s/SCRIPT_ID/exec`)

## Step 4: Configure the Website

1. Create a `.env.local` file in the project root:

```
NEXT_PUBLIC_GOOGLE_SCRIPT_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

2. For Netlify, add this same variable in:
   **Site settings > Environment variables**

## Testing

Submit the form on your website. The data should appear in your Google Sheet within a few seconds.

## Notes

- This approach is completely free (Google Apps Script has generous quotas)
- Supports thousands of submissions per day
- No authentication or API keys needed
- Data lives in your Google Sheet — easy to view, export, or share
