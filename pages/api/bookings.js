import sql from 'mssql';

const dbConfig = {
  user: 'sa', // Thay bằng username/password nếu dùng SQL Server Authentication
  password: 'your_password',
  server: 'DESKTOP-UAVSU69\\FTCSQLDATA',
  database: 'my_travelshop',
  options: { encrypt: false, trustServerCertificate: true }
};

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { tourId, customerName } = req.body;
    try {
      let pool = await sql.connect(dbConfig);
      await pool.request()
        .input('tourId', sql.Int, tourId)
        .input('customerName', sql.NVarChar, customerName)
        .query('INSERT INTO Bookings (tourId, customerName) VALUES (@tourId, @customerName)');
      res.status(200).json({ message: 'Đặt tour thành công' });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Lỗi server' });
    }
  } else {
    res.status(405).json({ error: 'Method không hỗ trợ' });
  }
}