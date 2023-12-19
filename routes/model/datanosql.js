const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const { Type, Catelog } = require('./type.js');

const connection = mongoose.connection;
connection.once("open", async () => {
    console.log("MongoDB database connected.");

    try {
        //Add sample data to the 'types' collection
        await Type.create([
            { type_id: '0', type_name: 'อื่นๆ' },

            { type_id: '1', type_name: 'เสื้อผ้า', sub_type:'อื่น'},
            { type_id: '2', type_name: 'เสื้อผ้า', sub_type:'เสื้อผ้าแฟชั่น'},
            { type_id: '3', type_name: 'เสื้อผ้า', sub_type:'รองเท้า'},
            { type_id: '4', type_name: 'เสื้อผ้า', sub_type:'กระเป๋า'},
            

            { type_id: '5', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'อื่น'},
            { type_id: '6', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'โทรศัพท์'},
            { type_id: '7', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'แท็บเล็ต'},
            { type_id: '8', type_name: 'อุปกรณ์อิเล็กทรอนิกส์', sub_type:'คอมพิวเตอร์'},

            
            { type_id: '9', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'อื่น'},
            { type_id: '10', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'เฟอร์นิเจอร์'},
            { type_id: '11', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'เครื่องใช้ไฟฟ้า'},
            { type_id: '12', type_name: 'เครื่องใช้ในบ้าน' , sub_type:'ผ้าม่านและของตกแต่ง'},

            { type_id: '13', type_name: 'อุปกรณ์กีฬา', sub_type:'อื่น' },
            { type_id: '14', type_name: 'อุปกรณ์กีฬา', sub_type:'รองเท้ากีฬา' },
            { type_id: '15', type_name: 'อุปกรณ์กีฬา', sub_type:'อุปกรณ์ออกกำลังกาย' },

            { type_id: '16', type_name: 'หนังสือและสื่อ', sub_type:'อื่น' },
            { type_id: '17', type_name: 'หนังสือและสื่อ', sub_type:'หนังสือ' },
            { type_id: '18', type_name: 'หนังสือและสื่อ', sub_type:'อุปกรณ์อ่าน e-book' },

            { type_id: '19', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'อื่น' },
            { type_id: '20', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'แหวน' },
            { type_id: '21', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'สร้อย' },
            { type_id: '22', type_name: 'เครื่องประดับและนาฬิกา', sub_type:'นาฬิกา' },

            
            { type_id: '23', type_name: 'อุปกรณ์สำหรับเด็ก', sub_type:'อื่น' },
            { type_id: '24', type_name: 'อุปกรณ์สำหรับเด็ก', sub_type:'ของเล่น' },
            { type_id: '25', type_name: 'อุปกรณ์สำหรับเด็ก', sub_type:'เสื้อผ้าเด็ก' },

            
            { type_id: '26', type_name: 'งานศิลปะ', sub_type:'อื่น' },
            { type_id: '27', type_name: 'งานศิลปะ', sub_type:'ภาพวาดและภาพถ่าย' },
            { type_id: '28', type_name: 'งานศิลปะ', sub_type:'งานปั้นและงานหัตถกรรม' },
            { type_id: '29', type_name: 'งานศิลปะ', sub_type:'ของตกแต่งบ้าน' },

            
            { type_id: '30', type_name: 'เครื่องมือและอุปกรณ์ DIY', sub_type:'อื่น' },
            { type_id: '31', type_name: 'เครื่องมือและอุปกรณ์ DIY', sub_type:'เครื่องมือช่าง' },
            { type_id: '32', type_name: 'เครื่องมือและอุปกรณ์ DIY', sub_type:'วัสดุสำหรับ DIY ' },
        ]);

        console.log('Sample data added successfully.');
        await Catelog.collection.drop();
        await Type.collection.drop();
    } catch (error) {
        console.error('Error adding sample data:', error);
    } finally {
        // Close the MongoDB connection when done
        connection.close();
    }





    try {
            // Add sample data to the 'types' collection
            await Catelog.create([
                { id_product: '1', type_id: '0' },
                { id_product: '2', type_id: '1' },
                { id_product: '3', type_id: '8' },
                { id_product: '4', type_id: '31' },
                { id_product: '5', type_id: '23' },
                { id_product: '6', type_id: '21' },
                { id_product: '7', type_id: '13' },
                { id_product: '8', type_id: '17' },
                { id_product: '9', type_id: '29' },
                { id_product: '10', type_id: '10' },
                { id_product: '11', type_id: '14' },
                { id_product: '12', type_id: '12' },
                { id_product: '13', type_id: '32' },
                { id_product: '14', type_id: '5' },
                { id_product: '15', type_id: '13' },
                { id_product: '16', type_id: '22' },
                { id_product: '17', type_id: '4' },
                { id_product: '18', type_id: '27' },
                { id_product: '19', type_id: '21' },
                { id_product: '20', type_id: '10' },
                { id_product: '21', type_id: '8' },
                { id_product: '22', type_id: '2' },
                { id_product: '23', type_id: '8' },
                { id_product: '24', type_id: '31' },
                { id_product: '25', type_id: '24' },
                { id_product: '26', type_id: '21' },
                { id_product: '27', type_id: '2' },
                { id_product: '28', type_id: '17' },
                { id_product: '29', type_id: '24' },
                { id_product: '30', type_id: '12' },
                { id_product: '31', type_id: '7' },
                { id_product: '32', type_id: '28' },
                { id_product: '33', type_id: '31' },
                { id_product: '34', type_id: '21' },
                { id_product: '35', type_id: '11' },
                { id_product: '36', type_id: '5' },
                { id_product: '37', type_id: '17' },
                { id_product: '38', type_id: '12' },
                { id_product: '39', type_id: '29' },
                { id_product: '40', type_id: '8' },
                { id_product: '41', type_id: '31' },
                { id_product: '42', type_id: '27' },
                { id_product: '43', type_id: '8' },
                { id_product: '44', type_id: '21' },
                { id_product: '45', type_id: '30' },
                { id_product: '46', type_id: '21' },
                { id_product: '47', type_id: '13' },
                { id_product: '48', type_id: '10' },
                { id_product: '49', type_id: '10' },
                { id_product: '50', type_id: '3' },
                { id_product: '51', type_id: '3' },
                { id_product: '52', type_id: '17' },
                { id_product: '53', type_id: '8' },
                { id_product: '54', type_id: '15' },
                { id_product: '55', type_id: '11' },
                { id_product: '56', type_id: '27' },
                { id_product: '57', type_id: '13' },
                { id_product: '58', type_id: '2' },
                { id_product: '59', type_id: '1' },
                { id_product: '60', type_id: '16' },
                { id_product: '61', type_id: '5' },
                { id_product: '62', type_id: '31' },
                { id_product: '63', type_id: '12' },
                { id_product: '64', type_id: '29' },
                { id_product: '65', type_id: '7' },
                { id_product: '66', type_id: '22' },
                { id_product: '67', type_id: '24' },
                { id_product: '68', type_id: '3' },
                { id_product: '69', type_id: '29' },
                { id_product: '70', type_id: '6' },
                { id_product: '71', type_id: '15' },
                { id_product: '72', type_id: '10' },
                { id_product: '73', type_id: '27' },
                { id_product: '74', type_id: '1' },
                { id_product: '75', type_id: '20' },
                { id_product: '76', type_id: '13' },
                { id_product: '77', type_id: '4' },
                { id_product: '78', type_id: '8' },
                { id_product: '79', type_id: '2' },
                { id_product: '80', type_id: '19' },
                { id_product: '81', type_id: '8' },
                { id_product: '82', type_id: '16' },
                { id_product: '83', type_id: '14' },
                { id_product: '84', type_id: '31' },
                { id_product: '85', type_id: '12' },
                { id_product: '86', type_id: '2' },
                { id_product: '87', type_id: '4' },
                { id_product: '88', type_id: '10' },
                { id_product: '89', type_id: '14' },
                { id_product: '90', type_id: '1' },
                { id_product: '91', type_id: '2' },
                { id_product: '92', type_id: '5' },
                { id_product: '93', type_id: '10' },
                { id_product: '94', type_id: '17' },
                { id_product: '95', type_id: '16' },
                { id_product: '96', type_id: '13' },
                { id_product: '97', type_id: '11' },
                { id_product: '98', type_id: '8' },
                { id_product: '99', type_id: '6' },
                { id_product: '100', type_id: '3' },
                { id_product: '101', type_id: '9' },
                { id_product: '102', type_id: '1' },
                { id_product: '103', type_id: '16' },
                { id_product: '104', type_id: '6' },
                { id_product: '105', type_id: '3' },
                { id_product: '106', type_id: '12' },
                { id_product: '107', type_id: '7' },
                { id_product: '108', type_id: '19' },
                { id_product: '109', type_id: '8' },
                { id_product: '110', type_id: '14' },
                { id_product: '111', type_id: '5' },
                { id_product: '112', type_id: '11' },
                { id_product: '113', type_id: '10' },
                { id_product: '114', type_id: '3' },
                { id_product: '115', type_id: '15' },
                { id_product: '116', type_id: '9' },
                { id_product: '117', type_id: '1' },
                { id_product: '118', type_id: '18' },
                { id_product: '119', type_id: '7' },
                { id_product: '120', type_id: '16' },
                { id_product: '121', type_id: '12' },
                { id_product: '122', type_id: '19' },
                { id_product: '123', type_id: '8' },
                { id_product: '124', type_id: '14' },
                { id_product: '125', type_id: '3' },
                { id_product: '126', type_id: '16' },
                { id_product: '127', type_id: '6' },
                { id_product: '128', type_id: '9' },
                { id_product: '129', type_id: '15' },
                { id_product: '130', type_id: '1' },
                { id_product: '131', type_id: '25' },
                { id_product: '132', type_id: '20' },
                { id_product: '133', type_id: '10' },
                { id_product: '134', type_id: '18' },
                { id_product: '135', type_id: '5' },
                { id_product: '136', type_id: '14' },
                { id_product: '137', type_id: '3' },
                { id_product: '138', type_id: '16' },
                { id_product: '139', type_id: '9' },
                { id_product: '140', type_id: '1' },
                { id_product: '141', type_id: '18' },
                { id_product: '142', type_id: '7' },
                { id_product: '143', type_id: '15' },
                { id_product: '144', type_id: '10' },
                { id_product: '145', type_id: '19' },
                { id_product: '146', type_id: '3' },
                { id_product: '147', type_id: '9' },
                { id_product: '148', type_id: '5' },
                { id_product: '149', type_id: '14' },
                { id_product: '150', type_id: '6' },
                { id_product: '151', type_id: '11' },
                { id_product: '152', type_id: '8' },
                { id_product: '153', type_id: '16' },
                { id_product: '154', type_id: '1' },
                { id_product: '155', type_id: '18' },
                { id_product: '156', type_id: '12' },
                { id_product: '157', type_id: '7' },
                { id_product: '158', type_id: '15' },
                { id_product: '159', type_id: '9' },
                { id_product: '160', type_id: '3' },
                { id_product: '161', type_id: '16' },
                { id_product: '162', type_id: '6' },
                { id_product: '163', type_id: '10' },
                { id_product: '164', type_id: '19' },
                { id_product: '165', type_id: '8' },
                { id_product: '166', type_id: '14' },
                { id_product: '167', type_id: '3' },
                { id_product: '168', type_id: '16' },
                { id_product: '169', type_id: '12' },
                { id_product: '170', type_id: '7' },
                { id_product: '171', type_id: '15' },
                { id_product: '172', type_id: '1' },
                { id_product: '173', type_id: '11' },
                { id_product: '174', type_id: '9' },
                { id_product: '175', type_id: '18' },
                { id_product: '176', type_id: '5' },
                { id_product: '177', type_id: '10' },
                { id_product: '178', type_id: '19' },
                { id_product: '179', type_id: '8' },
                { id_product: '180', type_id: '14' },
                { id_product: '181', type_id: '3' },
                { id_product: '182', type_id: '16' },
                { id_product: '183', type_id: '6' },
                { id_product: '184', type_id: '15' },
                { id_product: '185', type_id: '9' },
                { id_product: '186', type_id: '11' },
                { id_product: '187', type_id: '7' },
                { id_product: '188', type_id: '1' },
                { id_product: '189', type_id: '8' },
                { id_product: '190', type_id: '18' },
                { id_product: '191', type_id: '5' },
                { id_product: '192', type_id: '16' },
                { id_product: '193', type_id: '10' },
                { id_product: '194', type_id: '9' },
                { id_product: '195', type_id: '3' },
                { id_product: '196', type_id: '16' },
                { id_product: '197', type_id: '12' },
                { id_product: '198', type_id: '20' },
                { id_product: '199', type_id: '18' },
                { id_product: '200', type_id: '1' },
            ]);
    
            console.log('Sample data added successfully.');
            
        } catch (error) {
            console.error('Error adding sample data:', error);
        } finally {
            // Close the MongoDB connection when done
            connection.close();
        }
});


module.exports = router;





















