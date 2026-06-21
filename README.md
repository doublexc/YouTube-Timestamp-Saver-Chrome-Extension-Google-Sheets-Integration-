function doPost(e) {
  try {
    var data = JSON.parse(e.postData.contents);
    var youtubeLink = data.link;
    var videoTitle = data.title;
    // รับค่าพิกัดเซลล์จาก Extension เช่น "B96"
    var targetCell = data.cell ? data.cell.trim().toUpperCase() : "B96"; 
    
    // ล็อกให้เขียนลงเฉพาะหน้าชีตที่ชื่อว่า "link" เท่านั้น
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    var sheet = ss.getSheetByName("link");
    
    if (!sheet) {
      return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": "ไม่พบหน้าชีตที่ชื่อ 'link'"}))
                           .setMimeType(ContentService.MimeType.JSON);
    }
    
    // แกะเอาเฉพาะตัวเลขแถวออกมาจากชื่อเซลล์ที่ส่งมา (เช่น "B96" -> ได้เลข 96)
    var rowNumber = parseInt(targetCell.replace(/[^0-9]/g, ''), 10);
    if (isNaN(rowNumber)) {
      throw new Error("รูปแบบเซลล์ไม่ถูกต้อง กรุณาระบุตัวอย่างเช่น B96");
    }
    
    // [แก้ไขตัดช่อง A ออก] บันทึกเฉพาะช่องที่คุณต้องการเท่านั้น
    // คอลัมน์ B (คอลัมน์ที่ 2) = บันทึกลิงก์ YouTube (?t=...)
    sheet.getRange(rowNumber, 2).setValue(youtubeLink); 
    
    // คอลัมน์ C (คอลัมน์ที่ 3) = บันทึกชื่อคลิปวิดีโอ (สำหรับดูอ้างอิง)
    sheet.getRange(rowNumber, 3).setValue(videoTitle);
    
    return ContentService.createTextOutput(JSON.stringify({"status": "success"}))
                           .setMimeType(ContentService.MimeType.JSON);
  } catch(error) {
    return ContentService.createTextOutput(JSON.stringify({"status": "error", "message": error.toString()}))
                           .setMimeType(ContentService.MimeType.JSON);
  }
}
