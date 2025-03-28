import sql from 'mssql';

const dbConfig = {
  user: 'sa', // Thay bằng username nếu dùng SQL Server Authentication
  password: '123456@', // Thay bằng password
  server: 'DESKTOP-UAVSU69\\FTCSQLDATA',
  database: 'my_travelshop',
  options: {
    encrypt: false, // SQL Server 2014 không cần
    trustServerCertificate: true
  }
};

export default async function handler(req, res) {
  try {
    let pool = await sql.connect(dbConfig);
    let result = await pool.request().query('SELECT * FROM Tours');
    res.status(200).json(result.recordset);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Lỗi server' });
  }
}