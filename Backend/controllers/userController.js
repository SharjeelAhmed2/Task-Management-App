const { updateUserProfile, getAllUsers, loginUser, signupUser, addTask, getTaskSingle, getTaskIndividual, updateTaskStatusDone, deleteTask, pendingTasks, doneTasks, todoTasks, totalTasks, setStatPending } = require('../models/userModel');

const nodemailer = require('nodemailer');

exports.getAllUsers = async (req, res) => {
    try {
        const users = await getAllUsers();
        res.json(users);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const token = await loginUser(username, password);
        res.json({ token });
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.updateProfile = async (req, res) => {
    try {
        const { fullName, contactInfo, profilePicture,emailId } = req.body;
        console.log(fullName+" "+contactInfo+" "+emailId)
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const result = await updateUserProfile(token, fullName, contactInfo, profilePicture,emailId);
        if (result) {
                    // Create a Nodemailer transporter
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: 'sharjeelahmed614@gmail.com', // Your Gmail email address
                    pass: 'Anim3!zv3ry!!!' // Your Gmail password or App password
                },
                tls: {
                    rejectUnauthorized: false // Disable SSL certificate validation
                }
            });

            // Define email options
            const mailOptions = {
                from: 'sharjeelahmed614@gmail.com', // Sender address
                to: emailId, // Recipient email address from the request body
                subject: 'Task Manager App Email', // Subject line from the request body
                text: 'Thanks for logging into my application' // Email body text from the request body
            };

            try{
                console.log("About to send the mail to ");
                await transporter.sendMail(mailOptions);
            res.status(200).json({ message: 'Profile updated successfully and Email Sent',result });
            }
            catch(error)
            {
                console.error('Error sending email:', error);
                res.status(500).send('Error sending email');
            }
        } else {
            res.status(404).json({ message: 'User not found or profile not updated' });
        }
    } catch (error) {
        console.error('Error occurred while updating profile:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


exports.signUp = async (req, res) => {
    const { username, password, contactInfo, fullName, profilePicture } = req.body;
    try {
        await signupUser(username, password, contactInfo, fullName, profilePicture);
        res.status(200).json({ message: 'User signed up successfully!' }); // Send success response
    } catch (error) {
        console.error('Error occurred while signing up:', error);
        res.status(500).json({ error: 'Internal server error' }); // Send error response
    }
}

exports.taskAdd = async(req,res) => {
    try{
    const {title, description, dueDate, priority} = req.body;
    const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
    console.log(token);
    const result = await addTask(token, title, description, dueDate, priority);
    const currentDate = new Date();
    const getdueDate = new Date(result.dueDate);

    const differenceInMilliseconds = currentDate - getdueDate;
    res.status(200).json({message: "Task added", result});

    // setTimeout(async () => {
    //     console.log("Entered setTimeout" + result._id);
    //     const taskId = result._id;
    //     const result2 = await setStatPending(taskId);
    //     res.status(200).json({message:"Status Updated",result2});
    //   }, differenceInMilliseconds);
    }
    catch(error)
    {
        console.error('Error occured while adding tasks :', error);
        res.status(500).json({ error: 'Internal server error' }); // Send error responnse
    }
}

exports.getTask = async(req,res) => 
{
    try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];

        const result = await getTaskSingle(token);
        res.status(200).json({message: "Your Tasks", result});
    }
    catch(error)
    {
        console.error("Error ",error);
        res.status(500).json({error:'internal maslay'})
    }
}

exports.getIndividualTask = async (req,res) => 
 
 {
    
    try 
     {
        const userId = req.params.id;
        const result = await getTaskIndividual(userId);
        res.status(200).json({message: "Task Detail", result})         
     }
     catch (error)
      {
        console.log("Error fetching individual task: "+error);
         res.status(500).json({error: "issues"})
      }
 }

exports.setCompleted = async (req,res) => 
 {
     try 
     {
         const id = req.params.id;

         const result = await updateTaskStatusDone(id);
         res.status(200).json({message: "Marked as Done", result});

     }
     catch(error)
     {
        console.log("error completing: "+ error);
        res.status(500).json({error:"issues"});
     }
 }

 exports.deleteTasks = async (req,res) => 
  {
      try { 
        const id = req.params.id;
        const result = await deleteTask(id);
        res.status(200).json({message: "Task Deleted", result});
      }
      catch(errpr)
      {
        res.status(500).json({error: "issues"});
      }
  }

  exports.getpendingTasks = async(req,res) => 
   {
       try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const reuslt = await pendingTasks(token);
        if(reuslt || reuslt===0)
            res.status(200).json({message:"Success",reuslt});
       }
       catch(error)
       {
            res.status(500).json({error:"issues"});
       }
   }

   exports.getdoneTasks = async(req,res) => 
   {
       try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const reuslt = await doneTasks(token);
        if(reuslt || reuslt===0)
            res.status(200).json({message:"Success",reuslt});
       }
       catch(error)
       {
            res.status(500).json({error:"issues"});
       }
   }

   exports.gettodoTasks = async(req,res) => 
   {
       try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const reuslt = await todoTasks(token);
        if(reuslt || reuslt===0)
            res.status(200).json({message:"Success",reuslt});
       }
       catch(error)
       {
            res.status(500).json({error:"issues"});
       }
   }

   
   exports.gettotalTasks = async(req,res) => 
   {
       try{
        const token = req.headers.authorization && req.headers.authorization.split(' ')[1];
        const reuslt = await totalTasks(token);
        if(reuslt || reuslt===0)
            res.status(200).json({message:"Success",reuslt});
       }
       catch(error)
       {
            res.status(500).json({error:"issues"});
       }
   }