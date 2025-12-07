const fs = require('fs');
const csv = require('csv-parser');
const Sale = require('../models/Sale');

const importCSV = async (filePath) => {
  const sales = [];
  const batchSize = 10000; // Process in batches for memory efficiency
  
  return new Promise((resolve, reject) => {
    let processed = 0;
    
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (row) => {
        // Parse tags - split by comma if string
        const tags = row.Tags ? row.Tags.split(',').map(t => t.trim()) : [];
        
        const saleData = {
          transactionId: parseInt(row['Transaction ID']),
          date: new Date(row.Date),
          
          // Customer
          customerId: row['Customer ID'],
          customerName: row['Customer Name'],
          phoneNumber: row['Phone Number'],
          gender: row.Gender,
          age: parseInt(row.Age),
          customerRegion: row['Customer Region'],
          customerType: row['Customer Type'],
          
          // Product
          productId: row['Product ID'],
          productName: row['Product Name'],
          brand: row.Brand,
          productCategory: row['Product Category'],
          tags,
          
          // Sales
          quantity: parseInt(row.Quantity),
          pricePerUnit: parseFloat(row['Price per Unit']),
          discountPercentage: parseFloat(row['Discount Percentage']),
          totalAmount: parseFloat(row['Total Amount']),
          finalAmount: parseFloat(row['Final Amount']),
          
          // Operational
          paymentMethod: row['Payment Method'],
          orderStatus: row['Order Status'],
          deliveryType: row['Delivery Type'],
          storeId: row['Store ID'],
          storeLocation: row['Store Location'],
          salespersonId: row['Salesperson ID'],
          employeeName: row['Employee Name']
        };
        
        sales.push(saleData);
        
        // Batch insert when we reach batchSize
        if (sales.length >= batchSize) {
          const batch = sales.splice(0, batchSize);
          Sale.insertMany(batch, { ordered: false })
            .then(() => {
              processed += batch.length;
              console.log(`Imported ${processed} records...`);
            })
            .catch(err => {
              console.error('Batch insert error:', err.message);
            });
        }
      })
      .on('end', async () => {
        // Insert remaining records
        if (sales.length > 0) {
          try {
            await Sale.insertMany(sales, { ordered: false });
            processed += sales.length;
            console.log(`Final batch: Imported ${sales.length} records`);
          } catch (err) {
            console.error('Final batch error:', err.message);
          }
        }
        console.log(`✅ CSV import completed! Total: ${processed} records`);
        resolve(processed);
      })
      .on('error', (err) => {
        console.error('CSV read error:', err);
        reject(err);
      });
  });
};

module.exports = { importCSV };