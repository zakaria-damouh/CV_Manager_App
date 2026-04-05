import { deleteAccountService, loginService, registerService, updateAccountService } from "../services/auth.service.js";


export const register = async (req, res) =>{
    try{
        const { firstName, lastName, email, password } = req.body;
        const user = await registerService(firstName, lastName, email, password);
        res.status(201).json({message: 'User created successfully' , user});
    }catch(err){
        res.status(400).json({message : err.message});
    }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const data = await loginService(email, password);
    res.status(200).json(data);
  } catch (error) {
    res.status(401).json({ message: error.message });
  }
};

export const updateAccount = async (req, res) => {
  try {
    const { firstName, lastName } = req.body;
    const user = await updateAccountService(req.user.userId, firstName, lastName);
    res.status(200).json({ message: 'Account updated successfully', user });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


export const deleteAccount = async (req, res) => {
  try {
    await deleteAccountService(req.user.userId);
    res.status(200).json({ message: 'Account deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};