const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TypeSchema = new Schema({
    type_id:String,
    type_name: String,
    sub_type: String,
});

const CatelogSchema = new Schema({
    id_product:String,
    type_id: String,
});

// const connection = mongoose.connection;
// connection.once("open", async () => {
//     console.log("MongoDB database connected.");

//     try {
//         // Add sample data to the 'types' collection
//         await Type.create([
//             { type_id: '0', type_name: 'อื่นๆ' },

//             { type_id: '1', type_name: 'เสื้อผ้า', sub_type:'อื่น'},
//             { type_id: '2', type_name: 'เสื้อผ้า', sub_type:'เสื้อผ้าแฟชั่น'},
//             { type_id: '3', type_name: 'เสื้อผ้า', sub_type:'รองเท้า'},
//             { type_id: '4', type_name: 'เสื้อผ้า', sub_type:'กระเป๋า'},
            

//             { type_id: '5', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'อื่น'},
//             { type_id: '6', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'โทรศัพท์'},
//             { type_id: '7', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'แท็บเล็ต'},
//             { type_id: '8', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'คอมพิวเตอร์'},

            
//             { type_id: '9', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'อื่น'},
//             { type_id: '10', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'เฟอร์นิเจอร์'},
//             { type_id: '11', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'เครื่องใช้ไฟฟ้า'},
//             { type_id: '12', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'ผ้าม่านและของตกแต่ง'},

//             { type_id: '13', type_name: 'อุปกรณ์กีฬา', sub_type:'อื่น' },
//             { type_id: '14', type_name: 'อุปกรณ์กีฬา', sub_type:'รองเท้ากีฬา' },
//             { type_id: '15', type_name: 'อุปกรณ์กีฬา', sub_type:'อุปกรณ์ออกกำลังกาย' },

//             { type_id: '16', type_name: 'หนังสือและสื่อ', sub_type:'อื่น' },
//             { type_id: '17', type_name: 'หนังสือและสื่อ', sub_type:'หนังสือ' },
//             { type_id: '18', type_name: 'หนังสือและสื่อ', sub_type:'อุปกรณ์อ่าน e-book' },

//             { type_id: '19', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'อื่น' },
//             { type_id: '20', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'แหวน' },
//             { type_id: '21', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'สร้อย' },
//             { type_id: '22', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'นาฬิกา' },

            
//             { type_id: '23', type_name: 'อุปกรณ์สำหรับเด็ก', sub_type:'อื่น' },
//             { type_id: '24', type_name: 'อุปกรณ์สำหรับเด็ก', sub_type:'ของเล่น' },
//             { type_id: '25', type_name: 'อุปกรณ์สำหรับเด็ก', sub_type:'เสื้อผ้าเด็ก' },

            
//             { type_id: '26', type_name: 'งานศิลปะ', sub_type:'อื่น' },
//             { type_id: '27', type_name: 'งานศิลปะ', sub_type:'ภาพวาดและภาพถ่าย' },
//             { type_id: '28', type_name: 'งานศิลปะ', sub_type:'งานปั้นและงานหัตถกรรม' },
//             { type_id: '29', type_name: 'งานศิลปะ', sub_type:'ของตกแต่งบ้าน' },

            
//             { type_id: '30', type_name: 'เครื่องมือและอุปกรณ์ DIY', sub_type:'อื่น' },
//             { type_id: '31', type_name: 'เครื่องมือและอุปกรณ์ DIY', sub_type:'เครื่องมือช่าง' },
//             { type_id: '32', type_name: 'เครื่องมือและอุปกรณ์ DIY', sub_type:'วัสดุสำหรับ DIY ' },
//         ]);

//         console.log('Sample data added successfully.');
//         //await Type.collection.drop();
//     } catch (error) {
//         console.error('Error adding sample data:', error);
//     } finally {
//         // Close the MongoDB connection when done
//         connection.close();
//     }
// });


const Type = mongoose.model('type', TypeSchema);
const Catelog = mongoose.model('Catelog', CatelogSchema);

module.exports = { Type, Catelog };





















