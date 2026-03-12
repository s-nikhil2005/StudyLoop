const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
            
      username: {
                type: String,
                unique: true,
                required: [true, "User name is required"],
                trim: true,
                minlength: 3,
                maxlength: 20,
                index: true
            },
      
      email: {
              type: String,
              unique: true,
              required: [true, "Email is required"],
              lowercase: true,
              trim: true,
              maxlength: 100,
              index: true,
              match: [
                  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
                  "Please provide a valid email address",
                   ]
            },
            
      password: {
                type: String,
                required: [true,"Password is required"],
                minlength: [8,"Password must be atleast 8 characters long"],
                match: [
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/,
                    "Password must contain uppercase, lowercase, number and special character"
                ]
         },

         role: {
                type: String,
                enum: ["user", "admin"],
                default: "user"
               },
     
      isVerified: {
                 type: Boolean,
                 default: false
      }     
     },
     {
      timestamps: true
     }

     );

     const User = mongoose.model("User", userSchema);

     module.exports = {User};