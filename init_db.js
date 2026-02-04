// Export SQL statements for initializing the database.
module.exports = {
  createStatements: [
    `CREATE TABLE IF NOT EXISTS hotels (
      id INTEGER PRIMARY KEY,
      name TEXT,
      nameEn TEXT,
      star TEXT,
      openTime TEXT,
      address TEXT,
      priceRange TEXT,
      totalRooms INTEGER,
      roomTypes TEXT,
      scenicSpots TEXT,
      trafficMall TEXT,
      discounts TEXT,
      image TEXT,
      priceData TEXT,
      createdBy TEXT,
      createdAt TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS rooms (
      id INTEGER PRIMARY KEY,
      hotel_id INTEGER,
      type TEXT,
      original INTEGER,
      current INTEGER,
      discount TEXT,
      remain INTEGER,
      status TEXT,
      remark TEXT,
      image TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS submissions (
      id INTEGER PRIMARY KEY,
      name TEXT,
      nameEn TEXT,
      star TEXT,
      openTime TEXT,
      address TEXT,
      priceRange TEXT,
      totalRooms INTEGER,
      roomTypes TEXT,
      scenicSpots TEXT,
      trafficMall TEXT,
      discounts TEXT,
      image TEXT,
      priceData TEXT,
      status TEXT DEFAULT 'pending',
      createdBy TEXT,
      createdAt TEXT
    )`,

    `CREATE TABLE IF NOT EXISTS orders (
      id INTEGER PRIMARY KEY,
      hotel_id INTEGER,
      orderNo TEXT,
      room TEXT,
      type TEXT,
      guest TEXT,
      phone TEXT,
      amount TEXT,
      status TEXT,
      leaveDate TEXT,
      payType TEXT,
      createdAt TEXT
    )`
  ]
};
