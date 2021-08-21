const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxLength: [1000, 'Product name cannot exceed 100 characteres']
    },
    price: {
        type: Number,
        required: [true, 'Please enter product price'],
        maxLength: [5, 'Product price cannot exceed 5 numbers'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Please describe your product'],

    },
    ratings: {
         type: Number,
         default: 0
    },
    images: [
        {
            public_id: {
                type: String,
                required: true
            }, 
            url: {
                type: String,
                required: true
            },
            
        }
    ],

    brand: {
        type: String,
        required: [true, 'Please enter the Brand ']
    },

    category: {
        type: String,
        required: [true, 'Please select category for this product'],
        enum: {
            values: [
                
                'Eletrônicos',
                'Celulares',
                'Cameras',
                'Notebooks',
                'Acessórios ',
                'Headphones',
                'Comida',
                "Livros",
                'Roupas/Calçados',
                'Saude/Beleza',
                'Esportes',
                'Exterior',
                'Casa',
                'Outros'
            
            ],
            message: 'Please select correct category for product'
        }
    },
    seller: {
        type: String,
        required: [true, 'Please enter product seller']
    },
    stock: {
        type: Number,
        required: [true, 'Product name cannot exceed 5 characters'],
        default: 0
    },
    numOfReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.ObjectId,
                ref: 'User',
                required: true
            },
            
            name: {
                type:String,
                required: true
            },
            
            rating: {
                type: String,
                required: true
            },

            comment: {
                type: String,
                required: true
            }
            
        }
    ],
    
    user: {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema); 