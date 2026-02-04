const fs = require('fs');
const path = require('path');
const dbPath = path.join(__dirname, 'data', 'db.json');

function ensure() {
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  if (!fs.existsSync(dbPath)) fs.writeFileSync(dbPath, JSON.stringify({ hotels:[], rooms:[], submissions:[], orders:[] }, null, 2));
}

function read() {
  ensure();
  try {
    const raw = fs.readFileSync(dbPath, 'utf8');
    return JSON.parse(raw || '{}');
  } catch (e) { return { hotels:[], rooms:[], submissions:[], orders:[] }; }
}

function write(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2), 'utf8');
}

// Hotels
function getAllHotels() {
  return read().hotels;
}
function getHotelById(id) {
  return read().hotels.find(h => h.id === id) || null;
}
function createHotel(payload) {
  const db = read();
  const id = db.hotels.length ? Math.max(...db.hotels.map(h=>h.id)) + 1 : 1;
  const now = new Date().toISOString();
  const rec = {
    id,
    name: payload.name||'',
    nameEn: payload.nameEn||'',
    star: payload.star||'',
    openTime: payload.openTime||'',
    address: payload.address||'',
    priceRange: payload.priceRange||'',
    totalRooms: payload.totalRooms||0,
    roomTypes: payload.roomTypes||[],
    scenicSpots: payload.scenicSpots||[],
    trafficMall: payload.trafficMall||[],
    discounts: payload.discounts||[],
    image: payload.image||'',
    priceData: payload.priceData||{ roomPriceList: [] },
    createdBy: payload.createdBy||'user',
    createdAt: now
  };
  db.hotels.push(rec);
  write(db);
  return rec;
}
function updateHotel(id, payload) {
  const db = read();
  const idx = db.hotels.findIndex(h=>h.id===id);
  if (idx === -1) return null;
  const cur = db.hotels[idx];
  const updated = { ...cur, ...payload };
  db.hotels[idx] = updated;
  write(db);
  return updated;
}
function deleteHotel(id) {
  const db = read();
  db.hotels = db.hotels.filter(h=>h.id!==id);
  db.rooms = db.rooms.filter(r=>r.hotel_id!==id);
  db.orders = db.orders.filter(o=>o.hotel_id!==id);
  db.submissions = db.submissions.filter(s=>s.id!==id); // keep submission ids separate
  write(db);
}

// Rooms
function getRooms(hotelId) {
  return read().rooms.filter(r=>r.hotel_id===hotelId);
}
function createRoom(hotelId, payload) {
  const db = read();
  const id = db.rooms.length ? Math.max(...db.rooms.map(r=>r.id)) + 1 : 1;
  const rec = { id, hotel_id: hotelId, type: payload.type||'', original: payload.original||0, current: payload.current||0, discount: payload.discount||'', remain: payload.remain||0, status: payload.status||'available', remark: payload.remark||'', image: payload.image||'' };
  db.rooms.push(rec);
  write(db);
  return rec;
}
function updateRoom(roomId, payload) {
  const db = read();
  const idx = db.rooms.findIndex(r=>r.id===roomId);
  if (idx === -1) return null;
  db.rooms[idx] = { ...db.rooms[idx], ...payload };
  write(db);
  return db.rooms[idx];
}
function deleteRoom(roomId) {
  const db = read();
  db.rooms = db.rooms.filter(r=>r.id!==roomId);
  write(db);
}

// Submissions
function getSubmissions() {
  return read().submissions;
}
function createSubmission(payload) {
  const db = read();
  const id = db.submissions.length ? Math.max(...db.submissions.map(s=>s.id)) + 1 : 1;
  const now = new Date().toISOString();
  const rec = { id, name: payload.name||'', nameEn: payload.nameEn||'', star: payload.star||'', openTime: payload.openTime||'', address: payload.address||'', priceRange: payload.priceRange||'', totalRooms: payload.totalRooms||0, roomTypes: payload.roomTypes||[], scenicSpots: payload.scenicSpots||[], trafficMall: payload.trafficMall||[], discounts: payload.discounts||[], image: payload.image||'', priceData: payload.priceData||{roomPriceList:[]}, status: 'pending', createdBy: payload.createdBy||'user', createdAt: now };
  db.submissions.push(rec);
  write(db);
  return rec;
}
function approveSubmission(id) {
  const db = read();
  const idx = db.submissions.findIndex(s=>s.id===id);
  if (idx === -1) return null;
  const sub = db.submissions.splice(idx,1)[0];
  // create hotel
  const hotel = createHotel(sub);
  write(read());
  return hotel;
}
function rejectSubmission(id) {
  const db = read();
  db.submissions = db.submissions.filter(s=>s.id!==id);
  write(db);
}

// Orders
function getOrders(hotelId) {
  return read().orders.filter(o=>o.hotel_id===hotelId);
}
function replaceOrders(hotelId, list) {
  const db = read();
  db.orders = db.orders.filter(o=>o.hotel_id!==hotelId);
  const now = new Date().toISOString();
  for (const o of list) {
    const id = db.orders.length ? Math.max(...db.orders.map(x=>x.id)) + 1 : 1;
    db.orders.push({ id, hotel_id: hotelId, orderNo: o.orderNo||'', room: o.room||'', type: o.type||'', guest: o.guest||'', phone: o.phone||'', amount: o.amount||'', status: o.status||'unchecked', leaveDate: o.leave||'', payType: o.payType||'', createdAt: now });
  }
  write(db);
}

module.exports = {
  getAllHotels, getHotelById, createHotel, updateHotel, deleteHotel,
  getRooms, createRoom, updateRoom, deleteRoom,
  getSubmissions, createSubmission, approveSubmission, rejectSubmission,
  getOrders, replaceOrders
};
