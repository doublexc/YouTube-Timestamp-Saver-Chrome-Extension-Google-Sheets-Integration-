
```markdown
# 📌 YouTube Timestamp Saver (Chrome Extension + Google Sheets Integration)

[English Description Below]

ระบบ **Chrome Extension** สำหรับบันทึกเวลา (Timestamp) จากวิดีโอ YouTube ที่กำลังรับชมอยู่ และสร้างเป็นลิงก์ระบุเวลาเริ่มต้นอัตโนมัติ (เช่น `https://youtu.be/YcWjORdjDtI?t=2479`) ส่งไปบันทึกทับลงในพิกัดเซลล์ที่ต้องการบน **Google Sheets (หน้าชีต "link")** โดยเฉพาะคอลัมน์ B และ C ผ่าน Google Apps Script (Web App API) โดยไม่กระทบกับข้อมูลในคอลัมน์ A

โปรเจกต์นี้ออกแบบมาให้ทำงานร่วมกับระบบย่อลิงก์/ส่งต่อลิงก์ภายนอก เช่น [doublexc/RD](https://github.com/doublexc/RD) ได้อย่างสมบูรณ์แบบ เพื่อช่วยเพิ่มความสะดวกรวดเร็วในการทำงาน จัดการข้อมูล และทำ Link Redirector สำหรับเข้าถึงช่วงเวลาสำคัญในวิดีโอได้อย่างแม่นยำ

---

## ✨ คุณสมบัติเด่น (Features)
- **เจาะจงพิกัดเซลล์ได้ตามใจชอบ:** กำหนดค่าเริ่มต้น (Default) บันทึกทับลงในช่อง `B96` ทันทีเมื่อเปิดใช้งาน แต่ยังสามารถเปลี่ยนช่องพิมพ์ระบุพิกัดเซลล์อื่น ๆ ได้ตามต้องการ
- **ล็อกหน้าชีตปลายทางถาวร:** ป้องกันข้อมูลกระจัดกระจาย โดยระบบจะบังคับให้ข้อมูลพุ่งตรงไปบันทึกที่หน้าชีตชื่อ `"link"` เท่านั้น
- **ไม่กวนข้อมูลคอลัมน์อื่น:** ปรับปรุงระบบให้เขียนข้อมูลลงเฉพาะ คอลัมน์ B (ลิงก์วิดีโอพร้อมเวลา) และ คอลัมน์ C (ชื่อคลิปวิดีโอ) โดยเว้นคอลัมน์ A ไว้ เพื่อให้สอดคล้องกับโครงสร้างข้อมูลของระบบ Redirect
- **ดึงข้อมูลแบบ Real-time:** ดึงค่า `currentTime` จากเครื่องเล่นวิดีโอของ YouTube โดยตรงและแปลงเป็นวินาทีอัตโนมัติ

---

## 🛠 เทคโนโลยีที่ใช้ (Tech Stack)
- **Front-end:** HTML, CSS, JavaScript (Chrome Extension Manifest V3)
- **Back-end / API:** Google Apps Script (JavaScript-based)
- **Database:** Google Sheets API

---

## 🔗 การเชื่อมต่อร่วมกับโปรเจกต์ doublexc/RD
ระบบนี้สามารถนำมาประยุกต์ใช้เพื่อเป็นเครื่องมือตระเตรียมข้อมูล (Data Entry Automation) ให้กับระบบส่งต่อลิงก์ [doublexc/RD](https://github.com/doublexc/RD) ได้ทันที โดยกระบวนการทำงานร่วมกันเป็นดังนี้:
1. **เตรียมข้อมูลจาก Extension:** ผู้ใช้ดึงลิงก์ช่วงเวลา YouTube จากหน้าเบราว์เซอร์และระบุเซลล์ที่ต้องการบันทึกผ่าน Chrome Extension
2. **ประมวลผลข้อมูลลง Sheets:** ข้อมูลถูกบันทึกลงในคอลัมน์ B และ C ในแถวที่ต้องการบน Google Sheets โดยคอลัมน์ A สามารถใช้สำหรับกำหนดค่า ID เฉพาะของระบบลิงก์ย่อได้
3. **ส่งต่อไปยังระบบ Redirector:** หน้าเพจจากโปรเจกต์ **doublexc/RD** จะดึงข้อมูลจาก Sheets ไปประมวลผลต่อเพื่อทำระบบจับคู่ค่า ID และส่งผู้ใช้งานไปยังช่วงเวลาสำคัญบน YouTube ตามลิงก์ในคอลัมน์ B ทันทีเมื่อมีการเรียกใช้ `?id=...`

---

## 🚀 โครงสร้างไฟล์ในโปรเจกต์ (Project Structure)
```text
├── manifest.json       # ไฟล์กำหนดสิทธิ์และโครงสร้างของ Chrome Extension V3
├── popup.html          # หน้าตา UI ช่องกรอกเซลล์และปุ่มกดบันทึก
├── popup.js            # สคริปต์หลักฝั่ง Extension สำหรับดึงข้อมูลและ Fetch API
└── apps-script.js      # โค้ดสำหรับนำไปวางใน Google Apps Script (Web App)

```

---

# 📌 English Description

A custom **Chrome Extension** designed to capture real-time timestamps from active YouTube videos and compile them into direct-access URLs (e.g., `https://youtu.be/YcWjORdjDtI?t=2479`). The compiled data is then transmitted via Fetch API to a **Google Apps Script (Web App)**, writing directly into specific cells within a designated Google Sheet named `"link"` (specifically Target Columns B and C) without overwriting Column A.

### 🌟 Integration with doublexc/RD

This extension serves as an optimized automated data-entry tool that seamlessly integrates with the [doublexc/RD](https://github.com/doublexc/RD) link redirection system.

* It populates the required YouTube target URLs into Column B and video titles into Column C based on the cell address specified by the user (defaulting to cell `B96`).
* This structured data allows the **doublexc/RD** link redirector page to read the spreadsheet as a CSV database, map custom IDs from Column A, and accurately forward visitors to precise timestamps on YouTube via URL parameters (`?id=name`).

---

## 📄 ใบอนุญาต (License)

MIT License - สามารถนำไปพัฒนาต่อยอดหรือปรับปรุงระบบได้ตามอัธยาศัย


