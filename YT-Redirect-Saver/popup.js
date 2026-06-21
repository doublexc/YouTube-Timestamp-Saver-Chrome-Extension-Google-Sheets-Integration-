// นำลิงก์ Web App URL ที่ได้จากขั้นตอนของ Google Sheets มาใส่แทนที่ข้อความนี้ครับ
const WEB_APP_URL = "https://script.google.com/macros/s/AKfycbyZvsC0jt3U6pr2XRnIbdfRCL9B0CQUzJYjuFX34cIA81Tw1XhdQUKkGgzIBJyepQoIFw/exec";

document.getElementById('saveBtn').addEventListener('click', async () => {
  const statusDiv = document.getElementById('status');
  const cellInputValue = document.getElementById('cellInput').value.trim();
  
  if(!cellInputValue) {
    statusDiv.innerText = "❌ กรุณาระบุพิกัดเซลล์ก่อนครับ";
    return;
  }

  statusDiv.innerHTML = "กำลังดึงเวลาปัจจุบัน...";

  // ค้นหาแท็บที่กำลังเปิดอยู่
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (!tab.url.includes("youtube.com/watch")) {
    statusDiv.innerText = "❌ กรุณาใช้ในหน้าคลิปวิดีโอ YouTube";
    return;
  }

  // เจาะเข้าไปอ่านสเตตัสบนหน้าคลิป YouTube ปัจจุบัน
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    func: () => {
      const video = document.querySelector('video');
      const title = document.querySelector('#title h1 yt-formatted-string')?.innerText || document.title;
      const currentTime = video ? Math.floor(video.currentTime) : 0;
      
      const urlParams = new URLSearchParams(window.location.search);
      const videoId = urlParams.get('v');
      const cleanUrl = `https://youtu.be/${videoId}`;

      return {
        title: title,
        finalLink: `${cleanUrl}?t=${currentTime}`
      };
    }
  }, (results) => {
    if (!results || !results[0]) {
      statusDiv.innerText = "❌ เกิดข้อผิดพลาดในการดึงข้อมูลเว็บ";
      return;
    }

    const { title, finalLink } = results[0].result;
    statusDiv.innerHTML = "กำลังบันทึกลงชีต...";

    // ยิงข้อมูลพิกัดเซลล์ พร้อมลิงก์ไปหา Google Sheets
    fetch(WEB_APP_URL, {
      method: "POST",
      mode: "no-cors", 
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: title,
        link: finalLink,
        cell: cellInputValue
      })
    })
    .then(() => {
      // เมื่อทำงานสำเร็จในโหมด no-cors ตัวข้อมูลจะไปเขียนทับลงตามพิกัดที่สั่งไว้ทันทีอย่างปลอดภัยครับ
      statusDiv.innerHTML = `<div style="color:green; font-weight:bold;">✅ บันทึกทับช่อง ${cellInputValue.toUpperCase()} สำเร็จ!</div>
                             <p style="font-size:11px; margin-top:5px; color:#666;">ระบบลงเฉพาะชีต 'link' โดยคอลัมน์ A ถูกสุ่ม ID ใหม่ และคอลัมน์ B เป็นลิงก์เรียบร้อยแล้ว</p>`;
    })
    .catch(error => {
      statusDiv.innerText = "❌ เกิดข้อผิดพลาด: " + error;
      statusDiv.style.color = "red";
    });
  });
});