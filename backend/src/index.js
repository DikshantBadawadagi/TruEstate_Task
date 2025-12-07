// const express = require('express');
// const mongoose = require('mongoose');
// const cors = require('cors');
// const dotenv = require('dotenv');
// const salesRoutes = require('./routes/salesRoutes');
// const { importCSV } = require('./utils/csvImporter');

// // Load environment variables
// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 5000;

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// // Routes
// app.use('/api/sales', salesRoutes);

// // Health check
// app.get('/health', (req, res) => {
//   res.status(200).json({ status: 'OK', message: 'Server is running' });
// });

// // CSV Import endpoint (for one-time data loading)
// app.post('/api/import', async (req, res) => {
//   try {
//     const { filePath } = req.body;
//     if (!filePath) {
//       return res.status(400).json({ 
//         success: false, 
//         message: 'File path is required' 
//       });
//     }
    
//     const count = await importCSV(filePath);
//     res.status(200).json({ 
//       success: true, 
//       message: `Successfully imported ${count} records` 
//     });
//   } catch (error) {
//     console.error('Import error:', error);
//     res.status(500).json({ 
//       success: false, 
//       message: 'Import failed', 
//       error: error.message 
//     });
//   }
// });

// // Database connection
// mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/retail_sales', {
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// })
//   .then(() => {
//     console.log('Connected to MongoDB');
    
//     // Start server
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//       console.log(`API: http://localhost:${PORT}/api/sales`);
//     });
//   })
//   .catch((err) => {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   });

// // Graceful shutdown
// process.on('SIGINT', async () => {
//   await mongoose.connection.close();
//   console.log('MongoDB connection closed');
//   process.exit(0);
// });

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const salesRoutes = require('./routes/salesRoutes');
const { importCSV } = require('./utils/csvImporter');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api/sales', salesRoutes);

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

app.post('/api/import', async (req, res) => {
  try {
    const { filePath } = req.body;
    if (!filePath) {
      return res.status(400).json({ 
        success: false, 
        message: 'File path is required' 
      });
    }
    
    const count = await importCSV(filePath);
    res.status(200).json({ 
      success: true, 
      message: `Successfully imported ${count} records` 
    });
  } catch (error) {
    console.error('Import error:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Import failed', 
      error: error.message 
    });
  }
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../../frontend/dist')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/dist', 'index.html'));
  });
}

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/retail_sales', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDB');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`API: http://localhost:${PORT}/api/sales`);
      if (process.env.NODE_ENV === 'production') {
        console.log(`Frontend: http://localhost:${PORT}`);
      }
    });
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
    process.exit(1);
  });

process.on('SIGINT', async () => {
  await mongoose.connection.close();
  console.log('MongoDB connection closed');
  process.exit(0);
});