const express = require('express');
const body_parser = require('body-parser');
const axios = require('axios');
const app = express().use(body_parser.json());

// 🔑 Aapka Permanent Token (FIXED)
const my_token = "EAAMHsYa6AHgBQSgmA7LAxlsEN396QoqVmfQSZBu5CgBURwoVboYf4uo9HueqR55vWVdojbX4HaKEBhS2ZBsh5RxbVMDlIyvIqoXcE7xCfjdDOZBi2fsTBxkTyXcHB2PVZByx6LTqVbsNP2ZBxXBiADtZBb8eNOXQWp1DYjrJzoKVztZBHRjKfHgj3nACWp4zAZDZD";

// 🆔 Aapka Phone ID (FIXED)
const my_phone_id = "937123682817395"; 

// 🏠 HOME PAGE (Ye UptimeRobot ko Jawab dega)
app.get('/', (req, res) => {
  res.status(200).send("Director Sahab, Bot Render Par 100% Zinda Hai! 🦁✅");
});

// 🔗 WEBHOOK (Meta Verification)
app.get('/webhook', (req, res) => {
  let mode = req.query['hub.mode'];
  let token = req.query['hub.verify_token'];
  let challenge = req.query['hub.challenge'];
  if (mode && token === 'tasaddaq_secret') {
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// 📩 MESSAGE HANDLER (Asli Kaam)
app.post('/webhook', async (req, res) => {
  let body = req.body;
  if (body.object) {
    if (body.entry && body.entry[0].changes && body.entry[0].changes[0].value.messages && body.entry[0].changes[0].value.messages[0]) {
      
      let from = body.entry[0].changes[0].value.messages[0].from;
      let msg_body = body.entry[0].changes[0].value.messages[0].text.body;
      let incoming_msg = msg_body.toLowerCase(); 
      let reply_text = "";

      // --- LOGIC SHURU ---
      if (incoming_msg.includes("hi") || incoming_msg.includes("salam") || incoming_msg.includes("detail")) {
        reply_text = "*Assalamualaikum* 👋\n\n*ذرا غور کیجئے*👇\nاس سسٹم میں ھماری ارننگ ڈائریکٹ ھم سب کے پاس آتی ہے۔ یہی اس سسٹم کی خوبصورتی ھے۔\n\n*Ads Watching Work* ⌚\n\n👇 *کسی ایک پلان کی تفصیل کے لیے نمبر لکھیں:* 👇\n\n1️⃣ Plan 1 (Deposit 1500)\n2️⃣ Plan 2 (Deposit 2000)\n3️⃣ Plan 3 (Deposit 3000)\n4️⃣ Plan 4 (Deposit 5000)\n5️⃣ Plan 5 (Deposit 10,000)\n\nLikh kar reply karein (e.g., 1)";
      } 
      else if (incoming_msg.includes("1") || incoming_msg.includes("one")) {
        reply_text = "👉 *Plan 1 Details:*\n\n✅ *Deposit:* 1500\n⏳ *Time:* 30 days\n💰 *Daily Earning:* 1000\n📅 *Monthly Income:* 30,000\n📺 *Work:* 10 Ads Daily\n\nJoin karne ke liye *Account* likh kar bhejein.";
      }
      else if (incoming_msg.includes("2") || incoming_msg.includes("two")) {
        reply_text = "👉 *Plan 2 Details:*\n\n✅ *Deposit:* 2,000\n⏳ *Time:* 30 days\n💰 *Daily Earning:* 1500\n📅 *Monthly Income:* 45,000\n📺 *Work:* 20 Ads Daily";
      }
      else if (incoming_msg.includes("3") || incoming_msg.includes("three")) {
        reply_text = "👉 *Plan 3 Details:*\n\n✅ *Deposit:* 3000\n⏳ *Time:* 30 days\n💰 *Daily Earning:* 2000\n📅 *Monthly Income:* 60,000 👈\n📺 *Work:* 30 Ads Daily";
      }
      else if (incoming_msg.includes("4") || incoming_msg.includes("four")) {
        reply_text = "👉 *Plan 4 Details:*\n\n✅ *Deposit:* 5000\n⏳ *Time:* 30 days\n💰 *Daily Earning:* 4000\n📅 *Monthly Income:* 120,000 👈\n📺 *Work:* 40 Ads Daily";
      }
      else if (incoming_msg.includes("5") || incoming_msg.includes("five")) {
        reply_text = "🫴 *Plan 5 (VIP):*\n\n✅ *Deposit:* 10,000\n⏳ *Time:* 30 days\n💰 *Daily Earning:* 8000\n📅 *Monthly Income:* 240,000\n📺 *Work:* 50 Ads Daily\n\n*💯 Real Platform Alhumdulillah*";
      }
      else if (incoming_msg.includes("account") || incoming_msg.includes("join") || incoming_msg.includes("paisay")) {
        reply_text = "💰 *Account Details:*\n\nEasypaisa: 0341-XXXXXXX\nTitle: Tasaddaq Khan\n\nPayment ka screenshot bhej kar apna account active karwayein! ✅";
      }
      else {
        reply_text = "😊👍 *Thanks*\n\nAds zindabad 🤞\nPlan dekhne ke liye *Salam* likhein.";
      }
      // --- LOGIC KHATAM ---

      try {
        await axios({
          method: "POST",
          url: "https://graph.facebook.com/v17.0/" + my_phone_id + "/messages",
          data: {
            messaging_product: "whatsapp",
            to: from,
            text: { body: reply_text }
          },
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + my_token
          }
        });
      } catch (e) {
        console.log("Error: " + e.message);
      }
    }
    res.sendStatus(200);
  } else {
    res.sendStatus(404);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log('Ads Bot Running on Render... 🚀');
});
