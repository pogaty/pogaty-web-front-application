# Frontend Demo

![Enginx](https://img.shields.io/badge/Enginx-1.13.12-red?style=for-the-badge)
![Angular](https://img.shields.io/badge/Angular-16.2.6-blue?style=for-the-badge)

## Installation

เริ่มต้นจากการลงตัว angular เพื่อเตรียมพร้อมสำหรับโปรเจคบนระบบปฏิบัติการที่ต้องการ (window, linux etc.)

```bash
  npm install -g @angular/cli
```

จากนั้นทำการ clone repository นี้มาใน folder ที่ต้องการได้เลยจากคำสั่งด้านล่างนี้
    
```bash
  cd ./your_directory
  git clone https://github.com/pogaty/pogaty-web-front-application.git
```
เท่านี้การ clone โปรเจ็คก็สำเร็จเรียบร้อยแล้ว


## Assign preparation
วิธีการทำงานตามที่ได้ assign ไว้เริ่มต้นจากการสร้าง branch ของหัวข้องานนั้นๆ ก่อนเป็นอันดับแรก

### Branch
ก่อนอื่นต้องกำหนด scope ก่อนว่างานที่ได้รับมอบหมายนั้นมันควร clone จาก branch ไหนมาทำ เช่น อยากทำฟังก์ชั่น Profile feature แปลว่ามันเป็นฟังก์ชั่น นึงที่อยู่ใน Profile structure ดังนั้นเราต้องสร้าง branch ใหม่จากการ clone branch " Profile structure " มา

1. เช็คก่อนว่า feature ที่เราจะทำมีรหัส feature อะไรในแอพ jira ตามรูป
![App Screenshot](https://cdn.pic.in.th/file/picinth/Screenshot-2023-10-19-140923.md.png)

2. เช่นรหัสเป็น PDS-6 เวลาสร้าง branch ให้ใช้คำสั่ง

```bash
   git checkout <clone_target_branch>
   git checkout -b PDS-6-<new-branch>
```

ต้องกำหนดรหัสงานที่ได้รับนำหน้าชื่อ branch ใหม่ที่เรากำลังสร้าง

### Commit & push
เมื่อทำงานเสร็จแล้วต้องการจะ save ขึ้น github ผ่านการ commit หรือ push ให้ตั้งชื่อไฟล์ในการ commit ขึ้นต้นด้วยรหัสงาน แล้วตามด้วยเนื้อหาในการแก้ไขเช่นตัวอย่างด้านล่าง

```bash
   commit -m 'PDS-6 <content>
```

## Structure
โครงสร้างจะอิงตาม Best Practice ซึ่งอาจจะไม่ค่อยคุ้นหน้ากันนักแต่ว่าหลักๆ component ไม่ได้เปลี่ยนเลยมีเหมือนเดิมสิ่งที่เปลี่ยนคือรูปแบบการจัดไฟล์ให้มันดูสะอาดตาขึ้น

![App Screenshot](https://cdn.pic.in.th/file/picinth/Screenshot-2023-10-19-141453.png)

#### :: Components

เราจะเก็บพวก components ทุกอย่างไว้ในที่นี้อย่างไฟล์ .css .html .ts ที่เป็นองค์ประกอบของส่วนนั้นๆในเว็บซึ่งจะอยู่ภายใน folder อีกทีเช่น component ของ homepage จะมี folder homepage แล้วข้างในมีไฟล์ .css .html .ts

![App Screenshot](https://cdn.pic.in.th/file/picinth/Screenshot-2023-10-19-142055.png)

#### :: Models

จะเก็บพวก model จำลองที่เราจะเอามาใช้ในการ map กับข้อมูล json ที่ส่งมาจาก back-end อีกที ซึ่งไฟล์จะอยู่ในรูปแบบ .ts

#### :: Modules

จะเก็บตัว module ที่ใช้ในการเชื่อม, จัดการ, รวม component ต่างๆเพื่อที่จะส่งต่อไปใช้ใน component ส่วนอื่นถัดๆไป (ตรงนี้ถ้าไม่เข้าใจเดี๋ยวจะช่วยมาเซ็ทให้)

#### :: Services
คือบริการต่างๆที่เราจะเขียนขึ้นมาในรูปแบบ .ts ซึ่งอาจจะเป็นบริการที่ใช้เรียกข้อมูลจาก back-end หรือตัวฝากค่าที่จะใช้ส่งต่อไป component อื่นๆ

#### :: shared

ที่นี้จะเก็บ components ขององค์ประกอบที่คาดว่าจะใช้ในหลายๆหน้าเพื่อที่จะได้ไม่ต้องเขียนโค้ดซ้ำซ้อนเช่นพวก footer, header, navbar
