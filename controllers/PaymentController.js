import "../models/database.js";
import Payment from "../models/Payment.js";

// create a new payment
export const create = async (req, res) => {
    try{
        // validate request
        const {  
            tenant, 
            mpesa,
            receipt_no,
            amount,
            } = req.body;

        // create a new payment
        const payment = new Payment({
            tenant, 
            mpesa,
            receipt_no,
            amount,
        });

        // save payment in the database
        const savedPayment = await payment.save()

        await Tenant.findByIdAndUpdate(
            { _id: tenant },
            { $push: { payment: savedPayment._id } },
            { new: true, useFindAndModify: false }
        );
        

        return res.status(201).json({
            success: true,
            message: "Payment created successfully",
            data: savedPayment
        })
    }catch(err){
        return res.status(500).json({
            success: false,
            message: err.message || "Some error occurred while creating the payment."
        });
    }
    
}

// retrieve and return all payments from the database
export const findAll = async (req, res) => {
        
        try{
            const payments = await Payment.find().populate("tenant").populate("mpesa");
            return res.status(200).json({
                success: true,
                message: "A list of all payments",
                data: payments
            });
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message || "Some error occurred while retrieving payments."
            });
        }
        
    }

// find a single payment with a paymentId
export const findOne = async (req, res) => {
            
        try{
            const id = req.params.paymentId;
            const payment = await Payment.findById(id).populate("tenant").populate("mpesa");
            if(!payment){
                return res.status(404).json({
                    success: false,
                    message: "Payment with id: " + id + " not found"
                });
            }
            return res.status(200).json({
                success: true,
                message: "Payment found successfully",
                data: payment
            });
        }catch(err){
            return res.status(500).json({
                success: false,
                message: err.message || "Error retrieving payment with id: " + id
            });
        }
        
    }

// delete a payment with the specified paymentId in the request
// export const delete = async (req, res) => {
//     try{
//         const id = req.params.paymentId;
//         const payment = await Payment.findByIdAndRemove(id);
//         if(!payment){
//             return res.status(404).json({
//                 success: false,
//                 message: "Payment with id: " + id + " not found"
//             });
//         }
//         return res.status(200).json({
//             success: true,
//             message: "Payment deleted successfully"
//         });
//     }catch(err){
//         return res.status(500).json({
//             success: false,
//             message: err.message || "Error deleting payment with id: " + id
//         });
//     }
    
// }   