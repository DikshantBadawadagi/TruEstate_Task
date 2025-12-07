const mongoose = require('mongoose');
const dotenv = require('dotenv');
const { importCSV } = require('../src/utils/csvImporter');

dotenv.config();

const runImport = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/retail_sales', {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log('Connected to MongoDB');

    const csvFilePath = process.argv[2];
    
    if (!csvFilePath) {
      console.error('Please provide CSV file path as argument');
      console.log('Usage: npm run import <path-to-csv-file>');
      process.exit(1);
    }

    console.log(`Starting import from: ${csvFilePath}`);
    
    const count = await importCSV(csvFilePath);
    
    console.log(`\nImport completed successfully!`);
    console.log(`Total records imported: ${count}`);

  } catch (error) {
    console.error('Import failed:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit(0);
  }
};

runImport();